"use client"

import { useState } from "react"
import { Plus, Minus, GraduationCap } from "lucide-react"

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Do I need to create an account?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus.",
    },
    {
      question: "How long does it take to process my payment?",
      answer:
        "Payment processing typically takes 1-3 business days depending on the destination country and payment method used.",
    },
    {
      question: "What currencies do you support?",
      answer:
        "We support major currencies including USD, GBP, EUR, CAD, AUD, and many more for international tuition payments.",
    },
    {
      question: "Will I get a confirmation when my payment is processed?",
      answer:
        "Yes, you will receive email confirmations at every step of the payment process, including when funds are delivered to your institution.",
    },
    {
      question: "Is my information secure?",
      answer:
        "Absolutely. We use bank-level encryption and security measures to protect all your personal and financial information.",
    },
    {
      question: "What documents do I need to upload?",
      answer:
        "You'll typically need your admission letter, invoice from the institution, and valid identification documents.",
    },
    {
      question: "Can I pay for someone else",
      answer:
        "Yes, you can make payments on behalf of family members or dependents with proper authorization and documentation.",
    },
    {
      question: "Lorem ipsum",
      answer: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Detailed answer would go here.",
    },
  ]

  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Content */}
          <div className="col-span-2">
            <p className="flex items-center gap-3 text-sm text-lime-100 bg-[#01120b] px-4 py-2 rounded-full w-fit shadow-lime-50/20 shadow mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>FAQs</span>
            </p>

            <h2 className="text-4xl font-bold leading-tight bg-gradient-to-r from-lime-100 via-lime-200 to-green-300 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-400  mb-8 leading-relaxed">
              Find quick answers to common questions about making payments, using Nexus, and resolving issues...
            </p>

            <button className="border-lime-50 border text-lime-100 p-2 px-4  rounded-md text-xs font-medium">
              More FAQs
            </button>
          </div>

          {/* Right Content - FAQ List */}
          <div className="space-y-4 col-span-3">
            {faqs.map((faq, index) => {
              const isOpen = openFAQ === index;
              return (
                <div key={index} 
                className="
                bg-gradient-to-r from-green-900/20 to-transparent border border-lime-800/30 
                rounded-md overflow-hidden transition-all

                ">
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="w-full p-6 text-left text-lime-50 flex justify-between items-center transition-colors focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`transition-all duration-300 px-6 pb-0 overflow-hidden ${isOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 opacity-0 py-0'}`}
                    aria-hidden={!isOpen}
                  >
                    <p className="text-sm text-lime-50 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

