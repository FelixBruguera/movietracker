import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Total = ({ total, label }) => {
  if (!total || total < 1) {
    return null
  }
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-col items-center justify-center">
          <p
            className={`px-3 py-1 bg-card text-black dark:text-white font-bold rounded-lg`}
            aria-label={label}
          >
            {total}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>{<p>{label}</p>}</TooltipContent>
    </Tooltip>
  )
}

export default Total
