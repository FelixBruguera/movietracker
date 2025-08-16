import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"

const MonthlyTopItem = ({ data, max }) => {
    const date = format(new Date(data._id[1], data._id[0]), "MMM u")
    const size = Math.floor((data.total / max ) * 9)
    const padding = size <= 1 ? 2 : size + 1
    const dateFont = padding*2 <= 12 ? "12px" : `${padding*2}px`
    const totalFont = padding * 3.6 <= 12 ? "12px" : `${padding*3.6}px`
    return (
        <li key={date} style={{padding:`calc(var(--spacing) * ${padding})`}} className={`border-2 border-zinc-300 dark:border-stone-700 rounded-3xl hover:border-blue-700 dark:hover:border-blue-700 transition-colors group`}>
            <p style={{fontSize: totalFont}} className={`font-bold text-center`}>{data.total}</p>
            <Separator className="bg-zinc-300 dark:bg-stone-600 my-1" />
            <p style={{fontSize: dateFont}} className="text-stone-700 dark:text-stone-300 group-hover:text-stone-800 group-hover:dark:text-stone-200">{date}</p>
        </li>
    )
}

export default MonthlyTopItem