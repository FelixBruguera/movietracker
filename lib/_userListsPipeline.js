import { ObjectId } from "mongodb"

export default function userListsPipeline(options) {
  const { id, page, sortBy, sortOrder } = options
  const itemsPerPage = 20
  return [
    { $match: { user_id: ObjectId.createFromHexString(id), isPrivate: false } },
    {
      $facet: {
        lists: [
          { $sort: { [sortBy]: sortOrder } },
          { $skip: (page - 1) * itemsPerPage },
          { $limit: itemsPerPage },
        ],
        total: [{ $count: "user_id" }],
      },
    },
    {
      $project: {
        lists: "$lists",
        info: {
          total: {
            $arrayElemAt: ["$total.user_id", 0],
          },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$total.user_id", 0] },
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
