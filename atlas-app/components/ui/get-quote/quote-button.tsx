"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import QuoteModal from "./quote-modal";
import Image from "next/image";

export default function InsightButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
            className="flex items-center justify-center rounded-full bg-lime-300 shadow-lg transition-all duration-300 h-14 px-5 gap-2"
          >
            <Image
              src="/svg/invoice-01.svg"
              alt="nexus"
              width={22}
              height={22}
            />
           
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen && <QuoteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
