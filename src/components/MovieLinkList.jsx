import MovieDetailLink from "./MovieDetailLink"
import MovieDetailList from "./MovieDetailsList"

const MovieLinkList = ({ title, items, param }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2 ">{title}</h2>
      <MovieDetailList>
        {items.map((item) => (
          <MovieDetailLink href={`/?${param}=${item}`} title={title}>
            {item}
          </MovieDetailLink>
        ))}
      </MovieDetailList>
    </div>
  )
}

export default MovieLinkList
