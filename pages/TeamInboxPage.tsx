import React from 'react';
import {
  BarChart3,
  Settings,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  MessageCircle,
  RefreshCcw,
  Key,
  ChevronDown,
  Mail,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import SectionKicker from '../components/shared/SectionKicker';
import LabelAnimation from '../components/animations/LabelAnimation';
import UnifiedDashboardAnimation from '../components/animations/UnifiedDashboardAnimation';
import RoutingAnimation from '../components/animations/RoutingAnimation';

// Helper Components
const LayoutDashboardIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4V3H3v7zm0 11h4v-7H3v7zm7 0h4V11h-4v10zm0-14h4V3h-4v7zm7 11h4V3h-4v18z" />
  </svg>
);

const TeamInboxPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-300 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-50 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <SectionKicker label="Team Inbox" color="blue" />
          <h1 className="mt-8 text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.05] max-w-4xl mx-auto">
            All your team's WhatsApp, <span className="text-cyan-400">one dashboard</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Managing 10+ reps with individual WhatsApp numbers? Team Inbox brings every conversation into one view. Route leads, track responses, ensure coverage. Works with WhatsApp Business App—no API required.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 flex items-center gap-2 group transition-all">
              Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 font-bold px-8 py-4 rounded-xl transition-colors">
              See Team Inbox
            </button>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-slate-800 pt-10">
            <div>
              <div className="text-2xl font-bold text-white font-mono">Unlimited</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mt-1">Numbers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">Real-time</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mt-1">Updates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-mono">No API</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mt-1">Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features Section */}
      <section className="py-24 bg-slate-900/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionKicker label="Why Team Inbox?" />
            <h2 className="mt-4 text-4xl font-sans font-bold text-white tracking-tight">Finally see what your team is doing on WhatsApp</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Unified Dashboard", desc: "See all team conversations in one place. No more checking individual phones or asking for updates.", icon: <LayoutDashboardIcon /> },
              { title: "Lead Routing", desc: "Automatically route new conversations to the right rep based on territory, availability, or round-robin.", icon: <RefreshCcw className="w-6 h-6 text-blue-400" /> },
              { title: "Coverage Assurance", desc: "Spot unreplied messages before they become lost deals. Know who's responding and who's not.", icon: <ShieldCheck className="w-6 h-6 text-blue-400" /> },
              { title: "Performance Tracking", desc: "Compare response times and conversation volume across reps. Identify coaching opportunities.", icon: <BarChart3 className="w-6 h-6 text-blue-400" /> },
              { title: "No API Migration", desc: "Works with WhatsApp Business App. Each rep uses their existing number—no disruption.", icon: <Settings className="w-6 h-6 text-blue-400" /> },
              { title: "Role-Based Access", desc: "Managers see everything. Reps see their own. Customizable permissions for your org.", icon: <Key className="w-6 h-6 text-blue-400" /> },
            ].map((f, i) => (
              <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all group">
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animation Section 1: Visibility Problem */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionKicker label="The Visibility Problem" color="orange" />
            <h2 className="mt-4 text-4xl font-sans font-bold text-white tracking-tight leading-tight">
              Managers are flying blind on WhatsApp
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Your reps talk to customers all day on WhatsApp, but you have no idea what's being said. Are leads being followed up? Are customers getting responses? Are reps saying the right things? Without Team Inbox, you're managing a black box.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "No visibility into rep conversations",
                "Can't verify follow-up claims",
                "Unreplied leads slip away quietly",
                "No way to spot coaching needs"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-orange-400/20 flex items-center justify-center border border-orange-400/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-10 bg-transparent border border-slate-700 hover:border-slate-500 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 group transition-all">
              Get visibility <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <LabelAnimation />
        </div>
      </section>

      {/* Animation Section 2: Unified View */}
      <section className="py-24 bg-slate-900/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-transparent to-transparent opacity-30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <UnifiedDashboardAnimation />
          </div>
          <div className="order-1 lg:order-2">
            <SectionKicker label="Unified View" color="cyan" />
            <h2 className="mt-4 text-4xl font-sans font-bold text-white tracking-tight leading-tight">
              Every conversation, one dashboard
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Team Inbox aggregates WhatsApp conversations from all team members into a single view. Filter by rep, status, or priority. Search across all conversations. See who's responding and who's not—in real-time.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "All numbers in one dashboard",
                "Filter by rep, status, priority",
                "Search across all conversations",
                "Real-time conversation updates"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                   <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center border border-cyan-400/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-10 bg-transparent border border-slate-700 hover:border-slate-500 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 group transition-all">
              See unified view <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Animation Section 3: Automated Routing */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionKicker label="Lead Routing" color="blue" />
            <h2 className="mt-4 text-4xl font-sans font-bold text-white tracking-tight leading-tight">
              Get leads to the right rep, automatically
            </h2>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              New conversations routed based on territory, availability, or round-robin. No leads sitting unassigned. No manual distribution. Every opportunity gets immediate attention.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Territory-based routing",
                "Round-robin distribution",
                "Availability-aware assignment",
                "Manual override when needed"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-400/20 flex items-center justify-center border border-blue-400/40">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-10 bg-transparent border border-slate-700 hover:border-slate-500 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 group transition-all">
              Configure routing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <RoutingAnimation />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
            <SectionKicker label="How it Works" color="cyan" />
            <h2 className="mt-4 text-4xl font-sans font-bold text-white tracking-tight">Team onboarding in a day</h2>
            <p className="mt-4 text-slate-400">Each rep installs the extension. Dashboard populates automatically.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent hidden md:block -z-10"></div>
             {[
               { step: "01", title: "Reps Install Extension", desc: "Each team member adds Eazybe to Chrome." },
               { step: "02", title: "Conversations Sync", desc: "All chats flow to the Team Inbox dashboard." },
               { step: "03", title: "Manage & Monitor", desc: "Route leads, track responses, ensure coverage." }
             ].map((s, i) => (
               <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 relative">
                 <div className="text-5xl font-extrabold text-blue-500/20 font-mono mb-4">{s.step}</div>
                 <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                 <p className="text-slate-400 text-sm">{s.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-8 opacity-50" />
          <blockquote className="text-2xl md:text-3xl font-sans italic text-white leading-relaxed">
            "We have 40 sales reps across 3 countries. Before Team Inbox, I had no idea what was happening. Now I see every conversation and can ensure leads get handled."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
             <div className="w-12 h-12 rounded-full bg-slate-700"></div>
             <div className="text-left">
                <div className="font-bold text-white">Diego Fernandez</div>
                <div className="text-sm text-slate-500 font-mono uppercase tracking-widest">Regional Sales Director, LatAm Logistics</div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4">
           <div className="text-center mb-12">
            <SectionKicker label="FAQ" />
            <h2 className="mt-4 text-4xl font-sans font-bold text-white tracking-tight">Team Inbox questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Do I need WhatsApp Business API?", a: "No. Team Inbox works with regular WhatsApp Business App. Each rep uses their existing WhatsApp—no migration needed." },
              { q: "How many numbers can I manage?", a: "Unlimited. Whether you have 2 reps or 200, Team Inbox scales to accommodate your entire organization." },
              { q: "Can I respond from the dashboard?", a: "Yes. Managers with appropriate permissions can view and respond to messages directly from the central dashboard." },
              { q: "What about rep privacy?", a: "Team Inbox only syncs professional conversations. You can define specific rules and permissions for what data is visible to managers." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
                <button className="w-full p-6 text-left flex items-center justify-between group">
                  <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </button>
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-700/50 pt-4">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-950 relative border-t border-slate-800 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <SectionKicker label="Ready for Lift Off" color="cyan" />
          <h2 className="mt-8 text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
            Turn WhatsApp into your <span className="text-orange-400">Revenue Engine</span>
          </h2>
          <p className="mt-8 text-xl text-slate-400 leading-relaxed">
            Join 2,000+ teams who finally see what is happening in chat. Sync conversations, automate workflows, and close deals faster.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-xl shadow-lg shadow-blue-500/25 text-lg transition-all">
              Start Free Trial
            </button>
            <button className="bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 font-bold px-10 py-5 rounded-xl text-lg transition-colors">
              Book a Demo
            </button>
          </div>
          <p className="mt-6 text-slate-500 text-sm font-mono uppercase tracking-widest">
            Free 14-day trial • No credit card required
          </p>
        </div>
      </section>

      {/* Security Footer Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
           {[
             { title: "Meta Business Partner", desc: "Verified Integration", icon: <MessageCircle className="w-6 h-6" /> },
             { title: "GDPR Ready", desc: "Fully Compliant Data Processing", icon: <ShieldCheck className="w-6 h-6" /> },
             { title: "Bank-Grade Security", desc: "SSL & 256-bit Encryption", icon: <Key className="w-6 h-6" /> }
           ].map((s, i) => (
             <div key={i} className="bg-slate-800/30 p-8 rounded-2xl border border-slate-800/50 flex flex-col items-center text-center">
                <div className="mb-4 text-blue-400">{s.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                <p className="text-slate-500 text-sm">{s.desc}</p>
             </div>
           ))}
        </div>
        <div className="text-center mt-12 text-slate-600 text-[10px] font-mono uppercase tracking-[0.2em]">
          Trusted by regulated industries: financial services, healthcare, insurance
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <img src="https://eazybe.com/images/logo.png" alt="Eazybe" className="h-8 mb-6" />
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              The WhatsApp Sales Platform for CRM teams. Automate, monitor, and scale your sales efforts on the world's most popular messaging app.
            </p>
            <div className="mt-8 flex gap-4">
              <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
             <h5 className="text-white font-bold mb-6 text-sm">Platform</h5>
             <ul className="space-y-4 text-sm text-slate-500">
               <li><a href="#" className="hover:text-white transition-colors">Cloud Backup</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Team Inbox</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Revenue Inbox</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Quick Reply</a></li>
             </ul>
          </div>
          <div>
             <h5 className="text-white font-bold mb-6 text-sm">Integrations</h5>
             <ul className="space-y-4 text-sm text-slate-500">
               <li><a href="#" className="hover:text-white transition-colors">HubSpot</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Salesforce</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Zoho CRM</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Pipedrive</a></li>
             </ul>
          </div>
          <div>
             <h5 className="text-white font-bold mb-6 text-sm">Company</h5>
             <ul className="space-y-4 text-sm text-slate-500">
               <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600 font-mono">© 2024 Eazybe, Inc. All rights reserved.</p>
          <p className="text-xs text-slate-600 font-mono">Built with <span className="text-orange-400">Editorial Engineering</span> precision.</p>
        </div>
      </footer>
    </div>
  );
};

export default TeamInboxPage;
