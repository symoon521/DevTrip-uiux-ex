"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  setIsTransitioning: (isTransitioning: boolean) => void;
  targetUrl: string;
  setTargetUrl: (url: string) => void;
  transitionTo: (url: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUrl, setTargetUrl] = useState('');

  const transitionTo = (url: string) => {
    if (!isTransitioning) {
      setTargetUrl(url);
      setIsTransitioning(true);
    }
  };

  const value = { isTransitioning, setIsTransitioning, targetUrl, setTargetUrl, transitionTo };

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}