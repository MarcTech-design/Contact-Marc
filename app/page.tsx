"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Mail,
  Phone,
  MessageSquare,
  User,
  Briefcase,
  Lightbulb,
  Target,
  Zap,
  Globe,
  TrendingUp,
  Shield,
} from "lucide-react"

export default function ContactMarc() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+\d{1,3}\d{6,14}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number with country code (e.g., +1234567890)"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const offerings = [
    {
      icon: Globe,
      title: "Custom Web Development",
      description:
        "Tailored websites and web applications built with modern technologies to meet your specific business needs.",
    },
    {
      icon: Lightbulb,
      title: "Technical Advice",
      description:
        "Expert guidance on technology choices, architecture decisions, and best practices for your projects.",
    },
    {
      icon: Zap,
      title: "Creative Collaboration",
      description: "Innovative solutions through collaborative brainstorming and creative problem-solving approaches.",
    },
    {
      icon: Target,
      title: "Tailored Solutions",
      description: "Custom-built solutions designed specifically for your unique challenges and requirements.",
    },
    {
      icon: Briefcase,
      title: "Web Design Consultation",
      description: "Professional advice on user experience, interface design, and modern web design trends.",
    },
    {
      icon: Shield,
      title: "Project Management",
      description: "Comprehensive project oversight ensuring timely delivery and quality results.",
    },
    {
      icon: TrendingUp,
      title: "SEO & Digital Marketing",
      description: "Strategic advice to improve your online presence and drive meaningful traffic to your business.",
    },
    {
      icon: MessageSquare,
      title: "Ongoing Support",
      description: "Continuous support and maintenance to keep your digital solutions running smoothly.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.h1
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact Marc
            </motion.h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
              Professional Services
            </Badge>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Build Something
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent block">
              Amazing Together
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your ideas into reality? Get in touch and let's discuss how I can help bring your vision
            to life.
          </motion.p>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Mail className="h-6 w-6 text-purple-600" />
                  Get In Touch
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and I'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="mt-4 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Label htmlFor="fullName" className="text-gray-700 font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-purple-600" />
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`mt-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.fullName ? "border-red-400" : ""}`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-600" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`mt-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.email ? "border-red-400" : ""}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Label htmlFor="phoneNumber" className="text-gray-700 font-medium flex items-center gap-2">
                        <Phone className="h-4 w-4 text-purple-600" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className={`mt-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.phoneNumber ? "border-red-400" : ""}`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Label htmlFor="subject" className="text-gray-700 font-medium flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-purple-600" />
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className={`mt-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 ${errors.subject ? "border-red-400" : ""}`}
                        placeholder="Project details, consultation, etc."
                      />
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Label htmlFor="message" className="text-gray-700 font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`mt-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 min-h-[120px] ${errors.message ? "border-red-400" : ""}`}
                        placeholder="Tell me about your project or how I can help you..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending Message...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Why Contact Me Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  <Zap className="h-6 w-6 text-purple-600" />
                  Why Contact Me?
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Here's how I can help transform your ideas into reality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {offerings.map((offering, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-purple-50/50 hover:bg-purple-50 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0">
                        <offering.icon className="h-6 w-6 text-purple-600 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{offering.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{offering.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="bg-white/80 backdrop-blur-sm border-t border-purple-100 mt-16"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">© 2024 Contact Marc. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              Developed with ❤️ by <span className="font-semibold text-purple-600">MarcTech</span>
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
