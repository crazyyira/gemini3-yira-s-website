"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Loader2 } from "lucide-react";

interface IslandIdentity {
  role: string;
  type: string;
  description: string;
  traits: string[];
  emoji: string;
}

interface IslandIdentityGeneratorProps {
  onClose: () => void;
}

export default function IslandIdentityGenerator({ onClose }: IslandIdentityGeneratorProps) {
  const [personality, setPersonality] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identity, setIdentity] = useState<IslandIdentity | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!personality.trim()) {
      setError("请输入你的性格和喜好");
      return;
    }

    setIsLoading(true);
    setError("");
    setIdentity(null);

    try {
      const res = await fetch("/api/island-identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personality }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "生成失败");
      }

      setIdentity(data.identity);
    } catch (err: any) {
      setError(err.message || "生成失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIdentity(null);
    setPersonality("");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative glass p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!identity ? (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-display italic mb-2">发现你的岛屿身份</h2>
              <p className="text-white/60">在这座奇幻岛屿上，你会是谁呢？</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/80 mb-3">
                  请描述一下你的性格和喜好 ✨
                </label>
                <textarea
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="例如：我喜欢安静地看书，喜欢大海和星空，性格内向但温暖..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[120px] resize-none"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isLoading || !personality.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold hover:from-purple-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI 正在为你生成专属身份...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    生成我的岛屿身份
                  </>
                )}
              </button>

              <p className="text-xs text-white/40 text-center">
                每分钟最多生成 2 次 · 由 AI 驱动
              </p>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="text-6xl mb-4">{identity.emoji}</div>
              <h2 className="text-3xl font-display italic mb-2 bg-gradient-to-r from-purple-300 to-amber-300 bg-clip-text text-transparent">
                {identity.role}
              </h2>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm mb-4">
                {identity.type}
              </div>
            </div>

            <div className="glass p-6 mb-6 text-left">
              <p className="text-white/80 leading-relaxed mb-4">
                {identity.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {identity.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-white/10 text-sm text-white/80"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                重新生成
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold hover:from-purple-600 hover:to-amber-600 transition-all"
              >
                完成
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

