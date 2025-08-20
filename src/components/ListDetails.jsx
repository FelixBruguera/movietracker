import { Calendar, Users, Lock } from "lucide-react"
import Link from "next/link"
import { memo } from "react"
import Avatar from "src/components/Avatar"
import ListDetail from "src/components/ListDetail"

const UserLink = memo(({ user }) => {
  return (
    <Link
      href={`/users/${user._id}`}
      className="hover:text-accent transition-all w-fit"
    >
      <ListDetail>
        <Avatar src={user.image} size="xs" />
        <p className="flex">{user.username}</p>
      </ListDetail>
    </Link>
  )
})
const ListDate = memo(({ date }) => {
  return (
    <ListDetail>
      <Calendar />
      <p
        className="text-stone-600 dark:text-stone-200 text-sm lg:text-base"
        aria-label="Created at"
      >
        {date}
      </p>
    </ListDetail>
  )
})

const ListDetails = ({ user, list }) => {
  return (
    <div className="w-fit flex items-center gap-3">
      <UserLink user={user} />
      <ListDate date={new Date(list.createdAt).toLocaleDateString()} />
      <ListDetail>
        {list.isPrivate ? (
          <Lock aria-label="Private List" title="Private List" />
        ) : (
          <>
            <Users />
            <p
              className="text-stone-600 dark:text-stone-200 text-sm lg:text-base"
              aria-label="Followers"
            >
              {list.followers}
            </p>
          </>
        )}
      </ListDetail>
    </div>
  )
}

export default ListDetails
