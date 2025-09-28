import React, { useRef, useEffect } from "react";

export default function Sphere({
  loading,
  slowSeconds = 60,
  fastSeconds = 10,
  easing = 0.05,
  ratios = [1, 0.75, 0.5],
  direction = 1,
}) {
  const speedRef = useRef(0);
  const angleRef = useRef(0);

  const pointerAngleRef = useRef(0);
  const renderAngleRef = useRef(0);

  const gyroscopeRef = useRef(null);
  const sphereRefs = [useRef(null), useRef(null), useRef(null)];

  // Convert seconds/rotation → degrees per frame
  const toSpeed = (seconds) => (360 / (60 * seconds)) * direction;

  // --- Animation loop ---
  useEffect(() => {
    let frame;

    const tick = () => {
      angleRef.current += speedRef.current;

      // Smooth interpolation
      renderAngleRef.current +=
        (pointerAngleRef.current - renderAngleRef.current) * 0.1;

      if (gyroscopeRef.current) {
        const bounded =
          ((renderAngleRef.current % 360) + 360) % 360;
        gyroscopeRef.current.style.transform = `rotateZ(${bounded}deg)`;
      }

      const angle = angleRef.current;
      if (sphereRefs[0].current) {
        sphereRefs[0].current.style.transform = `rotateY(${angle * ratios[0]}deg)`;
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

  // --- Smooth transition between speeds ---
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

  // --- Pointer tracking (mouse + touch + stylus) ---
  useEffect(() => {
    let lastAngle = 0;

    const handlePointerMove = (e) => {
      // Only intercept touches if inside gyroscope bounds
      if (e.pointerType === "touch" && gyroscopeRef.current) {
        const rect = gyroscopeRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (inside) {
          e.preventDefault(); // stop scrolling/swiping only when touching the sphere
        }
      }

      const { innerWidth, innerHeight } = window;
      const dx = e.clientX - innerWidth / 2;
      const dy = e.clientY - innerHeight / 2;

      let rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // unwrap angle
      let delta = rawAngle - lastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      pointerAngleRef.current += delta;
      lastAngle = rawAngle;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
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
