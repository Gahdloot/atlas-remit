"use client";

import { useState, useEffect, useRef } from "react";
import { StepTitleDescription } from "../step-title-description";
import { PaymentData } from "@/types/payment";
import { CountrySelect } from "./country-select";
import { UniversityDropdown } from "./university-dropdown";
import { StudentFormFields } from "./student-form";
import { ProgramAndPaymentSelects } from "./program-and-payment";
import { NavigationButtons } from "./navigation";

interface UniversityStepProps {
  paymentData: PaymentData;
  updatePaymentData: (data: Partial<PaymentData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function UniversityStep({ paymentData, updatePaymentData, nextStep, prevStep }: UniversityStepProps) {
  const [selectedUniversity, setSelectedUniversity] = useState(paymentData.studentInstitution || "");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidDateOfBirth = (dob: string) => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return false;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 15;
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

  const handleNext = () => isFormValid && nextStep();

  return (
    <div className="space-y-6">
      <StepTitleDescription
        titleNormal="Institution"
        titleGradient="Information"
        descriptions={["Please select your university to continue.", "ATLAS supports schools in Canada and the UK for now."]}
      />

      <CountrySelect
        selectedCountry={paymentData.countryOfInstitution}
        countryCode={paymentData.countryCode}
        setCountry={(name, code) => updatePaymentData({ countryOfInstitution: name, countryCode: code })}
      />

      <UniversityDropdown
        countryCode={paymentData.countryCode}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
        updatePaymentData={updatePaymentData}
      />

      <ProgramAndPaymentSelects paymentData={paymentData} updatePaymentData={updatePaymentData} />
      <StudentFormFields
        paymentData={paymentData}
        updatePaymentData={updatePaymentData}
        isValidEmail={isValidEmail}
        isValidDateOfBirth={isValidDateOfBirth}
      />

      <NavigationButtons prevStep={prevStep} handleNext={handleNext} isFormValid={isFormValid} />
    </div>
  );
}
