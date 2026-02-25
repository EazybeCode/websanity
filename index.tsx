import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// Import i18n - will load translations in background
import './i18n';
import App from './App';

// Faster, minimal loading indicator
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
    {/* Smaller, faster loading spinner */}
    <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
