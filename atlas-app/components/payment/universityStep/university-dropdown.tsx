"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { VirtualizedList } from "./virtualized-list";
import Image from "next/image";
import { PaymentData } from "@/types/payment";
import universityList from "@/constants/uni.json";

interface UniversityDropdownProps {
  countryCode?: string;
  selectedUniversity: string;
  setSelectedUniversity: (name: string) => void;
  updatePaymentData: (data: Partial<PaymentData>) => void;
}

const universities = universityList.map((u) => ({
  name: u.name,
  countryCode: u.country,
}));

export function UniversityDropdown({
  countryCode,
  selectedUniversity,
  setSelectedUniversity,
  updatePaymentData,
}: UniversityDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const filteredUniversities = useMemo(() => {
    if (!countryCode) return [];
    const countryFilteredList = universities.filter((u) => u.countryCode === countryCode);
    if (searchTerm.trim().length < 2) return countryFilteredList;

    const lowerSearchTerm = searchTerm.toLowerCase();
    const startsWithMatches: typeof universities = [];
    const containsMatches: typeof universities = [];

    for (const uni of countryFilteredList) {
      const lowerName = uni.name.toLowerCase();
      if (lowerName.startsWith(lowerSearchTerm)) startsWithMatches.push(uni);
      else if (lowerName.includes(lowerSearchTerm)) containsMatches.push(uni);
    }

    return [...startsWithMatches, ...containsMatches];
  }, [searchTerm, countryCode]);

  const handleSelect = (name: string) => {
    setSelectedUniversity(name);
    updatePaymentData({ studentInstitution: name });
    setIsOpen(false);
    setSearchTerm("");
    setInputValue("");
  };

  const handleClear = () => {
    setSelectedUniversity("");
    setSearchTerm("");
    setInputValue("");
    updatePaymentData({ studentInstitution: "" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setInputValue("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={!countryCode}
        className={cn(
          "w-full flex items-center gap-3 p-4 border-1 rounded-3xl cursor-pointer",
          isOpen ? "border-lime-400 bg-lime-50/60" : "border-white",
          selectedUniversity ? "bg-lime-50/60 border-lime-400" : "bg-white",
          !countryCode && "bg-gray-100 cursor-not-allowed"
        )}
      >
        <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
            <Image
              src={"/images/home-section/school.png"}
              height={10}
              width={10}
              alt="school icon"
              className="w-5 h-5 text-black"
            />
          </div>
        </div>
        <div className="flex-1 text-left">
          {selectedUniversity ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-900">University</div>
                <div className="text-xs text-gray-600 flex items-center justify-between space-x-16 bg-white border-[1px] border-gray-50 rounded-xl p-1 px-3">
                  <p>
                    {selectedUniversity && (
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded mr-2">
                        (
                        {universities.find((u) => u.name === selectedUniversity)?.countryCode}
                        )
                      </span>
                    )}
                    {selectedUniversity}
                  </p>
                  <span onClick={(e) => { e.stopPropagation(); handleClear(); }} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-4 h-4 text-gray-400" />
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm font-medium text-gray-900">University</div>
              <div className="text-sm text-gray-500">{countryCode ? "Select a university" : "Please select a country first"}</div>
            </div>
          )}
        </div>
        {!selectedUniversity && <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen && "rotate-180")} />}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label="University selection dropdown"
          className="absolute top-4/5 left-0 right-0 mt-1 bg-white rounded-3xl shadow-sm z-50 max-h-80 overflow-hidden"
        >
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={inputRef}
                placeholder="Search (min. 2 characters)"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSearchTerm(e.target.value.length >= 2 ? e.target.value : "");
                }}
                className="pl-10 border-gray-200 border-[2px] rounded-3xl text-gray-500 h-12 w-full"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-auto">
            {filteredUniversities.length > 0 ? (
              <VirtualizedList
                items={filteredUniversities}
                itemHeight={48}
                visibleHeight={240}
                renderItem={(university, index) => (
                  <button
                    key={`${university.name}-${index}`}
                    onClick={() => handleSelect(university.name)}
                    role="option"
                    aria-selected={selectedUniversity === university.name}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center">
                      <Image src={"/images/home-section/school.png"} height={30} width={30} alt="school icon" className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-900">
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded mr-2">{university.countryCode}</span>
                        {university.name.split(new RegExp(`(${searchTerm})`, "gi")).map((part, i) =>
                          searchTerm && part.toLowerCase() === searchTerm.toLowerCase() ? <span key={i} className="text-blue-500 font-medium">{part}</span> : part
                        )}
                      </span>
                    </div>
                  </button>
                )}
              />
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchTerm ? "No universities found" : "Start typing to search for a university"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
