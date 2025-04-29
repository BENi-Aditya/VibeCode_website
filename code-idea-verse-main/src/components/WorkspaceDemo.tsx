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
    const interval = setInterval(() => {
      setExampleIndex(prev => (prev + 1) % PROJECT_EXAMPLES.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="p-6 space-y-6">
        {/* Workspace Header */}
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <div className="text-purple-600 dark:text-white text-sm font-mono">{"{ ~ }"}</div>
          </div>
          <div className="text-gray-900 dark:text-white text-xl font-medium">Ideation Workspace</div>
        </div>
        
        {/* Prompt Area */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 shadow-inner">
          <p className="text-gray-900 dark:text-white text-lg">
            {example.prompt}
          </p>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Progress Area */}
        <div className="space-y-4">
          <h3 className="text-gray-900 dark:text-white text-lg">Setting up your environment...</h3>
          
          {/* Progress Bar */}
          <div className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full"
              style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
          
          {/* Status List */}
          <ul className="space-y-2">
            {example.steps.map((step, i) => (
              <li key={i} className="flex items-center text-gray-900 dark:text-white">
                {step.completed ? (
                  <span className="text-green-500 mr-2">✓</span>
                ) : (
                  <span className="text-purple-500 mr-2">•</span>
                )}
                <span className={step.completed ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"}>
                  {step.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Bottom Message */}
        <p className="text-gray-500 dark:text-gray-400 text-center pt-3">
          VibeCode is setting up everything you need for {example.type === "webapp" ? "web development" : 
            example.type === "game" ? "game development" : 
            example.type === "mobile" ? "mobile app development" :
            example.type === "ai" ? "AI development" : "data analysis"}.
        </p>
      </div>
    </div>
  );
};

export default WorkspaceDemo;
