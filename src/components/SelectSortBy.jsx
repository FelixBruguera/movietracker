import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDownUp } from "lucide-react"
import { useRouter } from "next/router"

const SelectSortBy = ({ value, selectedValue, title, options }) => {
  const router = useRouter()
  const onValueChange = (newValue) => {
    router.push({ query: { ...router.query, sortBy: newValue, page: 1 } }, "", {
      scroll: false,
    })
  }
  return (
    <Select value={value} onValueChange={(e) => onValueChange(e)}>
      <SelectTrigger
        className="text-xs lg:text-sm w-40 border-1 border-gray-400 bg-gray-100 dark:border-gray-700 dark:bg-stone-900"
        name={title}
        title={title}
      >
        <SelectValue>
          <ArrowDownUp />
          {selectedValue}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([key, value]) => (
          <SelectItem value={key}>{value}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectSortBy
