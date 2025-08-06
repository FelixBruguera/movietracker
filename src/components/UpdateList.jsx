import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import TriggerButton from "./TriggerButton"
import ListForm from "./ListForm"
import { useRouter } from "next/router"
import { useState } from "react"

const UpdateList = ({ list }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newEntry) => axios.patch(`/api/lists/${list._id}`, newEntry),
    onSuccess: (response) => {
      queryClient.setQueryData(["list", router.query], (oldData) => {
        return {
          ...oldData,
          list: {
            ...oldData.list,
            name: response.data.name,
            description: response.data.description,
            isPrivate: response.data.isPrivate,
          },
        }
      })
      setOpen(false)
      toast("Succesfully Updated")
    },
    onError: (error) => toast(error.response.statusText),
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger aria-label="Update your list" title="Update your list">
        <TriggerButton>
          <Edit />
        </TriggerButton>
      </DialogTrigger>
      <DialogContent className="overflow-auto w-150">
        <DialogHeader>
          <DialogTitle>Updating {list.name} </DialogTitle>
        </DialogHeader>
        <ListForm list={list} mutation={mutation} />
      </DialogContent>
    </Dialog>
  )
}

export default UpdateList
