export default function moviesPipeline(options) {
    const checkboxes = ['genres', 'languages', 'rating']
    const pipeline = []
    const matchPipeline = { $match: {} }
    for (const [key, value] of options) {
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
    const sortPipeline = { $sort: {} }
    sortPipeline["$sort"][options.get('sortBy') || "imdb.rating"] = parseFloat(options.get('sortOrder')) | 1
    pipeline.push(matchPipeline)
    pipeline.push(sortPipeline)
    return pipeline
} 