import { type NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "7986898038:AAEy2utLxduMbiwyM2Ax8daYCaWi1pqCsR0"
const TELEGRAM_CHAT_ID = "7869910410"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phoneNumber, subject, message } = body

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+\d{1,3}\d{6,14}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 *New Contact Form Submission*

👤 *Full Name:* ${fullName}
📧 *Email:* ${email}
📱 *Phone:* ${phoneNumber}
📋 *Subject:* ${subject}

💬 *Message:*
${message}

---
Sent from Contact Marc Website
    `.trim()

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("Telegram API error:", errorData)
      return NextResponse.json({ error: "Failed to send message to Telegram" }, { status: 500 })
    }

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
