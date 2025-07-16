import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ErrorMessage from "../../src/components/ErrorMessage"
import { UserCircle } from "lucide-react"
import ProfileTab from "../../src/components/ProfileTab"
import ProfileReviews from "../../src/components/ProfileReviews"
import Diary from "../../src/components/Diary"
import ProfileLists from "../../src/components/ProfileLists"

export default function UserPage() {
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

  const tabs = ["Reviews", "Diary", "Lists"]
  const currentTab = otherParams.tab
  const handleTabChange = (newTab) =>
    router.push({ query: { ...router.query, tab: newTab } })
  return (
    <div className="p-5">
      <div className="w-full mx-auto pb-10 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <UserCircle size={48} />
          <h1 className="font-bold text-3xl">{data.user.username}</h1>
        </div>
      </div>
      <ul className="flex items-center justify-evenly w-full mx-auto border-b-1 border-b-stone-700 pb-2 lg:px-60">
        {tabs.map((tab) => (
          <ProfileTab
            title={tab}
            onClick={handleTabChange}
            currentTab={currentTab}
          />
        ))}
      </ul>
      {currentTab === "diary" ? (
        <Diary data={data} params={otherParams} />
      ) : currentTab === "lists" ? (
        <ProfileLists data={data} params={otherParams} />
      ) : (
        <ProfileReviews data={data} params={otherParams} />
      )}
    </div>
  )
}
