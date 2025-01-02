import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Caldwell Trio Dashboard',
  description: 'View your children\'s grades from Caldwell Trio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold">
                Caldwell Trio Dashboard
              </Link>
              <div className="space-x-4">
                <Link href="/" className="hover:text-blue-200">
                  Home
                </Link>
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
