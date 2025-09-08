"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import countries from "@/constants/callingcode.json"; 
import SVGIcon from "./svg-wrapper";
import { Calendar } from "lucide-react";

type InputProps = React.ComponentProps<"input"> & {
  type?: string;
};

type Country = {
  name: string;
  code: string;
  emoji: string;
  dial_code: string;
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
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const countryList = countries; 
  const [selectedCountry, setSelectedCountry] = React.useState<Country>(
    countryList[0]
  );
  const [filteredCountries, setFilteredCountries] =
    React.useState<Country[]>(countryList);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
<div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <SVGIcon
          icon={Calendar} 
          size={20}
          stroke="currentColor"
          fill="none"
          className="text-gray-400"
        />
      </div>
        {showCalendar && (
          <div
            ref={calendarRef}
            style={{ minWidth: "300px", maxWidth: "95vw" }} 
            className="absolute left-0 bottom-full mb-2 bg-white border border-gray-300 rounded-md shadow-lg z-50"
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
  // TEL input
  if (type === "tel") {
    const [isActive, setIsActive] = React.useState(false);

    return (
      <div className="relative w-full max-w-full">
        <div
          className={cn(
            "flex border rounded-md overflow-hidden transition-colors duration-150",
            isActive ? "border-lime-500 bg-lime-50" : "border-gray-300 bg-white"
          )}
        >
          {/* Country selector */}
          <button
            type="button"
            className="flex items-center px-3 gap-2 bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              setShowDropdown(!showDropdown);
              if (!showDropdown) setFilteredCountries(countries);
            }}
          >
            <span>{selectedCountry.emoji}</span>
            <span className="text-gray-500">{selectedCountry.code}</span>
            <svg
              className="w-3 h-3 ml-1 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div className="relative flex-1 -translate-y-0.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {selectedCountry.dial_code}
            </span>
            <input
              type="tel"
              value={value}
              maxLength={25}
              onChange={(e) => {
                let numbersOnly = e.target.value.replace(/\D/g, "");

                if (numbersOnly.startsWith("0")) {
                  numbersOnly = numbersOnly.slice(1);
                }

                const finalNumber =
                  selectedCountry.dial_code.replace("+", "") + numbersOnly;
                if (onChange) {
                  const syntheticEvent = { target: { value: numbersOnly } };
                  // @ts-ignore
                  onChange(syntheticEvent);
                }
              }}
              className="w-full pl-14 pr-3 py-2 text-base text-gray-900 placeholder-gray-400 focus:outline-none"
              placeholder=""
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              {...props}
            />
          </div>
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 mt-1 w-full  max-h-34 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search country"
                className="w-full text-gray-500 px-3 py-2 focus:outline-none"
                onChange={(e) => {
                  const search = e.target.value.toLowerCase();
                  setFilteredCountries(
                    countries.filter(
                      (c) =>
                        c.name.toLowerCase().includes(search) ||
                        c.dial_code.includes(search)
                    )
                  );
                }}
              />
            </div>

            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                className="flex items-center w-full px-3 py-2 text-gray-500 hover:bg-gray-100 gap-2"
                onClick={() => {
                  setSelectedCountry(country);
                  setShowDropdown(false);
                }}
              >
                <span>{country.emoji}</span>
                <span>{country.name}</span>
                <span className="text-gray-600">({country.dial_code})</span>
                {country.code === selectedCountry.code && (
                  <span className="text-gray-500 ml-auto">✓</span>
                )}
              </button>
            ))}
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
