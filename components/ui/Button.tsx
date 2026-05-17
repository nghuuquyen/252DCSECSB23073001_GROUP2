'use client'

import { motion } from 'framer-motion'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const styles = {
    primary: 'bg-[#005239] text-white',
    secondary: 'bg-[#e8f0eb] text-[#005239]',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl font-medium transition-opacity
        ${styles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}