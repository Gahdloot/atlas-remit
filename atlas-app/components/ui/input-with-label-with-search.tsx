import { useEffect, useState } from "react"
import { InputWithLabel } from "./input-with-label"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react" // import search icon

interface SearchableInputProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  onSelect?: (value: string) => void
  className?: string
}

export function SearchableInput({
  label,
  options,
  value,
  onChange,
  onSelect,
  className,
}: SearchableInputProps) {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
  }, [value, options])

  const handleSelect = (val: string) => {
    onChange(val)
    setShowDropdown(false)
    onSelect?.(val)
  }

  return (
    <div className={cn("relative", className)}>
      <InputWithLabel
        label={label}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowDropdown(true)
        }}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        autoComplete="off"
        inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10" // add right padding
      />
      {/* Search Icon positioned to the right */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        <Search className="w-5 h-5" />
      </div> */}


      {showDropdown && filteredOptions?.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredOptions?.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-lime-100 text-gray-900"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
