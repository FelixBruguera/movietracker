import { useRouter } from "next/router"
import ProfileHeader from "src/components/ProfileHeader"
import { useQuery } from "@tanstack/react-query"
import ErrorMessage from "src/components/ErrorMessage"
import ProfileSkeleton from "src/components/ProfileSkeleton"
import ProfileLists from "../../../src/components/ProfileLists"

export default function ProfileDiary() {
  const router = useRouter()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["diary", router.query],
    queryFn: () =>
      fetch(`/api/users/${id}/lists?${new URLSearchParams(otherParams)}`)
        .then((res) => res.json())
        .then((data) => data[0]),
  })
  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <ProfileHeader username={data.user.username}>
      <ProfileLists data={data} />
    </ProfileHeader>
  )
}
