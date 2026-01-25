import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#features' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6 border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-brand-surface rounded-xl flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden p-1.5">
              <img src="/logo.png" alt="Eazybe Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-sans font-bold text-2xl tracking-tight text-white group-hover:text-brand-blue transition-colors">Eazybe</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <button className="font-sans font-semibold text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors">
                Sign In
              </button>
              <Button variant="primary" size="md" className="font-semibold px-5 py-2 text-sm shadow-glow-blue border border-brand-blue hover:bg-brand-blue/90">Start Free Trial</Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brand-blue focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-black border-b border-slate-800 shadow-2xl z-50">
          <div className="px-4 pt-2 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-4 text-lg font-medium text-white hover:bg-white/5 hover:text-brand-blue rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-4 pt-6 border-t border-slate-800 flex flex-col space-y-4 px-2">
              <Button variant="outline" size="lg" className="w-full justify-center text-base bg-transparent border-slate-700 text-white">Sign In</Button>
              <Button variant="primary" size="lg" className="w-full justify-center text-base">Start Free Trial</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
