'use client';

import { useEffect, useRef } from 'react';

export function ThreeDCanvasHero() {
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
      mouseX = (e.clientX - rect.left - rect.width / 2) * 0.03;
      mouseY = (e.clientY - rect.top - rect.height / 2) * 0.03;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 550;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Subtle 3D Glass Objects Simulation
    const shapes = Array.from({ length: 10 }, (_, i) => ({
      x: (Math.random() - 0.5) * canvas.width * 0.7,
      y: (Math.random() - 0.5) * canvas.height * 0.7,
      z: Math.random() * 400 + 150,
      size: Math.random() * 14 + 8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      color: i % 2 === 0 ? 'rgba(37, 99, 235, 0.2)' : 'rgba(124, 58, 237, 0.18)',
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2 + mouseX;
      const centerY = canvas.height / 2 + mouseY;

      angle += 0.005;

      // Draw Subtle 3D Shapes
      shapes.forEach((shape) => {
        shape.rotation += shape.rotSpeed;

        const perspective = 500 / (500 + shape.z);
        const px = centerX + shape.x * perspective;
        const py = centerY + shape.y * perspective;
        const pSize = shape.size * perspective;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(shape.rotation + angle);

        ctx.beginPath();
        ctx.rect(-pSize / 2, -pSize / 2, pSize, pSize);
        ctx.fillStyle = shape.color;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

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
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-40" />
    </div>
  );
}
