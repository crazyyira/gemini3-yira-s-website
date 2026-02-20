import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Post {
  id: number;
  content: string;
  image_url: string;
  created_at: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-display italic mb-2">岛屿碎片</h2>
          <p className="text-white/40">The Dream Stream</p>
        </div>
        <div className="h-px flex-1 bg-white/10 mx-8 mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass glass-hover overflow-hidden group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={post.image_url}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6">
              <p className="text-white/80 leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center justify-between text-xs text-white/30 font-mono">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span className="px-2 py-1 rounded border border-white/10">FRAGMENT #{post.id}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
