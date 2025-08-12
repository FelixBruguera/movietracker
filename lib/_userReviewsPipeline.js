import { ObjectId } from "mongodb"

export default function userReviewsPipeline(options) {
  const { id, page, sortOrder, sortBy } = options
  const itemsPerPage = 20
  return [
    { $match: { user_id: ObjectId.createFromHexString(id) } },
    { $sort: { [sortBy]: sortOrder } },
    {
      $facet: {
        reviews: [
          { $skip: (page - 1) * itemsPerPage },
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
        average: [{ $group: { _id: null, avgRating: { $avg: "$rating" } } }],
        total: [{ $count: "rating" }],
      },
    },
    {
      $project: {
        reviews: "$reviews",
        info: {
          averageRating: { $arrayElemAt: ["$average.avgRating", 0] },
          totalReviews: { $arrayElemAt: ["$total.rating", 0] },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$total.rating", 0] },
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
