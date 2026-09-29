"use client"

export const dynamic = "force-static"

import Background from "@/components/Background"
import Music from "@/components/Music"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <Background />
      <Music shouldPlay={false} />
    </main>
  )
}
