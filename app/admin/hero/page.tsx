"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Save, ArrowLeft, Eye } from "lucide-react";
import Notification from "@/components/Notification";

interface HeroContent {
  main_title: string;
  main_subtitle: string;
  left_card_title: string;
  left_card_description: string;
  right_card_title: string;
  right_card_description: string;
  bottom_text: string;
}

export default function HeroAdmin() {
  const router = useRouter();
  const [content, setContent] = useState<HeroContent>({
    main_title: "",
    main_subtitle: "",
    left_card_title: "",
    left_card_description: "",
    right_card_title: "",
    right_card_description: "",
    bottom_text: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (!res.ok) {
        router.push("/admin");
        return;
      }
      fetchContent();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();
      if (data && !data.error) {
        setContent(data);
      }
    } catch (error) {
      console.error("Failed to load hero content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "保存成功！",
          message: "首页内容已更新。",
        });
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          title: "保存失败",
          message: "更新内容时出现问题，请稍后重试。",
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      setNotification({
        isOpen: true,
        type: "error",
        title: "保存失败",
        message: "网络连接出现问题，请检查网络后重试。",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0510] flex items-center justify-center">
        <div className="text-white/40">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0510] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回后台
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-display italic mb-2">首页内容管理</h1>
              <p className="text-white/40">编辑首页 Hero 区域的所有文字</p>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "隐藏预览" : "显示预览"}
            </button>
          </div>
        </div>

        {/* 预览区域 */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 mb-8"
          >
            <h3 className="text-xl font-display mb-6 text-center">预览效果</h3>
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-purple-300 via-white to-amber-200 bg-clip-text text-transparent">
                  {content.main_title}
                </h1>
                <p className="text-sm md:text-base tracking-wider uppercase font-light text-white/80">
                  {content.main_subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="glass p-6">
                  <h3 className="text-2xl font-display italic mb-3 text-blue-100">
                    {content.left_card_title}
                  </h3>
                  <p className="text-blue-200/60 text-sm">{content.left_card_description}</p>
                </div>
                <div className="glass p-6">
                  <h3 className="text-2xl font-display italic mb-3 text-amber-100">
                    {content.right_card_title}
                  </h3>
                  <p className="text-amber-200/60 text-sm">{content.right_card_description}</p>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-white/40 italic">{content.bottom_text}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 编辑表单 */}
        <div className="glass p-8 space-y-8">
          {/* 主标题 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              主标题
            </label>
            <input
              type="text"
              value={content.main_title}
              onChange={(e) => setContent({ ...content, main_title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
              placeholder="小黑的奇幻岛屿"
            />
          </div>

          {/* 副标题 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              副标题
            </label>
            <input
              type="text"
              value={content.main_subtitle}
              onChange={(e) => setContent({ ...content, main_subtitle: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
              placeholder="在岩壁上寻找自由，在代码中构建万物"
            />
          </div>

          {/* 左侧卡片 */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-display mb-4 text-blue-200">左侧卡片（山海之息）</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  标题
                </label>
                <input
                  type="text"
                  value={content.left_card_title}
                  onChange={(e) => setContent({ ...content, left_card_title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="山海之息"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  描述
                </label>
                <textarea
                  value={content.left_card_description}
                  onChange={(e) => setContent({ ...content, left_card_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[80px]"
                  placeholder="在崎岖的岩壁上寻找自由的支点..."
                />
              </div>
            </div>
          </div>

          {/* 右侧卡片 */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-display mb-4 text-amber-200">右侧卡片（灯火之境）</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  标题
                </label>
                <input
                  type="text"
                  value={content.right_card_title}
                  onChange={(e) => setContent({ ...content, right_card_title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="灯火之境"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  描述
                </label>
                <textarea
                  value={content.right_card_description}
                  onChange={(e) => setContent({ ...content, right_card_description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[80px]"
                  placeholder="一盏复古台灯，一行跳动的代码..."
                />
              </div>
            </div>
          </div>

          {/* 底部文字 */}
          <div className="border-t border-white/10 pt-6">
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              底部文字
            </label>
            <input
              type="text"
              value={content.bottom_text}
              onChange={(e) => setContent({ ...content, bottom_text: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
              placeholder="连接有趣的人，一起 Vibe Coding，一起坠入山海。"
            />
          </div>

          {/* 保存按钮 */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {isSaving ? "保存中..." : "保存更改"}
            </button>
          </div>
        </div>
      </div>

      <Notification
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  );
}

