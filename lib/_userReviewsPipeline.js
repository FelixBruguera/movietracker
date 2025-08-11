import { ObjectId } from "mongodb"

export default function userReviewsPipeline(options) {
  const { id, page, sortOrder, sortBy } = options
  const itemsPerPage = 20
  return [
    { $match: { _id: ObjectId.createFromHexString(id) } },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "user_id",
        as: "userReviews",
        pipeline: [
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
              average: [
                { $group: { _id: null, avgRating: { $avg: "$rating" } } },
              ],
            },
          },
        ],
      },
    },
    {
      $project: {
        user: {
          username: "$username",
          createdAt: "$createdAt",
          image: "$image",
        },
        reviews: { $arrayElemAt: ["$userReviews.reviews", 0] },
        info: {
          averageRating: {
            $arrayElemAt: [
              { $arrayElemAt: ["$userReviews.average.avgRating", 0] },
              0,
            ],
          },
          totalReviews: "$reviews",
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: ["$reviews", itemsPerPage],
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
