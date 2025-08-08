import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "src/components/PaginationWrap"
import { useRouter } from "next/router"
import ErrorMessage from "src/components/ErrorMessage"
import UsersSkeleton from "src/components/UsersSkeleton"
import ListsMenu from "src/components/ListsMenu"
import ListCard from "src/components/ListCard"
import axios from "axios"

export default function UsersPage() {
  const router = useRouter()
  const search = router.query.search || ""
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lists", router.query],
    queryFn: () =>
      axios
        .get(`/api/lists?${new URLSearchParams(router.query)}`)
        .then((response) => response.data),
  })

  if (isLoading) {
    return <UsersSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const lists = data[0].lists
  const totalPages = data[0].info.totalPages

  return (
    <div className="flex flex-col justify-between">
      <ListsMenu search={search} />
      <div className="p-5 flex flex-col items-center gap-2">
        <ul
          className="flex flex-wrap w-full items-center gap-5"
          aria-label="lists"
        >
          {lists.length === 0 ? (
            <li className="h-100">
              <h1 className="font-bold text-lg">No results found</h1>
            </li>
          ) : (
            lists.map((list) => <ListCard list={list} />)
          )}
        </ul>
      </div>
      {totalPages > 1 && <PaginationWrap totalPages={totalPages} />}
    </div>
  )
}
