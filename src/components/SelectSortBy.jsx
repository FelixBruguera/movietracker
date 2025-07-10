import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDownUp } from "lucide-react"

const SelectSortBy = ({
  value,
  selectedValue,
  onValueChange,
  title,
  options,
}) => {
  return (
    <Select value={value} onValueChange={(e) => onValueChange(e)}>
      <SelectTrigger
        className="w-40 border-1 border-gray-400 bg-gray-100 dark:border-gray-700 dark:bg-stone-900"
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
