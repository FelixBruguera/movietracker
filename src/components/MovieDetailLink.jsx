import MovieDetail from "./MovieDetail";
import Link from "next/link";

const MovieDetailLink = (props) => {
    return (
        <Link href={props.href} title={props.title} aria-label={props.title} className="group">
            <MovieDetail>
                {props.children}
            </MovieDetail>
        </Link>
    )
}

export  default MovieDetailLink