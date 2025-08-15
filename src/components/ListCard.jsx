import { format } from "date-fns"
import { Calendar, FilmIcon, Lock, Users } from "lucide-react"
import Link from "next/link"
import { memo } from "react"

const ListCardItem = (props) => {
  return (
    <div className="flex items-center text-sm md:text-base gap-1 text-stone-600 dark:text-stone-300 group-hover:text-stone-300 transition-colors">
      {props.children}
    </div>
  )
}

const ListCard = memo(({ list }) => {
  const date = format(new Date(list.createdAt), "MMMM u")
  return (
    <li
      key={list.id}
      className="w-9/10 mx-auto md:w-100 h-2/14 flex flex-col gap-1 border-1 rounded-lg border-stone-300 dark:border-stone-700 
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
        <p className="dark:text-stone-300 text-nowrap max-w-full overflow-hidden text-ellipsis">
          {list.description}
        </p>
        <div className="flex gap-3">
          <ListCardItem>
            <FilmIcon />
            <p aria-label="Movies">{list.movies}</p>
          </ListCardItem>
          {!list.isPrivate && (
            <ListCardItem>
              <Users />
              <p aria-label="Followers">{list.followers}</p>
            </ListCardItem>
          )}
          <ListCardItem>
            <Calendar />
            <p aria-label="Created at">{date}</p>
          </ListCardItem>
        </div>
      </Link>
    </li>
  )
})

export default ListCard
