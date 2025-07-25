import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { toast } from "sonner"
import { DialogContext } from "src/components/DialogWrapper"
import axios from "axios"

const AddToList = ({ listId }) => {
    const queryClient = useQueryClient()
    const { selected, setSelected } = useContext(DialogContext)
    const mutation = useMutation({
        mutationFn: (newEntry) => axios.post(`/api/lists/${listId}`, newEntry),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list"] })
            setSelected("")
            toast("Succesfully Added")
        },
        onError: (error) => toast(error.response.data.error || error.response.statusText),
    })
    return (
        <form
            className="flex flex-col gap-10 w-full"
            onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate({
                movie_id: selected._id,
            })
            }}
        >
            <Button type="submit" className="w-2/4 m-auto">
                Add
            </Button>
        </form>
    )
}

export default AddToList
