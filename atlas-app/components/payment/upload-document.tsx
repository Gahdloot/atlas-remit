"use client";

import React, { useState } from "react";
import { FileInput } from "@/components/ui/file-upload"; 
import { useUploadFileBase64Mutation } from "@/store/api/schoolPaymentSlice"; 
import {Button} from "@/components/ui/button";
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface DocumentsState {
  payerId: File | null;
  admissionLetter: File | null;
  supportingDocs: File | null;
}

interface DocumentUploadPageProps {
  nextStep: () => void;
  prevStep: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
};

export default function DocumentUploadPage({ nextStep, prevStep }: DocumentUploadPageProps) {
  const [documents, setDocuments] = useState<DocumentsState>({
    payerId: null,
    admissionLetter: null,
    supportingDocs: null,
  });

  const [uploadFileBase64, { isLoading }] = useUploadFileBase64Mutation();

  const handleFileChange =
    (fieldName: keyof DocumentsState) => (file: File | null) => {
      setDocuments((prev) => ({ ...prev, [fieldName]: file }));
    };

  const isFormValid = !!documents.payerId;

  const handleNext = async () => {
      nextStep(); 
  };

  return (
    <div className=" flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl bold text-gray-800">Documents</h1>
          <p className="text-gray-500 mt-1">Upload required documents</p>
        </div>

        <div className="space-y-6">
          <FileInput label="Payer ID" onFileChange={handleFileChange("payerId")} />
          <FileInput label="Student's Letter of admission" onFileChange={handleFileChange("admissionLetter")} />
          <FileInput label="Other supporting documents" optional onFileChange={handleFileChange("supportingDocs")} />
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
