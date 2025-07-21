import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import LogForm from "./LogForm"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import SelectedMovie from "./SelectedMovie"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import { format } from "date-fns"
import DialogTriggerWrap from "./DialogTriggerWrap"

const LogDialog = ({ movie = "" }) => {
  const [selected, setSelected] = useState(movie)
  const queryClient = useQueryClient()
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
    <Dialog>
      <DialogTriggerWrap label="Add a diary log">
        <Plus size={20} />
      </DialogTriggerWrap>
      <DialogContent className="overflow-auto w-150">
        <DialogHeader>
          <DialogTitle>New Log</DialogTitle>
        </DialogHeader>
        {selected ? (
          <>
            <SelectedMovie movie={selected} unselect={() => setSelected("")} />
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
                <Label htmlFor="date" className="dark:text-stone-400">
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
          </>
        ) : (
          <LogForm setSelected={setSelected} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LogDialog
