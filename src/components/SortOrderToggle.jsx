import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"
import { Button } from "@/components/ui/button"

const SortOrderToggle = ({ isAscending, onClick }) => {
  return (
    <Button
      title={isAscending ? "Ascending order" : "Descending order"}
      onClick={() => onClick()}
      className="bg-trasnparent border-1 dark:border-gray-700 border-gray-400 hover:dark:bg-red-800 hover:bg-red-800 hover:cursor-pointer group"
    >
      {isAscending ? (
        <ArrowUpWideNarrow className=" text-stone-900 dark:text-white group-hover:text-white transition-all" />
      ) : (
        <ArrowDownWideNarrow className="text-stone-900 dark:text-white group-hover:text-white transition-all" />
      )}
    </Button>
  )
}

export default SortOrderToggle
