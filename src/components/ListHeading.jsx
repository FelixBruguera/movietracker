const ListHeading = (props) => {
  return (
    <div className="flex justify-between items-center my-8 lg:my-5">
      {props.children}
    </div>
  )
}

export default ListHeading
