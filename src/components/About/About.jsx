import React from 'react';
import { Shield, Target, Award, ChevronRight, } from 'lucide-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AnimatedButton from '../../Button';

// No changes to imports

export default function AboutSection() {
  return (
    <section className="bg-black/50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-4">
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
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            We're more than just a real estate company. We're a team dedicated to helping you find the perfect place to call home.
          </motion.p>
        </motion.div>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-4">Our Story</h3>
            <p className="text-sm sm:text-base md:text-lg text-white mb-4">
              Founded in 2015, we began with a simple mission: to make finding your dream home an enjoyable experience.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white mb-6">
              We've helped to thousands of clients find <span> jio </span> homes that perfectly match their lifestyle, preferences, and budget.
            </p>
            
              <AnimatedButton
              text='Learn more'
              icon={<ChevronRight size={18} />}
              size="lg"
              colors={['#3b82f6', '#9333ea', '#f43f5e']}
              /> 
          </motion.div>

          <motion.div 
            className="md:w-1/2 animate-hologram"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 p-3 rounded-xl">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img src="https://w.wallhaven.cc/full/zy/wallhaven-zy12pw.jpg" alt="Our team" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-8 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-blue-600" size={32} />,
                title: "Trust",
                description: "We build lasting relationships based on transparency and reliability."
              },
              {
                icon: <Target className="text-blue-600" size={32} />,
                title: "Excellence",
                description: "We constantly strive to exceed expectations and deliver outstanding results."
              },
              {
                icon: <Award className="text-blue-600" size={32} />,
                title: "Integrity",
                description: "We conduct our business with honesty and high ethical standards."
              }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                className="border-2  border-blue-400 p-6 rounded-xl animate-float text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h4 className="text-lg sm:text-xl font-semibold text-blue-700 mb-3">{value.title}</h4>
                <p className="text-sm sm:text-base text-white">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-8 text-center">Meet Our Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-ping-once">
            {[
              {
                name: "Sarah Johnson",
                position: "CEO & Founder",
                image: "https://w.wallhaven.cc/full/kx/wallhaven-kxmvwq.png"
              },
              {
                name: "Michael Chang",
                position: "Chief Operations Officer",
                image: "https://w.wallhaven.cc/full/x6/wallhaven-x6xxgv.png"
              },
              {
                name: "Elena Rodriguez",
                position: "Head of Property Acquisition",
                image: "https://w.wallhaven.cc/full/5g/wallhaven-5g12j5.jpg"
              },
              {
                name: "David Kim",
                position: "Client Relations Director",
                image: "https://w.wallhaven.cc/full/rr/wallhaven-rrmg11.jpg"
              }
            ].map((member, index) => (
              <motion.div 
                key={index} 
                className="border-2 rounded-xl animate-pulse-soft  overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gray-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-blue-700">{member.name}</h4>
                  <p className="text-white text-sm">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="border-2 animate-glow rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "5,000+", label: "Happy Clients" },
              { value: "20+", label: "Cities Served" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-white text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
