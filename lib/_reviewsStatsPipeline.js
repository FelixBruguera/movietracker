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
        byDecade: [
          {
            $addFields: {
              year: {
                $arrayElemAt: ["$data.year", 0],
              },
            },
          },
          {
            $group: {
              _id: {
                $subtract: [
                  "$year",
                  {
                    $mod: ["$year", 10],
                  },
                ],
              },
              averageRating: {
                $avg: "$rating",
              },
              total: {
                $count: {},
              },
            },
          },
          { $sort: { _id: 1 } },
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
              averageRating: {
                $avg: "$rating",
              },
              total: {
                $count: {},
              },
            },
          },
          { $match: { total: { $gte: 2 } } },
          { $sort: { averageRating: -1 } },
          { $limit: 15 },
        ],
        byDirectors: [
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
              averageRating: {
                $avg: "$rating",
              },
              total: {
                $count: {},
              },
            },
          },
          { $match: { total: { $gte: 2 } } },
          { $sort: { averageRating: -1 } },
          { $limit: 15 },
        ],
        higherThanIMDB: [
          { $match: { "data.imdb.rating": { $gte: 0 } } },
          {
            $project: {
              _id: "$data._id",
              rating: 1,
              imdbRating: { $arrayElemAt: ["$data.imdb.rating", 0] },
              ratingVsImdb: {
                $subtract: [
                  "$rating",
                  { $arrayElemAt: ["$data.imdb.rating", 0] },
                ],
              },
              poster: { $arrayElemAt: ["$data.poster", 0] },
              title: { $arrayElemAt: ["$data.title", 0] },
            },
          },
          { $match: { ratingVsImdb: { $gte: 0 } } },
          { $sort: { ratingVsImdb: -1 } },
          { $limit: 18 },
        ],
        lowerThanIMDB: [
          { $match: { "data.imdb.rating": { $gte: 0 } } },
          {
            $project: {
              _id: "$data._id",
              rating: 1,
              imdbRating: { $arrayElemAt: ["$data.imdb.rating", 0] },
              ratingVsImdb: {
                $subtract: [
                  "$rating",
                  { $arrayElemAt: ["$data.imdb.rating", 0] },
                ],
              },
              poster: { $arrayElemAt: ["$data.poster", 0] },
              title: { $arrayElemAt: ["$data.title", 0] },
            },
          },
          { $match: { ratingVsImdb: { $lte: 0 } } },
          { $sort: { ratingVsImdb: 1 } },
          { $limit: 18 },
        ],
      },
    },
  ]
}
