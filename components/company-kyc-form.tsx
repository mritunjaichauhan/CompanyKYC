"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Upload, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function CompanyKYCForm() {
  const [formData, setFormData] = useState({
    legalName: "",
    businessPAN: "",
    businessType: "",
    email: "",
    mobile: "",
    signatoryName: "",
    signatoryDesignation: "",
    gstNumber: "",
    declaration: false,
    date: new Date().toISOString().split("T")[0],
  })

  const [panFile, setPanFile] = useState<File | null>(null)
  const [gstVerified, setGstVerified] = useState<boolean | null>(null)
  const [gstError, setGstError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "gstNumber") {
      setGstVerified(null)
      setGstError("")
    }
  }

  const validateGSTNumber = (gst: string) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstRegex.test(gst)
  }

  const handleGSTVerify = () => {
    if (!formData.gstNumber) {
      setGstError("Please enter a GST number")
      setGstVerified(false)
      return
    }

    if (!validateGSTNumber(formData.gstNumber)) {
      setGstError("Please enter a valid GST number format")
      setGstVerified(false)
      return
    }

    // Simulating API verification
    setGstVerified(true)
    setGstError("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPanFile(e.target.files[0])
    }
  }

  const handleSelectChange = (businessType: string) => {
    setFormData((prev) => ({ ...prev, businessType }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="min-h-screen w-full py-12 px-4 md:px-8 lg:px-24 relative flex items-center justify-center">
      {/* Background GIF */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background-zNzthl4TD9Tu0P4xfUHtXcELWOJNVx.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 rounded-xl blur opacity-25"></div>

        <div className="relative bg-black/50 backdrop-blur-2xl rounded-2xl p-6 md:p-10 border border-slate-800 shadow-2xl shadow-cyan-400/10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
            Hirecentive Social
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
            Company KYC Verification
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">Company Details</p>
              <div className="relative">
                <Input
                  placeholder="Legal Name of Company"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleInputChange}
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                {gstVerified !== null && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {gstVerified ? (
                      <Check className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Business PAN"
                  name="businessPAN"
                  value={formData.businessPAN}
                  onChange={handleInputChange}
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById("panUpload")?.click()}
                  className="px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  <Upload className="w-5 h-5" />
                </Button>
                <input
                  id="panUpload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
              {panFile && <p className="text-sm text-slate-400">File: {panFile.name}</p>}
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="bg-black/60 border-slate-700/50 text-white">
                  <SelectValue placeholder="Type of Business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private_ltd">Private Limited</SelectItem>
                  <SelectItem value="llp">LLP</SelectItem>
                  <SelectItem value="proprietorship">Proprietorship</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">Contact Details</p>
              <Input
                placeholder="Official Email ID"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="Authorized Signatory Name"
                name="signatoryName"
                value={formData.signatoryName}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
              <Input
                placeholder="Authorized Signatory Designation"
                name="signatoryDesignation"
                value={formData.signatoryDesignation}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
              />
            </div>

            {/* GST Verification */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">GST Verification</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter GST Number"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="bg-black/60 border-slate-700/50 text-white placeholder:text-slate-500"
                />
                <Button
                  type="button"
                  onClick={handleGSTVerify}
                  className="px-4 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white"
                >
                  Verify
                </Button>
              </div>
              {gstError && <p className="text-sm text-red-500">{gstError}</p>}
              {gstVerified && !gstError && <p className="text-sm text-emerald-400">GST Verified Successfully</p>}
            </div>

            {/* Declaration */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400">Declaration</p>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="declaration"
                  checked={formData.declaration}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, declaration: checked as boolean }))}
                  className="mt-1 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-400 data-[state=checked]:to-violet-500 border-slate-700"
                />
                <label htmlFor="declaration" className="text-sm text-slate-300">
                  I confirm that the information provided is accurate and authorize Hirecentive Social to verify the
                  details.
                </label>
              </div>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="bg-black/60 border-slate-700/50 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full group relative p-3 md:p-4 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 transition-all duration-300 group-hover:blur-md"></div>
              <div className="absolute inset-0.5 bg-black rounded-lg"></div>
              <span className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text">
                Submit KYC
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes seamlessLoop {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
      `}</style>
    </section>
  )
}

