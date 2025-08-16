import ChartHeading from "./ChartHeading"

const StatsList = (props) => {
return (    
    <ChartHeading title={props.title}>
        <ul className="flex w-full items-center justify-evenly my-8 flex-wrap">
            {props.children}
        </ul>
    </ChartHeading>
    )

}

export default StatsList