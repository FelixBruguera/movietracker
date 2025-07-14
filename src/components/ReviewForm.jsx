import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/router"
import axios from "axios"

const ReviewForm = ({ previousReview, currentUser }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const previousText = previousReview?.text
  const previousRating = previousReview?.rating
  const [text, setText] = useState(previousText || "")
  const [rating, setRating] = useState(previousRating || 1)
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const mutation = useMutation({
    mutationFn: (newReview) =>
      axios.post(`/api/reviews?id=${router.query.id}`, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", router.query, currentUser])
      return toast("Succesfully Added")
    },
    onError: (error) => toast(error.response.statusText),
  })
  return (
    <form
      className="flex items-center justify-between my-5"
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({ text: text, rating: rating })
      }}
    >
      <Textarea
        className="border-1 bg-white border-gray-400 w-6/10 lg:w-8/10 max-w-300 h-fit max-h-45 field-sizing-content dark:bg-neutral-700 transition-all"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        minLength="3"
      />
      <Select
        id="rating"
        value={rating}
        onValueChange={(e) => setRating(parseInt(e))}
      >
        <SelectTrigger className="dark:bg-stone-900 w-1/10" title="Your Rating">
          {rating}
        </SelectTrigger>
        <SelectContent>
          {ratings.map((rating) => (
            <SelectItem value={rating}>{rating}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        disabled={text === previousText && rating === previousRating}
      >
        Save
      </Button>
    </form>
  )
}

export default ReviewForm
