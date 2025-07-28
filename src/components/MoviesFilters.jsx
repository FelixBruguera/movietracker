import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Funnel } from "lucide-react"
import filtersData from "lib/filters.json"
import { useRouter } from "next/router"
import FiltersField from "./FiltersField"
import RangeField from "./RangeField"
import SelectWrapper from "./SelectWrapper"

const MoviesFilters = ({ handleFilter }) => {
  const router = useRouter()
  const genres = filtersData.genres
  const languages = filtersData.languages
  const types = ["All", "Movie", "Series"]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={`text-xs lg:text-sm flex items-center justify-center gap-1 hover:cursor-pointer bg-gray-100 border-gray-400 hover:bg-stone-200 dark:bg-stone-900 border-1 dark:border-gray-700 transition-all
            ${Object.keys(router.query).length > 0 ? "bg-red-800 text-white dark:bg-red-800" : null}`}
          variant="ghost"
        >
          <Funnel />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <form
          id="filters"
          className="w-9/10 mx-auto flex flex-col items-start justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const data = Object.fromEntries(formData.entries())
            return handleFilter(data)
          }}
        >
          <FiltersField labelText="Search" labelFor="search">
            <Input
              type="text"
              name="search"
              defaultValue={router.query.search || ""}
            />
          </FiltersField>
          <FiltersField labelText="Search by actor" labelFor="cast">
            <Input
              type="text"
              name="cast"
              defaultValue={router.query.cast || ""}
            />
          </FiltersField>
          <FiltersField labelText="Search by director" labelFor="directors">
            <Input
              type="text"
              name="directors"
              defaultValue={router.query.directors || ""}
            />
          </FiltersField>
          <FiltersField labelText="Genre" labelFor="genres">
            <SelectWrapper
              name="genres"
              defaultValue={router.query.genres || "All"}
              title="Genre"
              items={genres}
            />
          </FiltersField>
          <FiltersField labelText="Language" labelFor="languages">
            <SelectWrapper
              name="languages"
              defaultValue={router.query.languages || "All"}
              title="Language"
              items={languages}
            />
          </FiltersField>
          <FiltersField labelText="Type" labelFor="type">
            <SelectWrapper
              name="type"
              defaultValue={router.query.type || "All"}
              title="Type"
              items={types}
            />
          </FiltersField>
          <RangeField
            labelText="Release year"
            fieldName="released"
            min={1896}
            max={2016}
            defaultMin={router.query["released_min"] || 1896}
            defaultMax={router.query["released_max"] || 2016}
          />
          <RangeField
            labelText="IMDB Rating"
            fieldName="imdb.rating"
            min={1}
            max={10}
            defaultMin={router.query["imdb.rating_min"] || 1}
            defaultMax={router.query["imdb.rating_max"] || 10}
          />
          <RangeField
            labelText="Runtime (Minutes)"
            fieldName="runtime"
            min={1}
            max={1256}
            defaultMin={router.query["runtime_min"] || 1}
            defaultMax={router.query["runtime_max"] || 1256}
          />
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" form="filters">
              Submit
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push({ query: {} })}
            >
              Clear filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MoviesFilters
