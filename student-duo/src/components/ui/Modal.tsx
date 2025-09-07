import { motion, AnimatePresence } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{ open: boolean; onClose: () => void; title?: ReactNode }>

export default function Modal({ open, onClose, title, children }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-5 card-shadow">
            {title && <div className="text-lg font-bold mb-3">{title}</div>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

