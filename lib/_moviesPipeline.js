const PIPELINE_CONFIG = {
  itemsPerPage: 63,
  persons: ["cast", "directors"],
  selects: ["genres", "languages"],
  ranges: {
    "imdb.rating": { min: "imdb.rating_min", max: "imdb.rating_max" },
    runtime: { min: "runtime_min", max: "runtime_max" },
    released: { min: "released_min", max: "released_max" },
  },
}

function buildMatchStage(options) {
  const matchPipeline = { $match: {} }

  for (const [key, value] of Object.entries(options)) {
    if (!value || value === "all" || value === "All") {
      continue
    }
    if (key === "search") {
      matchPipeline["$match"]["$text"] = { $search: `"${value}"` }
    } else if (PIPELINE_CONFIG.persons.includes(key)) {
      matchPipeline["$match"][key] = {
        $elemMatch: { $regex: value, $options: "i" },
      }
    } else if (PIPELINE_CONFIG.selects.includes(key)) {
      matchPipeline["$match"][key] = { $in: [value] }
    } else if (key === "type") {
      matchPipeline["$match"][key] = { $eq: value.toLowerCase() }
    }
  }

  for (const [fieldName, range] of Object.entries(PIPELINE_CONFIG.ranges)) {
    const minKey = range.min
    const maxKey = range.max
    const minVal = options[minKey]
    const maxVal = options[maxKey]

    if (minVal || maxVal) {
      const rangeQuery = {}
      if (minVal) {
        rangeQuery["$gte"] =
          fieldName === "released"
            ? new Date(`${minVal}-01-01T00:00:00.000Z`)
            : minVal
      }
      if (maxVal) {
        rangeQuery["$lte"] =
          fieldName === "released"
            ? new Date(`${maxVal}-12-31T00:00:00.000Z`)
            : maxVal
      }
      matchPipeline["$match"][fieldName] = rangeQuery
    }
  }

  return matchPipeline
}

function buildPaginationStage(page) {
  const { itemsPerPage } = PIPELINE_CONFIG
  return [
    {
      $facet: {
        movies: [
          { $skip: (page - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $project: {
              _id: 1,
              poster: 1,
              title: 1,
              "imdb.rating": 1,
              released: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $project: {
        movies: "$movies",
        info: {
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$totalCount.count", 0] },
                    itemsPerPage,
                  ],
                },
              },
              0,
            ],
          },
          currentPage: { $literal: page },
        },
      },
    },
  ]
}

export default function moviesPipeline(options) {
  const matchStage = buildMatchStage(options)
  const { sortBy, sortOrder } = options

  if (!matchStage.$match[sortBy]) {
    matchStage.$match[sortBy] = { $exists: true, $nin: [""] }
  }

  const paginationStage = buildPaginationStage(options.page)

  const pipeline = [
    matchStage,
    { $sort: { [sortBy]: sortOrder } },
    ...paginationStage,
  ]

  return pipeline
}
