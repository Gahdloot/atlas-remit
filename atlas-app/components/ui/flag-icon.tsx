// components/flag.tsx
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import UsFlag from "@/public/flags/united-states 2.png";
import NgFlag from "@/public/flags/Nigeria (1).png";
import UkFlag from "@/public/flags/Flags (6).png";
import CanadaFlag from "@/public/flags/Flags (5).png";
import EuropeFlag from "@/public/flags/circle-flags_european-union.png";
interface FlagProps {
  currencyCode: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const FLAG_MAP: Record<string, StaticImageData> = {
  USD: UsFlag,
  NGN: NgFlag,
  GBP: UkFlag,
  CAD: CanadaFlag,
  EUR: EuropeFlag,
};

export function Flag({ currencyCode, alt, size = "md", className }: FlagProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  if (currencyCode && FLAG_MAP[currencyCode]) {
    return (
      <div className={cn(
        "relative rounded-full overflow-hidden",
        sizeClasses[size],
        className
      )}>
        <Image
          src={FLAG_MAP[currencyCode]}
          alt={alt}
          fill
          className="object-cover object-center"
        />
      </div>
    );
  }

  // Fallback to emoji if flag image not found
  const emojiMap: Record<string, string> = {
    USD: "🇺🇸",
    NGN: "🇳🇬",
    GBP: "🇬🇧",
    CAD: "🇨🇦",
    EUR: "🇪🇺",
  };

  return (
    <span className={cn("text-sm", className)}>
      {emojiMap[currencyCode] || "💱"}
    </span>
  );
}