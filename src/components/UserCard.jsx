import { UserCircle } from "lucide-react"
import Link from "next/link"

const UserCard = ({ user }) => {
  return (
    <li
      key={user.id}
      className="w-9/10 mx-auto md:w-75 flex flex-col gap-1 border-1 rounded-lg border-stone-300 dark:border-stone-700 
            hover:bg-stone-900 hover:text-white transition-all hover:border-stone-900 group"
    >
      <Link href={`/users/${user._id}`} className="p-5">
        <div className="flex items-center gap-1">
          <UserCircle className="!size-7" />
          <h3 className="text-lg md:text-xl text-nowrap max-w-7/10 md:max-w-8/10 overflow-hidden text-ellipsis font-bold">
            {user.username}
          </h3>
        </div>
        <div className="flex items-center text-sm md:text-base text-stone-600 dark:text-stone-400 gap-1 group-hover:text-stone-400">
          <p className="text-stone-800 dark:text-stone-200 group-hover:text-stone-200">
            {user.userReviews}
          </p>
          {user.userReviews === 1 ? <p>Review</p> : <p>Reviews</p>}
        </div>
        <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 group-hover:text-stone-400">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </Link>
    </li>
  )
}

export default UserCard
