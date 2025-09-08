
import React from "react"
/**
 *  SVG Styling Guidelines
 *
 * If you need to change the stroke or fill of an SVG dynamically,
 * DO NOT hardcode `stroke` or `fill` values inside the SVG file itself.
 *
 * Bad (hardcoded):
 * <path d="..." stroke="#000000" fill="#ffffff" />
 *
 * Good (flexible):
 * <path d="..." stroke="currentColor" fill="none" />
 *
 * This way, stroke/fill can be controlled through React props or Tailwind classes:
 *
 * <SVGIcon icon={Logo} stroke="red" fill="yellow" size={40} />
 * <SVGIcon icon={Logo} className="text-blue-500" size={48} />
 */

type SVGIconProps = React.SVGProps<SVGSVGElement> & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  size?: number | string
  stroke?: string
  fill?: string
}

export default function SVGIcon({
  icon: Icon,
  size = 24,
  stroke,
  fill,
  className,
  ...props
}: SVGIconProps) {
  return (
    <Icon
      width={size}
      height={size}
      stroke={stroke ?? undefined}  // only apply if provided
      fill={fill ?? undefined}      // only apply if provided
      className={className}
      {...props}
    />
  )
}

