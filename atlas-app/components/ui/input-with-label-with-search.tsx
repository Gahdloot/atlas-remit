import { useEffect, useState, useRef } from "react"
import { InputWithLabel } from "./input-with-label"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

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
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
  }, [value, options])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (val: string) => {
    onChange(val)
    setShowDropdown(false)
    onSelect?.(val)
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <InputWithLabel
        label={label}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowDropdown(true)
        }}
        onFocus={() => setShowDropdown(true)}
        autoComplete="off"
        inputClassName="bg-[#f8f8f8] border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
      />
      
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredOptions.map((option, idx) => (
            <li
              key={idx}
              onMouseDown={(e) => e.preventDefault()} 
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