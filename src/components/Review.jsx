import Link from "next/link"

const Review = ({ data, userInfo = null, color }) => {
  const user = data.userInfo || userInfo
  console.log(user)
  return (
    <li
      key={data._id}
      className="border p-4 rounded-lg bg-zinc-200 dark:bg-stone-900 hover:border-gray-400 dark:hover:border-stone-600 flex items-center justify-between transition-all"
    >
      <div className="flex flex-col gap-1 w-9/10">
        <div className="flex gap-2 items-center">
          <Link
            href={`/users/${user._id}`}
            className="font-bold hover:text-red-800 transition-all"
          >
            {user.username}
          </Link>
          <p className="text-xs lg:text-sm text-stone-600 dark:text-gray-400">
            {new Date(data.date).toLocaleDateString()}
          </p>
        </div>
        <p className="w-9/10 lg:w-full text-sm lg:text-base text-justify text-stone-800 dark:text-gray-200">
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
    </li>
  )
}

export default Review
