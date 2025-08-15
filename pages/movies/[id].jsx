import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import MovieSkeleton from "src/components/MovieSkeleton"
import { Calendar, Clock4, LibraryBig, Trophy } from "lucide-react"
import MovieDetail from "src/components/MovieDetail"
import MovieDetailLink from "src/components/MovieDetailLink"
import MovieDetailsList from "src/components/MovieDetailsList"
import Reviews from "src/components/Reviews"
import MovieLinkList from "src/components/MovieLinkList"
import Poster from "src/components/Poster"
import ErrorMessage from "src/components/ErrorMessage"
import LogManager from "src/components/LogManager"
import { authClient } from "@/lib/auth-client.ts"
import NewLog from "src/components/NewLog"
import DialogWrapper from "src/components/DialogWrapper"
import MovieDescription from "../../src/components/MovieDescription"
import Head from "next/head"
import axios from "axios"

export default function MoviePage() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = authClient.useSession()

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () =>
      axios.get(`/api/movies/${id}`).then((response) => response.data),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col justify-between">
        <MovieSkeleton />
      </div>
    )
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <div className="mx-auto p-4">
      <Head>
        <title>{movie.title}</title>
        <meta property="og:title" content={movie.title} />
      </Head>
      <div className="flex flex-col lg:flex-row gap-8 max-w-400">
        <div className="w-3/4 mx-auto lg:w-1/3">
          <Poster src={movie.poster} alt={movie.title} size="large" />
        </div>
        <div className="w-full lg:w-2/3 flex flex-col gap-3">
          <div className="flex items-center justify-between w-full lg:w-11/12">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2 mx-3 lg:mx-0">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 lg:gap-2">
              {session && (
                <>
                  <LogManager movie={movie} />
                  <DialogWrapper
                    title="New log"
                    label="Add a new log"
                    movie={movie}
                  >
                    <NewLog />
                  </DialogWrapper>
                </>
              )}
            </div>
          </div>
          <MovieDetailsList>
            <MovieDetail title="Release year">
              <Calendar />
              {movie.year}
            </MovieDetail>
            <MovieDetail title="Runtime">
              <Clock4 />
              {movie.runtime} minutes
            </MovieDetail>
            <MovieDetail title="IMDB Rating">
              <img src="/imdb.png" alt="IMDB" className="h-9/10 w-full" />
              {movie.imdb.rating}
            </MovieDetail>
            {movie.tomatoes?.critic?.rating && (
              <MovieDetail title="Rotten Tomatoes Rating">
                <img
                  src="/tomatoes.png"
                  alt="Rotten Tomatoes"
                  className="h-9/10 w-full"
                />
                {movie.tomatoes.critic.rating}
              </MovieDetail>
            )}
            {movie.metacritic && (
              <MovieDetail title="Metacritic Rating">
                <img
                  src="/metacritic.png"
                  alt="Metacritic"
                  className="h-9/10 w-full"
                />
                {movie.metacritic}
              </MovieDetail>
            )}
            <MovieDetail title="Awards">
              <Trophy fill="goldenrod" color="goldenrod" />
              {movie.awards.wins} Awards
            </MovieDetail>
            {movie.genres?.map((genre) => (
              <MovieDetailLink href={`/?genres=${genre}`}>
                <LibraryBig />
                {genre}
              </MovieDetailLink>
            ))}
          </MovieDetailsList>
          <div className="flex flex-col items-start gap-3 text-base text-slate-800 dark:text-stone-300 text-justify w-9/10 my-1 mx-3 lg:mx-0">
            {movie.fullplot?.length > 1000 ? (
              <MovieDescription description={movie.fullplot} />
            ) : (
              <p>{movie.fullplot}</p>
            )}
          </div>
          {movie.cast?.length > 0 && (
            <MovieLinkList title="Cast" items={movie.cast} param="cast" />
          )}
          {movie.directors?.length > 0 && (
            <MovieLinkList
              title="Directors"
              items={movie.directors}
              param="directors"
            />
          )}
        </div>
      </div>
      <Reviews />
    </div>
  )
}
