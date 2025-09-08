"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaymentData } from "@/types/payment";

interface ProgramAndPaymentSelectsProps {
  paymentData: PaymentData;
  updatePaymentData: (data: Partial<PaymentData>) => void;
}

export function ProgramAndPaymentSelects({
  paymentData,
  updatePaymentData,
}: ProgramAndPaymentSelectsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium text-[#939b98]">Expected Year of Completion</label>
          <Select
            value={paymentData.studentExpectedYearOfCompletion}
            onValueChange={(value) => updatePaymentData({ studentExpectedYearOfCompletion: value })}
          >
            <SelectTrigger className="border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 7 }).map((_, i) => {
                const year = new Date().getFullYear() + i;
                return <SelectItem key={year} value={year.toString()}>{year}</SelectItem>;
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <label className="text-sm font-medium text-[#939b98]">Program of study</label>
          <Select
            value={paymentData.studentProgramStudied}
            onValueChange={(value) => updatePaymentData({ studentProgramStudied: value })}
          >
            <SelectTrigger className="border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full">
              <SelectValue placeholder="Select Program" />
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
        <label className="text-sm font-medium text-[#939b98]">Payment Type</label>
        <Select
          value={paymentData.paymentType}
          onValueChange={(value) => updatePaymentData({ paymentType: value })}
        >
          <SelectTrigger className="border-gray-200 py-4 lg:py-6 text-sm lg:text-base w-full">
            <SelectValue placeholder="Select Payment Type" />
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
    </div>
  );
}
