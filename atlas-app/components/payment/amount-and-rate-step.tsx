"use client"

import { useState } from "react"
import { ChevronDown, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StepTitleDescription } from "./step-title-description"
import { PaymentData } from "@/types/payment"
import { useGetCurrenciesWithRatesQuery } from "@/store/api/schoolPaymentSlice"
import { ReactComponent as Bank } from '../../public/svgs/bank.svg';

function MyComponent() {
  return <Bank />;
}

interface PaymentDetailsStepProps {
  paymentData: PaymentData
  updatePaymentData: (data: Partial<PaymentData>) => void
  nextStep: () => void
  prevStep: () => void
  currentStep: number
}

export function AmountAndRateStep({
  paymentData,
  updatePaymentData,
  nextStep,
  prevStep,
  currentStep,
}: PaymentDetailsStepProps) {
  const { data, isLoading, isError } = useGetCurrenciesWithRatesQuery({})

  const currencies = data?.data || []

  const [selectedCurrency, setSelectedCurrency] = useState("CAD")
  const [amount, setAmount] = useState("")
  const [showCurrencyList, setShowCurrencyList] = useState(false)

  const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency)
  const selectedRate = selectedCurrencyData?.exchange_rate_to_ngn || 1

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode)
    setShowCurrencyList(false)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const convertedAmount =
    amount && !isNaN(Number(amount))
      ? (parseFloat(amount) * selectedRate).toFixed(2)
      : ""

  const isFormValid =
    paymentData.payerFirstName?.trim() &&
    amount.trim() !== "" &&
    !isNaN(Number(amount)) &&
    Number(amount) > 0

  const handleNext = () => {
    if (!isFormValid) return
    updatePaymentData({ amountCAD: amount }) // You can adapt if you want to track actual selectedCurrency
    updatePaymentData({ amountNGN: convertedAmount })
    nextStep()
  }

  return (
    <div className="min-h-screen p-4">
      <StepTitleDescription
        titleNormal="Amount and"
        titleGradient="rate"
        descriptions={["Enter details about the amount to be paid"]}
      />
      <div className="text-[#939b98] bg-white rounded-2xl p-4 min-h-[280px] relative">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <svg
              className="animate-spin h-10 w-10 text-lime-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : isError || !currencies.length ? (
          <div className="text-center text-red-500 py-12">
            Failed to load exchange rates.
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  <span className="text-2xl rounded-full">🇳🇬</span>
                  <span className="text-2xl">{selectedCurrencyData?.flag || "💱"}</span>
                </div>
                <span className="text-xl font-semibold">NGN/{selectedCurrency}</span>
              </div>
              <div className="text-xl font-semibold text-lime-500">
                ₦{Number(selectedRate).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Main Form */}
            <div className="space-y-2">
              <div className="w-full">
                <div className="relative space-y-2">
                  {/* Input Field */}
                  <div className="border-1 border-gray-200 p-3 rounded-2xl">
                    <h3 className="text-lg font-medium mb-2">Total fees</h3>
                    <div className="relative">
                      <input
                        type="search"
                        id="paymentAmount"
                        className="my-custom-search-input block w-full pr-6 py-4 text-gray-900 border-0 focus:border-0 focus:ring-0 rounded-lg text-base"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                      />
                      <div className="absolute end-2.5 bottom-2.5 border-1 border-gray-200 rounded-2xl bg-gray-50">
                        <button
                          onClick={() => setShowCurrencyList(!showCurrencyList)}
                          className="flex items-center gap-2 p-1 border-0 rounded-lg cursor-pointer"
                        >
                          <span className="text-medium">{selectedCurrencyData?.flag}</span>
                          <span className="font-sm">{selectedCurrency}</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      {showCurrencyList && (
                        <div className="absolute right-0 -mt-6 bg-white border border-gray-50 rounded-2xl shadow-lg z-20 p-4 w-fit">
                          <div className="space-y-1">
                            {currencies.map((currency) => (
                              <button
                                key={currency.code}
                                onClick={() => handleCurrencySelect(currency.code)}
                                className="w-full flex items-center gap-3 p-3 py-1 hover:bg-gray-50 rounded-xl transition-colors text-left cursor-pointer"
                              >
                                <span className="text-xl">{currency.flag}</span>
                                <span className="text-sm font-sm text-gray-900">{currency.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Converted amount */}
                  <div className="border-1 border-gray-200 p-3 rounded-2xl">
                    <h3 className="text-lg font-medium mb-2">Amount you will send</h3>
                    <div className="relative">
                      <input
                        type="text"
                        id="convertedAmount"
                        className="block w-full pr-4 py-4 text-gray-900 border-0 focus:border-0 focus:ring-0 rounded-lg text-base"
                        placeholder=""
                        disabled
                        value={new Intl.NumberFormat("en-CA", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(Number(convertedAmount))}
                        required
                      />
                      <div className="absolute end-2.5 bottom-2.5 border-0">
                        <button className="flex items-center gap-2 p-1 border-0 rounded-lg">
                          <span className="text-medium">🇳🇬</span>
                          <span className="font-sm">NGN</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Down arrow between boxes */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-lg">
                      <ChevronDown className="w-5 h-5 text-lime-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transfer method */}
              <div className="flex items-center gap-3 text-gray-500">
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer in Nigerian Naira</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
              <Button
                onClick={prevStep}
                variant="ghost"
                className="flex-1 w-full py-6 md:flex-none bg-white text-base font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                Go back
              </Button>
              <Button
                onClick={handleNext}
                className={cn(
                  "flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-medium",
                  isFormValid
                    ? "bg-lime-500 hover:bg-lime-600 text-white"
                    : "bg-gray-300 text-gray-400 cursor-not-allowed"
                )}
                disabled={!isFormValid}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
