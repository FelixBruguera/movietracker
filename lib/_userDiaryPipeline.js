import { ObjectId } from "mongodb"

export default function userDiaryPipeline(options) {
  const { id, page = 1 } = options
  const sortBy = options.sortBy === "yearly" ? "%Y" : "%Y-%m"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const itemsPerPage = 10
  return [
    { $match: { user_id: ObjectId.createFromHexString(id) } },
    {
      $facet: {
        movies: [
          {
            $group: {
              _id: {
                $dateToString: {
                  format: sortBy,
                  date: "$date",
                },
              },
              movie_ids: {
                $push: { movie_id: "$movie_id", date: "$date" },
              },
            },
          },
          { $sort: { _id: sortOrder } },
          { $skip: (parseInt(page) - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $lookup: {
              from: "movies",
              localField: "movie_ids.movie_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 1, title: 1, poster: 1 } }],
              as: "watched",
            },
          },
          {
            $addFields: {
              watched: {
                $map: {
                  input: "$movie_ids",
                  as: "movie_id",
                  in: {
                    $mergeObjects: [
                      {
                        $arrayElemAt: [
                          "$watched",
                          {
                            $indexOfArray: [
                              "$watched._id",
                              "$$movie_id.movie_id",
                            ],
                          },
                        ],
                      },
                      { date: "$$movie_id.date" },
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
        userInfo: [
          { $limit: 1 },
          {
            $lookup: {
              from: "user",
              localField: "user_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 0, username: 1, createdAt: 1 } }],
              as: "userInfo",
            },
          },
          {
            $addFields: {
              userInfo: { $arrayElemAt: ["$userInfo", 0] },
            },
          },
        ],
        total: [{ $count: "count" }],
        totalGroups: [
          {
            $group: {
              _id: {
                $dateToString: {
                  format: sortBy,
                  date: "$date",
                },
              },
            },
          },
          { $count: "count" },
        ],
      },
    },
    {
      $project: {
        movies: "$movies",
        user: { $arrayElemAt: ["$userInfo.userInfo", 0] },
        info: {
          total: { $arrayElemAt: ["$total.count", 0] },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$totalGroups.count", 0] },
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
