import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const ListForm = ({ list, mutation }) => {
  const startingValue = list?.isPrivate === false ? false : true
  const [isPrivate, setIsPrivate] = useState(startingValue)
  return (
    <form
      className="flex flex-col gap-10 w-full"
      onSubmit={(e) => {
        e.preventDefault()
        mutation.mutate({
          name: e.target.name.value,
          description: e.target.description.value,
          isPrivate: isPrivate,
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
          defaultValue={list?.name || ""}
          minLength="5"
          maxLength="80"
          className="w-fit text-sm p-2 rounded-lg border-1 border-stone-400 dark:border-stone-600"
          required
        />
      </div>
      <div className="flex flex-col gap-3 items-center">
        <Label
          htmlFor="description"
          className="text-stone-600 dark:text-stone-400"
        >
          Description
        </Label>
        <Textarea
          type="text"
          name="description"
          id="description"
          defaultValue={list?.description || ""}
          minLength="5"
          maxLength="400"
          className="w-2/4 text-sm p-2 rounded-lg border-1 border-stone-400 dark:border-stone-600"
          required
        />
      </div>
      <div className="flex gap-3 items-center justify-center">
        <Checkbox
          name="private"
          id="private"
          checked={isPrivate}
          onCheckedChange={() => setIsPrivate((prev) => !prev)}
        />
        <Label htmlFor="private" className="text-stone-600 dark:text-stone-400">
          Private
        </Label>
      </div>
      <Button type="submit" className="w-2/4 m-auto">
        Save
      </Button>
    </form>
  )
}

export default ListForm
