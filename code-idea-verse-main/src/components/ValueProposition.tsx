
import React from 'react';

const ValueProposition = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-vibecode-darkerPurple text-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-vibecode-purple">VibeCode</span></h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing software development by making it accessible to everyone, not just professional coders.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-vibecode-purple">No Coding Required</h3>
            <p className="text-gray-300">
              Express your ideas in natural language and let our AI translate them into working software. No syntax, no debugging, no headaches.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-vibecode-purple">Cloud-Based Development</h3>
            <p className="text-gray-300">
              Everything happens online in our secure sandbox environment. No downloads, installations, or setup required.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-vibecode-purple">End-to-End Solution</h3>
            <p className="text-gray-300">
              From ideation to deployment, VibeCode guides you through the entire process with a seamless, intuitive workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
