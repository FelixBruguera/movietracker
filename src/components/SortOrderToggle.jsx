import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const SortOrderToggle = () => {
  const router = useRouter()
  const isAscending = router.query.sortOrder === "1"
  const handleSortOrder = () => {
    const newValue = isAscending ? -1 : 1
    router.push(
      { query: { ...router.query, sortOrder: newValue, page: 1 } },
      "",
      { scroll: false },
    )
  }
  return (
    <Button
      title={isAscending ? "Ascending order" : "Descending order"}
      onClick={() => handleSortOrder()}
      className="bg-transparent border-1 dark:border-gray-700 border-gray-400 hover:dark:bg-red-800 hover:bg-red-800 hover:cursor-pointer group"
    >
      {isAscending ? (
        <ArrowUpWideNarrow className="!size-3.5 text-stone-900 dark:text-white group-hover:text-white transition-all" />
      ) : (
        <ArrowDownWideNarrow className="!size-3.5 text-stone-900 dark:text-white group-hover:text-white transition-all" />
      )}
    </Button>
  )
}

export default SortOrderToggle
