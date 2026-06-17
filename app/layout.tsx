'use client'

import './globals.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentPage = pathname === '/' ? 'dashboard' : pathname.split('/')[1]

  return (
    <html lang="en">
      <body className="bg-sd-dark text-gray-100">
        <div className="flex h-screen">
          <div className="w-64 bg-sd-darker border-r border-sd-tertiary p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-sd-cyan">ShopDeck</h1>
              <p className="text-xs text-[#cbd5e1] mt-1">RTO Management</p>
            </div>
            <nav className="space-y-2">
              <Link
                href="/"
                className={currentPage === 'dashboard' ? 'block px-4 py-3 rounded-lg bg-sd-blue text-white font-medium transition-colors border-l-4 border-sd-cyan' : 'block px-4 py-3 rounded-lg text-[#cbd5e1] hover:text-[#f1f5f9] hover:bg-sd-secondary transition-colors'}
              >
                Dashboard
              </Link>
              <Link
                href="/orders"
                className={currentPage === 'orders' ? 'block px-4 py-3 rounded-lg bg-sd-blue text-white font-medium transition-colors border-l-4 border-sd-cyan' : 'block px-4 py-3 rounded-lg text-[#cbd5e1] hover:text-[#f1f5f9] hover:bg-sd-secondary transition-colors'}
              >
                Orders
              </Link>
              <Link
                href="/rules"
                className={currentPage === 'rules' ? 'block px-4 py-3 rounded-lg bg-sd-blue text-white font-medium transition-colors border-l-4 border-sd-cyan' : 'block px-4 py-3 rounded-lg text-[#cbd5e1] hover:text-[#f1f5f9] hover:bg-sd-secondary transition-colors'}
              >
                Rules
              </Link>
              <Link
                href="/analytics"
                className={currentPage === 'analytics' ? 'block px-4 py-3 rounded-lg bg-sd-blue text-white font-medium transition-colors border-l-4 border-sd-cyan' : 'block px-4 py-3 rounded-lg text-[#cbd5e1] hover:text-[#f1f5f9] hover:bg-sd-secondary transition-colors'}
              >
                Analytics
              </Link>
            </nav>
            <div className="mt-8 pt-8 border-t border-sd-tertiary text-xs text-[#cbd5e1]">
              <p>Predictive Return Management</p>
              <p className="mt-2">RTO: 28% to 14%</p>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-gradient-to-b from-sd-dark to-sd-darker">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
