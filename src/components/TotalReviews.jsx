import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const TotalReviews = ({ total }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-col items-center justify-center">
          <p
            className={`px-3 py-1 bg-zinc-300 dark:bg-stone-900 text-black dark:text-white font-bold rounded-lg`}
            aria-label="Total Reviews"
          >
            {total}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>Total Reviews</TooltipContent>
    </Tooltip>
  )
}

export default TotalReviews
