import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import PaginationWrap from '../src/components/Pagination';
import { useRouter } from 'next/router';
import MoviesMenu from '../src/components/MoviesMenu';


export default function Index() {
    const router = useRouter()
    const page = router.query.page || 1
    const { data, isLoading, isError } = useQuery({
        queryKey: ['movies', router.query],
        queryFn: () => fetch(`/api/movies?${new URLSearchParams(router.query)}`).then(res => res.json())
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error</span>
    }
    const movies = data[0].movies
    const totalPages = data[0].info.totalPages

    return (
        <div>
            <MoviesMenu />
            <ul className='p-5 flex flex-wrap justify-center items-center gap-2'>
                {movies.map(movie => (
                    <li key={movie._id} className='h-100 w-60'>
                        <Link href={`/movies/${movie._id}`} className='text-center'>
                            <img src={movie.poster} alt={movie.title} title={movie.title} 
                                className='max-h-full max-w-full'/>
                        </Link>
                    </li>
                ))}
            </ul>
            <PaginationWrap router={router} totalPages={totalPages}/>
        </div>
    )
}
