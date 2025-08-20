import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils"

interface SelectWithLabelProps {
  label: string
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
  wrapperClassName?: string
  hint?: string
  error?: string
}

export function SelectWithLabel({
  label,
  value,
  onValueChange,
  placeholder = "Select...",
  children,
  className,
  wrapperClassName,
  hint,
  error,
}: SelectWithLabelProps) {
  return (
    <div className={cn("space-y-1 w-full", wrapperClassName)}>
      <label className="text-sm font-bold text-[#939b98]">{label}</label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className={cn(
            "border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full",
            error
              ? "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500"
              : "",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      {error && (
        <p id={`${label}-error`} className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
