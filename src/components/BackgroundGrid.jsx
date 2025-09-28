import React, { useEffect, useRef } from "react";

export default function BackgroundGrid({ radius = 180 }) {
  const canvasRef = useRef(null);
  const boxesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationRef = useRef(null);

  // Helper to read CSS variables
  const getCSSVar = (varName, fallback) =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue(varName)) || fallback;

  useEffect(() => {
    const canvas = canvasRef.current;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const boxWidth = getCSSVar("--box-width", 24);
      const boxHeight = getCSSVar("--box-height", 16);
      const gap = getCSSVar("--box-gap", 4);
      const twinkleSpeed = getCSSVar("--twinkle-speed", 2);
      const fadeDuration = getCSSVar("--fade-duration", 1.2);
      const colorHex =
        getComputedStyle(document.documentElement).getPropertyValue("--color-primary") || "#3d7b7a";

      const cols = Math.ceil(canvas.width / (boxWidth + gap));
      const rows = Math.ceil(canvas.height / (boxHeight + gap));

      const boxes = [];

      for (let r = 0; r < rows; r++) {
        const rowDelay = Math.random() * 4000;
        const rowOffset = Math.floor(Math.random() * 14);

        for (let c = 0; c < cols; c++) {
          const left = c * (boxWidth + gap);
          const top = r * (boxHeight + gap);
          const baseOpacity = Math.random() * 0.4 + 0.1;
          const cx = left + boxWidth / 2;
          const cy = top + boxHeight / 2;
          const twinkleOffset = Math.random() * 2 * Math.PI;
          const groupIndex = (c + rowOffset) % 14;
          const groupDelay = groupIndex * 400;
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

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let lastTime = performance.now();

  const activeBlinks = [];

  const draw = (time) => {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x: mx, y: my } = mouseRef.current;
    const { boxes, boxWidth, boxHeight, colorHex, twinkleSpeed, fadeDuration } =
      boxesRef.current;

    const BLINK_STEP_DURATION = 400; // ms per cell step
    const LINE_LENGTH = 7;          // number of cells in the ripple line
    const fadeDurationMs = fadeDuration * 1000;

    // Occasionally start a new blink ripple
    if (Math.random() < 0.0001 * boxes.length) {
      const startIndex = Math.floor(Math.random() * boxes.length);
      activeBlinks.push({ index: startIndex, startTime: time });
    }

    boxes.forEach((b, idx) => {
      // Twinkle
      const twinkle =
        0.7 +
        0.3 *
          Math.sin(
            (2 * Math.PI * time) / (twinkleSpeed * 1000) + b.twinkleOffset
          );

      // Initial fade-in
      const fadeElapsed = Math.max(0, time - b.delay);
      const fadeFactor = Math.min(fadeElapsed / fadeDurationMs, 1);

      // Mouse proximity (closer = more transparent)
      const dx = mx - b.cx;
      const dy = my - b.cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseFactor = dist < radius ? dist / radius : 1;

      // Blink effect
      let blinkFactor = 1;
      activeBlinks.forEach((blink) => {
        const stepIndex = idx - blink.index;
        if (stepIndex < 0 || stepIndex >= LINE_LENGTH) return;

        const fadeOutStart = blink.startTime + stepIndex * BLINK_STEP_DURATION;
        const fadeInStart =
          blink.startTime +
          LINE_LENGTH * BLINK_STEP_DURATION +
          stepIndex * BLINK_STEP_DURATION;

        if (time >= fadeOutStart && time < fadeOutStart + BLINK_STEP_DURATION) {
          // Fade out
          const t = (time - fadeOutStart) / BLINK_STEP_DURATION;
          blinkFactor = 1 - t;
        } else if (
          time >= fadeOutStart + BLINK_STEP_DURATION &&
          time < fadeInStart
        ) {
          // Stay invisible
          blinkFactor = 0;
        } else if (
          time >= fadeInStart &&
          time < fadeInStart + BLINK_STEP_DURATION
        ) {
          // Fade back in
          const t = (time - fadeInStart) / BLINK_STEP_DURATION;
          blinkFactor = t;
        }
      });

      const opacity = b.baseOpacity * twinkle * fadeFactor * mouseFactor * blinkFactor;

      const r = parseInt(colorHex.slice(1, 3), 16);
      const g = parseInt(colorHex.slice(3, 5), 16);
      const bColor = parseInt(colorHex.slice(5, 7), 16);

      ctx.fillStyle = `rgba(${r},${g},${bColor},${opacity})`;
      ctx.fillRect(b.left, b.top, boxWidth, boxHeight);
    });

    // Clean up finished blinks
    for (let i = activeBlinks.length - 1; i >= 0; i--) {
      const blink = activeBlinks[i];
      const totalDuration = LINE_LENGTH * BLINK_STEP_DURATION * 2; // out + back
      if (time > blink.startTime + totalDuration + BLINK_STEP_DURATION) {
        activeBlinks.splice(i, 1);
      }
    }

    animationRef.current = requestAnimationFrame(draw);
  };

  animationRef.current = requestAnimationFrame(draw);
  return () => cancelAnimationFrame(animationRef.current);
}, [radius]);


  return <canvas ref={canvasRef} className="background-canvas" />;
}
