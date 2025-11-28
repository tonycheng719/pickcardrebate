"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js"; // Import directly to control config
import { ImagePlus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  bucket?: string;
  folder?: string;
  label?: string;
  recommendedSize?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  bucket = "images",
  folder = "uploads",
  label = "上傳圖片",
  recommendedSize,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      if (result.url) {
        onChange(result.url);
        toast.success("圖片上傳成功");
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`上傳失敗: ${error.message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {recommendedSize && (
          <span className="text-xs text-gray-500">
            建議尺寸: {recommendedSize}
          </span>
        )}
      </div>

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 w-full max-w-[300px] aspect-video flex items-center justify-center">
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onRemove}
            type="button"
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 w-full max-w-[300px] aspect-video"
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <>
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm font-medium">點擊上傳</span>
            </>
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileSelect}
        disabled={isUploading}
      />
    </div>
  );
}
