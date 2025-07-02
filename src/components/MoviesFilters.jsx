import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Funnel } from "lucide-react"
import filtersData from "../../lib/filters.json"
import { useRouter } from "next/router"
import FiltersField from "./FiltersField"
import RangeField from "./RangeField"

const MoviesFilters = ({ handleFilter }) => {
  const router = useRouter()
  console.log(router.query)
  const genres = filtersData.genres
  const languages = filtersData.languages
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center justify-center gap-1 hover:cursor-pointer dark:bg-stone-900 border-1 border-gray-700"
          variant="ghost"
        >
          <Funnel />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
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
            <Input type="text" name="search" />
          </FiltersField>
          <FiltersField labelText="Genre" labelFor="genres">
            <Select name="genres" defaultValue={router.query.genres || "All"}>
              <SelectTrigger
                className="w-full border-1 dark:border-gray-700 dark:bg-stone-900"
                title="Genre"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FiltersField>
          <FiltersField labelText="Language" labelFor="languages">
            <Select
              name="languages"
              defaultValue={router.query.languages || "All"}
            >
              <SelectTrigger
                className="w-full border-1 dark:border-gray-700 dark:bg-stone-900"
                title="Sort by"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FiltersField>
          <FiltersField labelText="Type" labelFor="type">
            <Select name="type" defaultValue={router.query.type || "All"}>
              <SelectTrigger
                className="w-full border-1 dark:border-gray-700 dark:bg-stone-900"
                title="Type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="series">Series</SelectItem>
              </SelectContent>
            </Select>
          </FiltersField>
          <RangeField
            labelText="IMDB Rating"
            fieldName="imdb.rating"
            min={1}
            max={10}
            defaultMin={router.query["imdb.rating_min"] || 1}
            defaultMax={router.query["imdb.rating_max"] || 10}
          />
        </form>
        <SheetFooter>
          <Button type="submit" form="filters">
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MoviesFilters
