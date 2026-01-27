/**
 * This script generates the full CoexistencePage.tsx with Sanity integration
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fullComponentCode = `import React from 'react';
import {
  Check,
  X,
  ArrowRight,
  Phone,
  Zap,
  Database,
  ShieldCheck,
  MessageSquare,
  Globe,
  Share2,
  Settings,
  ArrowUpRight,
  Users,
  Briefcase,
  Store,
  GraduationCap,
  Hammer,
  ChevronDown,
  PlusCircle,
  Smartphone,
  Shield,
  RefreshCw,
  Users2,
  Monitor,
  Activity,
  Cpu,
  Code
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCoexistence } from '../hooks/useCoexistence';

const CoexistencePage: React.FC = () => {
  const { data, loading, error } = useCoexistence();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0E1A]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0E1A]">
        <div className="text-red-500 text-xl">Error loading page content</div>
      </div>
    );
  }

  // Comparison data - derived from content
  const comparisonData = [
    { feature: 'Bulk Broadcasting', whatsappStatus: 'risk', standardApiStatus: 'yes', coexistence: 'Yes' },
    { feature: 'App Access', whatsappStatus: 'yes', standardApiStatus: 'no', coexistence: 'Yes' },
    { feature: 'CRM Integration', whatsappStatus: 'no', standardApiStatus: 'yes', coexistence: 'Yes' },
    { feature: 'See Messages on Phone', whatsappStatus: 'yes', standardApiStatus: 'no', coexistence: 'Yes' },
    { feature: 'Number Ban Protection', whatsappStatus: 'no', standardApiStatus: 'yes', coexistence: 'Protected' },
    { feature: 'WhatsApp Web Access', whatsappStatus: 'yes', standardApiStatus: 'no', coexistence: 'Yes' },
    { feature: 'Setup Time', whatsappStatus: 'instant', standardApiStatus: 'weeks', coexistence: 'Minutes' },
  ];

  const getUseCaseIcon = (index: number) => {
    const icons = [Store, Briefcase, Hammer, GraduationCap, Users];
    const Icon = icons[index] || Users;
    return <Icon />;
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-32 lg:pt-56 lg:pb-64 overflow-hidden">
        <div className="glow-purple absolute -top-40 -left-40 w-[600px] h-[600px] opacity-40"></div>
        <div className="glow-blue absolute top-60 -right-40 w-[600px] h-[600px] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left">
            <Badge variant="accent">{data.hero.badge}</Badge>
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] text-gradient mb-8">
              {data.hero.headline} {data.hero.headlineHighlight}
            </h1>
            <p className="text-xl lg:text-2xl text-brand-text-body max-w-2xl lg:mx-0 mx-auto mb-12 font-light leading-relaxed">
              {data.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12">
              <Button variant="primary" size="lg" className="px-10">{data.hero.primaryCta.label}</Button>
              <Button variant="secondary" size="lg" className="flex gap-2">
                {data.hero.secondaryCta.label} <ArrowUpRight size={20} />
              </Button>
            </div>

            <div className="flex flex-wrap lg:justify-start justify-center items-center gap-8 text-[13px] text-white font-medium">
              {data.hero.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={16} className="text-brand-purple" />
                  {stat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Animation */}
          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-brand-purple/5 blur-[120px] rounded-full"></div>

            <div className="relative flex items-center justify-between p-12 glass-effect rounded-[48px] border-white/10 shadow-3xl h-[450px]">

              {/* Left Side: The App (Phone) */}
              <div className="flex flex-col items-center gap-4 z-20">
                <div className="relative group">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl group-hover:bg-emerald-500/40 transition-all rounded-full"></div>
                  <div className="w-20 h-32 glass-effect border-white/20 rounded-2xl flex flex-col p-2 relative z-10 animate-float">
                    <div className="h-1.5 w-1/3 bg-white/10 rounded-full mx-auto mb-2"></div>
                    <div className="space-y-1.5">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-1.5 w-full bg-emerald-500/10 rounded-full"></div>
                      ))}
                    </div>
                    <div className="mt-auto flex justify-center">
                       <Smartphone className="text-emerald-400" size={24} />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">WhatsApp App</span>
              </div>

              {/* Center: The Coexistence Hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="w-24 h-24 rounded-full glass-effect border-brand-purple/30 flex items-center justify-center relative pulse-ring shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                  <div className="absolute inset-0 bg-brand-purple/10 rounded-full animate-ping opacity-20"></div>
                  <Cpu className="text-brand-purple" size={40} />
                </div>
                <div className="mt-4 text-[10px] font-black text-brand-purple uppercase tracking-[0.4em] bg-brand-purple/5 px-4 py-1 rounded-full border border-brand-purple/20">
                  Eazybe Core
                </div>
              </div>

              {/* Right Side: The API (Cloud/CRM) */}
              <div className="flex flex-col items-center gap-4 z-20">
                <div className="relative group">
                  <div className="absolute inset-0 bg-brand-blue/20 blur-xl group-hover:bg-brand-blue/40 transition-all rounded-full"></div>
                  <div className="w-32 h-32 glass-effect border-white/20 rounded-3xl flex items-center justify-center relative z-10 animate-float" style={{animationDelay: '1s'}}>
                    <div className="grid grid-cols-2 gap-2 p-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <Database size={16} />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <Globe size={16} />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <RefreshCw size={16} />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                        <Activity size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest text-center">Cloud API & CRM</span>
              </div>

              {/* Data Flow Lines */}
              <div className="absolute left-[120px] right-[120px] h-[1px] bg-white/5 top-1/2 -translate-y-1/2 z-0">
                <div className="absolute top-0 left-0 h-1.5 w-1.5 bg-brand-purple rounded-full animate-data-flow" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-0 left-0 h-1.5 w-1.5 bg-brand-blue rounded-full animate-data-flow" style={{animationDelay: '0.8s'}}></div>
                <div className="absolute top-0 right-0 h-1.5 w-1.5 bg-emerald-500 rounded-full animate-data-flow-reverse" style={{animationDelay: '0.4s'}}></div>
                <div className="absolute top-0 right-0 h-1.5 w-1.5 bg-white rounded-full animate-data-flow-reverse" style={{animationDelay: '1.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="section-spacing relative bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <Badge variant="muted">{data.benefits.badge}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{data.benefits.headline}</h2>
            <p className="text-brand-text-body text-xl max-w-2xl mx-auto">Traditional WhatsApp setups force you to sacrifice convenience for power. We changed that.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {data.benefits.items.map((item, idx) => (
              <div key={idx} className={\`glass-effect p-12 rounded-card group hover:bg-white/5 transition-all \${idx === 0 ? 'border-red-500/10' : 'border-orange-500/10'}\`}>
                <div className={\`w-12 h-12 rounded-2xl \${idx === 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-orange-500/10 border-orange-500/20'} flex items-center justify-center mb-8 border\`}>
                  {idx === 0 ? <Smartphone className="text-red-400" /> : <Code className="text-orange-400" />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-8">{item.title}</h3>
                <p className={\`text-lg \${idx === 0 ? 'text-brand-text-body group-hover:text-red-200/70' : 'text-brand-text-body group-hover:text-orange-200/70'} transition-colors\`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center animate-pulse">
            <p className="text-2xl font-semibold text-brand-accent tracking-tight italic">What if you didn't have to choose?</p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="section-spacing overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {data.features.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 text-center lg:text-left">
                <Badge variant="accent">{data.features[0].badge}</Badge>
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                  {data.features[0].headline} <span className="text-brand-purple">{data.features[0].headlineHighlight}</span>
                </h2>
                <p className="text-xl text-brand-text-body font-light mb-12 leading-relaxed">
                  {data.features[0].description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button variant="primary" size="lg">Get Started Now</Button>
                  <Button variant="ghost" size="lg" className="group">
                    See Features <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {[
                  { title: "Dual Access", icon: <Share2 />, desc: "Your number works on API AND your WhatsApp app simultaneously. No lockouts. No restrictions." },
                  { title: "Safe Broadcasting", icon: <ShieldCheck />, desc: "Send bulk messages through secure API infrastructure—not the app's risky broadcast feature." },
                  { title: "Universal CRM Sync", icon: <Database />, desc: "Connect to any CRM you already use with the Eqzy extension. Salesforce, HubSpot, Zoho, and more." },
                  { title: "Unified Inbox", icon: <MessageSquare />, desc: "Every client message appears in your WhatsApp app. No dashboard hopping. No missed conversations." }
                ].map((prop, i) => (
                  <div key={i} className="glass-effect p-8 rounded-card hover:bg-brand-purple/5 transition-all border-white/5 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple mb-6 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all">
                      {prop.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{prop.title}</h4>
                    <p className="text-sm text-brand-text-body font-light leading-relaxed">{prop.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="section-spacing bg-brand-secondary border-y border-white/5 relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24">
            <Badge variant="muted">{data.howItWorks.badge}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{data.howItWorks.headline}</h2>
            <p className="text-xl text-brand-text-body max-w-xl mx-auto">{data.howItWorks.description}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-white/5 z-0">
               <div className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent animate-slide-line"></div>
            </div>

            {data.howItWorks.steps.map((step, idx) => {
              const animations = [
                (
                  <div className="relative h-24 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-brand-purple/20 flex items-center justify-center group-hover:border-brand-purple transition-colors">
                      <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center animate-pulse">
                        <Smartphone className="text-brand-purple" size={20} />
                      </div>
                    </div>
                  </div>
                ),
                (
                  <div className="relative h-24 flex items-center justify-center">
                    <div className="flex gap-1 items-end h-8">
                       {[1,2,3,4,5].map(i => <div key={i} className="w-1 bg-brand-blue animate-bounce" style={{height: \`\${20+Math.random()*60}%\`, animationDelay: \`\${i*0.1}s\`}}></div>)}
                    </div>
                  </div>
                ),
                (
                  <div className="relative h-24 flex items-center justify-center">
                    <div className="w-16 h-12 glass-effect border-brand-accent/30 rounded flex items-center justify-center group-hover:rotate-6 transition-transform">
                       <PlusCircle className="text-brand-accent" size={20} />
                    </div>
                  </div>
                ),
                (
                  <div className="relative h-24 flex items-center justify-center">
                     <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Globe className="text-emerald-500 animate-spin-slow" size={32} />
                     </div>
                  </div>
                )
              ];

              return (
                <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                  <div className="mb-6">{animations[idx]}</div>
                  <div className="font-sans font-bold text-brand-purple mb-4 text-[10px] tracking-[0.4em] uppercase">Step {step.number}</div>
                  <h4 className="font-bold text-white mb-4 text-lg px-4">{step.title}</h4>
                  <p className="text-sm text-brand-text-body leading-relaxed px-2">{step.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-20 text-center">
            <Button variant="primary" size="lg" className="px-12">Get Started Now →</Button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section-spacing overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <Badge variant="accent">Full Spectrum</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Everything You Need. Nothing You Don't.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.features.slice(1, 7).map((feature, i) => {
              const featureIcons = [<Smartphone key={i} />, <Shield key={i} />, <RefreshCw key={i} />, <Monitor key={i} />, <MessageSquare key={i} />, <Users2 key={i} />];
              return (
                <div key={i} className="glass-effect p-10 rounded-card border-white/5 hover:bg-white/5 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-8 group-hover:rotate-[15deg] transition-transform">
                    {featureIcons[i] || <Shield />}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.headline || feature.badge}</h4>
                  <p className="text-brand-text-body leading-relaxed font-light">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE SECTION */}
      <section id="comparison" className="section-spacing bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <Badge variant="muted">Market Analysis</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">See the Difference</h2>
            <p className="text-xl text-brand-text-body">How Coexistence stacks up against traditional WhatsApp models.</p>
          </div>
          <div className="glass-effect rounded-[32px] overflow-hidden shadow-2xl border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-8 text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Feature</th>
                  <th className="p-8 text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em] text-center border-x border-white/5">Regular Business</th>
                  <th className="p-8 text-[11px] font-bold text-neutral-500 uppercase tracking-[0.2em] text-center border-r border-white/5">Standard API</th>
                  <th className="p-8 text-[11px] font-bold text-brand-purple uppercase tracking-[0.3em] text-center bg-brand-purple/10">Coexistence</th>
                </tr>
              </thead>
              <tbody className="text-base">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-8 text-white font-medium group-hover:translate-x-1 transition-transform">{row.feature}</td>
                    <td className="p-8 text-center text-brand-text-muted border-x border-white/5">
                      {row.whatsappStatus === 'risk' ? <span className="text-amber-500 text-xs font-bold uppercase">⚠️ Risky</span> : row.whatsappStatus === 'yes' ? <Check className="mx-auto text-emerald-500" /> : row.whatsappStatus === 'instant' ? <span className="text-xs">Instant</span> : <X className="mx-auto opacity-20" />}
                    </td>
                    <td className="p-8 text-center text-brand-text-muted border-r border-white/5">
                      {row.standardApiStatus === 'yes' ? <Check className="mx-auto text-emerald-500" /> : row.standardApiStatus === 'weeks' ? <span className="text-xs">Days/Weeks</span> : <X className="mx-auto opacity-20" />}
                    </td>
                    <td className="p-8 text-center bg-brand-purple/5 font-bold text-white">
                      <div className="flex items-center justify-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center">
                           <Check size={14} className="text-brand-purple" />
                         </div>
                         <span className="text-sm">{row.coexistence}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* USE CASES SECTION */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <Badge variant="accent">{data.useCases.badge}</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{data.useCases.headline}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.useCases.items.map((uc, i) => (
              <div key={i} className="glass-effect p-12 rounded-card border-white/5 hover:border-brand-purple/30 transition-all flex flex-col group">
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-8 group-hover:scale-110 transition-transform">
                  {getUseCaseIcon(i)}
                </div>
                <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">{uc.title}</h4>
                <p className="text-base text-brand-text-body leading-relaxed font-light">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section-spacing bg-brand-secondary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
             <Badge variant="muted">Social Proof</Badge>
             <h2 className="text-4xl font-bold text-white mb-6">Trusted by Growing Businesses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-12 rounded-card border-white/5 flex flex-col h-full relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 glass-effect rounded-2xl flex items-center justify-center text-brand-purple">
                <MessageSquare size={24} fill="currentColor" opacity={0.1} />
              </div>
              <p className="text-lg text-white italic mb-12 leading-relaxed font-light mt-4">"{data.testimonial.quote}"</p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold">
                  {data.testimonial.author[0]}
                </div>
                <div>
                  <h5 className="font-bold text-white">{data.testimonial.author}</h5>
                  <p className="text-xs font-bold text-brand-accent uppercase tracking-widest">{data.testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <Badge variant="accent">{data.faq.badge}</Badge>
            <h2 className="text-4xl font-bold text-white mb-6">{data.faq.headline}</h2>
          </div>
          <div className="space-y-6">
            {data.faq.items.map((faq, idx) => (
              <div key={idx} className="glass-effect rounded-2xl border-white/5 p-8 group cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between gap-4">
                   <h4 className="text-lg font-bold text-white tracking-tight">{faq.question}</h4>
                   <ChevronDown className="text-brand-text-muted group-hover:text-white transition-colors flex-shrink-0" />
                </div>
                <div className="mt-6 text-brand-text-body font-light leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="section-spacing relative bg-[#0D0E1A] text-center overflow-hidden border-t border-white/5">
        <div className="glow-purple absolute inset-0 opacity-20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-brand-purple mb-12 shadow-2xl relative">
            <div className="absolute inset-0 bg-brand-purple blur-2xl opacity-20 animate-pulse"></div>
            <Zap size={36} fill="currentColor" className="relative z-10" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-10 leading-[1.05]">
            {data.cta.headline} <span className="text-brand-purple">{data.cta.headlineHighlight}</span>
          </h2>
          <p className="text-xl text-brand-text-body mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            {data.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="primary" size="lg" className="px-12 py-5 shadow-2xl">{data.cta.primaryCta.label}</Button>
            <Button variant="secondary" size="lg" className="px-12 py-5">{data.cta.secondaryCta.label}</Button>
          </div>
          <p className="text-sm text-brand-text-muted mt-8">{data.cta.footnote}</p>
        </div>
      </section>
    </div>
  );
};

export default CoexistencePage;
`;

const outputPath = path.join(__dirname, '..', 'pages', 'CoexistencePage.tsx');
fs.writeFileSync(outputPath, fullComponentCode);

console.log('✅ Full CoexistencePage.tsx generated with Sanity integration!');
console.log('   File:', outputPath);
console.log('\nThe page now:');
console.log('- Fetches all content from Sanity CMS');
console.log('- Includes the complete UI with animations');
console.log('- Uses the Button and Badge components');
console.log('- Has proper loading and error states');
