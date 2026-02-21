"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X } from "lucide-react";
import Notification from "./Notification";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, contact, message }),
      });
      
      if (res.ok) {
        setName("");
        setContact("");
        setMessage("");
        onClose();
        setNotification({
          isOpen: true,
          type: "success",
          title: "发送成功！",
          message: "你的消息已经送达，小黑会尽快回复你的。",
        });
      } else {
        const errorData = await res.json();
        setNotification({
          isOpen: true,
          type: "error",
          title: "发送失败",
          message: errorData.error === "服务器配置错误" 
            ? "邮件服务暂时不可用，请稍后再试或通过其他方式联系。"
            : "消息发送遇到了问题，可能是网络不稳定，请稍后重试。",
        });
      }
    } catch (err) {
      console.error(err);
      setNotification({
        isOpen: true,
        type: "error",
        title: "发送失败",
        message: "网络连接出现问题，请检查网络后重试。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative glass p-8 max-w-lg w-full"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl font-display">联系我</h3>
            </div>
            <p className="text-white/40 mb-6 italic">有什么想说的吗？</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="你的名字"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  联系方式
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                  placeholder="邮箱或微信（选填）"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                  留言内容 *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[120px]"
                  placeholder="想说些什么..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors mt-4 disabled:opacity-50"
              >
                {isSubmitting ? "发送中..." : "发送消息"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
      
      <Notification
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </AnimatePresence>
  );
}


