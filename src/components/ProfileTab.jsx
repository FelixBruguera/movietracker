import { Button } from "@/components/ui/button"

const ProfileTab = ({ title, onClick, currentTab }) => {
  const activeTabCheck = currentTab === title.toLowerCase()
  const defaultTabCheck =
    title === "Reviews" && !["diary", "lists"].includes(currentTab)
  return (
    <li key={title}>
      <Button
        variant="ghost"
        className={`p-3 hover:cursor-pointer hover:text-white hover:bg-red-800 dark:hover:bg-red-800 transition-all
                ${(activeTabCheck || defaultTabCheck) && "bg-red-800 text-white"}`}
        onClick={() => onClick(title.toLowerCase())}
      >
        <h3 className="font-bold text-sm lg:text-base">{title}</h3>
      </Button>
    </li>
  )
}

export default ProfileTab
