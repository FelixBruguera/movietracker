import { ObjectId } from "mongodb"

export default function userListsPipeline(options) {
  const { id, page = 1 } = options
  const sortBy = 'createdAt'
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
            { $sort: { [sortBy]: sortOrder } },
            {
              $facet: {
                lists: [
                  { $skip: (parseInt(page) - 1) * itemsPerPage },
                  { $limit: itemsPerPage },
                  {
                    $lookup: {
                      from: "lists_movies",
                      localField: "_id",
                      foreignField: "list_id",
                      pipeline: [{ $group: { _id: '$list_id', count: {$count: {} } } }],
                      as: "listMovies",
                    },
                  },
                  {
                    $addFields: {
                      totalMovies: { $arrayElemAt: ["$listMovies.count", 0] },
                    },
                  },
                ],
                total: [{ $count: "userLists" }],
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
          },
          lists: { $arrayElemAt: ["$userLists.lists", 0] },
          info: {
            total: {
              $arrayElemAt: [
                { $arrayElemAt: ["$userLists.total.userLists", 0] },
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
                          { $arrayElemAt: ["$userLists.total.userLists", 0] },
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
