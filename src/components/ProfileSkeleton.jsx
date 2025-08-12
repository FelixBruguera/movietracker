import { Skeleton } from "@/components/ui/skeleton"

const ProfileSkeleton = () => {
  const items = Array.from(Array(3).keys())
  return (
    <div>
      <div className="w-full mx-auto pb-10 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="size-25 bg-zinc-200 dark:bg-stone-600" />
          <Skeleton className="w-1/6 h-10 bg-zinc-200 dark:bg-stone-600" />
        </div>
      </div>
      <div className="flex items-center justify-evenly w-full mx-auto pb-2 lg:px-60">
        {items.map((item) => (
          <Skeleton
            key={item}
            className="w-1/10 h-9 bg-zinc-200 dark:bg-stone-600"
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileSkeleton
