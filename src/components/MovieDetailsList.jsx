const MovieDetailsList = (props) => {
    return (
        <div className="flex gap-3 items-center justify-start flex-wrap">
            {props.children}
        </div>
    )
}

export default MovieDetailsList