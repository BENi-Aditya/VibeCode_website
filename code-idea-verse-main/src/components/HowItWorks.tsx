import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useWaitlist } from './WaitlistContext';

const steps = [
  {
    number: "01",
    title: "Describe Your Vision",
    description: "Tell VibeCode what you want to build in simple language, no technical jargon needed.",
    color: "from-purple-500 to-indigo-600",
    icon: "💬"
  },
  {
    number: "02",
    title: "Review & Refine",
    description: "VibeCode generates a project outline and asks clarifying questions to understand your needs.",
    color: "from-blue-500 to-sky-500",
    icon: "🔄"
  },
  {
    number: "03",
    title: "Watch It Build",
    description: "See your project come to life as VibeCode writes code, creates interfaces, and handles the technical details.",
    color: "from-emerald-500 to-green-500",
    icon: "🛠️"
  },
  {
    number: "04",
    title: "Use & Share",
    description: "Launch your application, share it with others, and request changes or updates anytime.",
    color: "from-rose-500 to-pink-500",
    icon: "🚀"
  }
];

const HowItWorks = () => {
  const { openWaitlist } = useWaitlist();
  
  useEffect(() => {
    // Initialize the 3D floating elements animation
    const elements = document.querySelectorAll('.floating-icon');
    
    // Custom animation for floating elements
    elements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.animationDelay = `${index * 0.5}s`;
        el.style.animationDuration = `${3 + index % 2}s`;
      }
    });
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-40 w-64 h-64 bg-gradient-to-b from-purple-300/10 to-indigo-300/10 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-40 w-64 h-64 bg-gradient-to-t from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl"></div>
      
      {/* Floating code snippets in background */}
      <div className="absolute -top-10 left-10 transform -rotate-12 opacity-5 font-mono text-xs floating-icon">
        {`const app = express();
app.get('/api', (req, res) => {
  res.json({ success: true });
});`}
      </div>
      <div className="absolute top-1/3 right-10 transform rotate-6 opacity-5 font-mono text-xs floating-icon">
        {`function generateUI() {
  return (
    <div className="app">
      {components}
    </div>
  );
}`}
      </div>
      <div className="absolute bottom-10 left-1/4 transform rotate-3 opacity-5 font-mono text-xs floating-icon">
        {`@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}`}
      </div>
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How <span className="gradient-text">VibeCode</span> Works</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg">
            From concept to reality in four simple steps, all powered by sophisticated AI that handles the technical complexities for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
              <div className="relative aspect-square bg-gradient-to-br from-vibecode-purple/10 to-indigo-600/10 overflow-hidden">
                {/* 3D Code visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-2xl pulsing-glow"></div>
                    
                    {/* Circle of glowing dots */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const x = 50 + 40 * Math.cos(angle);
                      const y = 50 + 40 * Math.sin(angle);
                      return (
                        <div 
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-purple-500"
                          style={{ 
                            left: `${x}%`, 
                            top: `${y}%`, 
                            opacity: 0.3 + (i % 3) * 0.2,
                            animation: `pulse 2s infinite ${i * 0.2}s`
                          }}
                        ></div>
                      );
                    })}
                    
                    {/* Floating code blocks */}
                    <div className="absolute top-1/4 left-1/4 bg-white dark:bg-gray-800 p-2 rounded shadow-lg transform -rotate-6 float-element-slow">
                      <pre className="text-xs text-purple-600 dark:text-purple-400">{"<Header/>"}</pre>
                    </div>
                    <div className="absolute top-1/3 right-1/4 bg-white dark:bg-gray-800 p-2 rounded shadow-lg transform rotate-3 float-element">
                      <pre className="text-xs text-blue-600 dark:text-blue-400">{"function App() { ... }"}</pre>
                    </div>
                    <div className="absolute bottom-1/3 left-1/3 bg-white dark:bg-gray-800 p-2 rounded shadow-lg transform rotate-12 float-element-fast">
                      <pre className="text-xs text-green-600 dark:text-green-400">{"const [state, setState] = useState()"}</pre>
                    </div>
                    
                    {/* Central VibeCode logo/icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white dark:bg-gray-900 shadow-xl">
                        <div className="text-2xl gradient-text font-bold">VibeCode</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl -z-10"></div>
          </div>
          
          <div>
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 relative group tilt-card p-6"
                >
                  <div className="card-glare absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="tilt-content flex gap-4 items-start">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white font-semibold shadow-lg`}>
                        {step.icon}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                        <div className="ml-2 text-xs font-mono text-gray-500 dark:text-gray-400">{step.number}</div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Button className="button-primary pulse-glow" onClick={openWaitlist}>
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
