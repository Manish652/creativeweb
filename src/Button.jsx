import React, { useState, useEffect } from 'react';

export default function AnimatedButton({ 
  text = "Get Started", 
  colors = ["#ff3e9d", "#0e7fff", "#21c7fe", "#8d5eff"],
  icon = null,
  size = "md" // "sm", "md", "lg"
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [animationState, setAnimationState] = useState(0);
  
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl"
  };

  // Cycle through animation states for the background gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      className={`
        relative overflow-hidden rounded-lg font-bold text-white transition-all duration-300 transform
        ${sizeClasses[size]}
        ${isHovered ? 'scale-110' : 'scale-100'}
        ${isPressed ? 'scale-95' : ''}
        shadow-lg
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Animated background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          background: `linear-gradient(${animationState}deg, ${colors.join(', ')})`,
          backgroundSize: '300% 300%',
        }} 
      />
      
      {/* Shine effect */}
      <div
        className={`
          absolute inset-0 z-10 bg-gradient-to-r from-white to-transparent opacity-20 transform transition-transform duration-700 ease-in-out
          ${isHovered ? 'translate-x-full' : '-translate-x-full'}
        `}
      />
      
      {/* Button text with glow */}
      <span className="relative z-20 mix-blend-screen flex items-center justify-center gap-2">
        {icon && <span className="inline-block">{icon}</span>}
        {text}
      </span>
      
      {/* Particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-up ${1 + Math.random() * 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Add a pseudo-3D effect with shadow */}
      <div className="absolute inset-0 rounded-lg shadow-inner z-0" />
      
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-50px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}