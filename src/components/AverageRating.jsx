import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const AverageRating = ({ rating, color }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-col items-center justify-center">
          <p
            className={`px-3 py-1 ${color} dark:text-black font-bold rounded-lg`}
            aria-label="Average rating"
          >
            {rating}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>Average rating</TooltipContent>
    </Tooltip>
  )
}

export default AverageRating
