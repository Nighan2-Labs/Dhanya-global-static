"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"

export default function Template({ children }: { children: React.ReactNode }) {
  useScrollToTop()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
