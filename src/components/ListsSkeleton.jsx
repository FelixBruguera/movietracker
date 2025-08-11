import { Skeleton } from "@/components/ui/skeleton"

const ListsSkeleton = () => {
  const items = Array.from(Array(15).keys())
  return (
    <div className="flex flex-col gap-5 mt-5">
      <ul
        className="flex flex-wrap w-full items-center gap-5 mx-auto justify-evenly"
        aria-label="users"
      >
        {items.map((item) => (
          <Skeleton
            key={item}
            className="w-40 lg:w-100 h-25 rounded-sm dark:bg-stone-600"
          />
        ))}
      </ul>
    </div>
  )
}

export default ListsSkeleton
