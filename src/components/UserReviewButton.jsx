import { Button } from "@/components/ui/button"

const UserReviewButton = (props) => {
    const label = props.isActive ? 'Cancel' : props.label
    return (
        <Button 
            onClick={props.onClick}
            variant='outline'
            aria-label={label}
            title={label}
            className={`size-9 p-2 bg-transparent dark:text-stone-300 border-1 
                ${props.isActive && 'dark:bg-stone-900 bg-white'}
                hover:dark:bg-stone-900 hover:cursor-pointer transition-all`}
        asChild>
            {props.children}
        </Button>
    )
}

export default UserReviewButton