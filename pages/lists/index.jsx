import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "src/components/PaginationWrap"
import { useRouter } from "next/router"
import ListsMenu from "src/components/ListsMenu"
import axios from "axios"
import ItemsGrid from "src/components/ItemsGrid"
import ListCard from "src/components/ListCard"

export default function ListsPage() {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lists", router.query],
    queryFn: () =>
      axios
        .get(`/api/lists?${new URLSearchParams(router.query)}`)
        .then((response) => response.data[0]),
  })
  const lists = data?.lists
  const totalPages = data?.info.totalPages

  return (
    <div className="flex flex-col justify-between">
      <ListsMenu />
      <ItemsGrid
        items={lists}
        isLoading={isLoading}
        isError={isError}
        ariaLabel={"lists"}
        renderItem={(list) => <ListCard list={list} />}
      />
      {totalPages > 1 && <PaginationWrap totalPages={totalPages} />}
    </div>
  )
}
