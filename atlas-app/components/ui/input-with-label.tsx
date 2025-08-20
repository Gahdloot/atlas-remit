import * as React from "react"
import { Input } from "@/components/ui/input" // adjust path if different
import { cn } from "@/lib/utils"

interface InputWithLabelProps extends React.ComponentProps<"input"> {
  label: string
  id?: string
  className?: string
  inputClassName?: string
}

export function InputWithLabel({
  label,
  id,
  className,
  inputClassName,
  ...props
}: InputWithLabelProps) {
  const inputId = id || props.name || `input-${label.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input id={inputId} className={inputClassName} {...props} />
    </div>
  )
}
