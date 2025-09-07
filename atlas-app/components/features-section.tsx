import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, FileText, TrendingUp } from "lucide-react"
import Image from "next/image"

export function FeaturesSection() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 text-sm text-lime-100 bg-[#01120b] px-4 py-2 rounded-full w-fit mb-8">
          <span className="w-2 h-2 bg-lime-400 rounded-full"></span>
          <span>Features</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Features That Put{" "}
              <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                You in Control
              </span>
            </h2>
          </div>
          <div>
            <p className="text-gray-400 text-lg">
              Pay school fees with confidence — instant quotes, secure transactions, and complete visibility, all in one
              place.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Fee Conversion Card */}
          <Card className="bg-green-900/30 border-green-800/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white">Fee Conversion</h3>
              </div>

              <p className="text-gray-300 mb-8">
                Easily convert your school's required payment into Naira with real-time rates, so you know exactly what
                to fund without hidden surprises.
              </p>

              {/* Conversion Display */}
              <div className="bg-green-800/30 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">Amount due</span>
                  <span className="text-gray-400 text-sm">15,000 GBP</span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-white text-sm">You will pay</span>
                  <span className="text-lime-400 text-2xl font-bold">22,650,000 NGN</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Image src="/uk-flag.png" alt="UK Flag" width={30} height={20} className="rounded" />
                    <span className="text-white">NGN/GBP</span>
                  </div>
                  <span className="text-white">₦1,925.00</span>
                </div>

                <div className="text-center mt-4">
                  <span className="text-lime-400 text-sm">• Saving up to 15% on payments</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instant Quotes Card */}
          <Card className="bg-green-900/30 border-green-800/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white">Instant Quotes & ETA</h3>
              </div>

              <p className="text-gray-300 mb-8">
                See a clear breakdown of how much to pay in Naira, plus an estimated arrival time for your tuition
                payment. Transparent and upfront.
              </p>

              {/* Quote Form */}
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-2">Destination Country</label>
                  <div className="bg-green-800/30 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-white">Canada</span>
                    <span className="text-gray-400">⌄</span>
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm block mb-2">University</label>
                  <div className="bg-green-800/30 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center">
                        <span className="text-black text-xs">A</span>
                      </div>
                      <span className="text-gray-400">Select a university</span>
                    </div>
                    <span className="text-gray-400">⌄</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src="/canada-flag.png"
                        alt="Canada Flag"
                        width={24}
                        height={16}
                        className="rounded"
                      />
                      <span className="text-gray-400 text-sm">NGN/CAD</span>
                    </div>
                    <div className="text-white">₦1,510.17</div>
                    <div className="text-gray-400 text-sm">Amount due</div>
                    <div className="text-white font-bold">12,000</div>
                    <div className="text-red-400 text-sm">● CAD</div>
                  </div>

                  <div className="flex-1">
                    <div className="text-gray-400 text-sm mb-2">Student will pay</div>
                    <div className="text-lime-400 font-bold text-lg">18,122,040</div>
                    <div className="text-green-400 text-sm">● NGN</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Track Payments Card */}
        <Card className="bg-green-900/30 border-green-800/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Track your Payments</h3>
                </div>

                <p className="text-gray-300 mb-8">
                  Stay updated every step of the way with a simple tracker that shows the status of your payment until
                  it's completed
                </p>

                <Button className="bg-lime-400 text-black hover:bg-lime-500">Track Payment</Button>
              </div>

              {/* Payment Tracker */}
              <div className="space-y-6">
                {/* Progress Steps */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mb-2">
                      <span className="text-black">✓</span>
                    </div>
                    <span className="text-lime-400 text-sm">Payment Initiated</span>
                    <span className="text-gray-400 text-xs">Paid to ATLAS</span>
                  </div>

                  <div className="flex-1 h-0.5 bg-lime-400 mx-4"></div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center mb-2">
                      <span className="text-black">✓</span>
                    </div>
                    <span className="text-lime-400 text-sm">Processing</span>
                    <span className="text-gray-400 text-xs">Payment is being verified and converted.</span>
                  </div>

                  <div className="flex-1 h-0.5 bg-gray-600 mx-4"></div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-gray-400">○</span>
                    </div>
                    <span className="text-gray-400 text-sm">In Transit</span>
                    <span className="text-gray-400 text-xs">Funds are being transferred to the institution.</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-gray-400">✓</span>
                    </div>
                    <span className="text-gray-400 text-sm">Funds delivered</span>
                    <span className="text-gray-400 text-xs">Institution have received payment</span>
                  </div>

                  <div className="flex-1 h-0.5 bg-gray-600 mx-4"></div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
                      <span className="text-gray-400">✓</span>
                    </div>
                    <span className="text-gray-400 text-sm">Confirmation</span>
                    <span className="text-gray-400 text-xs">Receipt available for download</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
