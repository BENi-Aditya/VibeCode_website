import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useWaitlist } from './WaitlistContext';
import WorkspaceDemo from './WorkspaceDemo';
import LearnMoreModal from './LearnMoreModal';
import { Github, Instagram, Youtube } from 'lucide-react';
import '../styles/animations.css';

const EXAMPLES = [
  "Build me a portfolio website with a blog and contact form.",
  "Create a 2D platformer game with character customization.",
  "Make a fitness tracking app that syncs with Apple Health."
];

// Component to render the typing animation for examples
const CarouselExamples = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [position, setPosition] = useState(0);
  const example = EXAMPLES[currentExample];
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (position < example.length) {
        setDisplayText(example.substring(0, position + 1));
        setPosition(position + 1);
      } else {
        setTimeout(() => {
          setPosition(0);
          setDisplayText('');
          setCurrentExample((currentExample + 1) % EXAMPLES.length);
        }, 2000);
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [position, example, currentExample]);

  return <span className="text-gray-900 dark:text-gray-200">{displayText}</span>;
};

// Component to render the step progress for examples
const ExampleProgress = ({ idx }: { idx: number }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm text-gray-900 dark:text-gray-200">Setting up your environment...</h3>
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full w-3/5 bg-gradient-to-r from-vibecode-purple to-blue-500 rounded-full"></div>
      </div>
      <div className="space-y-1">
        {idx === 0 && (
          <>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span> Node.js environment ready
            </div>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span> Next.js & Tailwind installed
            </div>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 mr-2">•</span> Setting up blog structure...
            </div>
          </>
        )}
        {idx === 1 && (
          <>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span> Python 3.9 configured
            </div>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span> Pygame installed
            </div>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 mr-2">•</span> Configuring assets directory...
            </div>
          </>
        )}
        {idx === 2 && (
          <>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span> React Native setup complete
            </div>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span> Expo SDK installed
            </div>
            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300">
              <span className="text-purple-500 mr-2">•</span> Configuring health API integrations...
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Hero = () => {
  const [activeExample, setActiveExample] = useState(0);
  const { openWaitlist } = useWaitlist();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Set current example in window for the demo
    if (typeof window !== 'undefined') {
      (window as any).currentExampleIdx = activeExample;
      
      // Cycle through examples automatically
      const interval = setInterval(() => {
        setActiveExample((prev) => (prev + 1) % EXAMPLES.length);
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [activeExample]);

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight -ml-1 hero-heading">
            <span className="logo-gradient-text">
              VibeCode.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-900 dark:text-gray-200 md:pr-12 font-medium tracking-wide ml-1 mb-6 md:mb-12">
            The fastest way to turn your ideas into working software. Describe what you want, and VibeCode will build it for you.
          </p>
          <div className="flex flex-col items-start ml-1 w-full">
            <div className={`flex w-full ${isMobile ? 'flex-col' : 'flex-row'} gap-4 mt-2 md:mt-4`}>
              <Button 
                className={`button-primary pulse-glow ${isMobile ? 'w-full' : 'w-1/2'} font-medium py-3 px-6`} 
                onClick={openWaitlist}
              >
                Join Waitlist
              </Button>
              <div className={isMobile ? 'w-full' : 'w-1/2'}>
                <LearnMoreModal 
                  trigger={
                    <Button className={`bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-medium py-3 px-6 w-full`}>
                      Learn More
                    </Button>
                  }
                />
              </div>
            </div>
            <div className={`w-full ${isMobile ? 'mt-4' : 'mt-8'}`}> 
              <a 
                href="https://vibe-code-mvp-five.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative"
              >
                <Button 
                  className={`mvp-button-pulse w-full font-medium py-3 px-6 text-white relative overflow-hidden`}
                >
                  Try Now (MVP)
                  {/* Under Construction Band */}
                  <span
                    className="absolute top-2 right-[-40px] rotate-12 z-20 px-2 py-0.5 text-xs font-bold tracking-wider text-black bg-yellow-400 border-2 border-black shadow-md select-none pointer-events-none construction-band"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(135deg, #FFD600 0 10px, #222 10px 20px)',
                      color: '#222',
                      borderRadius: '4px',
                      letterSpacing: '0.05em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                    }}
                  >
                    🚧 UNDER CONSTRUCTION
                  </span>
                </Button>
              </a>
            </div>
            <div className="flex flex-row gap-6 mt-6 md:mt-8">
              <a href="https://github.com/BENi-Aditya" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg p-3 hover:bg-purple-600/90 dark:hover:bg-purple-500/80 transition-colors flex items-center justify-center">
                <Github className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-200" />
              </a>
              <a href="https://www.instagram.com/aditya.beni_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg p-3 hover:bg-pink-500/90 dark:hover:bg-pink-500/80 transition-colors flex items-center justify-center">
                <Instagram className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-200" />
              </a>
              <a href="https://www.youtube.com/@BENiTech-o8o" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="rounded-full bg-gray-100 dark:bg-gray-800 shadow-lg p-3 hover:bg-red-500/90 dark:hover:bg-red-500/80 transition-colors flex items-center justify-center">
                <Youtube className="h-5 w-5 md:h-6 md:w-6 text-gray-700 dark:text-gray-200" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 mt-8 md:mt-0">
          <WorkspaceDemo activeExample={activeExample} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
