import React, { useState, useEffect } from 'react';

// Define example project types with their corresponding setup steps
const PROJECT_EXAMPLES = [
  {
    type: "webapp",
    prompt: "Build me a portfolio website with a blog and contact form.",
    steps: [
      { text: "Node.js environment ready", completed: true },
      { text: "Next.js & Tailwind installed", completed: true },
      { text: "Setting up blog structure...", completed: false },
    ]
  },
  {
    type: "game",
    prompt: "Create a 2D platformer game with character customization.",
    steps: [
      { text: "Python 3.9 configured", completed: true },
      { text: "Pygame installed", completed: true },
      { text: "Configuring assets directory...", completed: false },
    ]
  },
  {
    type: "mobile",
    prompt: "Make a fitness tracking app that syncs with Apple Health.",
    steps: [
      { text: "React Native setup complete", completed: true },
      { text: "Expo SDK installed", completed: true },
      { text: "Configuring health API integrations...", completed: false },
    ]
  },
  {
    type: "ai",
    prompt: "Build a chatbot that can answer questions about my company.",
    steps: [
      { text: "Python environment ready", completed: true },
      { text: "TensorFlow & Transformers installed", completed: true },
      { text: "Training custom language model...", completed: false },
    ]
  },
  {
    type: "data",
    prompt: "Create a dashboard that visualizes my company's sales data.",
    steps: [
      { text: "Python data stack configured", completed: true },
      { text: "Pandas & Plotly installed", completed: true },
      { text: "Preparing data connectors...", completed: false },
    ]
  }
];

interface WorkspaceDemoProps {
  activeExample?: number;
}

const WorkspaceDemo: React.FC<WorkspaceDemoProps> = ({ activeExample = 0 }) => {
  const [progress, setProgress] = useState(60);
  const [exampleIndex, setExampleIndex] = useState(activeExample);
  const example = PROJECT_EXAMPLES[exampleIndex % PROJECT_EXAMPLES.length];
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Update progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 60; // Reset to mid-point when near completion
        return prev + 0.5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Optionally cycle through examples
  useEffect(() => {
    if (typeof window !== 'undefined' && 'currentExampleIdx' in window) {
      setExampleIndex((window as any).currentExampleIdx);
    }
  }, [activeExample]);
  
  // Initialize terminal tilt effect
  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile) {
      import('../scripts/tiltEffect').then(({ initTerminalTilt }) => {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          initTerminalTilt();
        }, 100);
      });
    }
  }, [isMobile]);
  
  return (
    <div className="terminal-container bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 rounded-t-lg p-2">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-white font-mono">vibecode ~ terminal</div>
          <div className="w-16"></div>
        </div>
        
        <div className="terminal-content bg-gray-900 text-gray-100 p-4 font-mono text-sm md:text-base rounded-b-lg overflow-hidden transition-transform duration-200">
          <div className="mb-5 text-green-400">$ vibecode generate</div>
          
          <div className="mb-5 text-green-500">&gt; Prompt: {example.prompt}</div>
          
          <div className="mb-5 text-gray-400">&gt; Setting up environment...</div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <ul className={`space-y-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {example.steps.map((step, i) => (
              <li key={i} className="flex items-center">
                {step.completed ? (
                  <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                ) : (
                  <span className="text-yellow-500 dark:text-yellow-400 mr-2">•</span>
                )}
                <span className={`${
                  step.completed 
                    ? 'text-gray-300 dark:text-gray-300' 
                    : 'text-yellow-400 dark:text-yellow-300'
                  } font-mono`}>
                  {step.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <p className={`text-gray-600 dark:text-gray-400 text-center pt-3 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          VibeCode is setting up everything for {example.type === "webapp" ? "web development" : 
            example.type === "game" ? "game development" : 
            example.type === "mobile" ? "mobile app development" :
            example.type === "ai" ? "AI development" : "data analysis"}.
        </p>
      </div>
    </div>
  );
};

export default WorkspaceDemo;
