import { motion } from "framer-motion";
import { Zap, Cpu, Palette, Shield, GitBranch, Cloud } from "lucide-react";

export default function Features() {
  const features = [
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Blazing Performance", 
      desc: "Optimized for speed with code splitting and lazy loading" 
    },
    { 
      icon: <Cpu className="w-8 h-8" />, 
      title: "Powerful Processing", 
      desc: "Handles complex computations with ease" 
    },
    { 
      icon: <Palette className="w-8 h-8" />, 
      title: "Beautiful UI", 
      desc: "Thoughtfully designed user interfaces" 
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Enterprise Security", 
      desc: "Built with security best practices" 
    },
    { 
      icon: <GitBranch className="w-8 h-8" />, 
      title: "CI/CD Ready", 
      desc: "Easy integration with modern workflows" 
    },
    { 
      icon: <Cloud className="w-8 h-8" />, 
      title: "Cloud Native", 
      desc: "Deploys seamlessly to any cloud platform" 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900/50 to-black/50 text-white py-16"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to build modern web applications
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5
                  }
                }
              }}
              whileHover={{ 
                y: -5,
                backgroundColor: "rgba(30, 41, 59, 0.5)"
              }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}