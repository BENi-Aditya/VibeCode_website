import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

const FEATURE_ITEMS = [
  {
    title: "Ideation Workspace",
    description: "Describe your vision in simple words. VibeCode builds the perfect dev environment for it—automatically.",
    icon: "✨",
    color: "from-purple-500 to-indigo-600",
    features: [
      "Auto project setup",
      "Context-aware environment",
      "Structured boilerplate generation"
    ]
  },
  {
    title: "Development Workspace",
    description: "Talk, type, or tweak ideas—VibeCode writes and updates your code instantly as you go.",
    icon: "🧠",
    color: "from-blue-500 to-sky-600",
    features: [
      "Real-time AI coding",
      "Intelligent feature updates",
      "Natural language refactoring"
    ]
  },
  {
    title: "Testing Workspace",
    description: "VibeCode catches and fixes bugs before you run into them—like a safety net for your code.",
    icon: "🛡️",
    color: "from-green-500 to-emerald-600",
    features: [
      "Auto unit test creation",
      "Smart bug detection",
      "Real-time issue resolution"
    ]
  },
  {
    title: "Deployment Workspace",
    description: "Deploy with a click—your project goes live without ever touching a server config.",
    icon: "🚀",
    color: "from-rose-500 to-pink-600",
    features: [
      "One-click deployment",
      "Auto cloud hosting",
      "Shareable live links"
    ]
  }
];

const Features = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Apply 3D tilt effect to the cards
    if (typeof window !== 'undefined') {
      import('../scripts/tiltEffect').then(({ initTiltEffect }) => {
        initTiltEffect();
      });
    }
  }, []);

  return (
    <section id="features" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute w-24 h-24 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full -top-10 left-1/2 -translate-x-1/2 blur-2xl"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            <span className="text-gray-900 dark:text-white">Workspaces,</span>{" "}
            <span className="gradient-text">Your Way</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            VibeCode's unique workspaces guide you from idea to deployed application, with AI handling the technical details so you can focus on creating.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {FEATURE_ITEMS.map((feature, idx) => (
            <div 
              key={idx}
              ref={el => featureRefs.current[idx] = el}
              className="tilt-card p-6 relative group"
            >
              <div className="card-glare absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="tilt-content">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl mb-4 bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  {feature.title}
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-pulse"></span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2 mb-2">
                  {feature.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 animate-fade-in">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br opacity-10 from-purple-500 to-indigo-500 blur-2xl"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg blur-sm"></div>
            <button className="relative bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-8 rounded-lg transition-all duration-200">
              Explore All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
