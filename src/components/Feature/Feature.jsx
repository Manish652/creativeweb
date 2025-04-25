import { motion } from "framer-motion";
import { Zap, Cpu, Palette, Shield, GitBranch, Cloud } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-blue-500 drop-shadow-glow" />,
      title: "Blazing Performance",
      desc: "Optimized for speed with code splitting and lazy loading",
    },
    {
      icon: <Cpu className="w-10 h-10 text-purple-400 drop-shadow-glow" />,
      title: "Powerful Processing",
      desc: "Handles complex computations with ease",
    },
    {
      icon: <Palette className="w-10 h-10 text-pink-400 drop-shadow-glow" />,
      title: "Beautiful UI",
      desc: "Thoughtfully designed user interfaces",
    },
    {
      icon: <Shield className="w-10 h-10 text-green-400 drop-shadow-glow" />,
      title: "Enterprise Security",
      desc: "Built with security best practices",
    },
    {
      icon: <GitBranch className="w-10 h-10 text-yellow-400 drop-shadow-glow" />,
      title: "CI/CD Ready",
      desc: "Easy integration with modern workflows",
    },
    {
      icon: <Cloud className="w-10 h-10 text-cyan-400 drop-shadow-glow" />,
      title: "Cloud Native",
      desc: "Deploys seamlessly to any cloud platform",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black/50 text-white py-20 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            ✨ Powerful Features
          </h2>
          <p className="text-lg text-gray-300 mt-4 max-w-xl mx-auto">
            Everything you need to build modern, fast, and beautiful web apps.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
