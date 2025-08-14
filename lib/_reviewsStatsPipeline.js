import { ObjectId } from "mongodb"

export default function reviewsStatsPipeline(options) {
    return [
        { $match: { user_id: ObjectId.createFromHexString(options.id)}},
        { $lookup: {
            from: "movies",
            localField: "movie_id",
            foreignField: "_id",
            as: "data"
        }},
        { $facet: {
            byDecade: [
                {
                $addFields: {
                    year: {
                    $arrayElemAt: ["$data.year", 0]
                    }
                }
                },
                {
                $group: {
                    _id: {
                    $subtract: [
                        "$year",
                        {
                        $mod: ["$year", 10]
                        }
                    ]
                    },
                    averageRating: {
                    $avg: "$rating"
                    },
                    total: {
                    $count: {}
                    }
                }
                },
                { $sort: { "_id": 1 } }
            ],
            byGenre: [
                {
                $addFields: {
                    genres: {
                    $arrayElemAt: ["$data.genres", 0]
                    }
                }
                },
                {$unwind: "$genres"},
                {
                $group: {
                    _id: "$genres",
                    averageRating: {
                    $avg: "$rating"
                    },
                    total: {
                    $count: {}
                    }
                }
                },
                { $match: { total: { $gte: 2 } } },
                { $sort: { "averageRating": -1 } },
                { $limit: 15 }
            ],
            byDirectors: [
                {
                $addFields: {
                    directors: {
                    $arrayElemAt: ["$data.directors", 0]
                    }
                }
                },
                {$unwind: "$directors"},
                {
                $group: {
                    _id: "$directors",
                    averageRating: {
                    $avg: "$rating"
                    },
                    total: {
                    $count: {}
                    }
                }
                },
                { $match: { total: { $gte: 2 } } },
                { $sort: { "averageRating": -1 } },
                { $limit: 15 }
            ],
            }
        }
    ]
}