import { ObjectId } from "mongodb"

export default function userDiaryPipeline(options) {
  const { id, page, sortBy, sortOrder } = options
  const itemsPerPage = 10
  return [
    { $match: { user_id: ObjectId.createFromHexString(id) } },
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
          { $skip: (page - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $lookup: {
              from: "movies",
              localField: "movies.movie_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 1, title: 1, poster: 1 } }],
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
                            $indexOfArray: ["$watched._id", "$$movie.movie_id"],
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
    {
      $project: {
        movies: "$logs",
        info: {
          total: {
            $arrayElemAt: ["$total.userLogs", 0],
          },
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
          currentPage: { $literal: page },
        },
      },
    },
  ]
}
