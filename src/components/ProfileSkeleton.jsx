import { Skeleton } from "@/components/ui/skeleton"
import ReviewsSkeleton from "./ReviewsSkeleton"

const ProfileSkeleton = () => {
  const items = Array.from(Array(3).keys())
  return (
    <div className="p-5">
      <div className="w-full mx-auto pb-10 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="w-1/4 h-15 dark:bg-stone-600" />
        </div>
      </div>
      <div className="flex items-center justify-evenly w-full mx-auto pb-2 lg:px-60">
        {items.map((item) => (
          <Skeleton className="w-1/6 h-10 dark:bg-stone-600" />
        ))}
      </div>
      <ReviewsSkeleton />
    </div>
  )
}

export default ProfileSkeleton
