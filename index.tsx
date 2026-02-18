
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Declaração para o TypeScript reconhecer as funções do ambiente do AI Studio.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Restore 'readonly' to ensure identical modifiers across all declarations of 'aistudio' in the environment.
    readonly aistudio: AIStudio;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
