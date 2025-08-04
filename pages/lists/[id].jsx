import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ErrorMessage from "src/components/ErrorMessage"
import ListHeading from "src/components/ListHeading"
import ListHeadingTitle from "src/components/ListHeadingTitle"
import Total from "src/components/Total"
import { Calendar, Lock } from "lucide-react"
import ListDetail from "src/components/ListDetail"
import Link from "next/link"
import { authClient } from "@/lib/auth-client.ts"
import DialogWrapper from "src/components/DialogWrapper"
import AddToList from "src/components/AddToList"
import SelectSortBy from "src/components/SelectSortBy"
import SortOrderToggle from "src/components/SortOrderToggle"
import PaginationWrap from "src/components/PaginationWrap"
import axios from "axios"
import { toast } from "sonner"
import UpdateList from "src/components/UpdateList"
import DeleteList from "src/components/DeleteList"
import ListSkeleton from "src/components/ListSkeleton"
import Head from "next/head"
import Avatar from "src/components/Avatar"
import ListMovieWithContext from "src/components/ListMovieWithContext"
import Poster from "../../src/components/Poster"

export default function ProfileIndex() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: session } = authClient.useSession()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["list", router.query],
    queryFn: () =>
      axios.get(`/api/lists/${id}?${new URLSearchParams(otherParams)}`),
  })
  const mutation = useMutation({
    mutationFn: (movieId) => axios.delete(`/api/lists/${id}/${movieId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["list"])
      toast("Succesfully removed")
    },
    onError: (error) => toast(error.response.statusText),
  })
  if (isLoading) {
    return <ListSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const list = data.data.list
  const movies = data.data.list.moviesData
  const user = data.data.userInfo[0]
  const sortOptions = { date: "Added date" }

  return (
    <div className="p-5 w-full lg:w-9/10 lg:max-w-500 mx-auto">
      <Head>
        <title>{list.name}</title>
        <meta property="og:title" content={list.name} />
      </Head>
      <div className="w-full flex items-start justify-between">
        <div className="w-9/10 flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl font-bold">{list.name}</h1>
          <div className="w-fit flex items-center gap-3">
            <Link
              href={`/users/${user._id}`}
              className="hover:text-red-800 transition-all w-fit"
            >
              <ListDetail>
                <Avatar src={user.image} size="xs" />
                <p className="flex">{user.username}</p>
              </ListDetail>
            </Link>
            <ListDetail>
              <Calendar aria-label="Created at" />
              <p className="text-stone-600 dark:text-stone-200 text-sm lg:text-base">
                {new Date(list.createdAt).toLocaleDateString()}
              </p>
            </ListDetail>
            {list.isPrivate && (
              <ListDetail>
                <Lock aria-label="Private List" title="Private List" />
              </ListDetail>
            )}
          </div>
          <p className="text-base lg:text-lg w-full text-stone-600 dark:text-stone-200 text-justify">
            {list.description}
          </p>
        </div>
        {session?.user.id === user._id && (
          <>
            <DialogWrapper
              title={`Adding to ${list.name}`}
              label="Add a movie to your list"
            >
              <AddToList listId={list._id} />
            </DialogWrapper>
            <UpdateList list={list} />
            <DeleteList list={list} />
          </>
        )}
      </div>
      <ListHeading>
        <ListHeadingTitle title="Movies">
          <Total total={data.data.info.totalMovies} label="Total Movies" />
        </ListHeadingTitle>
        <SelectSortBy
          value="date"
          selectedValue={sortOptions["date"]}
          title="Sort Movies"
          options={sortOptions}
        />
        <SortOrderToggle />
      </ListHeading>
      <ul
        className="flex flex-wrap py-2 lg:py-5 items-center justify-around lg:justify-start gap-x-0 lg:gap-x-4 gap-y-1"
        aria-label="Movies"
      >
        {movies.length > 0 &&
          movies.map((movie) =>
            session?.user.id === user._id ? (
              <ListMovieWithContext
                listName={list.name}
                movie={movie}
                mutation={mutation}
              />
            ) : (
              <li key={movie._id} className="group">
                <Link href={`/movies/${movie._id}`} className="text-center">
                  <Poster src={movie.poster} alt={movie.title} />
                </Link>
              </li>
            ),
          )}
      </ul>
      {data.data.info.totalPages > 1 && (
        <PaginationWrap totalPages={data.data.info.totalPages} />
      )}
    </div>
  )
}
