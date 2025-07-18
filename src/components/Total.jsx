import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Total = ({ total, label }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex flex-col items-center justify-center">
          <p
            className={`px-3 py-1 bg-zinc-300 dark:bg-stone-900 text-black dark:text-white font-bold rounded-lg`}
            aria-label={label}
          >
            {total}
          </p>
        </div>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export default Total
