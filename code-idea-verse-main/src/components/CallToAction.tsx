import React from 'react';
import { Button } from "@/components/ui/button";
import { useWaitlist } from './WaitlistContext';
import LearnMoreModal from './LearnMoreModal';

const CallToAction = () => {
  const { openWaitlist } = useWaitlist();
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to <span className="gradient-text">Transform</span> Your Coding?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Join the VibeCode waitlist and be among the first to experience the future of no-code software development through natural language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-vibecode-purple text-white hover:bg-vibecode-purple/90 font-medium py-3 px-6" onClick={openWaitlist}>
                  Join Waitlist
                </Button>
                <LearnMoreModal />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-2xl blur-xl"></div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex mb-4 items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <img src="/Logo/logo.png" alt="VibeCode Logo" className="w-6 h-6 rounded-full object-cover" />
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">VibeCoding in Action</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-4">
                  "Build a real-time chat app with user authentication and file sharing."
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Estimated time: 12 minutes</span>
                  <span>158 lines of code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
