import { Skeleton } from "@/components/ui/skeleton"

const MoviesSkeleton = () => {
  const items = Array.from(Array(10).keys())
  return (
    <div className="p-5 flex flex-wrap justify-center items-center gap-2 gap-y-2">
      {items.map((item) => (
        <Skeleton
          key={item}
          className="h-65 w-42 lg:h-95 lg:w-60 rounded-sm bg-zinc-300 dark:bg-stone-600"
        />
      ))}
    </div>
  )
}

export default MoviesSkeleton
