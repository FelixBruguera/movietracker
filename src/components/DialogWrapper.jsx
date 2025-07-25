import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import MovieSearch from "./MovieSearch"
import { Plus } from "lucide-react"
import { useState, createContext } from "react"
import SelectedMovie from "./SelectedMovie"
import DialogTriggerWrap from "./DialogTriggerWrap"

export const DialogContext = createContext()

const DialogWrapper = (props) => {
  const [selected, setSelected] = useState(props.movie || '')
  return (
    <Dialog>
      <DialogTriggerWrap label={props.label}>
        <Plus size={20} />
      </DialogTriggerWrap>
      <DialogContent className="overflow-auto w-150">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {selected ? (
          <>
            <DialogContext.Provider value={{ selected, setSelected }}>
              <SelectedMovie movie={selected} unselect={() => setSelected("")} />
              {props.children}
            </DialogContext.Provider>
          </>
        ) : (
          <MovieSearch setSelected={setSelected} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogWrapper
