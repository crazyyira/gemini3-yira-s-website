"use client";

import Fog from "@/src/components/Fog";
import Hero from "@/src/components/Hero";
import About from "@/src/components/About";
import Feed from "@/src/components/Feed";
import Events from "@/src/components/Events";
import Guestbook from "@/src/components/Guestbook";
import MouseTrail from "@/src/components/MouseTrail";
import { motion, useScroll, useSpring } from "motion/react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Elements */}
      <Fog />

      {/* Navigation (Minimal) */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-[#0a0510] to-transparent">
        <a href="#hero" className="text-xl font-display italic tracking-tighter hover:text-amber-200 transition-colors">XIAOHEI.ISLAND</a>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-white/40">
          <a href="#hero" className="hover:text-white transition-colors">首页</a>
          <a href="#about" className="hover:text-white transition-colors">关于</a>
          <a href="#fragments" className="hover:text-white transition-colors">碎片</a>
          <a href="#events" className="hover:text-white transition-colors">营地</a>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      <About />
      <Feed />
      <Events />

      {/* Footer */}
      <footer className="py-24 px-6 text-center border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-display italic mb-8">小黑的奇幻岛屿</h3>
          <p className="text-white/20 text-sm mb-12">© 2026 Xiaohei. Built with Vibe & Code.</p>
          <div className="flex justify-center gap-6 text-white/40">
            <a href="#" className="hover:text-white transition-colors">WeChat</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">E-mail</a>
          </div>
        </div>
      </footer>

      {/* Floating Interaction */}
      <Guestbook />
      <MouseTrail />
    </main>
  );
}
