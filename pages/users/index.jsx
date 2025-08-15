import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "src/components/PaginationWrap"
import { useRouter } from "next/router"
import UsersMenu from "src/components/UsersMenu"
import UserCard from "src/components/UserCard"
import axios from "axios"
import ItemsGrid from "src/components/ItemsGrid"

export default function UsersPage() {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", router.query],
    queryFn: () =>
      axios
        .get(`/api/users?${new URLSearchParams(router.query)}`)
        .then((response) => response.data[0]),
  })
  const users = data?.users
  const totalPages = data?.info.totalPages

  return (
    <div className="flex flex-col justify-between">
      <UsersMenu />
      <ItemsGrid
        items={users}
        isLoading={isLoading}
        isError={isError}
        ariaLabel={"users"}
        renderItem={(user) => <UserCard user={user} />}
      />
      <PaginationWrap totalPages={totalPages} />
    </div>
  )
}
