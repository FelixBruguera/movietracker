import { ObjectId } from "mongodb"

export default function userListsPipeline(options) {
  const { id, page = 1 } = options
  const sortBy = "createdAt"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const itemsPerPage = 20
  return [
    { $match: { _id: ObjectId.createFromHexString(id) } },
    {
      $lookup: {
        from: "lists",
        localField: "_id",
        foreignField: "user_id",
        as: "userLists",
        pipeline: [
          { $match: { isPrivate: false } },
          {
            $facet: {
              lists: [
                { $sort: { [sortBy]: sortOrder } },
                { $skip: (parseInt(page) - 1) * itemsPerPage },
                { $limit: itemsPerPage },
              ],
              total: [{ $count: "user_id" }],
            },
          },
        ],
      },
    },
    {
      $project: {
        user: {
          username: "$username",
          createdAt: "$createdAt",
          image: "$image",
        },
        lists: { $arrayElemAt: ["$userLists.lists", 0] },
        info: {
          total: {
            $arrayElemAt: [
              { $arrayElemAt: ["$userLists.total.user_id", 0] },
              0,
            ],
          },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    {
                      $arrayElemAt: [
                        { $arrayElemAt: ["$userLists.total.user_id", 0] },
                        0,
                      ],
                    },
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
