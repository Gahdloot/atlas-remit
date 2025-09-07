"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type InputProps = React.ComponentProps<"input"> & {
  type?: string;
};

function Input({
  className,
  type = "text",
  value,
  onChange,
  ...props
}: InputProps) {
  const calendarRef = React.useRef<HTMLDivElement | null>(null);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selected, setSelected] = React.useState<Date | null>(
    value ? new Date(value) : null
  );
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  if (type === "date") {
    return (
      <div className="relative">
        <input
          readOnly
          value={selected ? format(selected, "dd-MM-yyyy") : ""}
          onClick={() => setShowCalendar(!showCalendar)}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900",
            "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:text-gray-700 file:bg-white file:border-0 file:h-7 file:text-sm file:font-medium file:inline-flex",
            className
          )}
          {...props}
        />

        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute bottom-full mb-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50"
          >
            <DayPicker
              mode="single"
              selected={selected ?? undefined}
              onSelect={(day) => {
                setSelected(day ?? null);
                setShowCalendar(false);
                if (onChange) {
                  const syntheticEvent = {
                    target: {
                      value: day ? day.toISOString().split("T")[0] : "",
                    },
                  };
                  // @ts-ignore
                  onChange(syntheticEvent);
                }
              }}
              toYear={new Date().getFullYear()}
              captionLayout="dropdown"
              showOutsideDays
              fixedWeeks
              className="p-6 bg-red rounded-xl shadow"
              classNames={{
                chevron: " fill-lime-500",
                months:
                  "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 text-lime-700",
                month: "space-y-4",
                caption_label: " font-medium text-gray-700",
                caption_dropdowns: "text-gray-600",
                caption: "pt-6",
                nav_button:
                  "h-7 w-7 bg-transparent p-0 text-gray-500 opacity-70 hover:opacity-100 transition-colors ",
                head_cell:
                  "text-gray-500 rounded-md w-9 font-normal text-[0.8rem] uppercase",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-lime-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal text-gray-600 hover:bg-gray-100 rounded-full aria-selected:opacity-100",
                day_today:
                  "border border-lime-500 text-lime-700 font-semibold rounded-full",

                selected: `bg-lime-500 border-lime-500 text-white`,
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900",
        "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-gray-700 file:bg-white file:border-0 file:h-7 file:text-sm file:font-medium file:inline-flex",
        className
      )}
      {...props}
    />
  );
}

export { Input };
