"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PaymentData } from "@/app/payment/page"
import { FileUp } from "lucide-react"
import { InputWithLabel } from "../ui/input-with-label"

interface StudentDetailsStepProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
  prevStep: () => void
  currentStep: number
}

export function StudentDetailsStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: StudentDetailsStepProps) {
  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="in-h-[70vh]">


      <div className="space-y-3">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Student's <span className="leading-tight bg-gradient-to-tl from-lime-500 via-lime-600 to-green-700 bg-clip-text text-transparent">details</span>
          </h1>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="text-sm text-gray-600">Enter student's details and ID details</p>
          </div>
        </div>

        <div className="space-y-6 mt-4 md:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWithLabel
              label="Last Name"
              placeholder=""
              value={paymentData.studentFirstName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ studentFirstName: e.target.value })}
            />
            <InputWithLabel
              label="Last Name"
              placeholder=""
              value={paymentData.studentLastName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ studentLastName: e.target.value })}
            />
          </div>
        </div>



          <InputWithLabel
              label="Student ID"
              placeholder=""
              value={paymentData.studentId}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ studentId: e.target.value })}
            />


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="space-y-2 w-full">
              <label className="text-sm font-bold text-[#939b98]">Identity type (for payer)</label>
              <Select
                value={paymentData.studentIdentityType}
                onValueChange={(value) => updatePaymentData({ studentIdentityType: value })}
              >
                <SelectTrigger className=" border-gray-200 py-4 lg:py-6 text-sm lg:text-base ">
                  <SelectValue placeholder="Passport"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers-license">Drivers License</SelectItem>
                  <SelectItem value="national-id">National ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#939b98]">Expiry date</label>
              <Input
                placeholder="12-10-28"
                value={paymentData.studentExpiryDate}
                onChange={(e) => updatePaymentData({ studentExpiryDate: e.target.value })}
                className="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#939b98]">Upload identity document (for payer)</label>
            <div className="border-2 border-dashed border-gray-300 bg-white rounded-lg p-6 text-center">
              <div className="text-blue-400 text-sm lg:text-base flex items-center justify-center space-x-2">
                {/* <Upload className="w-5 h-5" /> */}
                <FileUp className="w-5 h-5" />
                <span>Upload document</span>
              </div>
            </div>
          </div>

          


            <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
              <Button onClick={prevStep} variant="ghost" className="flex-1 w-full py-6 md:flex-none bg-white text-base font-bold text-gray-600 hover:text-gray-900 cursor-pointer">
                Go back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold bg-lime-500 hover:bg-lime-600 text-gray-700"
              >
                Next
              </Button>
            </div>
        

      </div>
    </div>
  )
}
