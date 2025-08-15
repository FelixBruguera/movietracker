const TooltipItem = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-200">{title}</p>
      <p className="text-stone-100 font-bold">{value}</p>
    </div>
  )
}

export default TooltipItem
