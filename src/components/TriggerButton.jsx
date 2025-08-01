const TriggerButton = (props) => {
  return (
    <div className="border-1 rounded-lg p-2 border-zinc-300 dark:border-stone-700 lg:border-transparent dark:lg:border-transparent hover:border-stone-400 hover:bg-stone-100 hover:dark:border-stone-700 hover:dark:bg-stone-900 hover:cursor-pointer">
      {props.children}
    </div>
  )
}

export default TriggerButton
