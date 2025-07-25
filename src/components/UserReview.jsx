import { useState } from "react"
import Review from "./Review"
import { Edit, Trash } from "lucide-react"
import UserReviewButton from "./UserReviewButton"
import ReviewForm from "./ReviewForm"
import Remove from "./Remove"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"

const UserReview = ({ data, color, currentUser, query }) => {
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => axios.delete(`/api/reviews/${data._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", query, currentUser.id])
      return toast("Succesfully Deleted")
    },
    onError: (error) => toast(error.response.statusText),
  })

  return (
    <div className="flex flex-col gap-2 my-4">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-bold">Your review</h2>
        <div className="flex items-center gap-3">
          <UserReviewButton
            onClick={() => setIsEditing((prevState) => !prevState)}
            isActive={isEditing}
            label="Edit your review"
          >
            <Edit />
          </UserReviewButton>
          <Remove
            title={"Deleting your review"}
            mutation={() => mutation.mutate()}
          >
            <UserReviewButton label="Delete your review">
              <Trash />
            </UserReviewButton>
          </Remove>
        </div>
      </div>
      {isEditing ? (
        <ReviewForm previousReview={data} currentUser={currentUser} />
      ) : (
        <Review
          data={data}
          userInfo={{ _id: currentUser.id, username: currentUser.username }}
          color={color}
        />
      )}
    </div>
  )
}

export default UserReview
