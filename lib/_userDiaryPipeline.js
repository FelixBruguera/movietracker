import { ObjectId } from "mongodb"

export default function userDiaryPipeline(options) {
  const { id, page = 1 } = options
  const sortBy = options.sortBy === "yearly" ? "$year" : ["$year", "$month"]
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const itemsPerPage = 10
  return [
    { $match: { _id: ObjectId.createFromHexString(id) } },
    {
      $lookup: {
        from: "diary",
        localField: "_id",
        foreignField: "user_id",
        as: "userLogs",
        pipeline: [
          {
            $facet: {
              logs: [
                {
                  $group: {
                    _id: sortBy,
                    movies: {
                      $push: {
                        movie_id: "$movie_id",
                        date: "$date",
                      },
                    },
                  },
                },
                { $sort: { _id: sortOrder } },
                { $skip: (parseInt(page) - 1) * itemsPerPage },
                { $limit: itemsPerPage },
                {
                  $lookup: {
                    from: "movies",
                    localField: "movies.movie_id",
                    foreignField: "_id",
                    pipeline: [
                      { $project: { _id: 1, title: 1, poster: 1 } },
                    ],
                    as: "watched",
                  },
                },
                {
                  $addFields: {
                    watched: {
                      $map: {
                        input: "$movies",
                        as: "movie",
                        in: {
                          $mergeObjects: [
                            {
                              $arrayElemAt: [
                                "$watched",
                                {
                                  $indexOfArray: [
                                    "$watched._id",
                                    "$$movie.movie_id",
                                  ],
                                },
                              ],
                            },
                            { date: "$$movie.date" },
                          ],
                        },
                      },
                    },
                  },
                },

                {
                  $project: {
                    _id: 0,
                    date: "$_id",
                    watched: 1,
                  },
                },
              ],
              total: [{ $count: "userLogs" }],
              totalGroups: [
                {
                  $group: {
                    _id: sortBy,
                  },
                },
                { $count: "count" },
              ],
            },
          },
        ],
      },
    },
    {
      $project: {
        logs : "$userLogs",
        user: {
          username: "$username",
          createdAt: "$createdAt",
        },
        movies: { $arrayElemAt: ["$userLogs.logs", 0] },
        info: {
          total: {
            $arrayElemAt: [
              { $arrayElemAt: ["$userLogs.total.userLogs", 0] },
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
                        { $arrayElemAt: ["$userLogs.totalGroups.count", 0] },
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
