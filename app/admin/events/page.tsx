"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Users } from "lucide-react";
import Notification from "@/components/Notification";

interface Event {
  id: number;
  title: string;
  description: string;
  time: string;
  location: string;
  join_link: string;
  created_at: string;
}

export default function EventsAdmin() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    join_link: "",
  });
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
      fetchEvents();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data || []);
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      time: "",
      location: "",
      join_link: "",
    });
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      time: event.time,
      location: event.location,
      join_link: event.join_link || "",
    });
  };

  const handleSave = async () => {
    try {
      const url = editingEvent ? `/api/events/${editingEvent.id}` : "/api/events";
      const method = editingEvent ? "PUT" : "POST";

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
          message: editingEvent ? "活动已更新" : "新活动已创建",
        });
        setEditingEvent(null);
        setIsCreating(false);
        fetchEvents();
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
    if (!confirm("确定要删除这个活动吗？")) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "删除成功",
          message: "活动已删除",
        });
        fetchEvents();
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
    setEditingEvent(null);
    setIsCreating(false);
    setFormData({
      title: "",
      description: "",
      time: "",
      location: "",
      join_link: "",
    });
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
            <h1 className="text-4xl font-display italic mb-2">营地集会管理</h1>
            <p className="text-white/40">发布和编辑活动</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新建活动
          </button>
        </div>

        {/* 编辑/创建表单 */}
        {(editingEvent || isCreating) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-display">
                {editingEvent ? "编辑活动" : "新建活动"}
              </h3>
              <button onClick={handleCancel} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  活动标题 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="活动名称"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  活动描述 *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[100px]"
                  placeholder="活动详情..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    时间 *
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                    placeholder="2026年3月15日 14:00"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    地点 *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                    placeholder="活动地点"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  报名链接（选填）
                </label>
                <input
                  type="text"
                  value={formData.join_link}
                  onChange={(e) => setFormData({ ...formData, join_link: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="https://example.com"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!formData.title || !formData.description || !formData.time || !formData.location}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                保存
              </button>
            </div>
          </motion.div>
        )}

        {/* 活动列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6"
            >
              <h3 className="text-xl font-display mb-3">{event.title}</h3>
              <p className="text-white/60 mb-4 line-clamp-3">{event.description}</p>
              <div className="space-y-2 mb-4 text-sm text-white/40">
                <div>📅 {event.time}</div>
                <div>📍 {event.location}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  编辑
                </button>
                <button
                  onClick={() => router.push(`/admin/events/${event.id}/registrations`)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  报名
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="col-span-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
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

