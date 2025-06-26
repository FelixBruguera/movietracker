export default function moviesPipeline(options) {
    const itemsPerPage = 50
    const checkboxes = ['genres', 'languages', 'rating']
    const pipeline = []
    const matchPipeline = { $match: {} }
    for (const [key, value] of Object.entries(options)) {
        if (checkboxes.includes(key)) {
            matchPipeline["$match"][key] = { $in: [value] }
        }
        else if (key.includes('_range')) {
            const renamedKey = key.split('_')[0]
            const values = value.split(',')
            matchPipeline["$match"][renamedKey] = { $gte: parseFloat(values[0]), $lte: parseFloat(values[1]) }
        }
        else if (key === 'type') {
            matchPipeline["$match"][key] = { $eq: value }
        }
    }
    const sortKey = options.sortBy || "imdb.rating"
    if (!matchPipeline["$match"][sortKey]) {
        matchPipeline["$match"][sortKey] = { $gte: 0 }
    }
    const sortPipeline = { $sort: {} }
    sortPipeline["$sort"][sortKey] = parseFloat(options.sortOrder) || -1
    pipeline.push(matchPipeline)
    pipeline.push(sortPipeline)
    const page = options.page || 1
    pipeline.push({ $skip: (page*itemsPerPage) - itemsPerPage})
    pipeline.push({ $limit: itemsPerPage })
    pipeline.push({ $project: {_id: 1, poster: 1, title: 1}})
    return pipeline
} 