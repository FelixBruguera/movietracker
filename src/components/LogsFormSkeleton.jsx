import { Skeleton } from "@/components/ui/skeleton"

const LogsFormSkeleton = ({}) => {
  const items = Array.from(Array(5).keys())
  return items.map(() => (
    <Skeleton className="flex w-full py-10 px-2 rounded-lg items-center h-2/10 gap-2 border-1 border-transparent transition-all" />
  ))
}

export default LogsFormSkeleton
