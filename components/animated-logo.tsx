"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function AnimatedLogo() {
  return (
    <motion.div
      className="relative cursor-pointer group"
      whileHover={{ 
        scale: 1,
        rotate: 0.15,
        y: -1
      }}
      transition={{ 
        type: "spring",
        stiffness: 500,
        damping: 18,
        mass: 2.3
      }}
      initial={{ y: 0 }}
      whileInView={{
        transition: {
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut"
        }
      }}
    >
      <h1
        className={cn(
          "text-4xl font-bold tracking-tight",
          "bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400",
          "bg-clip-text text-transparent",
          "drop-shadow-[0_2px_2px_rgba(0,0,0,0.17)]",
          "relative z-10",
        )}
      >
        Sharp 🛒
        <span className="ml-2 inline-block transform -rotate-12 hover:rotate-0 transition-transform duration-300">
          
        </span>
      </h1>
      
    </motion.div>
  )
}

