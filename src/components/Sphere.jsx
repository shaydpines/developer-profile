import React, { useRef, useEffect } from "react";

export default function Sphere({
  loading,
  slowSeconds = 60, // seconds per rotation (idle)
  fastSeconds = 10, // seconds per rotation (loading)
  easing = 0.05,    // how quickly to transition between speeds
  ratios = [1, 0.75, 0.5], // relative speeds for each sphere
  direction = 1,    // 1 = clockwise, -1 = counter-clockwise
}) {
  const speedRef = useRef(0);
  const angleRef = useRef(0);

  const mouseAngleRef = useRef(0); // continuous unwrapped mouse angle
  const renderMouseAngle = useRef(0); // smoothed angle we actually apply

  // Refs to DOM elements for direct transform updates
  const gyroscopeRef = useRef(null);
  const sphereRefs = [useRef(null), useRef(null), useRef(null)];

  // Convert seconds/rotation → degrees per frame (assuming ~60fps)
  const toSpeed = (seconds) => (360 / (60 * seconds)) * direction;

  // Animation loop
  useEffect(() => {
    let frame;

    const tick = () => {
      // accumulate angle (unbounded)
      angleRef.current += speedRef.current;

      // smooth lerp gyroscope rotation towards mouseAngleRef
      renderMouseAngle.current +=
        (mouseAngleRef.current - renderMouseAngle.current) * 0.1;

      // --- Apply transforms directly ---
      if (gyroscopeRef.current) {
        const boundedMouse =
          ((renderMouseAngle.current % 360) + 360) % 360; // keep 0–360
        gyroscopeRef.current.style.transform = `rotateZ(${boundedMouse}deg)`;
      }

      const angle = angleRef.current; // can be large, doesn’t matter
      if (sphereRefs[0].current) {
        sphereRefs[0].current.style.transform = `rotateY(${
          angle * ratios[0]
        }deg)`;
      }
      if (sphereRefs[1].current) {
        sphereRefs[1].current.style.transform = `rotateY(${
          -angle * ratios[1]
        }deg) rotateX(${angle * ratios[1]}deg) scale(0.975)`;
      }
      if (sphereRefs[2].current) {
        sphereRefs[2].current.style.transform = `rotateY(${
          angle * ratios[2]
        }deg) rotateX(${angle * ratios[2]}deg) scale(0.95)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ratios]);

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
    <div className="gyroscope" ref={gyroscopeRef}>
      <div className="sphere-wrapper">
        <div className="sphere" ref={sphereRefs[0]} />
      </div>
      <div className="sphere-wrapper">
        <div className="sphere" ref={sphereRefs[1]} />
      </div>
      <div className="sphere-wrapper">
        <div className="sphere" ref={sphereRefs[2]} />
      </div>
    </div>
  );
}
