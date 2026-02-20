"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Send, X } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  time: string;
  location: string;
  join_link: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <section id="events" className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-display italic mb-2">营地集会</h2>
          <p className="text-white/40">Physical Vibe</p>
        </div>
        <div className="h-px flex-1 bg-white/10 mx-8 mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="glass p-8 flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-2xl font-display mb-4 group-hover:text-amber-200 transition-colors">
                {event.title}
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">{event.description}</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <Calendar className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedEvent(event)}
              className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-200/50 transition-all flex items-center justify-center gap-2 group/btn"
            >
              <span>立即报名</span>
              <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass p-8 max-w-lg w-full"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-display mb-2">{selectedEvent.title}</h3>
              <p className="text-white/40 mb-6 italic">报名表单已就绪，请填写你的信息</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('报名成功！'); setSelectedEvent(null); }}>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">你的称呼</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50" placeholder="怎么称呼你？" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">联系方式</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-200/50" placeholder="微信或邮箱" required />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors mt-4">
                  确认提交
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
