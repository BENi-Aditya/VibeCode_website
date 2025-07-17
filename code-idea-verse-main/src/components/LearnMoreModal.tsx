import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Github, Instagram, Youtube } from 'lucide-react';
import { useWaitlist } from './WaitlistContext';

interface LearnMoreModalProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ 
  children, 
  trigger = <Button className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-medium py-3 px-6">Learn More</Button> 
}) => {
  const { openWaitlist } = useWaitlist();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="relative">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              About VibeCode
            </DialogTitle>
            <DialogClose className="absolute top-4 right-4 opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          
          <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
            <div className="mb-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Let me let you in on a little secret. This website you're on right now? It's not just a portfolio—it's an experiment, a live test of what I call VibeCoding. I'm building this as I describe it, watching ideas turn into code with the help of AI. No heavy coding sessions, no endless bug hunts—just me, vibing with the machine, seeing how far this creative flow can really take us."
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">VibeCoding (noun):</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <span className="font-semibold">Pronunciation:</span> /ˈvaɪb ˌkoʊdɪŋ/
                </p>
                <div className="mt-3 text-gray-700 dark:text-gray-300">
                  <p className="mb-2">
                    <span className="font-semibold">Definition:</span> A programming approach where developers use natural language prompts to instruct AI models, like large language models (LLMs), to generate code. This method shifts the programmer's role from writing code manually to guiding, testing, and refining AI-generated code.
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Origin:</span> Term coined by Andrej Karpathy, co-founder of OpenAI and former AI lead at Tesla, in February 2025.
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">First use:</span> Karpathy introduced the concept on X (formerly Twitter), stating, "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This whole project is made with love by Aditya Tripathy, using tools I genuinely enjoy: Lovable, Windsurf, React, and the brains of Claude and ChatGPT.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <p className="text-gray-700 dark:text-gray-300 text-sm">Connect with me:</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/BENi-Aditya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span>BENi-Aditya</span>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/aditya.beni_/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>@aditya.beni_</span>
                  </a>
                  
                  <a 
                    href="https://www.youtube.com/@BENiTech-o8o" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                    <span>BENi-Aditya</span>
                  </a>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button 
                  className="button-primary pulse-glow px-8 py-2"
                  onClick={() => {
                    openWaitlist();
                    // Close the learn more modal when opening waitlist
                    const closeButton = document.querySelector('[data-dialog-close]');
                    if (closeButton instanceof HTMLElement) {
                      closeButton.click();
                    }
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreModal;
