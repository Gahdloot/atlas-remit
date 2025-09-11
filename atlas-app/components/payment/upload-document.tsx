"use client";

import React, { useState } from "react";
import { FileInput } from "@/components/ui/file-upload"; 
import { Button } from "@/components/ui/button";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface DocumentsState {
  payerId: File[];
  admissionLetter: File[];
  supportingDocs: File[];
}

interface DocumentUploadPageProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function DocumentUploadPage({ nextStep, prevStep }: DocumentUploadPageProps) {
  const [documents, setDocuments] = useState<DocumentsState>({
    payerId: [],
    admissionLetter: [],
    supportingDocs: [],
  });


  const handleFileChange =
    (fieldName: keyof DocumentsState) => (file: File | null) => {
      if (!file) return;
      setDocuments((prev) => ({
        ...prev,
        [fieldName]: [...prev[fieldName], file], 
      }));
    };

  const isFormValid = documents.payerId.length > 0;

  const handleNext = () => nextStep();

  return (
    <div className="flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl semi-bold text-gray-800">Documents</h1>
          <p className="text-gray-500 mt-1">Upload required documents</p>
        </div>

        <div className="space-y-6">
          {(["payerId", "admissionLetter", "supportingDocs"] as (keyof DocumentsState)[]).map((field) => (
            <div key={field}>
              <FileInput
                label={
                  field === "payerId"
                    ? "Payer ID"
                    : field === "admissionLetter"
                    ? "Student's Letter of Admission"
                    : "Other Supporting Documents (Optional)"
                }
                onFileChange={handleFileChange(field)}
              />

              {documents[field].length > 0 && (
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                 
                </ul>
              )}
            </div>
          ))}
        </div>

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
              "flex-1 md:flex-none px-8 w-full py-6 cursor-pointer text-base font-bold",
              isFormValid
                ? "bg-lime-500 hover:bg-lime-600 text-white"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            )}
            disabled={!isFormValid}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
