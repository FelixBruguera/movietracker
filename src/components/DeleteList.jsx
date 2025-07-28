import { Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import TriggerButton from "./TriggerButton"
import { useRouter } from "next/router"
import Remove from "./Remove"

const DeleteList = ({ list }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => axios.delete(`/api/lists/${list._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] })
      queryClient.removeQueries({ queryKey: ["list", router.query] })
      toast("Succesfully Deleted")
      router.push("/lists")
    },
    onError: (error) => toast(error.response.statusText),
  })
  return (
    <Remove title={`Deleting ${list.name}`} mutation={() => mutation.mutate()}>
      <TriggerButton>
        <Trash />
      </TriggerButton>
    </Remove>
  )
}

export default DeleteList
