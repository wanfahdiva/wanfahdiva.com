import { motion } from 'framer-motion'

interface SectionRenderProps {
  children: React.ReactNode
  delay?: number
  class?: string
}

export const SectionRender = ({
  children,
  delay = 0,
  class: className,
}: SectionRenderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
