"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Mail } from "lucide-react"

interface EmailSentConfirmationProps {
  email: string
  onResendEmail: () => void
  onEditEmail: () => void
}

export default function EmailSentConfirmation({
  email,
  onResendEmail,
  onEditEmail,
}: EmailSentConfirmationProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <Card className="bg-transparent w-full max-w-sm sm:max-w-md border-0 mx-auto">
        <CardHeader className="text-center pb-6 px-4 sm:px-6">
            {/* Logo */}
            <div className="mb-8 sm:mb-12">
            <div className="text-white text-2xl font-bold">Atlas</div>
            <div className="text-gray-400 text-sm">By Oneremit</div>
            </div>

            {/* Email Icon */}
            <div className="mb-8">
                <div className="relative w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-1">
                    <p className="bg-lime-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg p-2">
                    <Mail className="w-8 h-8 text-black" />
                    </p>
                </div>
            </div>

            {/* Email Sent Text */}
            <div className="space-y-4 mb-6">
                <h1 className="text-white text-2xl sm:text-3xl font-normal">Email sent!</h1>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    An email with heyy your payment information has been sent to{" "}
                    <span className="text-lime-400">{email}</span>
                </p>
            </div>

            {/* Resend Option */}
            <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                    Didn't get an email?{" "}
                    <button
                    onClick={onResendEmail}
                    className="text-white underline hover:text-lime-400 transition-colors"
                    >
                    Resend email
                    </button>
                </p>

                <div className="text-gray-500 text-sm">OR</div>

                <Button
                    onClick={onEditEmail}
                    className="bg-lime-400 hover:bg-lime-500 text-black 
                        border-lime-400 hover:border-lime-500 font-semibold 
                        h-12 px-8 rounded-lg  cursor-pointer"
                >
                    Edit email
                </Button>
            </div>
        </CardHeader>
        </Card>
    </div>
  )
}
