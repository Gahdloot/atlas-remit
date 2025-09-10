"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, File as FileIcon } from "lucide-react";

// Helper function to combine class names
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

interface FileInputProps {
  label: string;
  optional?: boolean;
  onFileChange: (file: File | null) => void;
}

/**
 * A reusable file input component with drag-and-drop functionality,
 * styled to match the provided design. The selected file is displayed
 * in a separate element below the drop zone.
 */
export const FileInput: React.FC<FileInputProps> = ({ label, optional = false, onFileChange }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File | undefined) => {
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  };

  // --- Drag and Drop Handlers ---
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is necessary to allow dropping
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // --- File Selection and Removal ---
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevents the drop zone's onClick from firing
    setFile(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset the input field
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700 mb-1.5 block">
        {label}{" "}
        {optional && <span className="text-gray-400 font-normal">(optional)</span>}
      </label>

      {/* --- Drop Zone --- */}
      <div
        onClick={openFileDialog}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        className={cn(
         "flex items-center justify-center px-3 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out",
          isDragging
            ? "border-lime-600 bg-lime-100/80"
            : "border-lime-400/80 bg-lime-50/50 hover:bg-lime-100/80",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={onFileSelect}
        />
        <div className="flex items-center gap-3 text-center">
          <UploadCloud className="w-6 h-6 text-lime-600" />
          <p className="text-sm text-gray-500">
            Drop file here or{" "}
            <span className="font-semibold text-lime-600">choose file</span>
          </p>
        </div>
      </div>

      {/* --- Selected File Display --- */}
      {file && (
        <div className="mt-3 flex items-center justify-between w-1/2 bg-gray-100 px-3 py-2 rounded-lg text-sm">
           <div className="flex items-center gap-2">
              <FileIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <p className="text-gray-800 font-medium truncate" title={file.name}>
                {file.name}
              </p>
           </div>
          <button
            onClick={removeFile}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Remove file"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};