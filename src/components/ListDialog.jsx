import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import DialogTriggerWrap from "./DialogTriggerWrap"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const ListDialog = ({ movie = "" }) => {
  const [isPrivate, setIsPrivate] = useState(true)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newEntry) => axios.post("/api/lists", newEntry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] })
      toast("Succesfully Added")
    },
    onError: (error) => toast(error.response.statusText),
  })
  return (
    <Dialog>
      <DialogTriggerWrap label="Create new list">
        <Plus size={20} />
      </DialogTriggerWrap>
      <DialogContent className="overflow-auto w-150">
        <DialogHeader>
          <DialogTitle>New List</DialogTitle>
        </DialogHeader>
            <form
              className="flex flex-col gap-10 w-full"
              onSubmit={(e) => {
                e.preventDefault()
                console.log(isPrivate)
                mutation.mutate({
                  name: e.target.name.value,
                  description: e.target.description.value,
                  isPrivate: isPrivate
                })
              }}
            >
              <div className="flex flex-col gap-3 items-center">
                <Label htmlFor="name" className="text-stone-600 dark:text-stone-400">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  minLength='5'
                  maxLength='80'
                  className="w-fit text-sm p-2 rounded-lg border-1 border-stone-400 dark:border-stone-600"
                  required
                />
              </div>
            <div className="flex flex-col gap-3 items-center">
                <Label htmlFor="description" className="text-stone-600 dark:text-stone-400">
                  Description
                </Label>
                <Textarea
                  type="text"
                  name="description"
                  id="description"
                  minLength='5'
                  maxLength='400'
                  className="w-2/4 text-sm p-2 rounded-lg border-1 border-stone-400 dark:border-stone-600"
                  required
                />
              </div>
            <div className="flex gap-3 items-center justify-center">
                <Checkbox
                  name="private"
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={() => setIsPrivate(prev => !prev)}
                />
                <Label htmlFor="private" className="text-stone-600 dark:text-stone-400">
                  Private
                </Label>
              </div>
              <DialogClose>
                <Button type="submit" className="w-2/4 m-auto">
                  Save
                </Button>
              </DialogClose>
            </form>
      </DialogContent>
    </Dialog>
  )
}

export default ListDialog
