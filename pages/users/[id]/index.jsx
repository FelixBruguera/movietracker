import { useRouter } from "next/router"
import ProfileHeader from "../../../src/components/ProfileHeader"
import ProfileReviews from "../../../src/components/ProfileReviews"
import { useQuery } from "@tanstack/react-query"
import ErrorMessage from "../../../src/components/ErrorMessage"

export default function ProfileIndex() {
  const router = useRouter()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", router.query],
    queryFn: () =>
      fetch(`/api/users/${id}?${new URLSearchParams(otherParams)}`)
        .then((res) => res.json())
        .then((data) => data[0]),
  })
  if (isLoading) {
    return <div className="flex flex-col justify-between"></div>
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <ProfileHeader username={data.user.username}>
      <ProfileReviews data={data} sortKey={otherParams.sortBy} />
    </ProfileHeader>
  )
}
