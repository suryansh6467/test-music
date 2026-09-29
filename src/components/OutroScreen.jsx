"use client"

import { motion } from "framer-motion"

export default function OutroScreen() {
    return (
        <div className="w-full flex flex-col items-center justify-center relative">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
            >
                {/* GIF */}
                <motion.img
                    src="/gifs/hug.gif"
                    alt="cute hug"
                    className="w-48 h-48 object-contain"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />

            </motion.div>
        </div>
    )
}
