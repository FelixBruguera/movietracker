const TooltipItem = ({ title, value }) => {
    return (
        <div className="flex items-center justify-between">
            <p className="text-stone-700 dark:text-gray-200">{title}</p>
            <p className="font-bold">{value}</p>
        </div>
    )
}

export default TooltipItem