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
import { useRouter } from "next/router"

const ReviewForm = ({ previousReview, mutation }) => {
  const router = useRouter()
  const previousText = previousReview?.text
  const previousRating = previousReview?.rating
  const [text, setText] = useState(previousText || "")
  const [rating, setRating] = useState(previousRating || 1)
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <form
      className="flex items-center justify-between my-5"
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({
          text: text,
          rating: rating,
          movie_id: router.query.id,
        })
      }}
    >
      <Textarea
        className="border-1 bg-input dark:bg-input border-stone-400 w-6/10 lg:w-8/10 h-fit max-h-45 field-sizing-content transition-all"
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
        <SelectTrigger
          className="lg:w-1/10 text-xs lg:text-sm border-1 bg-card dark:bg-card border-border"
          title="Your Rating"
        >
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
