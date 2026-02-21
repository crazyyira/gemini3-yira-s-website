"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, Phone, FileText, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import Notification from "./Notification";

interface BookingData {
  date: string;
  time: string;
  name: string;
  contact: string;
  type: string;
  details: string;
}

const BOOKING_TYPES = [
  { value: "offline", label: "线下玩耍" },
  { value: "online", label: "远程见面" },
  { value: "talk", label: "心事时间" },
  { value: "other", label: "其他" },
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

export default function BookingSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: 日历, 2: 时间和表单, 3: 确认
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingData, setBookingData] = useState<BookingData>({
    date: "",
    time: "",
    name: "",
    contact: "",
    type: "",
    details: "",
  });
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [fullyBookedDates, setFullyBookedDates] = useState<Set<string>>(new Set());
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
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

  // 格式化日期为 YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 获取指定日期的已预约时间段
  const fetchBookedTimes = async (date: string) => {
    setIsLoadingTimes(true);
    try {
      const res = await fetch(`/api/bookings?date=${date}`);
      if (res.ok) {
        const data = await res.json();
        setBookedTimes(data.bookedTimes || []);
      }
    } catch (error) {
      console.error("获取预约时间失败:", error);
    } finally {
      setIsLoadingTimes(false);
    }
  };

  // 检查某个日期是否已约满
  const checkIfDateFullyBooked = async (date: Date) => {
    const dateStr = formatDate(date);
    try {
      const res = await fetch(`/api/bookings?date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        return data.bookedTimes?.length >= TIME_SLOTS.length;
      }
    } catch (error) {
      console.error("检查日期失败:", error);
    }
    return false;
  };

  // 加载当月所有已约满的日期
  useEffect(() => {
    const loadFullyBookedDates = async () => {
      const days = getDaysInMonth(currentMonth);
      const fullyBooked = new Set<string>();
      
      for (const day of days) {
        if (day && isDateSelectable(day)) {
          const isFull = await checkIfDateFullyBooked(day);
          if (isFull) {
            fullyBooked.add(formatDate(day));
          }
        }
      }
      
      setFullyBookedDates(fullyBooked);
    };

    if (isOpen) {
      loadFullyBookedDates();
    }
  }, [currentMonth, isOpen]);

  // 获取当月日历数据
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // 填充前面的空白
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isDateSelectable = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 2);
    
    // 检查日期是否在可选范围内且未约满
    const dateStr = formatDate(date);
    return date >= today && date < nextMonth && !fullyBookedDates.has(dateStr);
  };

  const handleDateSelect = async (date: Date) => {
    if (!isDateSelectable(date)) return;
    const dateStr = formatDate(date);
    setBookingData({
      ...bookingData,
      date: dateStr,
      time: "", // 重置时间选择
    });
    // 获取该日期已预约的时间段
    await fetchBookedTimes(dateStr);
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleConfirm = async () => {
    try {
      // 保存预约到数据库
      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          contact: bookingData.contact,
          date: bookingData.date,
          time: bookingData.time,
          bookingType: bookingData.type,
          details: bookingData.details,
        }),
      });

      const bookingResult = await bookingRes.json();

      if (!bookingRes.ok) {
        setIsOpen(false);
        setStep(1);
        setBookingData({
          date: "",
          time: "",
          name: "",
          contact: "",
          type: "",
          details: "",
        });
        
        if (bookingRes.status === 409) {
          setNotification({
            isOpen: true,
            type: "error",
            title: "预约失败",
            message: "该时间段已被预约，请选择其他时间。",
          });
        } else {
          setNotification({
            isOpen: true,
            type: "error",
            title: "预约失败",
            message: "预约提交遇到了问题，请稍后重试。",
          });
        }
        return;
      }

      // 预约成功后发送邮件通知
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          name: bookingData.name,
          contact: bookingData.contact,
          date: bookingData.date,
          time: bookingData.time,
          bookingType: bookingData.type,
          details: bookingData.details,
        }),
      });

      setIsOpen(false);
      setStep(1);
      setBookingData({
        date: "",
        time: "",
        name: "",
        contact: "",
        type: "",
        details: "",
      });

      setNotification({
        isOpen: true,
        type: "success",
        title: "预约成功！",
        message: "你的预约已经提交，小黑会尽快与你确认时间。",
      });
    } catch (error) {
      console.error("预约失败:", error);
      setIsOpen(false);
      setStep(1);
      setBookingData({
        date: "",
        time: "",
        name: "",
        contact: "",
        type: "",
        details: "",
      });
      setNotification({
        isOpen: true,
        type: "error",
        title: "预约失败",
        message: "网络连接出现问题，请检查网络后重试。",
      });
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setBookingData({ ...bookingData, date: "", time: "" });
    } else if (step === 3) {
      setStep(2);
    }
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    const maxMonth = new Date();
    maxMonth.setMonth(maxMonth.getMonth() + 1);
    if (next <= maxMonth) {
      setCurrentMonth(next);
    }
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    const today = new Date();
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="mt-8 px-8 py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors flex items-center gap-2 mx-auto"
      >
        <Calendar className="w-5 h-5" />
        <span>预约小黑</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Step 1: 日历选择 */}
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-display mb-2">选择日期</h3>
                  <p className="text-white/40 mb-6 italic">选择你想要预约的日期</p>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        disabled={currentMonth.getMonth() === new Date().getMonth()}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h4 className="text-lg font-display">
                        {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
                      </h4>
                      <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        disabled={currentMonth.getMonth() === new Date().getMonth() + 1}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {weekDays.map((day) => (
                        <div
                          key={day}
                          className="text-center text-xs text-white/40 py-2 font-medium"
                        >
                          {day}
                        </div>
                      ))}
                      {days.map((date, index) => {
                        const dateStr = date ? formatDate(date) : '';
                        const isFullyBooked = date ? fullyBookedDates.has(dateStr) : false;
                        const isSelectable = date && isDateSelectable(date);
                        
                        return (
                          <motion.button
                            key={index}
                            whileHover={isSelectable ? { scale: 1.1 } : {}}
                            whileTap={isSelectable ? { scale: 0.95 } : {}}
                            onClick={() => date && handleDateSelect(date)}
                            disabled={!date || !isSelectable}
                            className={`
                              aspect-square rounded-lg flex flex-col items-center justify-center text-sm
                              transition-all relative
                              ${!date ? "invisible" : ""}
                              ${
                                isSelectable
                                  ? "bg-white/5 hover:bg-amber-500/20 hover:border-amber-500/50 border border-white/10 cursor-pointer"
                                  : "bg-white/5 text-white/20 cursor-not-allowed"
                              }
                            `}
                          >
                            <span>{date?.getDate()}</span>
                            {isFullyBooked && (
                              <span className="text-[10px] text-red-400 mt-0.5">已满</span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 时间和表单 */}
              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-display mb-2">预约详情</h3>
                  <p className="text-white/40 mb-6 italic">
                    已选择：{bookingData.date}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 时间选择 */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        选择时间段
                      </label>
                      {isLoadingTimes ? (
                        <div className="text-center py-4 text-white/40">加载中...</div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {TIME_SLOTS.map((time) => {
                            const isBooked = bookedTimes.includes(time);
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => !isBooked && setBookingData({ ...bookingData, time })}
                                disabled={isBooked}
                                className={`
                                  py-2 px-3 rounded-lg text-sm transition-all
                                  ${
                                    bookingData.time === time
                                      ? "bg-amber-500 text-black font-bold"
                                      : isBooked
                                      ? "bg-white/5 text-white/20 cursor-not-allowed"
                                      : "bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
                                  }
                                `}
                              >
                                {time}
                                {isBooked && <span className="block text-xs mt-1">已约</span>}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* 姓名 */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        你的称呼 *
                      </label>
                      <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                        placeholder="怎么称呼你？"
                        required
                      />
                    </div>

                    {/* 联系方式 */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        联系方式 *
                      </label>
                      <input
                        type="text"
                        value={bookingData.contact}
                        onChange={(e) => setBookingData({ ...bookingData, contact: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50"
                        placeholder="微信或邮箱"
                        required
                      />
                    </div>

                    {/* 预约类型 */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        预约事项 *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {BOOKING_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setBookingData({ ...bookingData, type: type.value })}
                            className={`
                              py-3 px-4 rounded-lg transition-all text-left
                              ${
                                bookingData.type === type.value
                                  ? "bg-amber-500 text-black font-bold"
                                  : "bg-white/5 border border-white/10 hover:bg-white/10"
                              }
                            `}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 具体事项 */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                        具体事项
                      </label>
                      <textarea
                        value={bookingData.details}
                        onChange={(e) => setBookingData({ ...bookingData, details: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50 min-h-[100px]"
                        placeholder="想聊些什么呢？（选填）"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!bookingData.time || !bookingData.name || !bookingData.contact || !bookingData.type}
                      className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      下一步
                    </button>
                  </form>
                </div>
              )}

              {/* Step 3: 确认 */}
              {step === 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-amber-500" />
                    <h3 className="text-2xl font-display">确认预约信息</h3>
                  </div>
                  <p className="text-white/40 mb-8 italic">请仔细核对以下信息</p>

                  <div className="space-y-4 mb-8">
                    <div className="glass p-4">
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-1">日期时间</div>
                      <div className="text-lg">{bookingData.date} {bookingData.time}</div>
                    </div>
                    <div className="glass p-4">
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-1">称呼</div>
                      <div className="text-lg">{bookingData.name}</div>
                    </div>
                    <div className="glass p-4">
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-1">联系方式</div>
                      <div className="text-lg">{bookingData.contact}</div>
                    </div>
                    <div className="glass p-4">
                      <div className="text-xs uppercase tracking-widest text-white/40 mb-1">预约事项</div>
                      <div className="text-lg">
                        {BOOKING_TYPES.find((t) => t.value === bookingData.type)?.label}
                      </div>
                    </div>
                    {bookingData.details && (
                      <div className="glass p-4">
                        <div className="text-xs uppercase tracking-widest text-white/40 mb-1">具体事项</div>
                        <div className="text-lg">{bookingData.details}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      返回修改
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
                    >
                      确认预约
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <Notification
        isOpen={notification.isOpen}
        onClose={() => setNotification({ ...notification, isOpen: false })}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </>
  );
}

