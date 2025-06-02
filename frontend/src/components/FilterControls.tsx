import { FilterOption, FilterSetting } from '../types'
import { type ChangeEvent, useEffect, useState } from 'react'

interface FilterControlsProps {
  defaultSetting: FilterSetting,
  options: FilterOption[],
  onChange: (setting: FilterSetting) => void,
}

const FilterControls = ({
  defaultSetting,
  options,
  onChange,
}: FilterControlsProps) => {
  const [filterText, setFilterText] = useState(defaultSetting.filterText)
  const [selectedOption, setSelectedOption] = useState(defaultSetting.selectedOption)

  useEffect(() => {
    onChange({
      filterText,
      selectedOption,
    })
  }, [filterText, selectedOption, onChange])

  return (
    <>
      <input
        className="w-full outline rounded-sm text-lg p-1 lg:w-2/3"
        name="filter-by-text"
        type="search"
        placeholder="Search"
        onInput={(event: ChangeEvent<HTMLInputElement>) => setFilterText(event.target.value)}
      />
      <div className="flex flex-col pt-2 sm:flex-row">
        {
          options.map(option => (
            <label key={option.value} className="pr-2 cursor-pointer">
              <input
                className="cursor-pointer"
                name="filter-option"
                type="radio"
                defaultChecked={option.value === defaultSetting.selectedOption.value}
                value={option.value}
                onClick={() => setSelectedOption(option)}
              />&nbsp;{option.label}
            </label>
          ))
        }
      </div>
    </>
  )
}

export default FilterControls
