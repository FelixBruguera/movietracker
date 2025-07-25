import Poster from "src/components/Poster.jsx"

const MovieSearchItem = ({ movie, setSelected }) => {
  return (
    <li
      key={movie._id}
      onClick={() => setSelected(movie)}
      className="flex w-full py-10 px-2 rounded-lg items-center h-2/10 gap-2 border-1 border-transparent 
            hover:dark:border-stone-700 hover:border-stone-400 hover:cursor-pointer transition-all"
    >
      <div className="size-18">
        <Poster src={movie.poster} alt={movie.title} />
      </div>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-base font-bold max-w-8/10">{movie.title}</h3>
        <p className="text-xs lg:text-sm dark:text-gray-300">
          {new Date(movie.released).getFullYear()}
        </p>
      </div>
    </li>
  )
}

export default MovieSearchItem
