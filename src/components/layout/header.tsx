'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">HealthDash</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Patients
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Analytics
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
