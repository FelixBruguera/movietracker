const UserReviewButton = (props) => {
  const label = props.isActive ? "Cancel" : props.label
  return (
    <div
      onClick={props.onClick}
      aria-label={label}
      title={label}
      className={`p-2 rounded-md bg-transparent dark:text-stone-300
                ${props.isActive && "dark:bg-stone-900 bg-zinc-300"}
                hover:dark:bg-stone-900 hover:bg-zinc-300 hover:cursor-pointer transition-all`}
    >
      {props.children}
    </div>
  )
}

export default UserReviewButton
