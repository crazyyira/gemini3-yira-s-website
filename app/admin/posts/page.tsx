"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";
import Notification from "@/components/Notification";

interface Post {
  id: number;
  content: string;
  image_url: string;
  created_at: string;
}

export default function PostsAdmin() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ content: "", image_url: "" });
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
      fetchPosts();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ content: "", image_url: "" });
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({ content: post.content, image_url: post.image_url });
  };

  const handleSave = async () => {
    try {
      const url = editingPost ? `/api/posts/${editingPost.id}` : "/api/posts";
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "保存成功！",
          message: editingPost ? "碎片已更新" : "新碎片已创建",
        });
        setEditingPost(null);
        setIsCreating(false);
        fetchPosts();
      } else {
        throw new Error("保存失败");
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        title: "保存失败",
        message: "操作失败，请稍后重试",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("确定要删除这个碎片吗？")) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "删除成功",
          message: "碎片已删除",
        });
        fetchPosts();
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

  const handleCancel = () => {
    setEditingPost(null);
    setIsCreating(false);
    setFormData({ content: "", image_url: "" });
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回后台
            </button>
            <h1 className="text-4xl font-display italic mb-2">岛屿碎片管理</h1>
            <p className="text-white/40">管理图文内容</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新建碎片
          </button>
        </div>

        {/* 编辑/创建表单 */}
        {(editingPost || isCreating) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-display">
                {editingPost ? "编辑碎片" : "新建碎片"}
              </h3>
              <button onClick={handleCancel} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  图片 URL
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="预览"
                    className="mt-4 w-full max-w-md h-48 object-cover rounded-lg"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  内容
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[100px]"
                  placeholder="写下你的碎片..."
                />
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
              >
                <Save className="w-5 h-5" />
                保存
              </button>
            </div>
          </motion.div>
        )}

        {/* 碎片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-white/80 mb-4 line-clamp-3">{post.content}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    删除
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
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



