export default function usersPipeline(options) {
  const { page = 1 } = options
  const sortBy = options.sortBy === "date" ? "createdAt" : "userReviews.count"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const usersPerPage = 40
  return [
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "user_id",
        pipeline: [{ $group: { _id: "user_id", count: { $count: {} } } }],
        as: "userReviews",
      },
    },
    { $sort: { [sortBy]: sortOrder } },
    {
      $facet: {
        users: [
          { $skip: (page - 1) * usersPerPage },
          { $limit: usersPerPage },
          {
            $project: {
              _id: 1,
              username: 1,
              createdAt: 1,
              userReviews: {
                $ifNull: [{ $arrayElemAt: ["$userReviews.count", 0] }, 0],
              },
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $project: {
        users: "$users",
        info: {
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$totalCount.count", 0] },
                    usersPerPage,
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
