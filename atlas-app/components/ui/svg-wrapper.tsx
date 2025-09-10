import React from "react"

/**
 * SVG Styling Guidelines
 *
 * - Do not hardcode stroke/fill inside the SVG itself.
 * - Always use `currentColor` or `none` for flexible overrides.
 *
 * Usage:
 * <SVGIcon icon={Logo} size={40} />
 * <SVGIcon icon={Logo} width={100} height={50} fill="red" />
 * <SVGIcon icon={Logo} className="text-blue-500 w-16 h-16" />
 */

type SVGIconProps = React.SVGProps<SVGSVGElement> & {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  size?: number | string
  width?: number | string
  height?: number | string
  stroke?: string
  fill?: string
}

export default function SVGIcon({
  icon: Icon,
  size,
  width,
  height,
  stroke,
  fill,
  className,
  ...props
}: SVGIconProps) {
  const finalWidth = width ?? size 
  const finalHeight = height ?? size 

  return (
    <Icon
      width={finalWidth}
      height={finalHeight}
      stroke={stroke ?? undefined}
      fill={fill ?? undefined}
      className={className}
      {...props}
    />
  )
}
