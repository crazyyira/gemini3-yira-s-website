import Fog from "./components/Fog";
import Hero from "./components/Hero";
import About from "./components/About";
import Feed from "./components/Feed";
import Events from "./components/Events";
import Guestbook from "./components/Guestbook";
import { motion, useScroll, useSpring } from "motion/react";

export default function App() {
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
        <div className="text-xl font-display italic tracking-tighter">XIAOHEI.ISLAND</div>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest text-white/40">
          <a href="#" className="hover:text-white transition-colors">Island</a>
          <a href="#" className="hover:text-white transition-colors">Fragments</a>
          <a href="#" className="hover:text-white transition-colors">Events</a>
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
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* Floating Interaction */}
      <Guestbook />
    </main>
  );
}
