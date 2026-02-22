"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { 
  User, 
  Image, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  LogOut,
  ChevronRight,
  Users,
  Home
} from "lucide-react";

const menuItems = [
  {
    title: "首页内容",
    description: "编辑首页文字内容",
    icon: Home,
    href: "/admin/hero",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "个人资料",
    description: "编辑灵魂拼切信息",
    icon: User,
    href: "/admin/profile",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "岛屿碎片",
    description: "管理图文内容",
    icon: Image,
    href: "/admin/posts",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "营地集会",
    description: "发布和编辑活动",
    icon: Calendar,
    href: "/admin/events",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "活动报名",
    description: "管理活动报名信息",
    icon: Users,
    href: "/admin/event-registrations",
    color: "from-teal-500 to-cyan-500",
  },
  {
    title: "预约管理",
    description: "查看预约情况",
    icon: BookOpen,
    href: "/admin/bookings",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "瓶中信",
    description: "查看用户故事",
    icon: MessageSquare,
    href: "/admin/stories",
    color: "from-amber-500 to-yellow-500",
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (!res.ok) {
        router.push("/admin");
      }
    } catch (error) {
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
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
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display italic mb-2">小黑的灯塔</h1>
            <p className="text-white/40">欢迎回来，小黑</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 hover:bg-white/10 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-display mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </motion.a>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">总访问量</div>
            <div className="text-3xl font-bold">-</div>
          </div>
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">待处理预约</div>
            <div className="text-3xl font-bold">-</div>
          </div>
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">瓶中信</div>
            <div className="text-3xl font-bold">-</div>
          </div>
          <div className="glass p-6">
            <div className="text-white/40 text-sm mb-2">活动数量</div>
            <div className="text-3xl font-bold">-</div>
          </div>
        </div>
      </div>
    </div>
  );
}

