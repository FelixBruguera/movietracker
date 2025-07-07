export default function moviesPipeline(options) {
  const itemsPerPage = 50
  const persons = ["cast", "directors"]
  const selects = ["genres", "languages", "rating"]
  const ranges = [
    "imdb.rating_min",
    "runtime_min",
    "imdb.rating_max",
    "runtime_max",
    "released_min",
    "released_max",
  ]
  const pipeline = []
  const matchPipeline = { $match: {} }
  for (const [key, value] of Object.entries(options)) {
    if (value === "All" || value === "''") {
      continue
    } else if (key === "search" && value.length > 0) {
      matchPipeline["$match"]["$text"] = { $search: value }
    } else if (persons.includes(key) && value.length > 0) {
      matchPipeline["$match"][key] = {
        $elemMatch: { $regex: value, $options: "i" },
      }
    } else if (selects.includes(key)) {
      matchPipeline["$match"][key] = { $in: [value] }
    } else if (ranges.includes(key)) {
      const [fieldName, aggregator] = key.split("_")
      const isMin = aggregator === "min"
      const formattedValue =
        fieldName === "released"
          ? isMin
            ? new Date(`${value}-01-01T00:00:00.000Z`)
            : new Date(`${value}-12-31T00:00:00.000Z`)
          : parseFloat(value)
      const formattedAggregator = isMin ? "$gte" : "$lte"
      if (matchPipeline["$match"][fieldName]) {
        matchPipeline["$match"][fieldName][formattedAggregator] = formattedValue
      } else {
        matchPipeline["$match"][fieldName] = {
          [formattedAggregator]: formattedValue,
        }
      }
    } else if (key === "type") {
      matchPipeline["$match"][key] = { $eq: value.toLowerCase() }
    }
  }
  let sortKey = "imdb.rating"
  if (ranges.includes(`${options.sortBy}_min`)) {
    sortKey = options.sortBy
  }
  if (!matchPipeline["$match"][sortKey]) {
    matchPipeline["$match"][sortKey] = { $gte: 0 }
  }
  const sortPipeline = { $sort: {} }
  sortPipeline["$sort"][sortKey] = parseFloat(options.sortOrder) || -1
  pipeline.push(matchPipeline)
  pipeline.push(sortPipeline)
  const page = parseInt(options.page) || 1
  pipeline.push({
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
  })
  pipeline.push({
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
  })
  return pipeline
}
