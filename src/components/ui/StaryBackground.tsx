import React, { useEffect, useRef } from "react";

const StaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    
    if (!rect) {
      return;
    }

    const { width, height } = rect;

    canvas!.width = width;
    canvas!.height = height;

    const drawStars = (count: number) => {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = '#FFFFFF';
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1.5;
        ctx!.beginPath();
        ctx!.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx!.fill();
      }
    };

    drawStars(1000);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default StaryBackground;
