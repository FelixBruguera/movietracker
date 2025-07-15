import { Skeleton } from "@/components/ui/skeleton"
import MovieDetailsList from "./MovieDetailsList"

const MovieSkeleton = () => {
  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <Skeleton className="h-100 lg:h-130 w-60 lg:w-110 mx-auto lg:mx-0 rounded-sm bg-zinc-300 dark:bg-stone-600" />
        <div className="w-full md:w-2/3 flex flex-col gap-3">
          <Skeleton className="h-10 w-90 lg:w-150 rounded-sm bg-zinc-300 dark:bg-stone-600 p-2" />
          <MovieDetailsList>
            <Skeleton className="h-10 w-20 rounded-sm bg-zinc-300 dark:bg-stone-600" />
            <Skeleton className="h-10 w-20 rounded-sm bg-zinc-300 dark:bg-stone-600" />
            <Skeleton className="h-10 w-20 rounded-sm bg-zinc-300 dark:bg-stone-600" />
            <Skeleton className="h-10 w-20 rounded-sm bg-zinc-300 dark:bg-stone-600" />
          </MovieDetailsList>
          <Skeleton className="h-40 w-90 lg:w-150 rounded-sm bg-zinc-300 dark:bg-stone-600" />
        </div>
      </div>
    </div>
  )
}

export default MovieSkeleton
