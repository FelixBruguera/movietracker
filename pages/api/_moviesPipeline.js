export default function moviesPipeline(options) {
    const itemsPerPage = 50
    const checkboxes = ['genres', 'languages', 'rating']
    const ranges = ['year', 'imdb.rating', 'metacritic', 'tomatoes.critic.rating', 'tomatoes.viewer.rating',
                    'awards.wins', 'runtime']
    const pipeline = []
    const matchPipeline = { $match: {} }
    for (const [key, value] of Object.entries(options)) {
        if (checkboxes.includes(key)) {
            matchPipeline["$match"][key] = { $in: [value] }
        }
        else if (ranges.includes(key)) {
            const values = value.split(',')
            matchPipeline["$match"][key] = { $gte: parseFloat(values[0]), $lte: parseFloat(values[1]) }
        }
        else if (key === 'type') {
            matchPipeline["$match"][key] = { $eq: value }
        }
    }
    let sortKey = "imdb.rating"
    if (ranges.includes(options.sortBy)) {
        sortKey = options.sortBy
    }
    if (!matchPipeline["$match"][sortKey]) {
        matchPipeline["$match"][sortKey] = { $gte: 0 }
    }
    const sortPipeline = { $sort: {} }
    sortPipeline["$sort"][sortKey] = parseFloat(options.sortOrder) || -1
    pipeline.push(matchPipeline)
    pipeline.push(sortPipeline)
    const page = parseInt(options.page) || 1
    pipeline.push({
        $facet: {
            movies: [
                { $skip: (page - 1) * itemsPerPage },
                { $limit: itemsPerPage },
                { $project: { _id: 1, poster: 1, title: 1 } }
            ],
            totalCount: [
                { $count: 'count' }
            ]
        }
    })
    pipeline.push({
        $project: {
            movies: '$movies',
            info: {
                totalPages: {
                    $ifNull: [
                        { $ceil: { $divide: [{ $arrayElemAt: ['$totalCount.count', 0] }, itemsPerPage] } },
                        0
                    ]
                },
                currentPage: page
            }
        }
    })
    return pipeline
}