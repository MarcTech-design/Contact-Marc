import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Created By Marc',
  generator: 'MarcTech',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
