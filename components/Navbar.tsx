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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${scrolled ? 'border-slate-200 py-4 shadow-sm' : 'border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
             {/* Eazybe Logo Icon */}
             <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold font-sans text-xl shadow-sm">E</div>
             <span className="font-sans font-bold text-2xl tracking-tight text-brand-ink">Eazybe</span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-600 hover:text-brand-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA & Meta Badge */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Meta Partner Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
                <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-4 h-4" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Business Partner</span>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="md" className="font-semibold text-base">Sign In</Button>
              <Button variant="primary" size="md" className="font-semibold px-6 py-2.5 text-base shadow-md hover:shadow-lg transition-all">Start Free Trial</Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-brand-blue focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50">
          <div className="px-4 pt-2 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-4 text-lg font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-blue rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 py-4 flex items-center gap-3">
                <img src="https://cdn.simpleicons.org/meta/0064e0" alt="Meta" className="w-5 h-5" />
                <span className="text-sm font-bold text-slate-700">Meta Business Partner</span>
            </div>
            <div className="mt-4 pt-6 border-t border-slate-100 flex flex-col space-y-4 px-2">
              <Button variant="outline" size="lg" className="w-full justify-center text-base">Sign In</Button>
              <Button variant="primary" size="lg" className="w-full justify-center text-base">Start Free Trial</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};