import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/WhyChooseUs";

const Index = () => {
  useEffect(() => {
    // Set current example in window for the demo
    if (typeof window !== 'undefined') {
      let currentExampleIdx = 0;
      (window as any).currentExampleIdx = currentExampleIdx;
      
      // Cycle through examples automatically
      const interval = setInterval(() => {
        currentExampleIdx = (currentExampleIdx + 1) % 3;
        (window as any).currentExampleIdx = currentExampleIdx;
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <div className="relative py-20">
          <div className="absolute inset-0 skew-y-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-blue-900/20 dark:to-cyan-900/20 -z-10"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('/images/blueprint-dark.png')] dark:bg-[url('/images/blueprint-light.png')] bg-repeat"></div>
          <HowItWorks />
        </div>
        <WhyChooseUs />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Index;
