import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Deja la Lujuria con Cristo | Libertad en Cristo Josef Nájera',
  description: 'Deja La Lujuria',
  icons: {
    icon: "https://media.josefnajera.com/fotos-web/cruz-cristiana.png"
  }
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
