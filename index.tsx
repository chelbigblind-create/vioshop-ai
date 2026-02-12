import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Declaração para o TypeScript reconhecer as funções do ambiente do AI Studio.
// O tipo AIStudio e a propriedade window.aistudio já são fornecidos pelo ambiente.
declare global {
  interface Window {
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