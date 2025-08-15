import { Skeleton } from "@/components/ui/skeleton"

const ListsSkeleton = () => {
  const items = Array.from(Array(30).keys())
  return (
    <div className="flex flex-col gap-5 mt-5">
      <ul
        className="flex flex-wrap w-full items-center gap-5 mx-auto justify-evenly"
        aria-label="users"
      >
        {items.map((item) => (
          <Skeleton
            key={item}
            className="w-9/10 lg:w-100 h-30 lg:h-25 rounded-sm bg-zinc-200 dark:bg-stone-600"
          />
        ))}
      </ul>
    </div>
  )
}

export default ListsSkeleton
