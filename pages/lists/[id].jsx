import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ErrorMessage from "src/components/ErrorMessage"
import ListHeading from "src/components/ListHeading"
import ListHeadingTitle from "src/components/ListHeadingTitle"
import Total from "src/components/Total"
import { Calendar, Trash, UserCircle } from "lucide-react"
import ListDetail from "src/components/ListDetail"
import Link from "next/link"
import { authClient } from "@/lib/auth-client.ts"
import DialogWrapper from "src/components/DialogWrapper"
import AddToList from "src/components/AddToList"
import Poster from "src/components/Poster"
import SelectSortBy from "src/components/SelectSortBy"
import SortOrderToggle from "src/components/SortOrderToggle"
import PaginationWrap from "src/components/PaginationWrap"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Remove from "src/components/Remove"
import axios from "axios"
import { toast } from "sonner"

export default function ProfileIndex() {
  const router = useRouter()
  const queryClient = useQueryClient()
    const { data: session } = authClient.useSession()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["list", router.query],
    queryFn: () =>
      axios.get(`/api/lists/${id}?${new URLSearchParams(otherParams)}`)
  })
  const mutation = useMutation({
    mutationFn: (movieId) => axios.delete(`/api/lists/${id}/${movieId}`),
    onSuccess: () => {
        queryClient.invalidateQueries(['list'])
        toast('Succesfully removed')
    },
    onError: (error) => toast(error.response.statusText)
  })
  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <ErrorMessage />
  }
  const list = data.data.list
  const movies = data.data.list.movies
  const user = data.data.userInfo[0]
  const sortOptions = {'date': 'Added date'}


  return (
    <div className="p-5 w-9/10 mx-auto">
        <div className="w-full flex items-start justify-between">
            <div className="w-9/10 flex flex-col gap-2">
                <h1 className="text-3xl font-bold">{list.name}</h1>
                <div className="w-fit flex items-center gap-3">
                <Link href={`/users/${user._id}`} className="hover:text-red-800 transition-all">
                    <ListDetail>
                            <UserCircle size={20}/>
                            <p className="text-lg">{user.username}</p>
                    </ListDetail>
                </Link>
                <ListDetail>
                    <Calendar size={20}/>
                    <p className="text-base text-stone-200">{new Date(list.createdAt).toLocaleDateString()}</p>
                </ListDetail>
            </div>
                <p className="text-lg text-stone-200 text-justify">{list.description}</p>
            </div>
            {session?.user.id === user._id && 
            (
            <DialogWrapper title={`Adding to ${list.name}`} label='Add a movie to your list'>
                <AddToList listId={list._id} />
            </DialogWrapper>
        )}
        </div>
        <ListHeading>
            <ListHeadingTitle title='Movies'>
                <Total total={data.data.info.totalMovies} label='Total Movies'/>
            </ListHeadingTitle>
            <SelectSortBy
            value='date'
            selectedValue={sortOptions['date']}
            title="Sort Movies"
            options={sortOptions}
            />
            <SortOrderToggle />
        </ListHeading>
        <ul className="flex flex-wrap py-5 items-center justify-evenly gap-y-1" aria-label="Movies">
            { movies.length > 0 && movies.map(movie => {
                return (
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <li key={movie._id} className="relative h-40 lg:h-71 w-28 lg:w-47 group">
                                <Link href={`/movies/${movie._id}`} className="text-center">
                                    <Poster src={movie.poster} alt={movie.title} />
                                </Link>
                            </li>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem asChild>
                                <Remove title={`Removing ${movie.title} from ${list.name}`} mutation={() => mutation.mutate(movie._id)} className='w-full dark:hover:bg-stone-900 hover:cursor-pointer'>
                                    <div className="flex items-center text-sm dark:text-stone-300 gap-2">
                                        <Trash size={16}/>
                                        Remove
                                    </div>
                                </Remove>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                )
            })}
        </ul>
        {data.data.info.totalPages > 1 && <PaginationWrap totalPages={data.data.info.totalPages} /> }
    </div>
  )
}
