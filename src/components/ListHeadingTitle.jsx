const ListHeadingTitle = (props) => {
  return (
    <div className="flex items-center gap-3 w-9/10">
      <h2 className="text-2xl lg:text-3xl font-semibold">{props.title}</h2>
      {props.children}
    </div>
  )
}

export default ListHeadingTitle
