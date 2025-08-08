import { Calendar, FilmIcon, Lock, TableProperties, Users } from "lucide-react"
import Link from "next/link"

const ListCard = ({ list }) => {
  return (
    <li
      key={list.id}
      className="w-9/10 mx-auto md:w-100 flex flex-col gap-1 border-1 rounded-lg border-stone-300 dark:border-stone-700 
            hover:bg-stone-900 hover:text-white transition-colors hover:border-stone-900 group"
    >
      <Link
        href={`/lists/${list._id}`}
        className="p-4 flex flex-col gap-2"
        title={list.name}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 w-full">
            <h3 className="text-lg md:text-xl text-nowrap max-w-full overflow-hidden text-ellipsis font-bold">
              {list.name}
            </h3>
          </div>
          {list.isPrivate && <Lock aria-label="Private list" />}
        </div>
        <div className="flex gap-3">
          <div className="flex items-center text-sm md:text-base gap-1">
            <FilmIcon />
            <p
              className="text-stone-800 dark:text-stone-200 group-hover:text-stone-200"
              aria-label="Movies"
            >
              {list.movies}
            </p>
          </div>
          {!list.isPrivate && (
            <div className="flex items-center text-sm md:text-base gap-1">
              <Users />
              <p
                className="text-stone-800 dark:text-stone-200 group-hover:text-stone-200"
                aria-label="Followers"
              >
                {list.followers}
              </p>
            </div>
          )}
          <div className="flex items-center text-sm md:text-base gap-1">
            <Calendar />
            <p
              className="text-sm md:text-base text-stone-600 dark:text-stone-400 group-hover:text-stone-400"
              aria-label="Created at"
            >
              {new Date(list.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ListCard
