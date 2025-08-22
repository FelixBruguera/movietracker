import MovieDetail from "src/components/MovieDetail"

const MovieRating = ({ value, source, logo }) => {
  return (
    value && (
      <MovieDetail title={`${source} Rating`}>
        <img src={logo} alt={source} className="h-9/10 w-full" />
        {value}
      </MovieDetail>
    )
  )
}

export default MovieRating
