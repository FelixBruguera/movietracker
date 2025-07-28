import { Skeleton } from "@/components/ui/skeleton"

const ListSkeleton = () => {
  const items = Array.from(Array(6).keys())
  return (
    <div className="p-5 w-9/10 mx-auto flex flex-col items-start justify-start">
      <div className="w-9/10 pb-5 flex flex-col gap-2">
        <Skeleton className="w-1/4 h-15 dark:bg-stone-600" />
        <Skeleton className="w-1/5 h-8 dark:bg-stone-600" />
        <Skeleton className="w-2/5 h-10 dark:bg-stone-600" />
      </div>
      <Skeleton className="w-1/8 h-10 dark:bg-stone-600" />
      <div className="flex items-center justify-start gap-2 w-full mx-auto mt-5">
        {items.map((item) => (
          <Skeleton className="w-1/5 h-70 dark:bg-stone-600" />
        ))}
      </div>
    </div>
  )
}

export default ListSkeleton
