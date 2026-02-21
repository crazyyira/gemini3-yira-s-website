"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Trash2, MessageSquare } from "lucide-react";
import Notification from "@/components/Notification";

interface Story {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function StoriesAdmin() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      fetchStories();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(data || []);
    } catch (error) {
      console.error("Failed to load stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这条故事吗？")) return;

    try {
      const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "删除成功",
          message: "故事已删除",
        });
        fetchStories();
      } else {
        throw new Error("删除失败");
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        title: "删除失败",
        message: "操作失败，请稍后重试",
      });
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回后台
          </button>
          <h1 className="text-4xl font-display italic mb-2">瓶中信管理</h1>
          <p className="text-white/40">查看用户投递的故事</p>
        </div>

        {/* 统计信息 */}
        <div className="glass p-6 mb-8">
          <div className="flex items-center gap-4">
            <MessageSquare className="w-8 h-8 text-amber-500" />
            <div>
              <div className="text-2xl font-bold">{stories.length}</div>
              <div className="text-white/40 text-sm">总故事数</div>
            </div>
          </div>
        </div>

        {/* 故事列表 */}
        <div className="space-y-4">
          {stories.length === 0 ? (
            <div className="glass p-8 text-center text-white/40">
              暂无故事
            </div>
          ) : (
            stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg font-display">{story.name}</span>
                      <span className="text-white/40 text-sm">
                        {new Date(story.created_at).toLocaleString("zh-CN")}
                      </span>
                    </div>
                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                      {story.message}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    删除
                  </button>
                </div>
              </motion.div>
            ))
          )}
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

