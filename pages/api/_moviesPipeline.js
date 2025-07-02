export default function moviesPipeline(options) {
  const itemsPerPage = 50
  const checkboxes = ["genres", "languages", "rating"]
  const ranges = [
    "year_min",
    "imdb.rating_min",
    "metacritic_min",
    "tomatoes.critic.rating_min",
    "awards.wins_min",
    "runtime_min",
  ]
  const pipeline = []
  const matchPipeline = { $match: {} }
  for (const [key, value] of Object.entries(options)) {
    if (value === "All") {
      continue
    }
    if (checkboxes.includes(key)) {
      matchPipeline["$match"][key] = { $in: [value] }
    } else if (ranges.includes(key)) {
      const [fieldName, aggregator] = key.split("_")
      const formattedValue = parseFloat(value)
      const max = parseFloat(options[`${fieldName}_max`])
      matchPipeline["$match"][fieldName] = {
        $gte: formattedValue,
        $lte: max,
      }
    } else if (key === "type") {
      matchPipeline["$match"][key] = { $eq: value }
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
        { $project: { _id: 1, poster: 1, title: 1 } },
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
