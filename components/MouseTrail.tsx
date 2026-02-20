"use client";

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  type: 'star' | 'heart';
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      const type = Math.random() > 0.5 ? 'star' : 'heart';
      const size = Math.random() * 15 + 5;
      const maxLife = Math.random() * 60 + 40;
      
      const starColors = ['#2D1B4E', '#4A5D7E', '#00FFFF', '#7B68EE'];
      const heartColor = '#FF1493';

      const color = type === 'star' 
        ? starColors[Math.floor(Math.random() * starColors.length)]
        : heartColor;

      particles.current.push({
        x,
        y,
        size,
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        color,
        type,
        life: maxLife,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(x, y - outerRadius);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(x, y - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.fill();
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        p.rotation += p.rotationSpeed;

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (p.size + p2.size) / 2;

          if (distance < minDistance) {
            const angle = Math.atan2(dy, dx);
            const targetX = p2.x + Math.cos(angle) * minDistance;
            const targetY = p2.y + Math.sin(angle) * minDistance;
            const ax = (targetX - p.x) * 0.05;
            const ay = (targetY - p.y) * 0.05;
            p.speedX -= ax;
            p.speedY -= ay;
            p2.speedX += ax;
            p2.speedY += ay;
          }
        }

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        const opacity = p.life / p.maxLife;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        if (p.type === 'star') {
          drawStar(ctx, 0, 0, 5, p.size, p.size / 2);
        } else {
          drawHeart(ctx, 0, -p.size/2, p.size);
        }
        
        ctx.restore();
      });

      ctx.globalAlpha = 1;
      updateParticles();
      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
      
      createParticle(e.clientX, e.clientY);
      if (Math.random() > 0.7) createParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createParticle(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
