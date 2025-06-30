import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const PaginationWrap = ({ router, totalPages }) => {
    const page = router.query.page || 1
    const handleClick = (newPage) => {
        router.push({ query: {...router.query, page: newPage} })
    } 
    return (
        <Pagination className="p-2">
            <PaginationContent className='gap-10'>
                <PaginationItem>
                    <PaginationPrevious href='' onClick={(e) => {
                        e.preventDefault()
                        handleClick(parseInt(page) - 1)
                        }
                    } disabled={page === 1} />
                </PaginationItem>
                <span>Page {page} of {totalPages}</span>
                <PaginationItem>
                    <PaginationNext href='' onClick={(e) => {
                        e.preventDefault()
                        handleClick(parseInt(page) + 1)
                        }
                    } disabled={page === totalPages} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationWrap