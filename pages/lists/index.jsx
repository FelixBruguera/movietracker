import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "src/components/PaginationWrap"
import { useRouter } from "next/router"
import ListsMenu from "src/components/ListsMenu"
import axios from "axios"
import ListsCards from "src/components/ListsCards"

export default function ListsPage() {
  const router = useRouter()
  const search = router.query.search || ""
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lists", router.query],
    queryFn: () =>
      axios
        .get(`/api/lists?${new URLSearchParams(router.query)}`)
        .then((response) => response.data[0]),
  })
  console.log(data)
  const lists = data?.lists
  const totalPages = data?.info.totalPages

  return (
    <div className="flex flex-col justify-between">
      <ListsMenu search={search} />
      <ListsCards lists={lists} isLoading={isLoading} isError={isError} />
      {totalPages > 1 && <PaginationWrap totalPages={totalPages} />}
    </div>
  )
}
