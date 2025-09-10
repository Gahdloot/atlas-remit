"use client";

import * as React from "react";
import { VirtualizedList } from "@/components/payment/universityStep/virtualized-list";
import countries from "@/constants/callingcode.json";
import { cn } from "@/lib/utils";

type Country = {
  name: string;
  code: string;
  emoji: string;
  dial_code: string;
};

type CountrySelectProps = {
  value?: Country | null;
  onChange?: (country: Country) => void;
  className?: string;
};

export function CountrySelect({ value, onChange, className }: CountrySelectProps) {
const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(value || null);

  const [showDropdown, setShowDropdown] = React.useState(false);
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(countries);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    onChange?.(country);
  };

  return (
    <div className={cn("relative w-full ", className)}>
      <button
        type="button"
        onClick={() => {
          setShowDropdown(!showDropdown);
          if (!showDropdown) setFilteredCountries(countries);
        }}
        className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {selectedCountry && (
            <img
              src={`/svg-flags/${selectedCountry.code.toLowerCase()}.svg`}
              alt={selectedCountry.code}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
         <span className="text-gray-500">
  {selectedCountry ? selectedCountry.name : "Select Country"}
</span>

        </div>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full max-h-64 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-2">
            <input
              type="text"
              placeholder="Search country"
             className="w-full px-2 py-1 border border-gray-200 text-gray-500 rounded-md focus:outline-none"

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

          <VirtualizedList
            items={filteredCountries}
            itemHeight={40}
            visibleHeight={240}
            renderItem={(country) => (
              <button
                key={country.code}
                type="button"
                className="flex items-center w-full px-3 py-2 gap-2 hover:bg-gray-100 text-gray-700"
                onClick={() => handleSelect(country)}
              >
                <img
                  src={`/svg-flags/${country.code.toLowerCase()}.svg`}
                  alt={country.code}
                  className="w-5 h-5 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="text-gray-500">{country.name}</span>
                {country.code === selectedCountry?.code && (
                  <span className="text-gray-500 ml-auto">✓</span>
                )}
              </button>
            )}
          />
        </div>
      )}
    </div>
  );
}
