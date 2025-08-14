const ChartHeading = (props) => {
    return (
        <div className="pt-5 w-fit mx-auto">
            <h2 className="text-2xl font-bold text-center pb-2 ">{props.title}</h2>
            {props.children}
        </div>)
}

export default ChartHeading