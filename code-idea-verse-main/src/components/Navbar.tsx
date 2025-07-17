import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import ThemeToggle from "@/components/ThemeToggle";
import { useWaitlist } from './WaitlistContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  return (
    <nav className="w-full py-4 px-4 md:px-8 navbar-blur fixed top-0 z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center relative">
        <a href="/" className="flex items-center">
          <img src="/Logo/logo.png" alt="VibeCode Logo" className="w-10 h-10 mr-2 rounded-md object-cover bg-white" />
          <span className="text-xl font-bold logo-gradient-text">VibeCode</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <a href="#features" className="text-gray-900 hover:text-vibecode-purple transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-900 hover:text-vibecode-purple transition-colors">How It Works</a>
            <a href="#about" className="text-gray-900 hover:text-vibecode-purple transition-colors">About</a>
          </div>
          <a href="https://vibe-code-mvp-five.vercel.app" target="_blank" rel="noopener noreferrer">
            <Button className="button-primary">
              Try Now
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <ThemeToggle className="ml-4" />
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-4 z-50">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-900 hover:text-vibecode-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-900 hover:text-vibecode-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#about" 
              className="text-gray-900 hover:text-vibecode-purple transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a href="https://vibe-code-mvp-five.vercel.app" target="_blank" rel="noopener noreferrer">
              <Button className="button-primary w-full">
                Try Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
