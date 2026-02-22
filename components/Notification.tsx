"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function Notification({ isOpen, onClose, type, title, message }: NotificationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
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
            className="relative glass p-8 max-w-md w-full text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              {type === "success" ? (
                <CheckCircle className="w-16 h-16 text-amber-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-400" />
              )}
            </motion.div>

            <h3 className="text-2xl font-display mb-3">{title}</h3>
            <p className="text-white/60 mb-8 leading-relaxed">{message}</p>

            <button
              onClick={onClose}
              className={`w-full py-4 rounded-xl font-bold transition-colors ${
                type === "success"
                  ? "bg-amber-500 text-black hover:bg-amber-400"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              知道了
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}




