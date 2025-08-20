"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentData } from "@/app/payment/page"
import { InputWithLabel } from "../ui/input-with-label"

interface PaymentDetailsStepProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
  prevStep: () => void
  currentStep: number
}

export function PaymentDetailsStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: PaymentDetailsStepProps) {
  const handleNext = () => {
    nextStep()
  }


  const isFormValid =
    paymentData.countryFrom?.trim() &&
    paymentData.countryTo?.trim() &&
    paymentData.amountNGN?.trim() &&
    paymentData.amountCAD?.trim() &&
    paymentData.payerName?.trim() &&
    paymentData.identityType?.trim() &&
    paymentData.expirationDate?.trim()

  return (
    <div className="min-h-screen  p-4 ">
      <div className="">
        <div className="flex flex-col md:flex-row gap-2 mb-8">
          <Card className="bg-white/95 backdrop-blur-md border-0  rounded-xl  py-1">
            <CardContent className="p-4 flex items-center justify-between min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">₦</span>
                </div>
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">C</span>
                </div>
              </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-black">NGN/CAD</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lime-600 text-xl">₦1,510.17</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/95 backdrop-blur-md border-0 rounded-xl  py-1">
            <CardContent className="p-4 flex items-center justify-between min-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">₦</span>
                </div>
                <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">£</span>
                </div>
              </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-black">
                    NGN/CAD
                    </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lime-600 text-xl">₦1,510.17</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2 mb-8 w-full">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Payment <span className="leading-tight bg-gradient-to-tl from-lime-500 via-lime-600 to-green-700 bg-clip-text text-transparent">details</span>
          </h2>
          <p className="text-gray-500 text-sm lg:text-base">Enter the details required below</p>
        </div>

        <div className="space-y-6">
          <InputWithLabel
            label="Country paying from"
            placeholder="Enter country"
            value={paymentData.countryFrom}
            inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
            onChange={(e) => updatePaymentData({ countryFrom: e.target.value })}
          />


          <InputWithLabel
              label="Country paying to"
              placeholder="Enter country"
              value={paymentData.countryTo}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ countryTo: e.target.value })}
            />


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWithLabel
              label="Amount in NGN"
              value={paymentData.amountNGN}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ amountNGN: e.target.value })}
            />
            <InputWithLabel
              label="Amount in CAD"
              value={paymentData.amountCAD}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ amountCAD: e.target.value })}
            />
          </div>


          <InputWithLabel
              label="Name of payer"
              value={paymentData.payerName}
              inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
              onChange={(e) => updatePaymentData({ payerName: e.target.value })}
            />


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div className="space-y-2 w-full">
              <label className="text-sm font-bold text-[#939b98]">Identity type (for payer)</label>
              <Select
                value={paymentData.identityType}
                onValueChange={(value) => updatePaymentData({ identityType: value })}
              >
                <SelectTrigger className=" border-gray-200 py-4 lg:py-6 text-sm lg:text-base  w-full">
                  <SelectValue placeholder="Select..."  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drivers-license">Drivers License</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="national-id">National ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <InputWithLabel
                label="Expiration date"
                value={paymentData.expirationDate}
                inputClassName="bg-gray-50 border-gray-200 py-4 lg:py-6 text-sm lg:text-base pr-10"
                onChange={(e) => updatePaymentData({ expirationDate: e.target.value })}
              />

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

          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className={cn(
              "w-full py-4 md:py-6 text-base font-bold mt-8 rounded-lg transition-all",
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
  )
}
