import Poster from "src/components/Poster.jsx"

const MovieSearchItem = ({ movie, setSelected }) => {
  return (
    <li
      key={movie._id}
      onClick={() => setSelected(movie)}
      className="flex w-full px-2 rounded-lg items-center h-2/4 gap-2 border-transparent border-1
            hover:dark:border-border group hover:border-stone-400 hover:cursor-pointer transition-all"
    >
      <Poster src={movie.poster} alt={movie.title} size="xs" />
      <div className="flex justify-between items-center w-full">
        <h3 className="text-base font-bold max-w-8/10 group-hover:text-accent transition-all">
          {movie.title}
        </h3>
        <p className="text-xs lg:text-sm dark:text-gray-300">
          {new Date(movie.released).getFullYear()}
        </p>
      </div>
    </li>
  )
}

export default MovieSearchItem
