import { Skeleton } from "@/components/ui/skeleton"

const UsersSkeleton = () => {
  const items = Array.from(Array(12).keys())
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center w-full">
        <span aria-hidden={true} className="w-7/10"></span>
        <div className="flex items-center justify-evenly w-full lg:w-3/10">
          <Skeleton className="h-10 w-40 dark:bg-stone-600" />
          <Skeleton className="h-10 w-10 dark:bg-stone-600" />
        </div>
      </div>
      <ul
        className="flex flex-wrap w-full items-center gap-5 mx-auto justify-evenly"
        aria-label="users"
      >
        {items.map((item) => (
          <Skeleton
            key={item}
            className="w-40 lg:w-75 h-30 rounded-sm dark:bg-stone-600"
          />
        ))}
      </ul>
    </div>
  )
}

export default UsersSkeleton
