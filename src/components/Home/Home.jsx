import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedButton from '../../Button';
import { TypeAnimation } from 'react-type-animation';

export default function HomeSection() {
  

  return (
    <section className="bg-black/50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
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
            <p className="text-lg text-shadow-lg/20 text-white mb-8">
              Beautiful, functional homes designed for modern living. Find your perfect match with our curated selection of properties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton
                text="Get started"
                icon={<ArrowRight size={18} />}
                size="lg"
              />
              <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-100 transition-colors">
                Learn more
              </button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="bg-white p-4 animate-glitch rounded-xl shadow-lg">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://w.wallhaven.cc/full/jx/wallhaven-jx62x5.png"
                  alt="Modern home interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Why choose us</h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              We're committed to helping you find the perfect home with a seamless experience from search to signing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="text-blue-600" size={24} />,
                title: "Quality Assured",
                description: "All our properties meet the highest standards of quality and design."
              },
              {
                icon: <Users className="text-blue-600" size={24} />,
                title: "Expert Support",
                description: "Our team of professionals is always ready to answer your questions."
              },
              {
                icon: <Clock className="text-blue-600" size={24} />,
                title: "Fast Process",
                description: "From viewing to moving in, we ensure a quick and smooth process."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="border-2 animate-glow  border-blue-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="border animate-aroma border-blue-300 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                Ready to find your dream home?
              </h2>
              <p className="text-white mb-0 md:mb-0">
                Join thousands of satisfied customers who found their perfect property with us.
              </p>
            </div>
            <div>
              <AnimatedButton
                text="Start your journey"
                icon={<ArrowRight size={18} />}
                size="md"
                colors={["purple", "blue", "pink"]}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
