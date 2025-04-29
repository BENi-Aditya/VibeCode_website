import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useWaitlist } from './WaitlistContext';
import { Sparkles, Brain, Zap, Clock, Check } from 'lucide-react';

const BENEFITS = [
  {
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    title: "AI-Powered Generation",
    description: "Let AI handle the heavy lifting. You focus on creativity, it handles the code.",
    features: [
      "Clean, optimized output",
      "Adapts to your project scope"
    ]
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-500" />,
    title: "Zero Coding Required",
    description: "No need to learn syntax or frameworks—just explain what you want.",
    features: [
      "Beginner-friendly",
      "Complex logic made simple"
    ]
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    title: "Instant Collaboration",
    description: "Invite friends or teammates. Everyone can build or brainstorm, regardless of coding skill.",
    features: [
      "Real-time project sharing",
      "No-code input for non-tech users"
    ]
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-500" />,
    title: "10x Faster Development",
    description: "From idea to deploy in minutes, not weeks.",
    features: [
      "Cuts build time drastically",
      "Skip repetitive tasks"
    ]
  }
];

const WhyChooseUs = () => {
  const { openWaitlist } = useWaitlist();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Add parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.querySelectorAll('.feature-card');
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to card center
        const distX = mouseX - cardCenterX;
        const distY = mouseY - cardCenterY;
        
        // Move elements based on mouse position (subtle effect)
        const icon = card.querySelector('.feature-icon');
        if (icon && icon instanceof HTMLElement) {
          icon.style.transform = `translate(${distX * 0.02}px, ${distY * 0.02}px)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-20 w-12 h-12 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-lg rotate-12 float-element"></div>
        <div className="absolute top-1/3 right-40 w-8 h-8 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full float-element-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-lg -rotate-12 float-element-fast"></div>
      </div>
      <div className="container max-w-7xl mx-auto" ref={containerRef}>
        <div className="text-center mb-20 relative">
          <div className="absolute w-40 h-40 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            Why Choose <span className="gradient-text">VibeCode</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg relative z-10">
            We're reimagining how software gets created, making development accessible to everyone regardless of technical background.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="feature-card tilt-card p-8 relative group">
              <div className="card-glare absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="tilt-content">
                <div className="feature-icon mb-6 transform transition-transform duration-200">
                  <div className="w-14 h-14 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl transform rotate-3"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl transform -rotate-3"></div>
                    <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl w-12 h-12 flex items-center justify-center shadow-md">
                      {benefit.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {benefit.description}
                </p>
                <ul className="space-y-2 mb-2">
                  {benefit.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 animate-fade-in">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-full blur-2xl"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 -z-10 rounded-xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 -z-10 rounded-xl transform -rotate-1"></div>
          <div className="py-12 px-8 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 relative z-10">
            <h3 className="text-2xl font-bold mb-4">Ready to build your vision?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators, entrepreneurs, and developers who are using VibeCode to bring their software ideas to life faster than ever before.
            </p>
            <Button className="button-primary pulse-glow relative" onClick={openWaitlist}>
              <span className="relative z-10">Join the Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
