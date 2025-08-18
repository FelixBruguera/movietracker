import { ObjectId } from "mongodb"

export default function reviewsStatsPipeline(options) {
  return [
    { $match: { user_id: ObjectId.createFromHexString(options.id) } },
    {
      $lookup: {
        from: "movies",
        localField: "movie_id",
        foreignField: "_id",
        as: "data",
      },
    },
    {
      $facet: {
        yearly: [
          {
            $group: {
              _id: "$year",
              total: {
                $count: {},
              },
            },
          },
          { $sort: { _id: 1 } },
        ],
        monthly: [
          {
            $group: {
              _id: ["$month", "$year"],
              total: {
                $count: {},
              },
            },
          },
          { $sort: { total: -1 } },
          { $limit: 8 },
        ],
        byGenre: [
          {
            $addFields: {
              genres: {
                $arrayElemAt: ["$data.genres", 0],
              },
            },
          },
          { $unwind: "$genres" },
          {
            $group: {
              _id: "$genres",
              total: {
                $count: {},
              },
            },
          },
          { $sort: { total: -1 } },
          { $limit: 15 },
        ],
        byDirector: [
          {
            $addFields: {
              directors: {
                $arrayElemAt: ["$data.directors", 0],
              },
            },
          },
          { $unwind: "$directors" },
          {
            $group: {
              _id: "$directors",
              total: {
                $count: {},
              },
            },
          },
          { $sort: { total: -1 } },
          { $limit: 15 },
        ],
        byCast: [
          {
            $addFields: {
              cast: {
                $arrayElemAt: ["$data.cast", 0],
              },
            },
          },
          { $unwind: "$cast" },
          {
            $group: {
              _id: "$cast",
              total: {
                $count: {},
              },
            },
          },
          { $sort: { total: -1 } },
          { $limit: 15 },
        ],
        byMovie: [
          {
            $group: {
              _id: "$movie_id",
              total: {
                $count: {},
              },
              title: { $first: "$data.title" },
              poster: { $first: "$data.poster" },
            },
          },
          { $match: { total: { $gte: 2 } } },
          { $sort: { total: -1 } },
          { $limit: 15 },
        ],
      },
    },
  ]
}
