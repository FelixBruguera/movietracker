import { Skeleton } from "@/components/ui/skeleton"

const ReviewsSkeleton = () => {
  return (
    <div id="reviews" className="flex flex-col gap-5 my-8 lg:my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-40 lg:w-80 dark:bg-stone-600" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-20 lg:w-40 dark:bg-stone-600" />
          <Skeleton className="h-10 w-10 dark:bg-stone-600" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-15 w-50 lg:w-240 dark:bg-stone-600" />
        <Skeleton className="h-10 w-20 lg:w-40 dark:bg-stone-600" />
        <Skeleton className="h-10 w-15 dark:bg-stone-600" />
      </div>
      <div className="flex flex-col gap-5">
        <Skeleton className="h-30 w-90 lg:w-full dark:bg-stone-600" />
        <Skeleton className="h-30 w-90 lg:w-full dark:bg-stone-600" />
      </div>
    </div>
  )
}

export default ReviewsSkeleton
