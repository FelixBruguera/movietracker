import { Skeleton } from "@/components/ui/skeleton"

const ListSkeleton = () => {
  const items = Array.from(Array(15).keys())
  return (
    <div className="p-5 w-9/10 mx-auto flex flex-col items-start justify-start max-w-500">
      <div className="w-9/10 pb-5 flex flex-col gap-2">
        <Skeleton className="w-3/4 lg:w-1/4 h-9 dark:bg-stone-600" />
        <Skeleton className="w-2/4 lg:w-1/5 h-8 dark:bg-stone-600" />
        <Skeleton className="w-full lg:w-3/5 h-14 dark:bg-stone-600" />
      </div>
      <Skeleton className="w-3/8 lg:w-1/8 h-10 dark:bg-stone-600" />
      <div className="flex items-center justify-start gap-1 w-full mx-auto mt-5 flex-wrap">
        {items.map((item) => (
          <Skeleton className="w-25 lg:w-50 h-40 lg:h-70 dark:bg-stone-600" />
        ))}
      </div>
    </div>
  )
}

export default ListSkeleton
