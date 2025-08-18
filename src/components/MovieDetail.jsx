const MovieDetail = (props) => {
  return (
    <div
      className="h-9 text-xs lg:text-sm lg:max-w-80 w-fit flex items-center justify-center gap-2 py-1 px-2 lg:px-3
        shadow-sm bg-muted dark:bg-muted rounded-lg group-hover:bg-accent dark:group-hover:bg-accent group-hover:text-white transition-colors"
      title={props.title}
      aria-label={props.title}
    >
      {props.children}
    </div>
  )
}

export default MovieDetail
