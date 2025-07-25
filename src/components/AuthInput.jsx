import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AuthInput = (props) => {
  const { labelText, ...inputProps } = props
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Label
        htmlFor={inputProps.id}
        className="text-stone-600 dark:text-gray-300"
      >
        {labelText}
      </Label>
      <Input
        {...inputProps}
        required
        className="bg-zinc-200 border-gray-300 dark:bg-stone-900 border-1 dark:border-stone-700"
      />
    </div>
  )
}

export default AuthInput
