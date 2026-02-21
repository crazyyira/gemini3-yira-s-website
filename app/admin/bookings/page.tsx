"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, User, Phone, FileText, Check, X, RefreshCw } from "lucide-react";
import Notification from "@/components/Notification";

interface Booking {
  id: string;
  name: string;
  contact: string;
  booking_date: string;
  booking_time: string;
  booking_type: string;
  details: string;
  status: string;
  created_at: string;
}

const STATUS_MAP: { [key: string]: { label: string; color: string } } = {
  pending: { label: "待确认", color: "bg-yellow-500/20 text-yellow-400" },
  confirmed: { label: "已确认", color: "bg-blue-500/20 text-blue-400" },
  completed: { label: "已完成", color: "bg-green-500/20 text-green-400" },
  cancelled: { label: "已取消", color: "bg-red-500/20 text-red-400" },
};

const BOOKING_TYPE_MAP: { [key: string]: string } = {
  offline: "线下玩耍",
  online: "远程见面",
  talk: "心事时间",
  other: "其他",
};

export default function BookingsAdmin() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      fetchBookings();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings/all");
      const data = await res.json();
      setBookings(data || []);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setNotification({
          isOpen: true,
          type: "success",
          title: "更新成功",
          message: `预约状态已更新为：${STATUS_MAP[status].label}`,
        });
        fetchBookings();
      } else {
        throw new Error("更新失败");
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

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
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
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回后台
          </button>
          <h1 className="text-4xl font-display italic mb-2">预约管理</h1>
          <p className="text-white/40">查看和管理预约情况</p>
        </div>

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
            全部 ({bookings.length})
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
              {value.label} ({bookings.filter((b) => b.status === key).length})
            </button>
          ))}
        </div>

        {/* 预约列表 */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="glass p-8 text-center text-white/40">
              暂无预约记录
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${STATUS_MAP[booking.status].color}`}>
                        {STATUS_MAP[booking.status].label}
                      </span>
                      <span className="text-white/40 text-sm">
                        {new Date(booking.created_at).toLocaleString("zh-CN")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <User className="w-4 h-4 text-white/40" />
                        <span>{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Phone className="w-4 h-4 text-white/40" />
                        <span>{booking.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar className="w-4 h-4 text-white/40" />
                        <span>{booking.booking_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4 text-white/40" />
                        <span>{booking.booking_time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-white/40" />
                      <span className="text-white/60">
                        {BOOKING_TYPE_MAP[booking.booking_type] || booking.booking_type}
                      </span>
                    </div>

                    {booking.details && (
                      <p className="text-white/60 text-sm mt-2 pl-6">
                        {booking.details}
                      </p>
                    )}
                  </div>

                  {/* 状态操作按钮 */}
                  <div className="flex md:flex-col gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, "confirmed")}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          确认
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "cancelled")}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          取消
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(booking.id, "completed")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        完成
                      </button>
                    )}
                    {(booking.status === "completed" || booking.status === "cancelled") && (
                      <button
                        onClick={() => updateStatus(booking.id, "pending")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4" />
                        重置
                      </button>
                    )}
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

