import Link from "next/link"
import Avatar from "./Avatar"
import { Calendar, MessageCircleMore } from "lucide-react"
import { format } from "date-fns"

const UserCard = ({ user }) => {
  const date = format(new Date(user.createdAt), "MMMM u")
  return (
    <li
      key={user.id}
      className="w-9/10 mx-auto md:w-75 border-1 rounded-lg border-border dark:border-stone-700 bg-transparent
            hover:bg-card dark:hover:text-white transition-colors group"
    >
      <Link href={`/users/${user._id}`} className="p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 w-full mb-1">
          <Avatar src={user.image} alt={`${user.username}'s avatar`} />
          <h3 className="text-lg md:text-xl text-nowrap max-w-7/10 md:max-w-8/10 overflow-hidden text-ellipsis font-bold">
            {user.username}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm md:text-base text-stone-600 dark:text-stone-400 gap-1">
            <MessageCircleMore />
            <p className="text-stone-800 dark:text-stone-200 font-bold">
              {user.reviews}
            </p>
          </div>
          <p className="flex items-center gap-1 text-sm md:text-base text-stone-600 dark:text-stone-400 ">
            <Calendar /> {date}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default UserCard
