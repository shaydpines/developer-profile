import React, { useEffect, useRef } from "react";

export default function BackgroundCanvas({ radius = 180 }) {
  const canvasRef = useRef(null);
  const boxesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationRef = useRef(null);

  // Helper to read CSS variables
  const getCSSVar = (varName, fallback) =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue(varName)) || fallback;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const boxWidth = getCSSVar("--box-width", 24);
      const boxHeight = getCSSVar("--box-height", 16);
      const gap = getCSSVar("--box-gap", 4);
      const twinkleSpeed = getCSSVar("--twinkle-speed", 2); // seconds per full twinkle cycle
      const fadeDuration = getCSSVar("--fade-duration", 1.2); // seconds for fade-in
      const colorHex =
        getComputedStyle(document.documentElement).getPropertyValue("--color-primary") || "#3d7b7a";

      const cols = Math.ceil(canvas.width / (boxWidth + gap));
      const rows = Math.ceil(canvas.height / (boxHeight + gap));

      const boxes = [];

      for (let r = 0; r < rows; r++) {
        const rowDelay = Math.random() * 0.5 * 1000; // random start offset per row
        const rowOffset = Math.floor(Math.random() * 7); // group offset

        for (let c = 0; c < cols; c++) {
          const left = c * (boxWidth + gap);
          const top = r * (boxHeight + gap);
          const baseOpacity = Math.random() * 0.4 + 0.1;
          const cx = left + boxWidth / 2;
          const cy = top + boxHeight / 2;
          const twinkleOffset = Math.random() * 2 * Math.PI;
          const groupIndex = (c + rowOffset) % 14;
          const groupDelay = groupIndex * 50; // ms between each in group
          const delay = rowDelay + groupDelay;

          boxes.push({ left, top, baseOpacity, cx, cy, twinkleOffset, delay });
        }
      }

      boxesRef.current = { boxes, boxWidth, boxHeight, colorHex, twinkleSpeed, fadeDuration };
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Mouse move
  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let lastTime = performance.now();

    const draw = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;

      const { boxes, boxWidth, boxHeight, colorHex, twinkleSpeed, fadeDuration } = boxesRef.current;

      boxes.forEach((b) => {
        // Twinkle: full cycle in twinkleSpeed seconds
        const twinkle = 0.7 + 0.3 * Math.sin((2 * Math.PI * time) / (twinkleSpeed * 1000) + b.twinkleOffset);

        // Fade-in with staggered delay
        const fadeElapsed = Math.max(0, time - b.delay);
        const fadeFactor = Math.min(fadeElapsed / (fadeDuration * 1000), 1);

        // Mouse proximity: reverse effect (closer = more transparent)
        const dx = mx - b.cx;
        const dy = my - b.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseFactor = dist < radius ? dist / radius : 1;

        const opacity = b.baseOpacity * twinkle * fadeFactor * mouseFactor;

        const r = parseInt(colorHex.slice(1, 3), 16);
        const g = parseInt(colorHex.slice(3, 5), 16);
        const bColor = parseInt(colorHex.slice(5, 7), 16);

        ctx.fillStyle = `rgba(${r},${g},${bColor},${opacity})`;
        ctx.fillRect(b.left, b.top, boxWidth, boxHeight);
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [radius]);

  return <canvas ref={canvasRef} className="background-canvas" />;
}
