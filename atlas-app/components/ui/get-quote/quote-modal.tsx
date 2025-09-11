"use client";

import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Flag } from "@/components/ui/flag-icon";
import { useGetCurrenciesWithRatesQuery } from "@/store/api/schoolPaymentSlice";

interface Currency {
  code: string;
  name: string;
  exchange_rate_to_ngn: number;
}

interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InsightModal({ isOpen, onClose }: InsightModalProps) {
  const { data, isLoading, isError } = useGetCurrenciesWithRatesQuery({});
  const currencies = data?.data || [];
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("CAD");
  const [showCurrencyList, setShowCurrencyList] = useState(false);
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  return () => {
    // Always restore scrolling
    document.body.style.overflow = "auto";

    // Reset modal state
    setAmount("");
    setSelectedCurrency("CAD");
    setShowCurrencyList(false);
  };
}, [isOpen]);


  if (!isOpen) return null;

  const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency);
  const selectedRate = selectedCurrencyData?.exchange_rate_to_ngn || 1;

  const numericAmount = amount.replace(/,/g, "");
  const convertedAmount =
    numericAmount && !isNaN(Number(numericAmount))
      ? (parseFloat(numericAmount) * selectedRate).toFixed(2)
      : "";

  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    setShowCurrencyList(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/,/g, "");
    if (!raw) return setAmount("");
    if (!/^(\d+(\.\d{0,2})?)?$/.test(raw)) return;
    let [integerPart, decimalPart] = raw.split(".");
    integerPart = Number(integerPart).toLocaleString("en-CA");
    const formatted = decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
    setAmount(formatted);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#0000007d]  z-40"
        onClick={onClose}
      />

     <div className="fixed bottom-4 right-2 left-2 sm:bottom-20 sm:right-8 sm:left-auto z-50">


        {/* Close button outside scrollable modal */}
        <button
          onClick={onClose}
          className="absolute -top-6 right-0 flex items-center justify-center rounded-full bg-lime-400 w-12 h-12 hover:bg-lime-500 transition z-50"
        >
          <X className="w-6 h-6 text-black" />
        </button>

        {/* Modal content */}
        <div className="w-full sm:w-[31rem] max-h-[90vh] bg-[#0C1207] rounded-3xl shadow-lg p-6 overflow-auto">
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
                  <div className="flex items-center -space-x-1">
                    <Flag currencyCode="NGN" alt="Nigeria" size="md" />
                    {selectedCurrencyData && (
                      <Flag
                        currencyCode={selectedCurrencyData.code}
                        alt={selectedCurrencyData.name}
                        size="md"
                      />
                    )}
                  </div>

                  <span className="font-medium text-gray-300 text-sm flex items-center gap-2">
                    NGN
                    <span className="text-lime-500">&rarr;</span>
                    {selectedCurrency}
                  </span>
                </div>

                <div className="text-xl font-semibold text-lime-500">
                  ₦
                  {Number(selectedRate).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-2">
                {/* Main Amount */}
                <div className="border border-lime-200 p-3 rounded-2xl bg-[#0C1207]">
                  <h3 className="text-md font-medium mb-2">Amount Due</h3>
                  <div className="relative">
                    <input
                      type="text"
                      className="outline-none block w-full pr-6 py-4 text-[#43483f] border-0 focus:ring-0 rounded-lg text-base"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                    />
                    <div className="absolute end-2.5 bottom-2.5 border border-gray-200 rounded-2xl bg-[#0C1207]">
                      <button
                        onClick={() => setShowCurrencyList(!showCurrencyList)}
                        className="flex items-center gap-2 p-1 border-0 rounded-lg cursor-pointer"
                      >
                        {selectedCurrencyData && (
                          <Flag
                            currencyCode={selectedCurrencyData.code}
                            alt={selectedCurrencyData.name}
                            size="md"
                          />
                        )}
                        <span className="font-sm">{selectedCurrency}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {showCurrencyList && currencies.length > 0 && (
                      <div className="absolute right-0 top-full bg-[#0C1207] border border-lime-900 rounded-2xl shadow-lg z-20 p-2 w-fit">
                        <div className="space-y-1">
                          {currencies.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => handleCurrencySelect(c.code)}
                              className="w-full flex items-center border-b border-lime-900 hover:bg-[#0C4207] gap-3 p-2  transition-colors text-left cursor-pointer"
                            >
                              <Flag
                                currencyCode={c.code}
                                alt={c.name}
                                size="md"
                              />
                              <span className="text-sm font-sm text-gray-200">
                                {c.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Converted Amount */}
                <div className="border border-lime-900 p-3 rounded-2xl bg-[#0C1207]">
                  <h3 className="text-md font-medium mb-2">Student will pay</h3>
                  <div className="relative">
                    <input
                      type="text"
                      className="block w-full text-[#43483f] pr-4 py-4 border-0 focus:ring-0 rounded-lg text-base"
                      value={new Intl.NumberFormat("en-NG", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(Number(convertedAmount))}
                      disabled
                    />
                    <div className="absolute end-2.5 bottom-2.5 border-0">
                      <button className="flex items-center gap-2 p-1 border-0 rounded-lg">
                        <Flag currencyCode="NGN" alt="Nigeria" size="md" />
                        <span className="font-sm">NGN</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center text-sm gap-3 text-gray-300 mt-4">
                <span>
                  Pay smarter with <span className="text-lime-300">Nexus by Oneremit</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
