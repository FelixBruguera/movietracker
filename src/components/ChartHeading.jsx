const ChartHeading = (props) => {
  const width = props.width == "wide" ? "max-w-full" : "max-w-250"
  return (
    <div className={`pt-5 w-full ${width} mx-auto`}>
      <h2 className="text-2xl font-bold text-center pb-2 ">{props.title}</h2>
      {props.children}
    </div>
  )
}

export default ChartHeading
