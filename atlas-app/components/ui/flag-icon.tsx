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
  className?: string;
  size?: "sm" | "md" | "lg";
}

const FLAG_MAP: Record<string, StaticImageData> = {
  USD: UsFlag,
  NGN: NgFlag,
  GBP: UkFlag,
  CAD: CanadaFlag,
  EUR: EuropeFlag,
};

const EMOJI_MAP: Record<string, string> = {
  USD: "🇺🇸",
  NGN: "🇳🇬",
  GBP: "🇬🇧",
  CAD: "🇨🇦",
  EUR: "🇪🇺",
};

const SIZE_CLASSES = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const EMOJI_SIZE_CLASSES = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Flag({ currencyCode, alt, className, size = "md" }: FlagProps) {
  if (currencyCode && FLAG_MAP[currencyCode]) {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden",
          SIZE_CLASSES[size],
          className
        )}
      >
        <Image
          src={FLAG_MAP[currencyCode]}
          alt={alt}
          fill
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <span className={cn(EMOJI_SIZE_CLASSES[size], className)}>
      {EMOJI_MAP[currencyCode] || "💱"}
    </span>
  );
}