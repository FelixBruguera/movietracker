import { useRouter } from "next/router"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import ListDialog from "./ListDialog"
import MoviesMenuItem from "./MoviesMenuItem"
import { authClient } from "@/lib/auth-client.ts"
import useListDebounce from "../../hooks/useListDebounce"
import { memo, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const ListsMenu = memo(() => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  useListDebounce(searchInput)
  const { data: session } = authClient.useSession()
  const sortOptions = useMemo(() => {
    return {
      followers: "Followers",
      date: "Creation date",
      movies: "Movies",
    }
  }, [])
  useEffect(() => {
    if (router.isReady && router.query.search) {
      setSearchInput(router.query.search)
    }
  }, [router.isReady])
  const sort = router.query.sortBy || "movies"
  const filters = { "Your lists": "user", Following: "following" }
  const handleFilter = (newValue) => {
    const value = filters[newValue]
    if (router.query.filter === value) {
      const { filter, ...newQuery } = router.query
      router.push({ query: { ...newQuery, page: 1 } })
    } else {
      router.push({ query: { ...router.query, filter: value, page: 1 } })
    }
  }
  return (
    <div className="flex flex-col lg:flex-row items-center w-full px-9 gap-2 lg:gap-0">
      <div className="w-full lg:w-2/10">
        <ul className="flex w-full lg:w-fit items-center justify-evenly gap-5 lg:justify-between">
          {session &&
            Object.keys(filters).map((filter) => (
              <li key={filter}>
                <MoviesMenuItem
                  title={filter}
                  onClick={handleFilter}
                  isActive={router.query.filter === filters[filter]}
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="w-full lg:w-7/10 flex items-center justify-evenly">
        <Input
          name="search"
          className="w-3/4 border-border border-1 "
          placeholder="Search"
          type="text"
          disabled={router.query.filter === "following"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          variant="outline"
          className="dark:border-stone-600 hover:bg-stone-900 dark:hover:bg-stone-900 hover:cursor-pointer hover:text-white transition-colors"
          disabled={searchInput.length < 1}
          onClick={() => setSearchInput("")}
        >
          Clear
        </Button>
      </div>
      <div className="flex items-center justify-end w-full gap-2 lg:w-fit">
        {session && <ListDialog />}
        <SelectSortBy
          value={sort}
          selectedValue={sortOptions[sort]}
          title="Sort Lists"
          options={sortOptions}
        />
        <SortOrderToggle />
      </div>
    </div>
  )
})

export default ListsMenu
