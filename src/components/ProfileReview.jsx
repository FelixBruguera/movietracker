import Link from "next/link"
import Poster from "./Poster"

const ProfileReview = ({ data, color }) => {
  const movieHref = `/movies/${data.movie_id}`
  return (
    <li className="flex items-center flex-col lg:flex-row" key={data._id}>
      <Link
        href={movieHref}
        className="size-50 bg-stone-900 p-1 lg:bg-transparent w-full rounded-t-2xl lg:size-40 lg:p-auto"
      >
        <Poster
          src={data.movieInfo.poster}
          alt={data.movieInfo.title}
          size="s"
        />
      </Link>
      <div
        className="lg:w-9/10 border p-4 rounded-b-lg lg:rounded-lg bg-zinc-300 dark:bg-stone-900 
            hover:border-zinc-400 dark:hover:border-stone-600 flex items-center justify-between transition-all"
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <Link
              href={movieHref}
              className="font-bold hover:text-red-800 transition-all"
            >
              {data.movieInfo?.title}
            </Link>
            <p className="text-xs lg:text-sm text-stone-600 dark:text-gray-400">
              {new Date(data.date).toLocaleDateString()}
            </p>
          </div>
          <p className="w-9/10 text-sm lg:text-base text-justify text-stone-800 dark:text-gray-200">
            {data.text}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <p
            className={`font-bold text-md ${color} px-3 py-1 dark:text-black rounded-lg`}
          >
            {data.rating}
          </p>
        </div>
      </div>
    </li>
  )
}

export default ProfileReview
