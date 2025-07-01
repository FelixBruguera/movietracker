import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react"
import { useRouter } from "next/router"

const MoviesMenu = () => {
    const router = useRouter()
    const sort = router.query.sortBy || 'imdb.rating'
    const handleSort = (newValue) => {
        router.push({ query: { ...router.query, sortBy: newValue } })
    }
    const handleSortOrder = () => {
        const newValue = router.query.sortOrder === '-1' ? 1 : -1
        router.push({ query: { ...router.query, sortOrder: newValue } })
    }
    const ratings = {'year': 'Release  year', 'imdb.rating': 'IMDB Rating', 'metacritic': 'Metacritic',
         'tomatoes.critic.rating': 'Rotten Tomatoes rating', 'tomatoes.viewer.rating': 'Rotten Tomatoes viewer rating',
                    'awards.wins': 'Awards won', 'runtime': 'Runtime'}
    return (
        <div className="flex items-center w-9/10 m-auto">
            <Button>Crime</Button>
            <Button>Drama</Button>
            <Button>Comedy</Button>
            <Select value={sort} onValueChange={(e) => handleSort(e)}>
                <SelectTrigger className='border-1 dark:border-gray-700 dark:bg-stone-900' title='Sort by'>
                    <SelectValue placeholder='IMDB Rating'>
                        <ArrowDownUp/>
                        {ratings[sort]}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(ratings).map(([key, value]) => <SelectItem value={key}>{value}</SelectItem> ) }
                </SelectContent>
            </Select>
            <Button title='Sorting order' onClick={() => handleSortOrder()}>
                { router.query.sortOrder === '-1' ? <ArrowDownWideNarrow /> : <ArrowUpWideNarrow /> }
            </Button>
        </div>
    )
}

export default MoviesMenu