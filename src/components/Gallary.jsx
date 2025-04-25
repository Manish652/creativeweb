import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

const images = [
  "./g.jpg", "./i.png", "./c.jpg", "./d.jpg", "./e.jpg",
  "./f.png", "./a.jpg", "./i.png", "./m.jpg",
  "./l.png", "./k.jpg", "./l.png", "./h.jpg", "./k.jpg",
];

const departments = [
  { name: "Computer Science", color: "#3b82f6", icon: "💻" },
  { name: "Business", color: "#eab308", icon: "📊" },
  { name: "Engineering", color: "#ef4444", icon: "🔧" },
  { name: "Arts & Design", color: "#10b981", icon: "🎨" },
  { name: "Liberal Arts", color: "#8b5cf6", icon: "📚" },
];

export default function GalleryPro() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const mouseRef = useRef(null);

  useEffect(() => {
    const preloadImages = () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      Promise.all(promises).then(() => setIsLoading(false)).catch(() => setIsLoading(false));
    };
    preloadImages();
  }, []);

  const navigateImage = (newIndex) => {
    const oldIndex = selectedImage;
    setDirection(newIndex > oldIndex ? 1 : -1);
    setSelectedImage(newIndex);
  };

  const nextImage = () => navigateImage((selectedImage + 1) % images.length);
  const prevImage = () => navigateImage((selectedImage - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, selectedImage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section id="gallery" className="py-20 relative w-full min-h-screen overflow-hidden bg-black/50" ref={mouseRef}>
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {departments.map((dept, index) => (
          <motion.div
            key={index}
            className="absolute text-8xl font-bold"
            style={{
              color: dept.color,
              top: `${15 + index * 20}%`,
              left: `${10 + (index % 3) * 30}%`,
            }}
            animate={{ opacity: [0.3, 0.7, 0.3], x: [0, 10, 0], y: [0, -5, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {dept.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="relative inline-block mb-16 mx-auto text-center w-full"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
              <TypeAnimation
                            sequence={[
                              'Discover your new favorite space',
                              1000,
                              '',
                              500
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                          />
            </h1>
          <motion.p
            className="text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Relive the most memorable moments of college life through our curated photo collection
          </motion.p>
        </motion.div>

        {isLoading ? (
          <motion.div className="flex justify-center items-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="w-16 h-16 border-4 border-t-white border-white/30 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {images.map((src, index) => {
              const isLarge = index === 0 || index === 3 || index === 7 || index === 11;
              const isWide = index === 2 || index === 8;
              const isTall = index === 5 || index === 10;
              let gridClass = "";
              if (isLarge) gridClass = "sm:col-span-2 sm:row-span-2";
              else if (isWide) gridClass = "sm:col-span-2";
              else if (isTall) gridClass = "sm:row-span-2";

              return (
                <motion.div
                  key={index}
                  className={`relative group overflow-hidden rounded-xl cursor-pointer shadow-lg border border-white/10 ${gridClass}`}
                  initial={{ opacity: 0, y: 50, rotate: Math.random() * 6 - 3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", damping: 15 }}
                  whileHover={{ scale: 1.03, zIndex: 10, boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)" }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => { setSelectedImage(index); setLightboxOpen(true); }}
                >
                  <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50"
              onClick={() => setLightboxOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              &times;
            </motion.button>
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white z-50"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              &#8592;
            </motion.button>
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white z-50"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              &#8594;
            </motion.button>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={selectedImage}
                className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center"
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 100 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImage]}
                  alt="Enlarged gallery"
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}