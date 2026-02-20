import { motion } from "motion/react";

export default function Fog() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),rgba(74,93,126,0.3),transparent_70%)] blur-[100px] animate-fog"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_50%_50%,rgba(45,27,78,0.5),transparent_60%)] blur-[120px] animate-fog"
        style={{ animationDelay: "-5s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510] via-transparent to-[#0a0510] opacity-80" />
    </div>
  );
}
