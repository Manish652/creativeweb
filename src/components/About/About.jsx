import React from 'react';
import { Shield, Target, Award, ChevronRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="bg-black/50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-500 mb-4">About Us</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-white max-w-2xl mx-auto">
            We're more than just a real estate company. We're a team dedicated to helping you find the perfect place to call home.
          </p>
        </div>

        {/* Our Story */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="md:w-1/2">
            <h3 className="text-4xl font-bold text-blue-500 mb-4">Our Story</h3>
            <p className="text-white mb-4">
              Founded in 2015, we began with a simple mission: to make finding your dream home an enjoyable experience. What started as a small team of passionate real estate enthusiasts has grown into a nationwide network of property experts.
            </p>
            <p className="text-white mb-6">
              We've helped thousands of clients find homes that perfectly match their lifestyle, preferences, and budget. Our approach combines technology with a personal touch, ensuring you receive customized service throughout your journey.
            </p>
            <button className="text-blue-600 border-2 font-bold p-4 flex items-center hover:text-blue-700 transition-colors">
              Learn more about our journey <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="md:w-1/2 animate-glitch">
            <div className="bg-gray-100 p-3 rounded-xl">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img src="https://w.wallhaven.cc/full/zy/wallhaven-zy12pw.jpg" alt="Our team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="text-blue-600" size={32} />,
                title: "Trust",
                description: "We build lasting relationships based on transparency and reliability. Your trust is our most valuable asset."
              },
              {
                icon: <Target className="text-blue-600" size={32} />,
                title: "Excellence",
                description: "We constantly strive to exceed expectations and deliver outstanding results for every client."
              },
              {
                icon: <Award className="text-blue-600" size={32} />,
                title: "Integrity",
                description: "We conduct our business with unwavering honesty and adhere to the highest ethical standards."
              }
            ].map((value, index) => (
              <div key={index} className="border-2 border-blue-400 p-6 rounded-xl animate-float text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-blue-700 mb-3">{value.title}</h4>
                <p className="text-white">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16 ">
          <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">Meet Our Leadership Team</h3>
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
              <div key={index} className=" border-2 rounded-xl overflow-hidden">
                <div className="aspect-square bg-gray-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-blue-700">{member.name}</h4>
                  <p className="text-white text-sm">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className=" border-2 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "5,000+", label: "Happy Clients" },
              { value: "20+", label: "Cities Served" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}