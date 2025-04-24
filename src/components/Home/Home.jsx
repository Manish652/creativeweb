import React from 'react';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import AnimatedButton from '../../Button';

export default function HomeSection() {
  return (
    <section className="bg-black/50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
               <span className="text-blue-600">Discover your new favorite space
               
               </span>
            </h1>
            <p className="text-lg text-white mb-8">
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
          </div>
          <div className="md:w-1/2 animate-pulse">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden ">
                <img src="https://w.wallhaven.cc/full/zy/wallhaven-zy19kj.png" alt="Modern home interior" className="w-full h-full object-cover  " />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-24">
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
              <div key={index} className=" animate-bounce border-2 border-blue-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className=" border border-blue-300 rounded-2xl p-8 md:p-12">
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
        </div>
      </div>
    </section>
  );
}