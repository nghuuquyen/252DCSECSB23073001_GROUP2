'use client'

import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal sheet — slide up từ dưới */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-[28px] p-6 max-w-[700px] mx-auto"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 bg-[#caeadd] rounded-full mx-auto mb-4" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}