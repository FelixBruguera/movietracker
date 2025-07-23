import { X } from "lucide-react"
import Poster from "./Poster"
import { Label } from "@/components/ui/label"

const SelectedMovie = ({ movie, unselect }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <Label className="text-stone-600 dark:text-stone-400">Movie</Label>
      <div className="w-full lg:w-fit flex gap-3 items-center h-10/10 border-1 border-stone-400 dark:border-stone-700 rounded-lg p-3 hover:border-stone-900 transition-all">
        <div className="flex w-full items-center h-2/10 gap-2">
          <div className="size-18">
            <Poster src={movie.poster} alt={movie.title} />
          </div>
          <div className="flex justify-between items-center w-full">
            <h3 className="text-sm lg:text-base">{movie.title}</h3>
            <p className="text-xs lg:text-sm dark:text-stone-300">
              {new Date(movie.released).getFullYear()}
            </p>
          </div>
        </div>
        <X
          className="hover:text-red-800 hover:cursor-pointer"
          onClick={() => unselect()}
        />
      </div>
    </div>
  )
}

export default SelectedMovie
