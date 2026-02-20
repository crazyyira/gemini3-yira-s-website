"use client";

import { motion } from "motion/react";
import { Mountain, Waves, Lamp, Code } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 lg:pt-40">
      <div className="relative z-30 text-center mb-16 lg:mb-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full"
        >
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-6 bg-gradient-to-r from-purple-300 via-white to-amber-200 bg-clip-text text-transparent drop-shadow-2xl">
            小黑的奇幻岛屿
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8" />
          <p className="text-sm md:text-lg lg:text-xl tracking-[0.3em] uppercase font-light text-white/80 max-w-2xl mx-auto px-4">
            在岩壁上寻找自由，在代码中构建万物
          </p>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex items-center justify-center lg:justify-end group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 opacity-40" />
          <div className="relative z-10 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-end gap-4 mb-6">
              <Mountain className="w-10 h-10 lg:w-12 lg:h-12 text-blue-300/80" />
              <Waves className="w-10 h-10 lg:w-12 lg:h-12 text-blue-400/80" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-display italic mb-4 text-blue-100">山海之息</h2>
            <p className="text-blue-200/60 max-w-xs lg:max-w-sm text-sm lg:text-base ml-auto">在崎岖的岩壁上寻找自由的支点，在深邃的海底听见心跳的回响。</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex items-center justify-center lg:justify-start group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),transparent_70%)] rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 opacity-40" />
          <div className="relative z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <Lamp className="w-10 h-10 lg:w-12 lg:h-12 text-amber-400/80 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
              <Code className="w-10 h-10 lg:w-12 lg:h-12 text-amber-300/80" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-display italic mb-4 text-amber-100">灯火之境</h2>
            <p className="text-amber-200/60 max-w-xs lg:max-w-sm text-sm lg:text-base">一盏复古台灯，一行跳动的代码，在寂静的深夜构建属于未来的碎片。</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-0 right-0 text-center"
      >
        <p className="text-sm tracking-widest text-white/40 italic">
          连接有趣的人，一起 Vibe Coding，一起坠入山海。
        </p>
      </motion.div>
    </section>
  );
}
