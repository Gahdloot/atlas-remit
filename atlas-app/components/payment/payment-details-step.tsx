"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PaymentData } from "@/app/payment/page"

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

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-sm">🇳🇬 NON/CAD</span>
          <span className="text-accent font-semibold text-lg">₦1,510.17</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">🇬🇧 NGN/GBP</span>
          <span className="text-accent font-semibold text-lg">₦1,834.82</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-gray-900">
          Payment <span className="text-accent">details</span>
        </h2>
        <p className="text-gray-600">Enter the details required below</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Country paying from</label>
          <Input
            placeholder="Enter country"
            value={paymentData.countryFrom}
            onChange={(e) => updatePaymentData({ countryFrom: e.target.value })}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Country paying to</label>
          <Input
            placeholder="Enter country"
            value={paymentData.countryTo}
            onChange={(e) => updatePaymentData({ countryTo: e.target.value })}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount in NGN</label>
            <Input
              placeholder=""
              value={paymentData.amountNGN}
              onChange={(e) => updatePaymentData({ amountNGN: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount in CAD</label>
            <Input
              placeholder=""
              value={paymentData.amountCAD}
              onChange={(e) => updatePaymentData({ amountCAD: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name of payer</label>
          <Input
            placeholder=""
            value={paymentData.payerName}
            onChange={(e) => updatePaymentData({ payerName: e.target.value })}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Identity type (for payer)</label>
            <Select
              value={paymentData.identityType}
              onValueChange={(value) => updatePaymentData({ identityType: value })}
            >
              <SelectTrigger className="bg-gray-50 border-gray-200">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drivers-license">Drivers License</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="national-id">National ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Expiration date</label>
            <Input
              placeholder=""
              value={paymentData.expirationDate}
              onChange={(e) => updatePaymentData({ expirationDate: e.target.value })}
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Upload identity document (for payer)</label>
          <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-blue-600 text-sm flex items-center justify-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Upload document</span>
            </div>
          </div>
        </div>

        <Button onClick={handleNext} className="w-full bg-gray-300 text-gray-500 hover:bg-gray-400">
          Continue
        </Button>
      </div>
    </div>
  )
}
