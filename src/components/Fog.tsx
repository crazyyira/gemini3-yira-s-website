import { motion } from "motion/react";

export default function Fog() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0a0510]">
      {/* Grain Overlay */}
      <div className="absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Fluid Blobs */}
      <div className="absolute inset-0 filter blur-[100px] lg:blur-[140px] opacity-60">
        {/* Primary Purple Blob */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 100, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-[#2D1B4E] rounded-full mix-blend-screen"
        />

        {/* Misty Blue Blob */}
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -60, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-[#4A5D7E] rounded-full mix-blend-screen"
        />

        {/* Warm Amber Accent Blob */}
        <motion.div
          animate={{
            x: [0, 150, -100, 0],
            y: [0, -120, 50, 0],
            scale: [0.8, 1.1, 0.9, 0.8],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-[#F59E0B]/20 rounded-full mix-blend-color-dodge"
        />

        {/* Deep Indigo Blob */}
        <motion.div
          animate={{
            x: [0, -80, 120, 0],
            y: [0, -150, 80, 0],
            scale: [1.1, 0.9, 1.2, 1.1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] bg-[#1e1b4b] rounded-full mix-blend-screen"
        />
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(10,5,16,0.4)_100%)]" />
    </div>
  );
}
