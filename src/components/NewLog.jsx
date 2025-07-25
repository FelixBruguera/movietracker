import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { toast } from "sonner"
import { DialogContext } from "src/components/DialogWrapper"
import { format } from "date-fns"
import axios from "axios"

const NewLog = () => {
    const queryClient = useQueryClient()
    const { selected, setSelected } = useContext(DialogContext)
    console.log([DialogContext, selected])
    const mutation = useMutation({
        mutationFn: (newEntry) => axios.post("/api/diary", newEntry),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["diary"] })
            setSelected("")
            toast("Succesfully Added")
        },
        onError: (error) => toast(error.response.statusText),
    })
    const todaysDate = format(new Date(), "yyyy-MM-dd")
    return (
        <form
            className="flex flex-col gap-10 w-full"
            onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate({
                date: e.target.date.value,
                movie_id: selected._id,
            })
            }}
        >
            <div className="flex flex-col gap-3 items-center">
            <Label htmlFor="date" className="text-stone-600 dark:text-stone-400">
                Date
            </Label>
            <input
                type="date"
                name="date"
                id="date"
                min={format(selected.released, "yyyy-MM-dd")}
                defaultValue={todaysDate}
                max={todaysDate}
                className="w-fit text-sm p-2 rounded-lg border-1 border-stone-400 dark:border-stone-600"
            />
            </div>
            <Button type="submit" className="w-2/4 m-auto">
                Save
            </Button>
        </form>
    )
}

export default NewLog