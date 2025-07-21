import Remove from "./Remove"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const LogManagerItem = ({ log, update, remove }) => {
  const initialDate = log.date.split("T")[0]
  const [date, setDate] = useState(initialDate)
  return (
    <li
      key={log._id}
      className="flex items-center justify-start w-full gap-3 px-2"
    >
      <form
        className="w-full flex items-center justify-between"
        onSubmit={(e) => {
          e.preventDefault()
          update.mutate({ date: date, logId: log._id })
        }}
      >
        <input
          type="date"
          name="date"
          className="p-2 w-2/4 text-sm border-1 dark:border-stone-700 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={format(new Date(), "yyyy-MM-dd")}
        />
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={date === initialDate}>
            Save
          </Button>
          <Remove
            title="Deleting your log"
            mutation={() => remove.mutate({ logId: log._id })}
          >
            <Button
              variant="destructive"
              type="button"
              className="hover:cursor-pointer hover:bg-red-800 dark:hover:bg-red-800"
            >
              Delete
            </Button>
          </Remove>
        </div>
      </form>
    </li>
  )
}

export default LogManagerItem
