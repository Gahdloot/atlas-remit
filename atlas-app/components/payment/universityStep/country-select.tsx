"use client";

import { SearchableInput } from "../../ui/input-with-label-with-search";
import countries from "@/constants/callingcode.json";

interface CountrySelectProps {
  selectedCountry?: string;
  countryCode?: string;
  setCountry: (name: string, code?: string) => void;
}

export function CountrySelect({
  selectedCountry,
  countryCode,
  setCountry,
}: CountrySelectProps) {
  return (
    <SearchableInput
      label="Select Country of Institution"
      value={selectedCountry || ""}
      options={countries.map((c) => `${c.emoji} ${c.name}`)}
      onChange={(val) => {
        const selected = countries.find((c) => `${c.emoji} ${c.name}` === val);
        setCountry(selected ? selected.name : val, selected?.code);
      }}
      onSelect={(val) => {
        const selected = countries.find((c) => `${c.emoji} ${c.name}` === val);
        setCountry(selected ? selected.name : val, selected?.code);
      }}
      className="mb-4"
    />
  );
}
