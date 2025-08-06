import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Heart, HeartOff } from "lucide-react"
import { Button } from "components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/router"

const FollowList = ({ listId, isFollowed }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: () => axios.post(`/api/lists/${listId}/followers`),
    onSuccess: () => {
      queryClient.setQueryData(["list", router.query], (oldData) => {
        return {
          ...oldData,
          isFollowed: true,
          list: { ...oldData.list, followers: oldData.list.followers + 1 },
        }
      })
      toast("Succesfully followed")
    },
    onError: (error) =>
      toast(error.response.statusText || "Something went wrong"),
  })
  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`/api/lists/${listId}/followers`),
    onSuccess: () => {
      queryClient.setQueryData(["list", router.query], (oldData) => {
        return {
          ...oldData,
          isFollowed: false,
          list: { ...oldData.list, followers: oldData.list.followers - 1 },
        }
      })
      toast("Succesfully unfollowed")
    },
    onError: (error) =>
      toast(error.response.statusText || "Something went wrong"),
  })
  return isFollowed ? (
    <Button
      variant="ghost"
      className="hover:bg-stone-100 dark:hover:bg-red-800 border-1 border-transparent hover:border-stone-400 dark:hover:border-stone-700 cursor-pointer dark:hover:text-white transition-all"
      title="Unfollow List"
      aria-label="Unfollow list"
      onClick={() => deleteMutation.mutate()}
    >
      <HeartOff />
    </Button>
  ) : (
    <Button
      variant="ghost"
      className="hover:bg-stone-100 dark:hover:bg-stone-900 hover:border-stone-400 dark:hover:border-stone-700 dark:hover:text-white hover:cursor-pointer border-1 border-transparent transition-all"
      title="Follow List"
      aria-label="Follow list"
      onClick={() => createMutation.mutate()}
    >
      <Heart />
    </Button>
  )
}

export default FollowList
