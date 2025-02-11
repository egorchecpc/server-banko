import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { useLocation } from '@tanstack/react-router'

const variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
}

export const PageWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation()
  console.log('Current Path:', location.pathname)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
