import { ObjectId } from "mongodb"

export default function userReviewsPipeline(options) {
  const { id, page = 1 } = options
  const sortBy = options.sortBy === "rating" ? "rating" : "date"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const itemsPerPage = 20
  return [
    { $match: { user_id: ObjectId.createFromHexString(id) } },
    {
      $facet: {
        reviews: [
          { $sort: { [sortBy]: sortOrder } },
          { $skip: (parseInt(page) - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $lookup: {
              from: "movies",
              localField: "movie_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 0, title: 1, poster: 1 } }],
              as: "movieInfo",
            },
          },
          {
            $addFields: {
              movieInfo: { $arrayElemAt: ["$movieInfo", 0] },
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
        average: [{ $group: { _id: null, avgRating: { $avg: "$rating" } } }],
        total: [{ $count: "count" }],
      },
    },
    {
      $project: {
        reviews: "$reviews",
        user: { $arrayElemAt: ["$userInfo.userInfo", 0] },
        info: {
          averageRating: { $arrayElemAt: ["$average.avgRating", 0] },
          totalReviews: { $arrayElemAt: ["$total.count", 0] },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$total.count", 0] },
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
