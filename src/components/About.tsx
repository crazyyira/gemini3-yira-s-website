import { motion } from "motion/react";

export default function About() {
  const tags = ["北京", "攀岩者", "潜水员", "Vibe Coder", "活动主理人"];

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl rotate-3 opacity-20" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl -rotate-3 border border-white/10" />
          <img
            src="https://picsum.photos/seed/xiaohei/800/800"
            alt="Xiaohei"
            className="absolute inset-4 object-cover rounded-2xl hover:scale-[1.02] transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-display italic mb-4">灵魂拼贴</h2>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs tracking-widest uppercase border border-white/10 rounded-full bg-white/5 text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg text-white/70 leading-relaxed font-light"
          >
            <p>
              从印尼的浪尖到阳朔的洞穴，从读诗会的温润到搞砸俱乐部的坦诚。
            </p>
            <p>
              我在这里创造一个让城市紧绷的人放松的场域。对我而言，代码与山海并无二致，它们都是通往自由的路径。
            </p>
            <p className="italic text-amber-200/60">
              "We are all fragments of a larger dream."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
