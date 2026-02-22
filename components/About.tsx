"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Profile {
  name: string;
  avatar_url: string;
  tags: string[];
  bio_paragraph_1: string;
  bio_paragraph_2: string;
  bio_quote: string;
}

interface Photo {
  name: string;
  url: string;
  created_at: string;
}

export default function About() {
  const [profile, setProfile] = useState<Profile>({
    name: "小黑",
    avatar_url: "https://picsum.photos/seed/xiaohei/800/800",
    tags: ["北京", "攀岩者", "潜水员", "Vibe Coder", "活动主理人"],
    bio_paragraph_1: "从印尼的浪尖到阳朔的洞穴，从读诗会的温润到搞砸俱乐部的坦诚。",
    bio_paragraph_2: "我在这里创造一个让城市紧绷的人放松的场域。对我而言，代码与山海并无二致，它们都是通往自由的路径。",
    bio_quote: "We are all fragments of a larger dream.",
  });

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setProfile(data);
        }
      })
      .catch((err) => console.error("Failed to load profile:", err));

    // 加载 Supabase Storage 中的照片
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        }
      })
      .catch((err) => console.error("Failed to load photos:", err));
  }, []);

  // 自动轮播照片（可选）
  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000); // 每5秒切换一张

    return () => clearInterval(interval);
  }, [photos.length]);

  const displayImage = photos.length > 0 ? photos[currentPhotoIndex].url : profile.avatar_url;

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl rotate-3 opacity-20" />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl -rotate-3 border border-white/10" />
          <img
            key={currentPhotoIndex}
            src={displayImage}
            alt={profile.name}
            className="absolute inset-4 object-cover rounded-2xl hover:scale-[1.02] transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          
          {/* 照片指示器 */}
          {photos.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPhotoIndex
                      ? "bg-amber-500 w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h2 className="text-4xl font-display italic mb-4">灵魂拼贴</h2>
            <div className="flex flex-wrap gap-3">
              {profile.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs tracking-widest uppercase border border-white/10 rounded-full bg-white/5 text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg text-white/70 leading-relaxed font-light"
          >
            <p>{profile.bio_paragraph_1}</p>
            <p>{profile.bio_paragraph_2}</p>
            <p className="italic text-amber-200/60">{profile.bio_quote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
