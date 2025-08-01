import Poster from "./Poster"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { format } from "date-fns"


const DiaryRow = ({ data, group }) => {
  const date =
    group === "yearly"
      ? format(new Date(data.date, 1, 1), "yyyy")
      : format(new Date(data.date[0], data.date[1] - 1), "MMMM u")
  return (
    <li
      key={data.date}
      className="flex flex-col items-center justify-start group"
    >
      <p className="my-3 p-1 w-full text-center font-bold text-lg lg:text-xl border-b-1 border-stone-300 dark:border-stone-700">
        {date}
      </p>
      <div className="flex flex-wrap w-full items-center justify-start gap-1 lg:gap-5">
        {data.watched.map((movie) => (
          <Tooltip>
            <TooltipTrigger className="lg:bg-transparent rounded-t-2xl">
              <Link href={`/movies/${movie._id}`}>
                <Poster src={movie.poster} alt={movie.title} size="small" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col items-center justify-center">
              <p>{movie.title}</p>
              <p>{movie.date.split("T")[0]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </li>
  )
}

export default DiaryRow
