import React, { useRef, useEffect } from 'react';

interface WaveBackgroundProps {
  className?: string;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Draw animated waves
    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // First wave (purple)
      ctx.fillStyle = '#6B46C1';
      ctx.globalAlpha = 0.15;
      drawWave(time * 0.7, 30, 0.02, canvas.height * 0.5);
      
      // Second wave (blue)
      ctx.fillStyle = '#00B4D8';
      ctx.globalAlpha = 0.1;
      drawWave(time * 0.5, 40, 0.03, canvas.height * 0.6);
      
      // Third wave (brighter blue)
      ctx.fillStyle = '#00B4D8';
      ctx.globalAlpha = 0.05;
      drawWave(time * 0.3, 20, 0.015, canvas.height * 0.7);
      
      time += 0.05;
      animationFrameId = requestAnimationFrame(drawWaves);
    };
    
    // Helper function to draw a single wave
    const drawWave = (
      timeOffset: number,
      amplitude: number,
      frequency: number,
      yPosition: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin((x * frequency) + timeOffset) * amplitude + yPosition;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
    };
    
    drawWaves();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
      aria-hidden="true"
    />
  );
};

export default WaveBackground;