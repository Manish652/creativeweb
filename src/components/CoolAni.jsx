import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CoolMode({ children }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    x.set((xPos / size.width - 0.5) * 2 * 10);
    y.set((yPos / size.height - 0.5) * 2 * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(600px)`,
        rotateX: springY,
        rotateY: springX,
      }}
      className="transition-transform"
    >
      {children}
    </motion.div>
  );
}
