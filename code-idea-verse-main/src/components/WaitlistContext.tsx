import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WaitlistContextProps {
  openWaitlist: () => void;
  closeWaitlist: () => void;
  isOpen: boolean;
}

const WaitlistContext = createContext<WaitlistContextProps>({ 
  openWaitlist: () => {}, 
  closeWaitlist: () => {},
  isOpen: false
});

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openWaitlist = () => setOpen(true);
  const closeWaitlist = () => setOpen(false);

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist, isOpen: open }}>
      {children}
      {/* WaitlistForm will be rendered here so it's always present */}
      <WaitlistForm isOpen={open} setIsOpen={setOpen} />
    </WaitlistContext.Provider>
  );
}

// Import the WaitlistForm with props
import { WaitlistForm } from './WaitlistForm';
