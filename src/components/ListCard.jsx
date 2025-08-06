import { Lock, TableProperties } from "lucide-react"
import Link from "next/link"

const ListCard = ({ list }) => {
  return (
    <li
      key={list.id}
      className="w-9/10 mx-auto md:w-100 flex flex-col gap-1 border-1 rounded-lg border-stone-300 dark:border-stone-700 
            hover:bg-stone-900 hover:text-white transition-all hover:border-stone-900 group"
    >
      <Link href={`/lists/${list._id}`} className="p-5" title={list.name}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 w-full">
            <TableProperties />
            <h3 className="text-lg md:text-xl text-nowrap max-w-full overflow-hidden text-ellipsis font-bold">
              {list.name}
            </h3>
          </div>
          {list.isPrivate && <Lock aria-label="Private list" />}
        </div>
        <div className="flex items-center text-sm md:text-base text-stone-600 dark:text-stone-400 gap-1 group-hover:text-stone-400">
          <p className="text-stone-800 dark:text-stone-200 group-hover:text-stone-200">
            {list.movies}
          </p>
          {list.totalMovies === 1 ? <p>Movie</p> : <p>Movies</p>}
        </div>
        <div className="flex items-center text-sm md:text-base text-stone-600 dark:text-stone-400 gap-1 group-hover:text-stone-400">
          <p className="text-stone-800 dark:text-stone-200 group-hover:text-stone-200">
            {list.followers}
          </p>
          {list.followers === 1 ? <p>Follower</p> : <p>Followers</p>}
        </div>
        <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 group-hover:text-stone-400">
          Created on {new Date(list.createdAt).toLocaleDateString()}
        </p>
      </Link>
    </li>
  )
}

export default ListCard
