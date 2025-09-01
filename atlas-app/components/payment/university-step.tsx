"use client";

import { GraduationCap, Search, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { StepTitleDescription } from "./step-title-description";
import { InputWithLabel } from "../ui/input-with-label";
import { PaymentData } from "@/types/payment";
import universityList from "@/constants/uni.json";
import debounce from "lodash.debounce";
import Image from "next/image";

interface UniversityStepProps {
  paymentData: PaymentData;
  updatePaymentData: (data: Partial<PaymentData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
}

const universities = universityList.map((u) => u.name);

export function UniversityStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: UniversityStepProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(paymentData.studentInstitution || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const filteredUniversities = universities.filter((university) =>
    university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (university: string) => {
    setSelectedUniversity(university);
    updatePaymentData({ studentInstitution: university });
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    setSelectedUniversity("");
    setSearchTerm("");
    updatePaymentData({ studentInstitution: "" });
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatDateInput = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    let formatted = "";
    if (digits.length <= 2) {
      formatted = digits;
    } else if (digits.length <= 4) {
      formatted = digits.slice(0, 2) + "-" + digits.slice(2);
    } else {
      formatted = digits.slice(0, 2) + "-" + digits.slice(2, 4) + "-" + digits.slice(4);
    }
    return formatted;
  };

  const isValidDateOfBirth = (dob: string): boolean => {
    const [day, month, year] = dob.split("-").map(Number);
    if (!day || !month || !year) return false;

    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime())) return false;

    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    const actualAge = hasHadBirthdayThisYear ? age : age - 1;
    return actualAge >= 15;
  };

  const isFormValid =
    paymentData.studentEmail?.trim() &&
    isValidEmail(paymentData.studentEmail) &&
    paymentData.studentFirstName?.trim() &&
    paymentData.studentLastName?.trim() &&
    paymentData.studentPersonalEmail?.trim() &&
    isValidEmail(paymentData.studentPersonalEmail) &&
    paymentData.studentProgramStudied?.trim() &&
    paymentData.studentExpectedYearOfCompletion?.trim() &&
    paymentData.studentDateOfBirth?.trim() &&
    isValidDateOfBirth(paymentData.studentDateOfBirth) &&
    paymentData.studentInstitution?.trim();

  const handleNext = () => {
    if (isFormValid) {
      nextStep();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <div className="space-y-6">
        <StepTitleDescription
          titleNormal={"Institution"}
          titleGradient={"Information"}
          descriptions={["Please select your university to continue.", "ATLAS supports schools in Canada and the UK for now."]}
        />

        <div className="space-y-2 mt-4">
          <label className="text-gray-600 mb-2 text-base font-bold">Choose University</label>
          <div className="relative mt-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-full flex items-center gap-3 p-4 border-1 transition-colors rounded-3xl cursor-pointer",
                isOpen ? "border-lime-400 bg-lime-50/60" : "border-white",
                selectedUniversity ? "bg-lime-50/60 border-lime-400" : "bg-white"
              )}
            >
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                  <Image 
                    src={'/images/home-section/school.png'}
                    height={10}
                    width={10}
                    alt="school icons"
                    className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="flex-1 text-left">
                {selectedUniversity ? (
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-medium text-gray-900">University</div>
                      <div className="text-xs text-gray-600 flex items-center justify-between space-x-16 bg-white border-[1px] border-gray-50 rounded-xl p-1 px-3">
                        <p>{selectedUniversity}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-medium text-gray-900">University</div>
                    <div className="text-sm text-gray-500">Select a university</div>
                  </div>
                )}
              </div>
              {!selectedUniversity && (
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen && "rotate-180")} />
              )}
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
                    <Input
                      placeholder="Search University"
                      value={searchTerm}
                      onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 border-[2px] focus:ring-[1px] focus:border-gray-300 focus-visible:border-gray-200 focus:ring-gray-200 text-gray-400 rounded-3xl h-12"
                      aria-label="Search universities"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredUniversities.map((university) => (
                    <button
                      key={university}
                      onClick={() => handleSelect(university)}
                      role="option"
                      aria-selected={selectedUniversity === university}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <Image 
                        src={'/images/home-section/school.png'}
                        height={10}
                        width={10}
                        alt="school icons"
                        className="w-3 h-3 text-black" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-900">
                          {university.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="text-blue-500">University</span>
                        </span>
                      </div>
                    </button>
                  ))}
                  {filteredUniversities.length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500">No universities found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 w-full">
              <label className="text-sm font-bold text-[#939b98]">Expected Year of Completion</label>
              <Select
                value={paymentData.studentExpectedYearOfCompletion}
                onValueChange={(value) => updatePaymentData({ studentExpectedYearOfCompletion: value })}
              >
                <SelectTrigger className="border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 7 }).map((_, i) => {
                    const year = 2025 + i;
                    return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <label className="text-sm font-bold text-[#939b98]">Program Studied</label>
              <Select
                value={paymentData.studentProgramStudied}
                onValueChange={(value) => updatePaymentData({ studentProgramStudied: value })}
              >
                <SelectTrigger className="border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="Graduate">Graduate</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <label className="text-sm font-bold text-[#939b98]">Payment Type</label>
            <Select
              value={paymentData.paymentType}
              onValueChange={(value) => updatePaymentData({ paymentType: value })}
            >
              <SelectTrigger className="border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Application Fee">Application Fee</SelectItem>
                <SelectItem value="Registration Deposit">Registration Deposit</SelectItem>
                <SelectItem value="Tution Fee">Tuition Fee</SelectItem>
                <SelectItem value="Resident and Meal Plan">Resident and Meal Plan</SelectItem>
                <SelectItem value="German Blocked Account">German Blocked Account</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWithLabel
              label="Student's personal email"
              value={paymentData.studentPersonalEmail}
              inputClassName={`bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10 ${
                paymentData.studentPersonalEmail && !isValidEmail(paymentData.studentPersonalEmail)
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              onChange={(e) => updatePaymentData({ studentPersonalEmail: e.target.value })}
            />
            <InputWithLabel
              label="Student's mobile number"
              value={paymentData.studentPhoneNumber}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ studentPhoneNumber: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWithLabel
              label="Student's first name"
              value={paymentData.studentFirstName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ studentFirstName: e.target.value })}
            />
            <InputWithLabel
              label="Student's last name"
              value={paymentData.studentLastName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ studentLastName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWithLabel
              label="Student's date of birth (dd-mm-yyyy)"
              type="text"
              placeholder=""
              value={paymentData.studentDateOfBirth}
              inputClassName={`bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10 ${
                paymentData.studentDateOfBirth && !isValidDateOfBirth(paymentData.studentDateOfBirth)
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              onChange={(e) => {
                const formattedDate = formatDateInput(e.target.value);
                updatePaymentData({ studentDateOfBirth: formattedDate });
              }}
            />
            <InputWithLabel
              label="Student's email"
              type="email"
              value={paymentData.studentEmail}
              inputClassName={`bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10 ${
                paymentData.studentEmail && !isValidEmail(paymentData.studentEmail)
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }`}
              onChange={(e) => updatePaymentData({ studentEmail: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
          <Button
            onClick={prevStep}
            variant="ghost"
            className="flex-1 w-full py-6 md:flex-none bg-white text-base font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            Go back
          </Button>
          <Button
            onClick={handleNext}
            className={cn(
              "flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold",
              isFormValid
                ? "bg-lime-500 hover:bg-lime-600 text-white"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            )}
            disabled={!isFormValid}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}