"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Users, ChevronRight } from "lucide-react";

interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
}

interface RegistrationCount {
  event_id: number;
  total: number;
  pending: number;
  confirmed: number;
  attended: number;
  absent: number;
}

export default function EventRegistrationsOverview() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [registrationCounts, setRegistrationCounts] = useState<{ [key: number]: RegistrationCount }>({});
  const [isLoading, setIsLoading] = useState(true);

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
      fetchData();
    } catch (error) {
      router.push("/admin");
    }
  };

  const fetchData = async () => {
    try {
      // 获取所有活动
      const eventsRes = await fetch("/api/events");
      const eventsData = await eventsRes.json();
      setEvents(eventsData || []);

      // 获取每个活动的报名统计
      const counts: { [key: number]: RegistrationCount } = {};
      for (const event of eventsData) {
        const regRes = await fetch(`/api/events/${event.id}/registrations`);
        const regData = await regRes.json();
        
        counts[event.id] = {
          event_id: event.id,
          total: regData.length,
          pending: regData.filter((r: any) => r.status === "pending").length,
          confirmed: regData.filter((r: any) => r.status === "confirmed").length,
          attended: regData.filter((r: any) => r.status === "attended").length,
          absent: regData.filter((r: any) => r.status === "absent").length,
        };
      }
      setRegistrationCounts(counts);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0510] flex items-center justify-center">
        <div className="text-white/40">加载中...</div>
      </div>
    );
  }

  const totalRegistrations = Object.values(registrationCounts).reduce((sum, count) => sum + count.total, 0);

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
          <h1 className="text-4xl font-display italic mb-2">活动报名管理</h1>
          <p className="text-white/40">查看和管理所有活动的报名情况</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">活动总数</div>
            <div className="text-3xl font-bold">{events.length}</div>
          </div>
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">总报名数</div>
            <div className="text-3xl font-bold">{totalRegistrations}</div>
          </div>
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">待确认</div>
            <div className="text-3xl font-bold text-yellow-400">
              {Object.values(registrationCounts).reduce((sum, count) => sum + count.pending, 0)}
            </div>
          </div>
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">已参加</div>
            <div className="text-3xl font-bold text-green-400">
              {Object.values(registrationCounts).reduce((sum, count) => sum + count.attended, 0)}
            </div>
          </div>
        </div>

        {/* 活动列表 */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="glass p-8 text-center text-white/40">
              暂无活动
            </div>
          ) : (
            events.map((event, index) => {
              const count = registrationCounts[event.id] || {
                total: 0,
                pending: 0,
                confirmed: 0,
                attended: 0,
                absent: 0,
              };

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => router.push(`/admin/events/${event.id}/registrations`)}
                  className="glass p-6 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-amber-500" />
                        <h3 className="text-xl font-display group-hover:text-amber-200 transition-colors">
                          {event.title}
                        </h3>
                      </div>
                      <div className="space-y-2 text-sm text-white/60 mb-4">
                        <div>📅 {event.time}</div>
                        <div>📍 {event.location}</div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-white/40" />
                          <span className="text-white/80">总计: {count.total}</span>
                        </div>
                        <div className="text-yellow-400">待确认: {count.pending}</div>
                        <div className="text-blue-400">已确认: {count.confirmed}</div>
                        <div className="text-green-400">已参加: {count.attended}</div>
                        <div className="text-red-400">未参加: {count.absent}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

