import React from 'react';
import { Github, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" className="py-12 px-4 md:px-8 bg-gray-50">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <img src="/images/logo.png" alt="VibeCode Logo" className="w-8 h-8 mr-2 rounded-md object-cover bg-white" />
              <span className="text-xl font-bold logo-gradient-text">VibeCode</span>
            </div>
            <p className="text-gray-600">
              Empowering everyone to build software through natural language, powered by advanced AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#features" className="hover:text-vibecode-purple transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-vibecode-purple transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-vibecode-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-vibecode-purple transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/BENi-Aditya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-vibecode-purple flex items-center justify-center text-white hover:bg-white hover:text-vibecode-purple transition-colors border border-transparent hover:border-vibecode-purple"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://youtube.com/BENi-Aditya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-vibecode-purple flex items-center justify-center text-white hover:bg-white hover:text-vibecode-purple transition-colors border border-transparent hover:border-vibecode-purple"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://instagram.com/aditya.beni_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-vibecode-purple flex items-center justify-center text-white hover:bg-white hover:text-vibecode-purple transition-colors border border-transparent hover:border-vibecode-purple"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="mt-6 text-gray-600">
              Contact: <a href="mailto:info@vibecode.co.in" className="text-vibecode-purple">info@vibecode.co.in</a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600">
          <p> {new Date().getFullYear()} VibeCode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
