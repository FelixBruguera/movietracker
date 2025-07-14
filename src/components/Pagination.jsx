import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"

const PaginationWrap = ({ router, totalPages }) => {
  const page = parseInt(router.query.page) || 1
  const handleChange = (newPage) => {
    router.push({ query: { ...router.query, page: newPage } })
  }
  return (
    <Pagination className="p-2">
      <PaginationContent className="gap-10">
        <PaginationItem>
          <PaginationPrevious
            className={`hover:bg-stone-900 dark:hover:bg-stone-950 hover:text-white ${page <= 1 ? "pointer-events-none" : "pointer-events-auto"}`}
            href=""
            onClick={(e) => {
              e.preventDefault()
              handleChange(page - 1)
            }}
            ariaDisabled={page <= 1}
            tabIndex={page <= 1 ? 1 : 0}
          />
        </PaginationItem>
        <form
          className="flex items-center justify-center gap-3 h-full"
          onSubmit={(e) => {
            e.preventDefault()
            handleChange(e.target.page.value)
          }}
        >
          <span className="flex h-8/10 items-center justify-center gap-1">
            <input
              key={page}
              type="number"
              defaultValue={page}
              min={1}
              max={totalPages}
              name="page"
              className="w-13 h-full border-1 dark:border-gray-500 border-gray-400 rounded-md px-1"
            />
            <p>of {totalPages}</p>
          </span>
          <Button
            className="h-8/10 w-fit px-3 bg-stone-800 hover:bg-red-800 hover:cursor-pointer dark:bg-gray-300 dark:hover:bg-red-800 dark:hover:text-white transition-all"
            type="submit"
          >
            Go
          </Button>
        </form>
        <PaginationItem>
          <PaginationNext
            className={`hover:bg-stone-900 dark:hover:bg-stone-950 hover:text-white ${page >= totalPages ? "pointer-events-none" : "pointer-events-auto"}`}
            href=""
            onClick={(e) => {
              e.preventDefault()
              handleChange(page + 1)
            }}
            ariaDisabled={page >= totalPages}
            tabIndex={page >= totalPages ? 1 : 0}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationWrap
