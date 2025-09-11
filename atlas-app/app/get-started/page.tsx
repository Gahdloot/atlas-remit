"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  useSendWelcomeEmailMutation,
  useResendEmailMutation,
} from "@/store/api/schoolPaymentSlice";
import Link from "next/link";
import Mail from "@/public/svg/mail-01.svg";
import SVGIcon from "@/components/ui/svg-wrapper";
import Logo from "@/public/svg/Nexus.svg";
export default function GetStartedPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("1");
  const [sendWelcomeEmail, { isLoading, error }] =
    useSendWelcomeEmailMutation();
  const [
    resendWelcomeEmail,
    { isLoading: isResendEmailLoading, error: resendErr },
  ] = useResendEmailMutation();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = async () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // how to get the current domain and append /payment to it for the rediret url
    const redirectUrl = `${window.location.origin}/payment`;
    const payload = {
      email,
      redirect_url: redirectUrl,
    };
    try {
      await sendWelcomeEmail(payload).unwrap();
      setStep("2");
    } catch (err) {
      console.error("Failed to send welcome email:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleResendEmail = async () => {
    if (!validateEmail(email)) {
      alert("Invalid email.");
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/payment`;
      const payload = {
        email,
        redirect_url: redirectUrl,
      };
      await resendWelcomeEmail(payload).unwrap();
      alert("Resend email sent successfully.");
    } catch (err) {
      console.error("Failed to resend email:", err);
      alert("Something went wrong while resending the email.");
    }
  };

  // EmailSentConfirmation
  return (
    <div className="min-h-screen flex">
      {/* Right Side */}
      <div
        className={`w-full flex flex-col`}
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Step Content */}
        <div className="flex-1 p-8">
          <div className="w-full lg:w-2/3 lg:mx-auto">
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
              <Card className="bg-transparent w-full max-w-sm sm:max-w-md border-0 mx-auto">
                <CardHeader className="text-center pb-6 px-4 sm:px-6">
                  <div className="flex justify-center">
                    <Link href={"/"} className="mb-2 sm:mb-6">
                      <Image
                        src={"/svg/Nexus.svg"}
                        alt={"nexus"}
                        width={140}
                        height={54}
                      />
                    </Link>
                  </div>

                  {step == "1" ? (
                    <>
                      <div className="space-y-1 mb-6">
                        <h2 className="text-white text-2xl font-work-sans-override sm:text-3xl font-normal">
                          <span className="text-lime-500">Welcome</span> to
                          Nexus!
                        </h2>

                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                          Enter your email to get the secure link and start your
                          tution payment
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className=" border-t border-gray-900">
                        <div className="relative w-30 mt-2 h-30 bg-accent/20 rounded-full mb-4 flex items-center justify-center mx-auto mb-6 shadow-lg p-1">
                          <div className="bg-lime-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg p-4">
                            <SVGIcon icon={Mail} size="40" fill="none" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1 mb-3">
                        <h1 className="text-white text-2xl sm:text-3xl font-normal leading-tight">
                          <span className="text-lime-200">Email sent!</span>
                        </h1>
                        <div className="space-y-4 mb-6">
                          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                            An email with has been sent to
                            to <span className="text-lime-400">{email}</span>
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 px-4 sm:px-6 items-center">
                        <p className="text-gray-400 text-sm">
                          Didn't get an email?{" "}
                          <button
                            onClick={handleResendEmail}
                            className="text-white underline hover:text-lime-400 transition-colors disabled:opacity-50"
                            disabled={isResendEmailLoading}
                          >
                            {isResendEmailLoading
                              ? "Resending..."
                              : "Resend email"}
                          </button>
                        </p>

                        <div className="text-gray-500 text-sm">OR</div>

                        <Button
                          onClick={() => setStep("1")}
                          className="bg-lime-400 hover:bg-lime-500 text-black 
                      border-lime-400 hover:border-lime-500 font-semibold 
                      h-12 px-8 rounded-lg  cursor-pointer"
                        >
                          Edit email
                        </Button>
                      </div>
                    </>
                  )}
                </CardHeader>
                {step == "1" ? (
                  <CardContent className="space-y-6 px-4 sm:px-6">
                    {/* Email Input */}
                    <div className="space-y-3">
                      <label className="text-gray-400 text-sm font-medium block text-left">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="kunlead03@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                  border-2 
                  border-lime-400 
                  rounded-lg 
                  text-gray-500 
                  placeholder:text-gray-500
                  h-12 
                  sm:h-14 
                  px-4
                  text-base
                  focus:border-lime-300
                  focus:ring-lime-400/20
                  focus:ring-2
                "
                      />
                    </div>

                    {/* Continue Button */}
                    <div className="pt-4">
                      <Button
                        onClick={handleContinue}
                        className="
                    w-full 
                    bg-lime-400 
                    hover:bg-lime-500 
                    text-black 
                    font-semibold 
                    h-12 
                    sm:h-14 
                    rounded-lg
                    text-base
                    transition-colors
                    duration-200
                    cursor-pointer
                  "
                        disabled={!validateEmail(email) || isLoading}
                      >
                        {isLoading ? "Sending..." : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                ) : (
                  <></>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
