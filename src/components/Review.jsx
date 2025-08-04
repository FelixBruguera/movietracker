import Link from "next/link"
import Avatar from "./Avatar"

const Review = ({ data, userInfo = null, color }) => {
  const user = data.userInfo || userInfo
  return (
    <li
      key={data._id}
      className="border p-4 rounded-lg bg-zinc-200 dark:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-600 flex items-start justify-between transition-all"
    >
      <Link href={`/users/${user._id}`}>
        <Avatar src={user.image} />
      </Link>
      <div className="flex items-center w-full">
        <div className="flex flex-col gap-1 w-full px-3">
          <div className="flex gap-2 items-center">
            <Link
              href={`/users/${user._id}`}
              className="font-bold hover:text-red-800 transition-all"
            >
              {user.username}
            </Link>
            <p className="text-xs lg:text-sm text-stone-600 dark:text-stone-400">
              {new Date(data.date).toLocaleDateString()}
            </p>
          </div>
          <p className="w-9/10 lg:w-full text-sm lg:text-base text-justify text-stone-800 dark:text-gray-200">
            {data.text}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <p
            className={`font-bold text-base ${color} px-3 py-1 dark:text-black rounded-lg`}
          >
            {data.rating}
          </p>
        </div>
      </div>
    </li>
  )
}

export default Review
