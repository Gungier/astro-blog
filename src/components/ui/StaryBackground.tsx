import React, { useEffect, useRef, useState } from "react";

/**
 * Renders a canvas with a starry background that changes depending on the time of day.
 * @returns {React.ReactElement} The rendered canvas.
 */
const StaryBackground = (props: { className?: string }): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [stateSimulate, setSimulate] = useState<boolean>(false);

  useEffect(() => {
    const handleSimulationChange = (event: Event): void => {
      setSimulate((event as CustomEvent<boolean>).detail);
    };

    document.addEventListener("simulateChange", handleSimulationChange);

    return () => {
      document.removeEventListener("simulateChange", handleSimulationChange);
    };
  }, []);

  useEffect(() => {
    if (!stateSimulate) {
      const updateHour = () => setHour(new Date().getHours());
      const timer = setInterval(updateHour, 1000 * 60); // Check every minute
      return () => clearInterval(timer);
    }
  }, [stateSimulate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas is null

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Exit if context is null

    /**
     * Get a gradient for a given hour of the day.
     *
     * @param {number} hour - The hour of the day, between 0 and 23.
     * @return {CanvasGradient} The gradient for the given hour.
     */
    const getGradient = (hour: number): CanvasGradient => {
      const height: number = canvas.height;
      let grad: CanvasGradient = ctx.createLinearGradient(0, 0, 0, height);

      // Simplified gradient logic for demonstration
      // For smooth transitions, interpolate between colors based on the exact time
      if (hour >= 5 && hour < 8) {
        // Sunrise
        grad.addColorStop(0, "orange");
        grad.addColorStop(1, "skyblue");
      } else if (hour >= 8 && hour < 17) {
        // Daytime
        grad.addColorStop(0, "skyblue");
        grad.addColorStop(1, "white");
      } else if (hour >= 17 && hour < 20) {
        // Sunset
        grad.addColorStop(0, "orange");
        grad.addColorStop(1, "purple");
      } else {
        // Nighttime
        grad.addColorStop(0, "black");
        grad.addColorStop(1, "darkblue");
      }
      return grad;
    };

    const updateCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = getGradient(hour);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawStars(1000);
    };

    const drawStars = (count: number): void => {
      ctx.fillStyle = "#FFFFFF";
      for (let i = 0; i < count; i++) {
        const x: number = Math.random() * canvas.width;
        const y: number = Math.random() * canvas.height;
        const radius: number = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
      }
    };

    updateCanvas();
    window.addEventListener("resize", updateCanvas);

    return () => {
      window.removeEventListener("resize", updateCanvas);
    };
  }, [hour]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (stateSimulate) {
      interval = setInterval(() => {
        setHour((prevHour) => (prevHour + 1) % 24);
      }, 1250); // Adjust for smoother transition
    } else {
      clearInterval(interval);
      setHour(new Date().getHours()); // Reset to current hour when not simulating
    }

    return () => clearInterval(interval);
  }, [stateSimulate]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:"fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default StaryBackground;
