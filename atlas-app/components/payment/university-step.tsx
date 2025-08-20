"use client"

import type { PaymentData } from "@/app/payment/page"
import { GraduationCap } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface UniversityStepProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
  prevStep: () => void
  currentStep: number
}



const universities = [
  "Algoma University",
  "A.T. Still University",
  "Alfred University",
  "Alliant International University",
  "Ambrose University",
  "Academy Canada",
  "Acadia University",
  "Alberta University of the Arts",
  "Athabasca University",
  "Brandon University",
]

export function UniversityStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: UniversityStepProps) {

  const handleNext = () => {
      nextStep()

    console.log(paymentData.university)
    if (paymentData.university) {
      nextStep()
    }
  }

// export default function UniversityStep() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("")

  const filteredUniversities = universities.filter((university) =>
    university.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelect = (university: string) => {
    setSelectedUniversity(university)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleClear = () => {
    setSelectedUniversity("")
    setSearchTerm("")
  }

  return (
    <div className="">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Choose your <span className="leading-tight bg-gradient-to-tl from-lime-500 via-lime-600 to-green-700 bg-clip-text text-transparent">University</span>
          </h1>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Please select your university to continue.</p>
            <p>ATLAS supports schools in Canada and the UK for now.</p>
          </div>
        </div>

        {/* University Selection */}
        <div className="space-y-2 mt-4 md:mt-6">
          <label className=" text-gray-600 mb-2 text-base font-bold">Choose University</label>

          <div className="relative mt-2">
            {/* Main Dropdown Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-full flex items-center gap-3 p-4 border-1  transition-colors rounded-3xl cursor-pointer",
                isOpen ? "border-lime-400 bg-lime-50/60" : "border-white ", selectedUniversity ? "bg-lime-50/60 border-lime-400": "bg-white",
              )}
            >
            {/* University Icon */}
          <div className=" w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center ">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-black" />
            </div>
          </div>

              {/* Text Content */}
              <div className="flex-1 text-left">
                {selectedUniversity ? (
                  <div className="flex items-center justify-between">
                    <div className=" flex flex-col gap-2">
                      <div className="text-sm font-medium text-gray-900">University</div>
                      <div className=" text-xs text-gray-600 flex items-center justify-between space-x-16 bg-white border-[1px] border-gray-50 rounded-xl p-1 px-3">
                        <p>{selectedUniversity}</p>
                        
                      <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClear()
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClear()
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-medium text-gray-900">University</div>
                    <div className="text-sm text-gray-500">Select a university</div>
                  </div>
                )}
              </div>

              {/* Chevron */}
              {!selectedUniversity && (
                <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen && "rotate-180")} />
              )}
            </button>

            {/* Dropdown Content */}
            {isOpen && (
              <div className="absolute top-4/5 left-0 right-0 mt-1 bg-white  rounded-3xl shadow-sm z-50 max-h-80 overflow-hidden">
                {/* Search Input */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="University!"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 border-[2px] focus:ring-[1px] focus:border-gray-300 focus-visible:border-gray-200 focus:ring-gray-200 text-gray-400 rounded-3xl h-12"
                    />
                  </div>
                </div>

                {/* University List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredUniversities.map((university) => (
                    <button
                      key={university}
                      onClick={() => handleSelect(university)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
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

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
          <Button onClick={prevStep} variant="ghost" className="flex-1 w-full py-6 md:flex-none bg-white text-base font-bold text-gray-600 hover:text-gray-900 cursor-pointer">
            Go back
          </Button>
          <Button
            onClick={handleNext}
            className={cn(
              "flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold",
              selectedUniversity
                ? "bg-lime-500 hover:bg-lime-600 text-white"
                : "bg-gray-300 text-gray-400 cursor-not-allowed",
            )}
            disabled={!selectedUniversity}
          >
            {selectedUniversity ? "Next" : "Next"}
          </Button>
        </div>

        {/* Mobile Continue Button */}
        {/* <div className="md:hidden">
          {selectedUniversity && <Button className="w-full bg-lime-500 hover:bg-lime-600 text-white">Continue</Button>}
        </div> */}
      </div>
    </div>
  )
}
