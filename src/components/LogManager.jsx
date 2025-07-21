import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NotebookPen } from "lucide-react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"
import DialogTriggerWrap from "./DialogTriggerWrap"
import LogManagerItem from "./LogManagerItem"

const LogManager = ({ movie }) => {
  const url = "/api/diary"
  const queryClient = useQueryClient()
  const {
    data: logs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["diary", movie._id],
    queryFn: () =>
      fetch(`${url}?movie_id=${movie._id}`).then((response) => response.json()),
  })
  const updateMutation = useMutation({
    mutationFn: (data) => axios.patch(`${url}/${data.logId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["diary", movie._id])
      toast("Succesfully updated")
    },
    onError: (error) => toast(error.message),
  })
  const deleteMutation = useMutation({
    mutationFn: (data) => axios.delete(`${url}/${data.logId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["diary", movie._id])
      toast("Succesfully deleted")
    },
    onError: (error) => toast(error.message),
  })
  return (
    <Dialog>
      <DialogTriggerWrap label="Manage your logs">
        <NotebookPen size={20} />
      </DialogTriggerWrap>
      <DialogContent className="overflow-auto w-fit min-w-110">
        <DialogHeader>
          <DialogTitle>Your logs for {movie.title}</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-3 items-center">
          {isLoading && <li>Loading..</li>}
          {isError && <li>Someting went wrong</li>}
          {logs?.length > 0 ? (
            logs.map((log) => (
              <LogManagerItem
                log={log}
                update={updateMutation}
                remove={deleteMutation}
              />
            ))
          ) : (
            <li>No logs</li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  )
}

export default LogManager
