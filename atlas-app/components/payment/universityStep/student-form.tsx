"use client";

import { InputWithLabel } from "../../ui/input-with-label";
import { PaymentData } from "@/types/payment";

interface StudentFormFieldsProps {
  paymentData: PaymentData;
  updatePaymentData: (data: Partial<PaymentData>) => void;
  isValidEmail: (email: string) => boolean;
  isValidDateOfBirth: (dob: string) => boolean;
}

export function StudentFormFields({
  paymentData,
  updatePaymentData,
  isValidEmail,
  isValidDateOfBirth,
}: StudentFormFieldsProps) {
  const dobInvalid =
    paymentData.studentDateOfBirth &&
    !isValidDateOfBirth(paymentData.studentDateOfBirth);

  return (
    <div className="space-y-4">
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
        <div className="relative w-full">
          <InputWithLabel
            label="Student's date of birth"
            type="date"
            placeholder="dd-mm-yyyy"
            value={paymentData.studentDateOfBirth}
            inputClassName={`bg-gray-50 border px-3 py-4 lg:py-6 text-sm lg:text-base pr-10 rounded-md ${
              dobInvalid ? "border-red-500 focus:border-red-500" : "border-gray-200"
            }`}
            onChange={(e) =>
              updatePaymentData({ studentDateOfBirth: e.target.value })
            }
          />
          {dobInvalid && (
            <p className="mt-1 text-xs text-red-500">
              Please select a valid date (must be 15+ years old)
            </p>
          )}
        </div>

        <InputWithLabel
          label="Student email address(optional)"
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
    </div>
  );
}
