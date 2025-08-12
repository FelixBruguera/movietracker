import { ObjectId } from "mongodb"

export default function listsPipeline(options, userId = null) {
  const { page, sortOrder, search } = options
  const itemsPerPage = 30
  const sortBy = options.sortBy === "date" ? "createdAt" : options.sortBy
  const user_id = userId && ObjectId.createFromHexString(userId)
  const matchStage =
    options.filter === "user"
      ? { user_id: user_id }
      : userId
        ? { $or: [{ user_id: user_id }, { isPrivate: false }] }
        : { isPrivate: false }
  if (search) {
    matchStage["$text"] = { $search: `"${search}"` }
  }
  return [
    {
      $match: matchStage,
    },
    {
      $facet: {
        lists: [
          { $sort: { [sortBy]: sortOrder } },
          { $skip: (page - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          { $project: { isPrivate: 0, user_id: 0 } },
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
          currentPage: { $literal: page },
        },
      },
    },
  ]
}
