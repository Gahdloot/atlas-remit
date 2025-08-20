import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900",
        "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-gray-700 file:bg-white file:border-0 file:h-7 file:text-sm file:font-medium file:inline-flex",
        className
      )}
      {...props}
    />
  )
}

export { Input }
