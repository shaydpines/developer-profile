import React, { useState, useRef, useEffect } from "react";

export default function Sphere({
  loading,
  slowSeconds = 60, // seconds per rotation (idle)
  fastSeconds = 10,  // seconds per rotation (loading)
  easing = 0.05,     // how quickly to transition between speeds
  ratios = [1, 0.75, 0.5], // relative speeds for each sphere
  direction = 1,     // 1 = clockwise, -1 = counter-clockwise
}) {
  const [angle, setAngle] = useState(0);
  const speedRef = useRef(0);
  const angleRef = useRef(0);

  const mouseAngleRef = useRef(0); // continuous unwrapped mouse angle
  const [mouseAngle, setMouseAngle] = useState(0);

  // Convert seconds/rotation → degrees per frame (assuming ~60fps)
  const toSpeed = (seconds) => (360 / (60 * seconds)) * direction;

  // Main ticker
  useEffect(() => {
    let frame;
    const tick = () => {
      angleRef.current += speedRef.current;
      setAngle(angleRef.current);

      // Smoothly lerp gyroscope rotation towards mouseAngleRef
      setMouseAngle((prev) => prev + (mouseAngleRef.current - prev) * 0.1);

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Smooth transition between speeds
  useEffect(() => {
    const targetSpeed = loading ? toSpeed(fastSeconds) : toSpeed(slowSeconds);
    let current = speedRef.current;

    const step = () => {
      current += (targetSpeed - current) * easing;
      speedRef.current = current;
      if (Math.abs(targetSpeed - current) > 0.0001) {
        requestAnimationFrame(step);
      }
    };

    step();
  }, [loading, slowSeconds, fastSeconds, easing, direction]);

  // Mouse tracking with angle unwrapping
  useEffect(() => {
    let lastAngle = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const dx = e.clientX - innerWidth / 2;
      const dy = e.clientY - innerHeight / 2;

      // Base angle in [-180, 180]
      let rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Unwrap angle
      let delta = rawAngle - lastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      mouseAngleRef.current += delta;
      lastAngle = rawAngle;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="gyroscope"
      style={{
        transform: `rotate(${mouseAngle}deg)`, // full 2D spin
      }}
    >
      <div className="sphere-wrapper">
        <div
          className="sphere"
          style={{
            transform: `rotateY(${angle * ratios[0]}deg)`,
          }}
        />
      </div>
      <div className="sphere-wrapper">
        <div
          className="sphere"
          style={{
            transform: `rotateY(${-angle * ratios[1]}deg) rotateX(${
              angle * ratios[1]
            }deg) scale(0.975)`,
          }}
        />
      </div>
      <div className="sphere-wrapper">
        <div
          className="sphere"
          style={{
            transform: `rotateY(${angle * ratios[2]}deg) rotateX(${
              angle * ratios[2]
            }deg) scale(0.95)`,
          }}
        />
      </div>
    </div>
  );
}
