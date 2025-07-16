import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "../../src/components/PaginationWrap"
import { useRouter } from "next/router"
import ErrorMessage from "../../src/components/ErrorMessage"
import UsersMenu from "../../src/components/UsersMenu"
import UserCard from "../../src/components/UserCard"
import UsersSkeleton from "../../src/components/UsersSkeleton"

export default function UsersPage() {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", router.query],
    queryFn: () =>
      fetch(`/api/users?${new URLSearchParams(router.query)}`).then((res) =>
        res.json(),
      ),
  })

  if (isLoading) {
    return <UsersSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const users = data[0].users
  const totalPages = data[0].info.totalPages

  return (
    <div className="flex flex-col justify-between">
      <UsersMenu />
      <div className="p-5 flex flex-col items-center gap-2">
        <ul
          className="flex flex-wrap w-full items-center gap-5"
          aria-label="users"
        >
          {users.length === 0 ? (
            <li className="h-100">
              <h1 className="font-bold text-lg">No results found</h1>
            </li>
          ) : (
            users.map((user) => <UserCard user={user} />)
          )}
        </ul>
      </div>
      <PaginationWrap totalPages={totalPages} />
    </div>
  )
}
