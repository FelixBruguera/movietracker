import { Skeleton } from "@/components/ui/skeleton"

const DiarySkeleton = () => {
  return (
    <div className="flex flex-col gap-5 my-8 lg:my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-40 lg:w-80 bg-zinc-300 dark:bg-stone-600" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-10 w-20 lg:w-40 bg-zinc-300 dark:bg-stone-600" />
          <Skeleton className="h-10 w-10 bg-zinc-300 dark:bg-stone-600" />
        </div>
      </div>
      <Skeleton className="h-10 w-50 mx-auto bg-zinc-300 dark:bg-stone-600" />
      <div className="flex gap-5">
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
      </div>
      <Skeleton className="h-10 w-50 mx-auto bg-zinc-300 dark:bg-stone-600" />
      <div className="flex gap-5">
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-50 w-35 bg-zinc-300 dark:bg-stone-600" />
      </div>
    </div>
  )
}

export default DiarySkeleton
