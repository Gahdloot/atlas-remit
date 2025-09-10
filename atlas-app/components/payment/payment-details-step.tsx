"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputWithLabel } from "../ui/input-with-label";
import { Input } from "../ui/input";
import { StepTitleDescription } from "./step-title-description";
import { SearchableInput } from "../ui/input-with-label-with-search";
import { ALL_COUNTRIES } from "@/lib/constants/constants";
import { PaymentData } from "@/types/payment";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import countries from "@/constants/callingcode.json";
import React from "react";
import { CountrySelect } from "../ui/country-select";

interface PaymentDetailsStepProps {
  paymentData: PaymentData;
  updatePaymentData: (data: Partial<PaymentData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
}

export function PaymentDetailsStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: PaymentDetailsStepProps) {
  const searchParams = useSearchParams();
  const initializer = searchParams.get("initializer");
  const [phone, setPhone] = React.useState("");
  const handleNext = () => {
    nextStep();
  };

  useEffect(() => {
    updatePaymentData({ identifier: initializer });
  }, [initializer]);

  const isFormValid =
    paymentData?.identifier?.trim() &&
    paymentData.payerFirstName?.trim() &&
    paymentData.payerAddress?.trim() &&
    paymentData.payerFirstName?.trim() &&
    paymentData.payerLastName?.trim() &&
    paymentData.payerPhoneNumber?.trim() &&
    paymentData.payerCity?.trim() &&
    paymentData.payerState?.trim() &&
    paymentData.payerType?.trim();

  return (
    <div className="min-h-screen  p-4 ">
      <div className=" ">
        <StepTitleDescription
          titleNormal={"Payment"}
          titleGradient={"Information"}
          descriptions={[
            "Provide the information of the person whose bank account will be used to pay",
          ]}
        />
        <div className="space-y-6">
          <div className="space-y-2 w-full">
            <label className="text-sm font-medium text-[#939b98]">
              Select Country
            </label>
            <CountrySelect
              value={
                countries.find((c) => c.name === paymentData.countryFrom) ||
                null
              }
              onChange={(country) =>
                updatePaymentData({ countryFrom: country.name })
              }
            />
          </div>

          <div className="space-y-2 w-full">
            <label className="text-sm font-medium text-[#939b98]">Payer</label>
            <Select
              value={paymentData.payerType}
              onValueChange={(value) => updatePaymentData({ payerType: value })}
            >
              <SelectTrigger className=" border-gray-200 py-4 lg:py-6 text-sm lg:text-base  w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <InputWithLabel
              label="First Name"
              value={paymentData.payerFirstName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) =>
                updatePaymentData({ payerFirstName: e.target.value })
              }
            />
            <InputWithLabel
              label="Last Name"
              value={paymentData.payerLastName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) =>
                updatePaymentData({ payerLastName: e.target.value })
              }
            />
          </div>

          <InputWithLabel
            label="Address"
            placeholder=""
            value={paymentData.payerAddress}
            inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
            onChange={(e) =>
              updatePaymentData({ payerAddress: e.target.value })
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <InputWithLabel
              label="City"
              value={paymentData.payerState}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) =>
                updatePaymentData({ payerState: e.target.value })
              }
            />
            <InputWithLabel
              label="State/Province/Region"
              value={paymentData.payerCity}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ payerCity: e.target.value })}
            />
          </div>
          <InputWithLabel
            label="Postal/Zip code (optional)"
            placeholder=""
            value={paymentData.payerZipCode}
            inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
            onChange={(e) =>
              updatePaymentData({ payerZipCode: e.target.value })
            }
          />
          <InputWithLabel
            label="Phone number"
            placeholder=""
            type="tel"
            value={paymentData.payerPhoneNumber}
            onChange={(e) =>
              updatePaymentData({ payerPhoneNumber: e.target.value })
            }
          />

          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className={cn(
              "w-full py-4 md:py-6 text-base font-medium mt-8 rounded-lg transition-all",
              isFormValid
                ? "bg-lime-500 hover:bg-lime-600 text-white"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            )}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
