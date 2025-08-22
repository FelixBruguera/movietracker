import { useRouter } from "next/router"
import ProfileHeader from "src/components/ProfileHeader"
import { useQuery } from "@tanstack/react-query"
import Diary from "src/components/Diary"
import axios from "axios"

export default function ProfileDiary() {
  const router = useRouter()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["diary", router.query],
    queryFn: () =>
      axios
        .get(`/api/users/${id}/diary?${new URLSearchParams(otherParams)}`)
        .then((response) => response.data[0]),
  })
  return (
    <div className="p-5">
      <ProfileHeader />
      <Diary />
    </div>
  )
}
