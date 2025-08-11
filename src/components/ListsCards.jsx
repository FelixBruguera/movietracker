import ListCard from "./ListCard"
import ListsSkeleton from "./ListsSkeleton"
import ErrorMessage from "./ErrorMessage"

const ListsCards = ({ lists, isLoading, isError }) => {
  if (isLoading) {
    return <ListsSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <div className="p-5 flex flex-col items-center gap-2">
      <ul
        className="flex flex-wrap w-full items-center gap-5"
        aria-label="lists"
      >
        {lists.length === 0 ? (
          <li className="h-100 w-full text-center mt-5">
            <h1 className="font-bold text-lg">No results found</h1>
          </li>
        ) : (
          lists.map((list) => <ListCard list={list} />)
        )}
      </ul>
    </div>
  )
}

export default ListsCards
