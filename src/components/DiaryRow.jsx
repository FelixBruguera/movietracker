import Poster from "./Poster"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { format } from "date-fns"

const DiaryRow = ({ data, group }) => {
  const [year, month] = data.date.split("-")
  const date =
    group === "yearly"
      ? format(new Date(year, 1, 1), "yyyy")
      : format(new Date(year, month - 1), "MMMM u")
  return (
    <li key={data.date} className="flex items-center justify-start">
      <p className="w-1/8 font-bold text-lg">{date}</p>
      <div className="flex flex-wrap">
        {data.watched.map((movie) => (
          <Tooltip>
            <TooltipTrigger className="size-50 bg-stone-900 p-1 lg:bg-transparent rounded-t-2xl lg:size-40 lg:p-auto">
              <Link href={`/movies/${movie._id}`}>
                <Poster src={movie.poster} alt={movie.title} size="s" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col items-center justify-center">
              <p>{movie.title}</p>
              <p>{new Date(movie.date).toLocaleDateString()}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </li>
  )
}

export default DiaryRow
