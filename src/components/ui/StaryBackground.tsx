import React, { useEffect, useRef } from "react";

/**
 * Renders a canvas element with a background of stars.
 * 
 * @returns A React functional component that renders a canvas element.
 */
const StaryBackground = (): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /**
     * Updates the canvas size and draws stars.
     */
    const updateCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const drawStars = (count: number): void => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < count; i++) {
          const x: number = Math.random() * canvas.width;
          const y: number = Math.random() * canvas.height;
          const radius: number = Math.random() * 1.5;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2, true);
          ctx.fill();
        }
      };

      drawStars(1000);
    };

    // Draw stars and resize canvas on window resize
    updateCanvas();
    window.addEventListener('resize', updateCanvas);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', updateCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default StaryBackground;
