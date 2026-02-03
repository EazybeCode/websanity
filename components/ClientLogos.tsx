import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award } from 'lucide-react';

// Row 1 companies (scrolling left)
const row1Companies = [
  { name: "University Living", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/676859615a3ec360e3bc5d4c_university%20living.svg" },
  { name: "Satrack", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/67685bae06432a9005e774af_satrack.svg" },
  { name: "Orbidi", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a15f02d0e1fc5306a4d_orbidi.svg" },
  { name: "Physics Wallah", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/67685961ca70cc2713405aac_pw.svg" },
  { name: "WanderOn", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/6768596177cb968e98f60728_wanderon.svg" },
  { name: "Studyin", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/67685ab1ca70cc27134152fa_studyin.svg" },
  { name: "Kreedo", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/686e2d4a3d0a9398961d72d1_kreedo%20logo.svg" },
  { name: "TravClan", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/686e2d4a1f16e978af267356_travclan%20logo.svg" },
  { name: "Uniacco", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a141898ff58b264ab16_uniacco.svg" },
  { name: "Unicreds", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a158e7a74d2a6ce2193_unicreds.svg" },
];

// Row 2 companies (scrolling right)
const row2Companies = [
  { name: "Buyco", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d259050172254d374cf358_buyco.svg" },
  { name: "Wanderson", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a14a54fe3f4af5ae758_wanderson.svg" },
  { name: "BR Marketing", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a143e538dd32cc89691_br%20marketing.svg" },
  { name: "PickYourTrail", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a157766b001fd9135d1_pickyour%20trail.svg" },
  { name: "Motochile", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a16d52764746d130664_motochile.svg" },
  { name: "Alto QI", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25a15fca5f9ee4d1ca693_alto%20qi.svg" },
  { name: "Habi", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d2538dfc57d68938d78ed8_habi.webp" },
  { name: "Toku", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25392e01ab88e0c9940a3_toku.webp" },
  { name: "Nuvemshop", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d25390bf14e7cc65047a8e_nuvemshop.webp" },
  { name: "Belvo", logo: "https://cdn.prod.website-files.com/64cb8fe9dae4f2e5a069eb37/68d2538dcc1a11c6624bb394_belvo.webp" },
];

export const ClientLogos: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden border-y border-slate-200 dark:border-slate-800/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.02]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/3 dark:bg-brand-cyan/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/3 dark:bg-brand-blue/5 rounded-full blur-[120px]"></div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center space-y-3">
          {/* Trusted Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/30 dark:border-brand-cyan/20 backdrop-blur-sm">
            <Award className="w-4 h-4 text-brand-cyan dark:text-brand-cyan" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-cyan dark:text-brand-cyan font-semibold">
              {t('home.clientLogos.trustedBadge', 'Trusted Worldwide')}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {t('home.clientLogos.trustedBy', 'Trusted By')}{' '}
            <span className="bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-indigo bg-clip-text text-transparent">
              500+
            </span>{' '}
            {t('home.clientLogos.salesTeams', 'Sales Teams')}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto">
            {t('home.clientLogos.subtitle', 'From startups to enterprises, teams rely on EazyBe to never miss a WhatsApp conversation')}
          </p>
        </div>
      </div>

      {/* Logo Marquee Row 1 (Left to Right) - Full Width */}
      <div className="relative mb-6">
        {/* Subtle Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-hidden">
          <div className="flex space-x-8 animate-loop-scroll">
            {row1Companies.map((company, index) => (
              <div key={index} className="flex-shrink-0 w-24 h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-50 dark:opacity-90 hover:opacity-100 transition-all duration-300 filter grayscale dark:brightness-200 hover:grayscale-0 hover:brightness-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'text-sm font-bold text-slate-400';
                    fallback.textContent = company.name;
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex space-x-8 animate-loop-scroll" aria-hidden="true">
            {row1Companies.map((company, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0 w-24 h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-50 dark:opacity-90 hover:opacity-100 transition-all duration-300 filter grayscale dark:brightness-200 hover:grayscale-0 hover:brightness-100"
                />
              </div>
            ))}
          </div>

          {/* Third set */}
          <div className="flex space-x-8 animate-loop-scroll" aria-hidden="true">
            {row1Companies.map((company, index) => (
              <div key={`dup2-${index}`} className="flex-shrink-0 w-24 h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-50 dark:opacity-90 hover:opacity-100 transition-all duration-300 filter grayscale dark:brightness-200 hover:grayscale-0 hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo Marquee Row 2 (Right to Left - Reverse) - Full Width */}
      <div className="relative">
        {/* Subtle Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex overflow-hidden">
          <div className="flex space-x-8 animate-loop-scroll-reverse">
            {row2Companies.map((company, index) => (
              <div key={index} className="flex-shrink-0 w-24 h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-50 dark:opacity-90 hover:opacity-100 transition-all duration-300 filter grayscale dark:brightness-200 hover:grayscale-0 hover:brightness-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'text-sm font-bold text-slate-400';
                    fallback.textContent = company.name;
                    target.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Duplicate for seamless loop */}
          <div className="flex space-x-8 animate-loop-scroll-reverse" aria-hidden="true">
            {row2Companies.map((company, index) => (
              <div key={`dup-${index}`} className="flex-shrink-0 w-24 h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-50 dark:opacity-90 hover:opacity-100 transition-all duration-300 filter grayscale dark:brightness-200 hover:grayscale-0 hover:brightness-100"
                />
              </div>
            ))}
          </div>

          {/* Third set */}
          <div className="flex space-x-8 animate-loop-scroll-reverse" aria-hidden="true">
            {row2Companies.map((company, index) => (
              <div key={`dup2-${index}`} className="flex-shrink-0 w-24 h-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain opacity-50 dark:opacity-90 hover:opacity-100 transition-all duration-300 filter grayscale dark:brightness-200 hover:grayscale-0 hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
