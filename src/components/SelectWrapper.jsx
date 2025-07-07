import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectWrapper = ({ name, defaultValue, title, items, className }) => {
  return (
    <Select name={name} defaultValue={defaultValue}>
      <SelectTrigger
        className={`w-full border-1 dark:border-gray-700 dark:bg-stone-900 ${className}`}
        title={title}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectWrapper
