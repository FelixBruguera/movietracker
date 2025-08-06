import { ObjectId } from "mongodb"

export default function listPipeline(options, userId = null) {
  const id = ObjectId.createFromHexString(options.id)
  const page = options.page || 1
  const itemsPerPage = 30
  const sortBy = "createdAt"
  const sortOrder = options.sortOrder === "1" ? 1 : -1
  const user_id = userId ? ObjectId.createFromHexString(userId) : null
  return [
    {
      $match: {
        _id: id,
        $or: [{ isPrivate: false }, { user_id: user_id }],
      },
    },
    {
      $facet: {
        moviesData: [
          {
            $lookup: {
              from: "lists_movies",
              pipeline: [
                { $match: { list_id: id } },
                { $sort: { [sortBy]: sortOrder } },
                { $skip: (parseInt(page) - 1) * itemsPerPage },
                { $limit: itemsPerPage },
                {
                  $lookup: {
                    from: "movies",
                    localField: "movie_id",
                    foreignField: "_id",
                    pipeline: [{ $project: { _id: 1, title: 1, poster: 1 } }],
                    as: "movie",
                  },
                },
              ],
              as: "moviesData",
            },
          },
          {
            $addFields: {
              moviesData: {
                $map: {
                  input: "$moviesData",
                  as: "movie_list",
                  in: {
                    $arrayElemAt: ["$$movie_list.movie", 0],
                  },
                },
              },
            },
          },
        ],
        user: [
          {
            $lookup: {
              from: "user",
              localField: "user_id",
              foreignField: "_id",
              pipeline: [{ $project: { _id: 1, username: 1, image: 1 } }],
              as: "user",
            },
          },
        ],
        isFollowed: [
          {
            $lookup: {
              from: "lists_followers",
              localField: "_id",
              foreignField: "list_id",
              pipeline: [{ $match: { user_id: user_id } }],
              as: "isFollowed",
            },
          },
        ],
      },
    },
    {
      $project: {
        list: { $arrayElemAt: ["$moviesData", 0] },
        userInfo: { $arrayElemAt: ["$user.user", 0] },
        isFollowed: {
          $gte: [
            { $size: [{ $arrayElemAt: ["$isFollowed.isFollowed", 0] }] },
            1,
          ],
        },
        info: {
          totalMovies: { $arrayElemAt: ["$moviesData.movies", 0] },
          totalPages: {
            $ifNull: [
              {
                $ceil: {
                  $divide: [
                    { $arrayElemAt: ["$moviesData.movies", 0] },
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
