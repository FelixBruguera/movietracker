import { ObjectId } from "mongodb"

export default function reviewsPipeline(options, userId = null) {
  const { id, page = 1, sortBy = "date", sortOrder = -1 } = options
  const itemsPerPage = 10
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
          { $sort: { [sortBy]: parseInt(sortOrder) } },
          { $skip: (parseInt(page) - 1) * itemsPerPage },
          { $limit: itemsPerPage },
          {
            $lookup: {
              from: "user",
              localField: "user_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 0, username: 1 } }],
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
