
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Declaração para o TypeScript reconhecer as funções do ambiente do AI Studio.
// O ambiente já define o tipo 'AIStudio', então estendemos e associamos corretamente para evitar conflitos de modificadores.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Restored 'readonly' modifier to ensure property declarations match ambient environment definitions and fix the "identical modifiers" error.
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