import FiltersField from "./FiltersField"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const RangeField = ({
  labelText,
  fieldName,
  min,
  max,
  defaultMin,
  defaultMax,
}) => {
  const [minValue, setMinValue] = useState(parseInt(defaultMin))
  const [maxValue, setMaxValue] = useState(parseInt(defaultMax))
  const onMinChange = (newValue) => {
    setMinValue(newValue)
  }
  const onMaxChange = (newValue) => {
    setMaxValue(newValue)
  }
  return (
    <FiltersField labelText={labelText} className="flex flex-row">
      <div className="flex">
        <div className="flex w-2/4 justify-evenly">
          <Label
            className="text-stone-400 text-xs lg:text-sm"
            htmlFor={`${fieldName}_min`}
          >
            More than
          </Label>
          <Input
            name={`${fieldName}_min`}
            type="number"
            className="w-4/9 text-sm"
            min={min}
            max={maxValue}
            value={minValue}
            onChange={(e) => onMinChange(e.target.value)}
          ></Input>
        </div>
        <div className="flex w-2/4 justify-evenly">
          <Label
            className="text-stone-400 text-xs lg:text-sm"
            htmlFor={`${fieldName}_max`}
          >
            Less than
          </Label>
          <Input
            name={`${fieldName}_max`}
            type="number"
            className="w-4/9 text-sm"
            min={minValue}
            max={max}
            value={maxValue}
            onChange={(e) => onMaxChange(e.target.value)}
          ></Input>
        </div>
      </div>
    </FiltersField>
  )
}

export default RangeField
