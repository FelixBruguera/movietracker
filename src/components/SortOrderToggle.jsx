import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"
import { Button } from "@/components/ui/button"

const SortOrderToggle = ({ isAscending, onClick }) => {
    return (
        <Button
          title={
            isAscending
              ? "Ascending order"
              : "Descending order"
          }
          onClick={() => onClick()}
          className="bg-trasnparent border-1 dark:border-gray-700 hover:dark:bg-red-800 hover:cursor-pointer"
        >
          {isAscending ? (
            <ArrowUpWideNarrow color="white" />
          ) : (
            <ArrowDownWideNarrow color="white" />
          )}
        </Button>
    )
}

export default SortOrderToggle