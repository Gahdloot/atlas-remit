// import type React from "react"
// import type { Metadata } from "next"
// import { Geist , Poppins, Manrope} from "next/font/google"
// import StoreProvider from "@/components/StoreProvider"
// import "./globals.css"

// const geist = Geist({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-geist",
// })

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-poppins",
//   weight: ["400", "500", "600", "700"], 
// })

// const manrope = Manrope({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-manrope",
// })

// export const metadata: Metadata = {
//   title: "ATLAS - Send tuition money across borders easily",
//   description:
//     "ATLAS helps international students pay tuition fees securely with better exchange rates and lower fees than traditional banks.",
//   generator: "v0.app",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" className={`${geist.variable} ${manrope.variable} ${poppins.variable} antialiased`}>
//     {/* <html lang="en" className={`${geist.variable} ${manrope.variable} ${poppins.variable} antialiased dark`}> */}
//       <body className="font-sans">
//         <StoreProvider>
//           {children}
//         </StoreProvider>
//       </body>
//     </html>
//   )
// }
import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Poppins } from "next/font/google"
import StoreProvider from "@/components/StoreProvider"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"], 
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], 
})

export const metadata: Metadata = {
  title: "ATLAS - Send tuition money across borders easily",
  description:
    "ATLAS helps international students pay tuition fees securely with better exchange rates and lower fees than traditional banks.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${poppins.variable} antialiased`}>
     <body className="font-sans">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}