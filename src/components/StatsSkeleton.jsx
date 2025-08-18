import { Skeleton } from "@/components/ui/skeleton"

const StatsSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-screen gap-5 pt-5">
      <Skeleton className="h-1/14 w-full lg:w-100 mx-auto bg-zinc-300 dark:bg-muted" />
      <Skeleton className="h-4/10 w-full lg:w-4/10 mx-auto bg-zinc-300 dark:bg-muted" />
    </div>
  )
}

export default StatsSkeleton
