import { Skeleton } from "@/components/ui/skeleton"

const MoviesSkeleton = () => {
    const items = Array.from(Array(10).keys())
    console.log(items)
    return (
    <div className="p-5 flex flex-wrap justify-center items-center gap-2 gap-y-2">
        { items.map((item) => (
            <Skeleton className="h-95 w-60 rounded-sm dark:bg-stone-600" />
        ))}
    </div>
    )
}

export default MoviesSkeleton