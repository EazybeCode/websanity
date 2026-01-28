import React from 'react';
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
import { Navbar } from '../components/Navbar';
import { ChunkyFooter } from '../components/footer/ChunkyFooter';

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
    <div className="flex flex-col min-h-screen bg-[#0D0E1A]">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-44 lg:pb-32 xl:pt-56 xl:pb-40 overflow-hidden">
        <div className="glow-purple absolute -top-40 -left-40 w-[600px] h-[600px] opacity-40"></div>
        <div className="glow-blue absolute top-60 -right-40 w-[600px] h-[600px] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <Badge variant="accent">{data.hero.badge}</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.15] text-gradient mb-6 md:mb-8">
              {data.hero.headline} <span className="text-brand-purple">{data.hero.headlineHighlight}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-text-body max-w-2xl lg:mx-0 mx-auto mb-8 md:mb-12 font-light leading-relaxed">
              {data.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 mb-8 md:mb-12">
              <Button variant="primary" size="lg" className="px-8 md:px-10 w-full sm:w-auto">{data.hero.primaryCta.label}</Button>
              <Button variant="secondary" size="lg" className="flex gap-2 w-full sm:w-auto justify-center">
                {data.hero.secondaryCta.label} <ArrowUpRight size={20} />
              </Button>
            </div>

            <div className="flex flex-wrap lg:justify-start justify-center items-center gap-4 md:gap-8 text-xs sm:text-sm text-white font-medium">
              {data.hero.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-brand-purple flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{stat.label}</span>
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
      <section className="py-16 md:py-20 lg:py-24 relative bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
            <div className="mb-4">
              <Badge variant="muted">{data.benefits.badge}</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">{data.benefits.headline}</h2>
            <p className="text-brand-text-body text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">Traditional WhatsApp setups force you to sacrifice convenience for power. We changed that.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {data.benefits.items.map((item: any, idx: number) => (
              <div key={idx} className={`glass-effect p-6 sm:p-8 md:p-10 lg:p-12 rounded-card group hover:bg-white/5 transition-all ${idx === 0 ? 'border-red-500/10' : 'border-orange-500/10'}`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${idx === 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-orange-500/10 border-orange-500/20'} flex items-center justify-center mb-6 md:mb-8 border`}>
                  {idx === 0 ? <Smartphone className="text-red-400" size={20} /> : <Code className="text-orange-400" size={20} />}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6 lg:mb-8">{item.title}</h3>
                <p className={`text-sm sm:text-base md:text-lg ${idx === 0 ? 'text-brand-text-body group-hover:text-red-200/70' : 'text-brand-text-body group-hover:text-orange-200/70'} transition-colors leading-relaxed`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 lg:mt-20 text-center animate-pulse">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-accent tracking-tight italic px-4">What if you didn't have to choose?</p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {data.features.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4 md:mb-6">
                  <Badge variant="accent">{data.features[0].badge}</Badge>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight px-4 lg:px-0">
                  {data.features[0].headline} <span className="text-brand-purple">{data.features[0].headlineHighlight}</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-brand-text-body font-light mb-8 md:mb-12 leading-relaxed px-4 lg:px-0 max-w-2xl mx-auto lg:mx-0">
                  {data.features[0].description}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start px-4 lg:px-0">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">Get Started Now</Button>
                  <Button variant="ghost" size="lg" className="group w-full sm:w-auto justify-center">
                    See Features <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                {[
                  { title: "Dual Access", icon: <Share2 size={20} />, desc: "Your number works on API AND your WhatsApp app simultaneously. No lockouts. No restrictions." },
                  { title: "Safe Broadcasting", icon: <ShieldCheck size={20} />, desc: "Send bulk messages through secure API infrastructure—not the app's risky broadcast feature." },
                  { title: "Universal CRM Sync", icon: <Database size={20} />, desc: "Connect to any CRM you already use with the Eqzy extension. Salesforce, HubSpot, Zoho, and more." },
                  { title: "Unified Inbox", icon: <MessageSquare size={20} />, desc: "Every client message appears in your WhatsApp app. No dashboard hopping. No missed conversations." }
                ].map((prop, i) => (
                  <div key={i} className="glass-effect p-6 md:p-8 rounded-card hover:bg-brand-purple/5 transition-all border-white/5 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all">
                      {prop.icon}
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3 tracking-tight">{prop.title}</h4>
                    <p className="text-xs sm:text-sm text-brand-text-body font-light leading-relaxed">{prop.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-20 lg:py-24 bg-brand-secondary border-y border-white/5 relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
            <div className="mb-4">
              <Badge variant="muted">{data.howItWorks.badge}</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">{data.howItWorks.headline}</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-text-body max-w-xl mx-auto px-4">{data.howItWorks.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-white/5 z-0">
               <div className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent animate-slide-line"></div>
            </div>

            {data.howItWorks.steps.map((step: any, idx: number) => {
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
                       {[1,2,3,4,5].map(i => <div key={i} className="w-1 bg-brand-blue animate-bounce" style={{height: `${20+Math.random()*60}%`, animationDelay: `${i*0.1}s`}}></div>)}
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
                  <div className="mb-4 md:mb-6">{animations[idx]}</div>
                  <div className="font-sans font-bold text-brand-purple mb-3 md:mb-4 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase">Step {step.number}</div>
                  <h4 className="font-bold text-white mb-3 md:mb-4 text-base md:text-lg px-2 sm:px-4">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-brand-text-body leading-relaxed px-2">{step.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-12 md:mt-16 lg:mt-20 text-center">
            <Button variant="primary" size="lg" className="px-8 md:px-12 w-full sm:w-auto">Get Started Now →</Button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
            <div className="mb-4">
              <Badge variant="accent">Full Spectrum</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight px-4">Everything You Need. Nothing You Don't.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.features.slice(1, 7).map((feature: any, i: number) => {
              const featureIcons = [<Smartphone key={i} size={20} />, <Shield key={i} size={20} />, <RefreshCw key={i} size={20} />, <Monitor key={i} size={20} />, <MessageSquare key={i} size={20} />, <Users2 key={i} size={20} />];
              return (
                <div key={i} className="glass-effect p-6 sm:p-8 md:p-10 rounded-card border-white/5 hover:bg-white/5 transition-all group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-6 md:mb-8 group-hover:rotate-[15deg] transition-transform">
                    {featureIcons[i] || <Shield size={20} />}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3 md:mb-4 tracking-tight">{feature.headline || feature.badge}</h4>
                  <p className="text-sm md:text-base text-brand-text-body leading-relaxed font-light">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE SECTION */}
      <section id="comparison" className="py-16 md:py-20 lg:py-24 bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
            <div className="mb-4">
              <Badge variant="muted">Market Analysis</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">See the Difference</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-text-body px-4">How Coexistence stacks up against traditional WhatsApp models.</p>
          </div>
          <div className="glass-effect rounded-2xl md:rounded-[32px] overflow-x-auto shadow-2xl border-white/5">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 sm:p-6 md:p-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-neutral-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">Feature</th>
                  <th className="p-4 sm:p-6 md:p-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-neutral-500 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center border-x border-white/5">Regular</th>
                  <th className="p-4 sm:p-6 md:p-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-neutral-500 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center border-r border-white/5">API</th>
                  <th className="p-4 sm:p-6 md:p-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold text-brand-purple uppercase tracking-[0.15em] sm:tracking-[0.3em] text-center bg-brand-purple/10">Coexistence</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm md:text-base">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="p-4 sm:p-6 md:p-8 text-white font-medium group-hover:translate-x-1 transition-transform text-xs sm:text-sm md:text-base">{row.feature}</td>
                    <td className="p-4 sm:p-6 md:p-8 text-center text-brand-text-muted border-x border-white/5">
                      {row.whatsappStatus === 'risk' ? <span className="text-amber-500 text-[10px] sm:text-xs font-bold uppercase">⚠️ Risky</span> : row.whatsappStatus === 'yes' ? <Check className="mx-auto text-emerald-500" size={16} /> : row.whatsappStatus === 'instant' ? <span className="text-[10px] sm:text-xs">Instant</span> : <X className="mx-auto opacity-20" size={16} />}
                    </td>
                    <td className="p-4 sm:p-6 md:p-8 text-center text-brand-text-muted border-r border-white/5">
                      {row.standardApiStatus === 'yes' ? <Check className="mx-auto text-emerald-500" size={16} /> : row.standardApiStatus === 'weeks' ? <span className="text-[10px] sm:text-xs">Days/Weeks</span> : <X className="mx-auto opacity-20" size={16} />}
                    </td>
                    <td className="p-4 sm:p-6 md:p-8 text-center bg-brand-purple/5 font-bold text-white">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                         <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-brand-purple/20 flex items-center justify-center">
                           <Check size={12} className="text-brand-purple" />
                         </div>
                         <span className="text-xs sm:text-sm">{row.coexistence}</span>
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
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
            <div className="mb-4">
              <Badge variant="accent">{data.useCases.badge}</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">{data.useCases.headline}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.useCases.items.map((uc: any, i: number) => (
              <div key={i} className="glass-effect p-6 sm:p-8 md:p-10 lg:p-12 rounded-card border-white/5 hover:border-brand-purple/30 transition-all flex flex-col group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                  {getUseCaseIcon(i)}
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-tight">{uc.title}</h4>
                <p className="text-sm sm:text-base text-brand-text-body leading-relaxed font-light">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 md:py-20 lg:py-24 bg-brand-secondary border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
             <div className="mb-4">
               <Badge variant="muted">Social Proof</Badge>
             </div>
             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-4">Trusted by Growing Businesses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="glass-effect p-6 sm:p-8 md:p-10 lg:p-12 rounded-card border-white/5 flex flex-col h-full relative">
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 glass-effect rounded-2xl flex items-center justify-center text-brand-purple">
                <MessageSquare size={20} fill="currentColor" opacity={0.1} />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-white italic mb-8 md:mb-12 leading-relaxed font-light mt-4">"{data.testimonial.quote}"</p>
              <div className="mt-auto flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-purple/20 flex items-center justify-center text-brand-purple font-bold text-sm sm:text-base flex-shrink-0">
                  {data.testimonial.author[0]}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm sm:text-base">{data.testimonial.author}</h5>
                  <p className="text-[10px] sm:text-xs font-bold text-brand-accent uppercase tracking-widest">{data.testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16 lg:mb-24">
            <div className="mb-4">
              <Badge variant="accent">{data.faq.badge}</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-4">{data.faq.headline}</h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {data.faq.items.map((faq: any, idx: number) => (
              <div key={idx} className="glass-effect rounded-xl md:rounded-2xl border-white/5 p-6 md:p-8 group cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
                   <h4 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight flex-1">{faq.question}</h4>
                   <ChevronDown className="text-brand-text-muted group-hover:text-white transition-colors flex-shrink-0" size={20} />
                </div>
                <div className="mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-brand-text-body font-light leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-300">
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 md:py-20 lg:py-24 xl:py-32 relative bg-[#0D0E1A] text-center overflow-hidden border-t border-white/5">
        <div className="glow-purple absolute inset-0 opacity-20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-brand-purple mb-8 md:mb-12 shadow-2xl relative">
            <div className="absolute inset-0 bg-brand-purple blur-2xl opacity-20 animate-pulse"></div>
            <Zap size={28} fill="currentColor" className="relative z-10 sm:w-9 sm:h-9" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter mb-6 md:mb-10 leading-[1.1] px-4">
            {data.cta.headline} <span className="text-brand-purple">{data.cta.headlineHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-text-body mb-10 md:mb-16 max-w-2xl mx-auto font-light leading-relaxed px-4">
            {data.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full sm:w-auto px-4">
            <Button variant="primary" size="lg" className="px-8 sm:px-10 md:px-12 py-4 md:py-5 shadow-2xl w-full sm:w-auto">{data.cta.primaryCta.label}</Button>
            <Button variant="secondary" size="lg" className="px-8 sm:px-10 md:px-12 py-4 md:py-5 w-full sm:w-auto">{data.cta.secondaryCta.label}</Button>
          </div>
          <p className="text-xs sm:text-sm text-brand-text-muted mt-6 md:mt-8 px-4">{data.cta.footnote}</p>
        </div>
      </section>
      </main>

      <ChunkyFooter />
    </div>
  );
};

export default CoexistencePage;
