export default function usersPipeline(options) {
  const { page, sortOrder, sortBy } = options
  const usersPerPage = 40
  return [
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
              image: 1,
              createdAt: 1,
              reviews: 1,
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
          currentPage: { $literal: page },
        },
      },
    },
  ]
}
