import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor({
  variant = "default", // default, dot-ring, glow, trail, pointer, text
  color = "#ffffff",
  size = "md", // sm, md, lg
  blendMode = "difference", // normal, difference, exclusion, screen, overlay
  trailLength = 5, // for trail variant
  icon = null, // for pointer variant
  text = "", // for text variant
  hoverScale = 2.5, // scale factor when hovering over clickable elements
  transitionSpeed = 0.2, // in seconds
  enableClickEffect = true, // toggle click effect
  clickEffectType = "ripple", // ripple, pulse
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);
  const trailDotsRef = useRef([]);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  // Size mapping
  const sizeMap = {
    sm: variant === "dot-ring" ? { dot: 5, ring: 20 } : 10,
    md: variant === "dot-ring" ? { dot: 8, ring: 30 } : 20,
    lg: variant === "dot-ring" ? { dot: 12, ring: 40 } : 30,
  };

  const currentSize = sizeMap[size];

  // Click effect handler
  const addClickEffect = (x, y) => {
    if (!enableClickEffect) return;
    
    const id = Date.now();
    const newRipple = { id, x, y };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  };

  useEffect(() => {
    // Create trail dots for trail variant
    if (variant === "trail") {
      trailDotsRef.current = Array(trailLength).fill().map((_, i) => ({
        x: 0,
        y: 0,
        element: document.createElement('div')
      }));
      
      // Append trail dots to body
      trailDotsRef.current.forEach((dot, i) => {
        const dotSize = currentSize * (1 - (i / trailLength) * 0.8);
        const opacity = 1 - (i / trailLength) * 0.9;
        
        dot.element.style.cssText = `
          position: fixed;
          width: ${dotSize}px;
          height: ${dotSize}px;
          border-radius: 50%;
          background-color: ${color};
          opacity: ${opacity};
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform ${transitionSpeed}s ease;
        `;
        document.body.appendChild(dot.element);
      });
    }

    return () => {
      // Clean up trail dots
      if (variant === "trail" && trailDotsRef.current) {
        trailDotsRef.current.forEach(dot => {
          if (dot.element && dot.element.parentNode) {
            dot.element.parentNode.removeChild(dot.element);
          }
        });
      }
    };
  }, [variant, trailLength, color, size, currentSize, transitionSpeed]);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail positions with delay
      if (variant === "trail" && trailDotsRef.current) {
        setTimeout(() => {
          // Shift positions down the trail
          for (let i = trailDotsRef.current.length - 1; i > 0; i--) {
            trailDotsRef.current[i].x = trailDotsRef.current[i-1].x;
            trailDotsRef.current[i].y = trailDotsRef.current[i-1].y;
            
            trailDotsRef.current[i].element.style.left = `${trailDotsRef.current[i].x}px`;
            trailDotsRef.current[i].element.style.top = `${trailDotsRef.current[i].y}px`;
          }
          
          // Set first dot to current position
          if (trailDotsRef.current[0]) {
            trailDotsRef.current[0].x = e.clientX;
            trailDotsRef.current[0].y = e.clientY;
            trailDotsRef.current[0].element.style.left = `${e.clientX}px`;
            trailDotsRef.current[0].element.style.top = `${e.clientY}px`;
          }
        }, 50);
      }
    };
    
    const handleMouseDown = (e) => {
      setIsClicking(true);
      if (enableClickEffect) {
        addClickEffect(e.clientX, e.clientY);
      }
    };
    
    const handleMouseUp = () => setIsClicking(false);
    
    // Track hoverable elements
    const handleElementMouseEnter = () => setIsHovering(true);
    const handleElementMouseLeave = () => setIsHovering(false);
    
    // Add hoverable class to interactive elements
    const hoverableElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], [tabindex="0"]');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', handleElementMouseLeave);
    });

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
    };
  }, [variant, enableClickEffect]);

  // For cursor that follows with smooth transition
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.x}px`;
      cursorRef.current.style.top = `${position.y}px`;
    }
    
    if (ringRef.current) {
      // Make ring follow slightly behind for a more natural feel
      setTimeout(() => {
        ringRef.current.style.left = `${position.x}px`;
        ringRef.current.style.top = `${position.y}px`;
      }, 50);
    }
  }, [position]);

  // Render click effects (ripples)
  const renderClickEffects = () => {
    return (
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ 
              width: clickEffectType === "ripple" ? 100 : 20, 
              height: clickEffectType === "ripple" ? 100 : 20, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'fixed',
              left: ripple.x,
              top: ripple.y,
              borderRadius: '50%',
              backgroundColor: color,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 9997,
              mixBlendMode: blendMode,
            }}
          />
        ))}
      </AnimatePresence>
    );
  };

  // Different cursor rendering based on variant
  const renderCursor = () => {
    switch (variant) {
      case "dot-ring":
        return (
          <>
            <motion.div
              ref={cursorRef}
              initial={{ scale: 1 }}
              animate={{ 
                scale: isClicking ? 0.8 : isHovering ? 0.5 : 1,
                width: currentSize.dot,
                height: currentSize.dot,
              }}
              transition={{ duration: transitionSpeed }}
              style={{
                position: 'fixed',
                width: `${currentSize.dot}px`,
                height: `${currentSize.dot}px`,
                borderRadius: '50%',
                backgroundColor: color,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                mixBlendMode: blendMode,
                zIndex: 9999,
              }}
            />
            <motion.div
              ref={ringRef}
              initial={{ scale: 1 }}
              animate={{ 
                scale: isClicking ? 0.9 : isHovering ? hoverScale : 1,
                width: currentSize.ring,
                height: currentSize.ring,
              }}
              transition={{ duration: transitionSpeed }}
              style={{
                position: 'fixed',
                width: `${currentSize.ring}px`,
                height: `${currentSize.ring}px`,
                borderRadius: '50%',
                border: `2px solid ${color}`,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                mixBlendMode: blendMode,
                zIndex: 9998,
              }}
            />
          </>
        );
      
      case "glow":
        return (
          <motion.div
            ref={cursorRef}
            initial={{ scale: 1 }}
            animate={{ 
              scale: isClicking ? 0.8 : isHovering ? hoverScale : 1,
            }}
            transition={{ duration: transitionSpeed }}
            style={{
              position: 'fixed',
              width: `${currentSize * 2}px`,
              height: `${currentSize * 2}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              mixBlendMode: blendMode,
              zIndex: 9999,
              opacity: 0.7,
              filter: 'blur(5px)',
            }}
          />
        );
      
      case "pointer":
        return (
          <motion.div
            ref={cursorRef}
            initial={{ scale: 1 }}
            animate={{ 
              scale: isClicking ? 0.8 : isHovering ? hoverScale : 1,
              backgroundColor: isHovering ? `${color}33` : 'transparent',
            }}
            transition={{ duration: transitionSpeed }}
            style={{
              position: 'fixed',
              width: `${currentSize * 1.5}px`,
              height: `${currentSize * 1.5}px`,
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: `2px solid ${color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              mixBlendMode: blendMode,
              zIndex: 9999,
            }}
          >
            {icon && (
              <div style={{ 
                color: color, 
                fontSize: `${currentSize / 2}px`,
                transform: 'scale(0.8)'
              }}>
                {icon}
              </div>
            )}
          </motion.div>
        );
      
      case "text":
        return (
          <motion.div
            ref={cursorRef}
            initial={{ scale: 1 }}
            animate={{ 
              scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
            }}
            transition={{ duration: transitionSpeed }}
            style={{
              position: 'fixed',
              minWidth: `${currentSize * 3}px`,
              height: `${currentSize * 1.2}px`,
              padding: '0 8px',
              borderRadius: '20px',
              backgroundColor: `${color}CC`,
              color: '#000000',
              fontSize: `${currentSize / 2}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              transform: 'translate(-5px, -50%)',
              zIndex: 9999,
            }}
          >
            {text || "Click"}
          </motion.div>
        );
      
      case "trail":
        // Trail dots are handled in useEffect
        return (
          <motion.div
            ref={cursorRef}
            initial={{ scale: 1 }}
            animate={{ 
              scale: isClicking ? 0.8 : isHovering ? hoverScale : 1,
            }}
            transition={{ duration: transitionSpeed }}
            style={{
              position: 'fixed',
              width: `${currentSize}px`,
              height: `${currentSize}px`,
              borderRadius: '50%',
              backgroundColor: color,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              mixBlendMode: blendMode,
              zIndex: 9999,
            }}
          />
        );
      
      default:
        return (
          <motion.div
            ref={cursorRef}
            initial={{ scale: 1 }}
            animate={{ 
              scale: isClicking ? 0.8 : isHovering ? hoverScale : 1,
            }}
            transition={{ duration: transitionSpeed }}
            style={{
              position: 'fixed',
              width: `${currentSize}px`,
              height: `${currentSize}px`,
              borderRadius: '50%',
              backgroundColor: color,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              mixBlendMode: blendMode,
              zIndex: 9999,
            }}
          />
        );
    }
  };

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }
        `}
      </style>
      {renderCursor()}
      {renderClickEffects()}
    </>
  );
}