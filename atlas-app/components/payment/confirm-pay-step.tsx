"use client"

import { Button } from "@/components/ui/button"
import { PaymentModal } from "./payment-modal"
import { useState } from "react"
import { StepTitleDescription } from "./step-title-description"
import { PaymentData } from "@/types/payment"
import { PenLine } from "lucide-react"
import { useRouter } from "next/navigation"
import { 
  useCreatePaymentRequestMutation, 
  useGetOneTimeVirtualAccountMutation 
} from "@/store/api/schoolPaymentSlice"
import { toast } from "sonner" 
import type { VirtualAccount } from "@/types/payment"

interface ConfirmPayStepProps {
  paymentData: PaymentData
  prevStep: () => void
  nextStep: () => void
  currentStep: number
}

export function ConfirmPayStep({ paymentData, prevStep, currentStep, nextStep }: ConfirmPayStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [virtualAccount, setVirtualAccount] = useState<VirtualAccount | null>(null)
  const [paymentId, setPaymentId] = useState<string>('')
  const [emailUser, setEmailUser] = useState<string>('')
  const router = useRouter()

  const [createPaymentRequest, { isLoading: isCreatingPayment }] = useCreatePaymentRequestMutation()
  const [getVirtualAccount, { isLoading: isGeneratingAccount }] = useGetOneTimeVirtualAccountMutation()

  const isProcessing = isCreatingPayment || isGeneratingAccount

  const handlePayNow = async () => {
    try {
      const paymentResult = await createPaymentRequest(paymentData).unwrap() as any
      
      console.log('Payment request created:', paymentResult)

      const virtualAccountData = {
        payment_request_id: paymentResult.data.id,
        amount: paymentData.amountNGN,
      }

      setPaymentId(paymentResult.data.id)
      setEmailUser(paymentResult.data.email)

      console.log('Generating virtual account...', virtualAccountData)
      const accountResult = await getVirtualAccount(virtualAccountData).unwrap()
      
      console.log('Virtual account generated:', accountResult)

      setVirtualAccount(accountResult.data as any)
      setIsModalOpen(true)

      toast.success('Virtual account generated successfully!')
      
    } catch (error: any) {
      
      let errorMessage = 'Failed to process payment. Please try again.'
      
      if (error?.data?.message) {
        errorMessage = error.data.message
        console.log(currentStep,nextStep)
      } else if (error?.message) {
        errorMessage = error.message
      }

      toast.error(errorMessage)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setVirtualAccount(null)
  }

  const handleComplete = () => {
    router.push(`/payment/confirmed?email=${emailUser}`)
  }

  return (
    <div className="min-h-[70vh]">
      {/* Right side - Form */}
      <div className="space-y-3">
        <StepTitleDescription
          titleNormal={"Confirm and"}
          titleGradient={" pay"}
          descriptions={["Review details and pay"]}
        />

        <div className="space-y-2 bg-white p-4 mt-4 md:mt-6">
          <div className="grid grid-cols-2 gap-4 md:gap-12 pt-4 justify-between w-full">
            <Button
              onClick={prevStep}
              variant="ghost"
              disabled={isProcessing}
              className="flex-1 w-full py-6 md:flex-none bg-white text-base font-bold text-gray-600 hover:text-gray-900 cursor-pointer disabled:opacity-50"
            >
              <PenLine />
              <span>Edit details</span>
            </Button>
            
            <Button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold bg-lime-500 hover:bg-lime-600 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <PenLine />
                  <span>Pay now</span>
                </>
              )}
            </Button>
          </div>

          {/* Loading indicator */}
          {isProcessing && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800 mr-2"></div>
                {isCreatingPayment && "Creating payment request..."}
                {isGeneratingAccount && "Generating virtual account..."}
              </p>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              Rate will be locked for <span className="font-semibold">24 hours</span> at{" "}
              <span className="font-semibold">1,510.17 NGN</span> after quote is generated
            </p>
          </div>

          {/* Payment Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-2">Payment details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Amount Payable</p>
                <p className="text-gray-600">NGN {paymentData.amountNGN}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Amount in CAD</p>
                <p className="text-gray-600">CAD {paymentData.amountCAD}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Payment method</p>
                <p className="text-gray-600">Bank Transfer in Nigeria Naira</p>
              </div>
            </div>
          </div>

          {/* Payer Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-2">Payer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Country</p>
                <p className="text-gray-600">{paymentData.payerAddress || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Payer</p>
                <p className="text-gray-600">{paymentData.payerType || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Full name</p>
                <p className="text-gray-600">{paymentData.payerFirstName} {paymentData.payerLastName || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Address</p>
                <p className="text-gray-600">{paymentData.payerAddress || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">City</p>
                <p className="text-gray-600">{paymentData.payerCity || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">State / Province / Region</p>
                <p className="text-gray-600">{paymentData.payerState || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Phone number</p>
                <p className="text-gray-600">{paymentData.payerPhoneNumber || ""}</p>
              </div>
            </div>
          </div>

          {/* Student Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 mb-2">Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Institution name</p>
                <p className="text-gray-600">{paymentData.studentInstitution || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Expected year of graduation</p>
                <p className="text-gray-600">{paymentData.studentExpectedYearOfCompletion || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Program of study</p>
                <p className="text-gray-600">{paymentData.studentProgramStudied || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Full name</p>
                <p className="text-gray-600">
                  {paymentData.studentFirstName} {paymentData.studentLastName || ""}
                </p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Student email</p>
                <p className="text-gray-600">{paymentData.studentEmail || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Personal email</p>
                <p className="text-gray-600">{paymentData.studentPersonalEmail || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Mobile number</p>
                <p className="text-gray-600">{paymentData.studentPhoneNumber || ""}</p>
              </div>
              <div className="border-b border-gray-100 space-y-1 py-3">
                <p className="text-muted-foreground">Date of birth</p>
                <p className="text-gray-600">{paymentData.studentDateOfBirth || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated PaymentModal with virtual account data */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amountNGN={paymentData.amountNGN}
        amountCAD={paymentData.amountCAD}
        nextStep={handleComplete}
        virtualAccount={virtualAccount}
        payment_reference={paymentId}
        // paymentData={paymentData}
      />
    </div>
  )
}
