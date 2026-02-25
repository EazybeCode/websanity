import React from 'react';
import ReactDOM from 'react-dom/client';
// Import i18n
import './i18n';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
// Removed Suspense wrapper to eliminate loading spinner - faster LCP
root.render(<App />);
