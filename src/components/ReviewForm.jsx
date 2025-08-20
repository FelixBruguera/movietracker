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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const ReviewForm = ({ previousReview, mutation }) => {
  const router = useRouter()
  const previousText = previousReview?.text
  const previousRating = previousReview?.rating
  const [text, setText] = useState(previousText || "")
  const [rating, setRating] = useState(previousRating || 1)
  const [createLog, setCreateLog] = useState(false)
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <form
      className="flex flex-col gap-2 lg:gap-0 lg:flex-row items-center justify-between my-5"
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({
          text: text,
          rating: rating,
          movie_id: router.query.id,
          create_log: createLog,
        })
      }}
    >
      <Textarea
        className="border-1 bg-input dark:bg-input border-stone-400 w-full lg:w-7/10 h-fit max-h-45 field-sizing-content transition-all"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Optional"
        maxLength="400"
      />
      <div className="flex items-center justify-between lg:justify-evenly w-full lg:w-3/10">
        {!previousRating && (
          <div className="flex items-center gap-2">
            <Checkbox
              className="border-border"
              id="log"
              name="log"
              checked={createLog}
              onCheckedChange={() => setCreateLog((prev) => !prev)}
            />
            <Label htmlFor="log" className="text-stone-600 dark:text-stone-400">
              Add to diary
            </Label>
          </div>
        )}
        <Select
          id="rating"
          value={rating}
          onValueChange={(e) => setRating(parseInt(e))}
        >
          <SelectTrigger
            className="w-1/3 text-xs lg:text-sm border-1 bg-card dark:bg-card border-border"
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
      </div>
    </form>
  )
}

export default ReviewForm
