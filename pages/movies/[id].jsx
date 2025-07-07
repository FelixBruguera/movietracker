import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import MoviesSkeleton from "../../src/components/MoviesSkeleton"
import { Calendar, Clock4, LibraryBig, Trophy } from "lucide-react"
import MovieDetail from "../../src/components/MovieDetail"
import MovieDetailLink from "../../src/components/MovieDetailLink"
import MovieDetailsList from "../../src/components/MovieDetailsList"
import Reviews from "../../src/components/Reviews"

export default function MoviePage() {
  const router = useRouter()
  console.log(router)
  const { id } = router.query

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetch(`/api/movies/${id}`).then((res) => res.json()),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col justify-between">
        <MoviesSkeleton />
      </div>
    )
  }

  if (isError) {
    return <span>Error loading movie details.</span>
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-lg shadow-lg size-screen"
            priority
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <MovieDetailsList>
            <MovieDetail title='Release year'> <Calendar size={20}/>{movie.year}</MovieDetail>
            <MovieDetail title='Runtime'><Clock4 size={20} />{movie.runtime} minutes</MovieDetail>
            <MovieDetail title='IMDB Rating'>
                <img src="/imdb.png" alt="IMDB" className="h-9/10 w-full" />
                {movie.imdb.rating}
            </MovieDetail>
            { movie.tomatoes?.critic?.rating &&
            <MovieDetail title='Rotten Tomatoes Rating'>
                <img src="/tomatoes.png" alt="Rotten Tomatoes" className="h-9/10 w-full" />
                {movie.tomatoes.critic.rating}
            </MovieDetail>
            }
            { movie.metacritic &&
            <MovieDetail title='Metacritic Rating'>
                <img src="/metacritic.png" alt="Metacritic" className="h-9/10 w-full" />
                {movie.metacritic}
            </MovieDetail>
            }
            <MovieDetail title='Awards'><Trophy size={20} fill='goldenrod' color="goldenrod" />{movie.awards.wins} Awards</MovieDetail>
            { movie.genres?.map(genre => <MovieDetailLink href={`/?genres=${genre}`}><LibraryBig />{genre}</MovieDetailLink>)}
          </MovieDetailsList>
          <p className="text-md text-stone-300 text-justify w-9/10">{movie.fullplot}</p>
          
        { movie.cast?.length > 0 &&          
            <div>
                <h2 className="text-2xl font-semibold mb-2">Cast</h2>
                <MovieDetailsList>
                    { movie.cast?.map(actor => <MovieDetailLink href={`/?cast=${actor}`}>{actor}</MovieDetailLink>)}
                </MovieDetailsList>
            </div>
          }
        { movie.directors?.length > 0 && 
            <div>
                <h2 className="text-2xl font-semibold mb-2">Directors</h2>
                <MovieDetailsList>
                    { movie.directors?.map(director => <MovieDetailLink href={`/?directors=${director}`}>{director}</MovieDetailLink>)}
                </MovieDetailsList>
             </div>
          }
        </div>
      </div>
    <Reviews />
    </div>
    
  )
}
