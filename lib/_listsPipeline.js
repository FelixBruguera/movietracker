import { ObjectId } from "mongodb"

export default function listsPipeline(options, userId = null) {
  const page = options.page || 1
  const itemsPerPage = 30
  const sortBy = "date"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const matchStage = userId
    ? {
        $or: [
          { user_id: ObjectId.createFromHexString(userId) },
          { isPrivate: false },
        ],
      }
    : { isPrivate: false }
  return [
    {
      $match: matchStage,
    },
    {
      $facet: {
        lists: [
          { $sort: { [sortBy]: sortOrder } },
          { $skip: (parseInt(page) - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $lookup: {
              from: "lists_movies",
              localField: "_id",
              foreignField: "list_id",
              pipeline: [{ $group: { _id: "list_id", count: { $count: {} } } }],
              as: "totalMovies",
            },
          },
          {
            $addFields: {
              totalMovies: {
                $ifNull: [{ $arrayElemAt: ["$totalMovies.count", 0] }, 0],
              },
            },
          },
        ],
        total: [{ $count: "count" }],
      },
    },
    {
      $project: {
        lists: "$lists",
        info: {
          totalLists: { $arrayElemAt: ["$total.count", 0] },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$total.count", 0] },
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
