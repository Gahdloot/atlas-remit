"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { X, Upload, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  nextStep: () => void
  amountNGN: string
  amountCAD: string
}

export function PaymentModal({ isOpen, onClose, amountNGN, amountCAD, nextStep }: PaymentModalProps) {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handlePaymentComplete = () => {
    // Handle payment completion logic
    console.log("Payment marked as complete")
    onClose()
    nextStep()
    // router.push("/get-started/payment-submitted") 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full max-w-none sm:max-w-md sm:h-auto sm:rounded-lg mx-0 sm:mx-auto bg-white shadow-xl">
        <DialogHeader className="relative">
          <button onClick={onClose} className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </DialogHeader>

        <div className="px-6 space-y-6">
          {/* Amount Display */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto">
              <FileText className="h-8 w-8 text-lime-600" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">{amountNGN} EUR</h2>
              <p className="text-lime-600 font-medium">{amountCAD} CAD</p>
            </div>
          </div>


        <div className=" bg-gray-100 p-4 space-y-4">

             {/* Instructions */}
          <p className=" text-gray-600 text-sm">Please pay the amount above into the bank details below</p>

          {/* Bank Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Bank name</p>
              <p className="font-medium text-gray-900">BANCA DE SABADEL</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">IBAN</p>
              <p className="font-medium text-gray-900">0123456780138547859</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">SWIFT/BIC</p>
              <p className="font-medium text-gray-900">GBEU294U4</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Account name</p>
              <p className="font-medium text-gray-900">ONEREMIT TECHNOLOGIES</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Upload payment receipt</p>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-white">
              <input
                type="file"
                id="receipt-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="receipt-upload"
                className="flex items-center  justify-center cursor-pointer space-x-2"
              >
                <Upload className="h-4 w-4 text-blue-500" />
                <span className="text-blue-500 text-sm font-medium">
                  {uploadedFile ? uploadedFile.name : "Upload document"}
                </span>
              </label>
            </div>
          </div>


        </div>
         
          {/* Action Button */}
          <div className=" flex justify-center items-center">

            <Button
            onClick={handlePaymentComplete}
            className=" py-3 bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg cursor-pointer "
          >
            I have paid
          </Button>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  )
}