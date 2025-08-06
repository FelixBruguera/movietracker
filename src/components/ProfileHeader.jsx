import ProfileTab from "./ProfileTab"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "./Avatar"

const ProfileHeader = (props) => {
  const router = useRouter()
  const tabs = { Reviews: "", Diary: "diary", Lists: "lists" }
  return (
    <div className="p-5">
      <Head>
        <title>{props.username}</title>
        <meta property="og:title" content={props.username} />
      </Head>
      <div className="w-full mx-auto pb-10 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-3">
          <Avatar
            src={props.image}
            alt={`${props.username}'s avatar`}
            size="large"
          />
          <h1 className="font-bold text-3xl">{props.username}</h1>
        </div>
      </div>
      <ul className="flex items-center justify-evenly w-full mx-auto border-b-1 border-b-stone-300 dark:border-b-stone-700 pb-2 lg:px-60">
        {Object.entries(tabs).map(([key, value]) => (
          <ProfileTab
            key={key}
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
