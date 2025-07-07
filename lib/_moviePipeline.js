import { ObjectId } from "mongodb"

export default function moviePipeline(options) {
    return [
    {
      $match: {
        _id: ObjectId.createFromHexString(options.movie_id),
      },
    },
    {
      $project: {
        title: 1,
        genres: 1,
        runtime: 1,
        cast: 1,
        poster: 1,
        fullplot: 1,
        languages: 1,
        released: 1,
        directors: 1,
        rated: 1,
        awards: 1,
        lastupdated: 1,
        year: 1,
        imdb: 1,
        tomatoes: 1,
        metacritic: 1,
        countries: 1,
        tomatoes: 1,
        type: 1
      },
    },
  ]
}