const MovieDetail = (props) => {
  return (
    <div
      className="h-9 text-xs lg:text-sm lg:max-w-80 w-fit flex items-center justify-center gap-2 py-1 px-2 lg:px-3
        shadow-sm dark:border-stone-600
        bg-zinc-200 dark:bg-stone-600 rounded-lg group-hover:bg-red-800 group-hover:dark:bg-red-800 
        group-hover:text-white transition-all"
      title={props.title}
      aria-label={props.title}
    >
      {props.children}
    </div>
  )
}

export default MovieDetail
