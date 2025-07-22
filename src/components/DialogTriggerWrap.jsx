import { DialogTrigger } from "@/components/ui/dialog"

const DialogTriggerWrap = (props) => {
  return (
    <DialogTrigger aria-label={props.label} title={props.label} >
      <div className="border-1 rounded-lg p-2 border-stone-700 lg:border-transparent hover:border-stone-400 hover:bg-stone-100 hover:dark:border-stone-700 hover:dark:bg-stone-900 hover:cursor-pointer">
        {props.children}
      </div>
    </DialogTrigger>
  )
}

export default DialogTriggerWrap
