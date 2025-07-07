import { Star } from "lucide-react"

const Review = ({ data }) => {
    return (
        <li key={data._id} className="border p-4 rounded-lg bg-stone-900 dark:hover:border-stone-600 flex items-center justify-between transition-all">
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm text-gray-400">
                        {new Date(data.date).toLocaleDateString()}
                    </p>
                </div>
                <p className="w-9/10 text-justify">{data.text}</p>
            </div>
                <div className="flex gap-1 items-center">
                    <p className="font-bold text-md">{data.rating}</p>
                    <Star size={18} color="goldenrod" fill="goldenrod"/>
                </div>
        </li>
    )
}

export default Review