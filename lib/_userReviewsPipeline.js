import { ObjectId } from "mongodb"

export default function userReviewsPipeline(options) {
  const { id, page = 1 } = options
  const sortBy = options.sortBy === "rating" ? "rating" : "date"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
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
              average: [
                { $group: { _id: null, avgRating: { $avg: "$rating" } } },
              ],
              total: [{ $count: "userReviews" }],
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
        },
        reviews: { $arrayElemAt: ["$userReviews.reviews", 0] },
        info: {
          averageRating: {
            $arrayElemAt: [
              { $arrayElemAt: ["$userReviews.average.avgRating", 0] },
              0,
            ],
          },
          totalReviews: {
            $arrayElemAt: [
              { $arrayElemAt: ["$userReviews.total.userReviews", 0] },
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
                        { $arrayElemAt: ["$userReviews.total.userReviews", 0] },
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
