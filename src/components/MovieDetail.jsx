const MovieDetail = (props) => {
  return (
    <div
      className="h-9 text-sm max-w-80 w-fit flex items-center justify-center gap-2 py-1 px-3 
        bg-zinc-300 dark:bg-stone-600 rounded-lg group-hover:bg-red-800 group-hover:dark:bg-red-800 
        group-hover:text-white"
      title={props.title}
      aria-label={props.title}
    >
      {props.children}
    </div>
  )
}

export default MovieDetail
