const PIPELINE_CONFIG = {
  itemsPerPage: 70,
  persons: ["cast", "directors"],
  selects: ["genres", "languages", "rating"],
  ranges: {
    "imdb.rating": { min: "imdb.rating_min", max: "imdb.rating_max" },
    runtime: { min: "runtime_min", max: "runtime_max" },
    released: { min: "released_min", max: "released_max" },
  },
  sortableFields: ["imdb.rating", "released", "runtime"],
}

function buildMatchStage(options) {
  const matchPipeline = { $match: {} }

  for (const [key, value] of Object.entries(options)) {
    if (!value || value === "All" || typeof value !== "string") {
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
            : parseFloat(minVal)
      }
      if (maxVal) {
        rangeQuery["$lte"] =
          fieldName === "released"
            ? new Date(`${maxVal}-12-31T00:00:00.000Z`)
            : parseFloat(maxVal)
      }
      matchPipeline["$match"][fieldName] = rangeQuery
    }
  }

  return matchPipeline
}

function buildSortStage(options) {
  const { sortBy, sortOrder } = options
  let sortKey = "imdb.rating"

  if (PIPELINE_CONFIG.sortableFields.includes(sortBy)) {
    sortKey = sortBy
  }

  const sortPipeline = { $sort: { [sortKey]: parseFloat(sortOrder) || -1 } }
  return sortPipeline
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
          currentPage: page,
        },
      },
    },
  ]
}

export default function moviesPipeline(options) {
  const page = parseInt(options.page) || 1
  const matchStage = buildMatchStage(options)
  const sortStage = buildSortStage(options)

  const sortKey = Object.keys(sortStage.$sort)[0]
  if (!matchStage.$match[sortKey]) {
    matchStage.$match[sortKey] = { $exists: true, $nin: [""] }
  }

  const paginationStage = buildPaginationStage(page)

  const pipeline = [matchStage, sortStage, ...paginationStage]

  return pipeline
}
