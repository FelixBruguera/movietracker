import { ObjectId } from "mongodb"

export default function reviewsPipeline(options) {
  const { id, page = 1, sortBy = "date", sortOrder = -1 } = options
  const itemsPerPage = 10
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
        ],
        total: [{ $count: "count" }],
      },
    },
    {
      $project: {
        reviews: "$reviews",
        info: {
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
