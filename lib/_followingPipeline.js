import { ObjectId } from "mongodb"

export default function listsPipeline(options, userId = null) {
  const { page, sortOrder } = options
  const itemsPerPage = 30
  const sortBy =
    options.sortBy === "date"
      ? "createdAt"
      : options.sortBy === "followers"
        ? "followers"
        : "movies"
  const user_id = userId && ObjectId.createFromHexString(userId)
  return [
    {
      $match: { user_id: user_id },
    },
    {
      $facet: {
        lists: [
          {
            $lookup: {
              from: "lists",
              localField: "list_id",
              foreignField: "_id",
              as: "lists",
            },
          },
          { $replaceRoot: { newRoot: { $arrayElemAt: ["$lists", 0] } } },
          { $sort: { [sortBy]: sortOrder } },
          { $skip: (page - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          { $project: { user_id: 0 } },
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
