import { Skeleton } from "@/components/ui/skeleton"

const ProfileListSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 my-8 lg:my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-40 lg:w-40 bg-zinc-300 dark:bg-stone-600" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-10 w-20 lg:w-40 bg-zinc-300 dark:bg-stone-600" />
          <Skeleton className="h-10 w-10 bg-zinc-300 dark:bg-stone-600" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 h-screen flex-wrap">
        <Skeleton className="h-2/14 w-full lg:w-100 mx-auto bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-2/14 w-full lg:w-100 mx-auto bg-zinc-300 dark:bg-stone-600" />
        <Skeleton className="h-2/14 w-full lg:w-100 mx-auto bg-zinc-300 dark:bg-stone-600" />
      </div>
    </div>
  )
}

export default ProfileListSkeleton
