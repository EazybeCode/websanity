import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SectionRenderer } from './components/SectionRenderer';
import { useLandingPage } from './hooks/useLandingPage';

function App() {
  const { data, loading, error } = useLandingPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading content: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />
      <main>
        {data?.sections?.map((section) => (
          <SectionRenderer key={section._key} section={section} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
