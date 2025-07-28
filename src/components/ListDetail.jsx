const ListDetail = (props) => {
  return (
    <div className="flex flex-col items-start w-full">
      <span className="flex items-center gap-2 text-base lg:text-lg">
        {props.children}
      </span>
    </div>
  )
}

export default ListDetail
