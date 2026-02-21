"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Save, Upload, X, Plus, ArrowLeft } from "lucide-react";
import Notification from "@/components/Notification";

interface Profile {
  name: string;
  avatar_url: string;
  tags: string[];
  bio_paragraph_1: string;
  bio_paragraph_2: string;
  bio_quote: string;
}

export default function ProfileAdmin() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    name: "",
    avatar_url: "",
    tags: [],
    bio_paragraph_1: "",
    bio_paragraph_2: "",
    bio_quote: "",
  });
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
      fetchProfile();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data && !data.error) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "保存成功！",
          message: "个人资料已更新。",
        });
      } else {
        setNotification({
          isOpen: true,
          type: "error",
          title: "保存失败",
          message: "更新个人资料时出现问题，请稍后重试。",
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

  const addTag = () => {
    if (newTag.trim() && !profile.tags.includes(newTag.trim())) {
      setProfile({ ...profile, tags: [...profile.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProfile({
      ...profile,
      tags: profile.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
          <h1 className="text-4xl font-display italic mb-2">个人资料管理</h1>
          <p className="text-white/40">编辑你的灵魂拼贴</p>
        </div>

        <div className="glass p-8 space-y-8">
          {/* 名字 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              名字
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
              placeholder="你的名字"
            />
          </div>

          {/* 头像 URL */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              头像图片 URL
            </label>
            <input
              type="text"
              value={profile.avatar_url}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
              placeholder="https://example.com/avatar.jpg"
            />
            {profile.avatar_url && (
              <div className="mt-4">
                <img
                  src={profile.avatar_url}
                  alt="预览"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* 标签 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              身份标签
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {profile.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm border border-white/10 rounded-full bg-white/5 flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag()}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-200/50"
                placeholder="添加新标签"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加
              </button>
            </div>
          </div>

          {/* 个人介绍第一段 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              个人介绍 - 第一段
            </label>
            <textarea
              value={profile.bio_paragraph_1}
              onChange={(e) => setProfile({ ...profile, bio_paragraph_1: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[100px]"
              placeholder="写下你的故事..."
            />
          </div>

          {/* 个人介绍第二段 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              个人介绍 - 第二段
            </label>
            <textarea
              value={profile.bio_paragraph_2}
              onChange={(e) => setProfile({ ...profile, bio_paragraph_2: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[100px]"
              placeholder="继续你的故事..."
            />
          </div>

          {/* 引用语句 */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
              引用语句
            </label>
            <input
              type="text"
              value={profile.bio_quote}
              onChange={(e) => setProfile({ ...profile, bio_quote: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
              placeholder="一句有意义的话..."
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

