import { UserCircle } from "lucide-react"
import ProfileTab from "./ProfileTab"
import { useRouter } from "next/router"

const ProfileHeader = (props) => {
  const router = useRouter()
  const tabs = { Reviews: "", Diary: "diary", Lists: "lists" }
  return (
    <div className="p-5">
      <div className="w-full mx-auto pb-10 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <UserCircle className="!size-10" />
          <h1 className="font-bold text-3xl">{props.username}</h1>
        </div>
      </div>
      <ul className="flex items-center justify-evenly w-full mx-auto border-b-1 border-b-stone-300 dark:border-b-stone-700 pb-2 lg:px-60">
        {Object.entries(tabs).map(([key, value]) => (
          <ProfileTab
            title={key}
            href={`/users/${router.query.id}/${value}`}
            currentPath={router.pathname}
          />
        ))}
      </ul>
      {props.children}
    </div>
  )
}

export default ProfileHeader
