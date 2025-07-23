import { ObjectId } from "mongodb"

export default function reviewsPipeline(options, userId = null) {
  const { id, page = 1 } = options
  const itemsPerPage = 10
  const sortBy = options.sortBy === "rating" ? "rating" : "date"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const currentUserReviewPipeline = userId
    ? [{ $match: { user_id: ObjectId.createFromHexString(userId) } }]
    : [{ $match: { $expr: { $eq: [0, 1] } } }]
  return [
    {
      $match: {
        movie_id: ObjectId.createFromHexString(id),
      },
    },
    {
      $facet: {
        reviews: [
          { $sort: { [sortBy]: sortOrder } },
          { $skip: (parseInt(page) - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $lookup: {
              from: "user",
              localField: "user_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 1, username: 1 } }],
              as: "userInfo",
            },
          },
          {
            $addFields: {
              userInfo: { $arrayElemAt: ["$userInfo", 0] },
            },
          },
        ],
        currentUserReview: currentUserReviewPipeline,
        total: [{ $count: "count" }],
        average: [{ $group: { _id: null, avgRating: { $avg: "$rating" } } }],
      },
    },
    {
      $project: {
        reviews: "$reviews",
        currentUserReview: { $arrayElemAt: ["$currentUserReview", 0] },
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
