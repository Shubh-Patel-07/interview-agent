'use client';

import { useEffect, useRef } from 'react';

export function ThreeDCanvasHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.05;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D Glass Objects Simulation
    const shapes = Array.from({ length: 18 }, (_, i) => ({
      x: (Math.random() - 0.5) * canvas.width * 0.8,
      y: (Math.random() - 0.5) * canvas.height * 0.8,
      z: Math.random() * 500 + 100,
      size: Math.random() * 24 + 12,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      color: i % 3 === 0 ? 'rgba(37, 99, 235, 0.35)' : i % 3 === 1 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(2, 132, 199, 0.35)',
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2 + mouseX;
      const centerY = canvas.height / 2 + mouseY;

      angle += 0.008;

      // Draw 3D Floating Glass Cubes and Spheres
      shapes.forEach((shape) => {
        shape.rotation += shape.rotSpeed;

        // 3D Perspective Projection
        const perspective = 600 / (600 + shape.z);
        const px = centerX + shape.x * perspective;
        const py = centerY + shape.y * perspective;
        const pSize = shape.size * perspective;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(shape.rotation + angle);

        // Glassmorphic 3D Square
        ctx.beginPath();
        ctx.rect(-pSize / 2, -pSize / 2, pSize, pSize);
        ctx.fillStyle = shape.color;
        ctx.shadowColor = 'rgba(37, 99, 235, 0.2)';
        ctx.shadowBlur = 15;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      });

      // Rotating Neural Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * 0.5);

      ctx.beginPath();
      ctx.ellipse(0, 0, 180, 70, angle * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, 240, 90, -angle * 0.2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-80" />
    </div>
  );
}
