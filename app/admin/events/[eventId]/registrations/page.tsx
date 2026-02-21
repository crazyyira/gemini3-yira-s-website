"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, User, Phone, Check } from "lucide-react";
import Notification from "@/components/Notification";

interface Registration {
  id: string;
  event_id: number;
  name: string;
  contact: string;
  status: string;
  notes: string;
  created_at: string;
}

interface Event {
  id: number;
  title: string;
}

const STATUS_MAP: { [key: string]: { label: string; color: string } } = {
  pending: { label: "待确认", color: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "已确认", color: "bg-blue-500/20 text-blue-400" },
  attended: { label: "已参加", color: "bg-green-500/20 text-green-400" },
  absent: { label: "未参加", color: "bg-red-500/20 text-red-400" },
};

export default function EventRegistrationsAdmin() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.eventId as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingReg, setEditingReg] = useState<Registration | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", contact: "", notes: "" });
  const [filter, setFilter] = useState<string>("all");
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
      fetchEvent();
      fetchRegistrations();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchEvent = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      const foundEvent = data.find((e: Event) => e.id === parseInt(eventId));
      setEvent(foundEvent || null);
    } catch (error) {
      console.error("Failed to load event:", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`/api/events/${eventId}/registrations`);
      const data = await res.json();
      setRegistrations(data || []);
    } catch (error) {
      console.error("Failed to load registrations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ name: "", contact: "", notes: "" });
  };

  const handleEdit = (reg: Registration) => {
    setEditingReg(reg);
    setFormData({ name: reg.name, contact: reg.contact, notes: reg.notes || "" });
  };

  const handleSave = async () => {
    try {
      const url = editingReg
        ? `/api/events/${eventId}/registrations/${editingReg.id}`
        : `/api/events/${eventId}/registrations`;
      const method = editingReg ? "PUT" : "POST";

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
          message: editingReg ? "报名信息已更新" : "报名已添加",
        });
        setEditingReg(null);
        setIsCreating(false);
        fetchRegistrations();
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

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这条报名吗？")) return;

    try {
      const res = await fetch(`/api/events/${eventId}/registrations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "删除成功",
          message: "报名已删除",
        });
        fetchRegistrations();
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

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}/registrations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "更新成功",
          message: `状态已更新为：${STATUS_MAP[status].label}`,
        });
        fetchRegistrations();
      }
    } catch (error) {
      setNotification({
        isOpen: true,
        type: "error",
        title: "更新失败",
        message: "操作失败，请稍后重试",
      });
    }
  };

  const handleCancel = () => {
    setEditingReg(null);
    setIsCreating(false);
    setFormData({ name: "", contact: "", notes: "" });
  };

  const filteredRegistrations = registrations.filter((reg) => {
    if (filter === "all") return true;
    return reg.status === filter;
  });

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
            onClick={() => router.push("/admin/events")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回活动列表
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-display italic mb-2">
                {event?.title || "活动"} - 报名管理
              </h1>
              <p className="text-white/40">共 {registrations.length} 人报名</p>
            </div>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
              添加报名
            </button>
          </div>
        </div>

        {/* 编辑/创建表单 */}
        {(editingReg || isCreating) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-display">
                {editingReg ? "编辑报名" : "添加报名"}
              </h3>
              <button onClick={handleCancel} className="p-2 hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                    placeholder="报名人姓名"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    联系方式 *
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                    placeholder="微信或邮箱"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  备注
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[80px]"
                  placeholder="备注信息（选填）"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!formData.name || !formData.contact}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                保存
              </button>
            </div>
          </motion.div>
        )}

        {/* 筛选器 */}
        <div className="flex gap-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              filter === "all"
                ? "bg-amber-500 text-black font-bold"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            全部 ({registrations.length})
          </button>
          {Object.entries(STATUS_MAP).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                filter === key
                  ? "bg-amber-500 text-black font-bold"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {value.label} ({registrations.filter((r) => r.status === key).length})
            </button>
          ))}
        </div>

        {/* 报名列表 */}
        <div className="space-y-4">
          {filteredRegistrations.length === 0 ? (
            <div className="glass p-8 text-center text-white/40">暂无报名记录</div>
          ) : (
            filteredRegistrations.map((reg) => (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${STATUS_MAP[reg.status].color}`}>
                        {STATUS_MAP[reg.status].label}
                      </span>
                      <span className="text-white/40 text-sm">
                        {new Date(reg.created_at).toLocaleString("zh-CN")}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-white/80">
                        <User className="w-4 h-4 text-white/40" />
                        <span>{reg.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Phone className="w-4 h-4 text-white/40" />
                        <span>{reg.contact}</span>
                      </div>
                    </div>
                    {reg.notes && (
                      <p className="text-white/60 text-sm">{reg.notes}</p>
                    )}
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <select
                      value={reg.status}
                      onChange={(e) => updateStatus(reg.id, e.target.value)}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-amber-200/50 text-sm"
                    >
                      {Object.entries(STATUS_MAP).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleEdit(reg)}
                      className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(reg.id)}
                      className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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

