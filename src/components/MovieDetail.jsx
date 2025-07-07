const MovieDetail = (props) => {
  return (
    <div
      className="h-9 text-sm max-w-80 w-fit flex items-center justify-center gap-2 py-1 px-3 
        bg-stone-600 rounded-lg group-hover:bg-red-800"
      title={props.title}
      aria-label={props.title}
    >
      {props.children}
    </div>
  )
}

export default MovieDetail
