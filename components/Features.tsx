import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Check, ArrowRight, Bot, BarChart3, User, RefreshCw, Sparkles, Smartphone, Mail, DollarSign } from 'lucide-react';
import { Feature } from '../types';

// High-Fidelity Capture Visual with "Flying Data" Animation
const CaptureVisual = () => {
    const [step, setStep] = useState(0);

    // Animation Sequence (Total cycle approx 12s)
    // 0: Idle
    // 1: Msg 1 In (Email)
    // 2: Scan 1
    // 3: Fly 1
    // 4: Field 1 Fill
    // 5: Msg 2 In (Phone)
    // 6: Scan 2
    // 7: Fly 2
    // 8: Field 2 Fill
    // 9: Msg 3 In (Deal)
    // 10: Scan 3
    // 11: Fly 3
    // 12: Field 3 Fill
    // 13: Pause/Reset

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s < 14 ? s + 1 : 0));
        }, 800); 
        return () => clearInterval(timer);
    }, []);

    // Helper to determine state
    const isMsgVisible = (trigger: number) => step >= trigger;
    const isScanning = (trigger: number) => step === trigger + 1;
    const isFlying = (trigger: number) => step === trigger + 2;
    const isFilled = (trigger: number) => step >= trigger + 3;

    return (
        <div className="w-full h-full min-h-[480px] bg-gradient-to-br from-[#FF7A59] to-[#FF8F73] p-3 rounded-xl flex items-center justify-center shadow-2xl overflow-hidden relative group cursor-default select-none">
            
            {/* Main Window */}
            <div className="w-full h-full bg-white rounded-lg flex flex-col shadow-2xl overflow-hidden font-sans ring-1 ring-black/20 relative z-10">
                
                {/* HubSpot-Style Header */}
                <div className="h-14 bg-[#2D3E50] flex items-center px-4 shrink-0 border-b border-slate-700 justify-between z-20 relative">
                     <div className="flex items-center gap-3">
                        <div className="relative w-6 h-6 flex items-center justify-center">
                             {/* HubSpot Sprocket Icon */}
                             <div className="w-full h-full text-[#FF7A59]">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                             </div>
                        </div>
                        <div className="h-4 w-px bg-slate-600"></div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-xs leading-none">Contacts</span>
                            <span className="text-slate-400 text-[9px] leading-none mt-0.5">Sync Active</span>
                        </div>
                     </div>
                     
                     {/* Sync Status Pulse */}
                     <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${step > 0 && step < 14 ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
                     </div>
                </div>

                <div className="flex flex-1 overflow-hidden relative">
                    
                    {/* LEFT: CRM Sidebar */}
                    <div className="w-[38%] bg-[#F5F8FA] border-r border-slate-200 p-5 flex flex-col gap-5 z-10">
                        {/* Profile Header */}
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-sm overflow-hidden">
                                <User size={20} className="text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <div className="h-3 w-20 bg-slate-300 rounded mb-1.5"></div>
                                <div className="h-2 w-12 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                        {/* CRM Fields */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">About this contact</span>
                            </div>

                            {/* Field 1: Email */}
                            <div className={`relative group transition-all duration-300 ${isFilled(1) ? 'scale-100' : 'scale-100'}`}>
                                <label className="text-[10px] font-bold text-slate-600 mb-1 block">Email</label>
                                <div className={`h-8 w-full rounded border flex items-center px-2 text-xs font-medium transition-all duration-500 ${isFilled(1) ? 'bg-white border-blue-400 shadow-[0_0_0_2px_rgba(59,130,246,0.1)] text-slate-800' : 'bg-slate-100 border-slate-200 text-transparent'}`}>
                                    <Mail size={12} className={`mr-2 ${isFilled(1) ? 'text-slate-500' : 'opacity-0'}`} />
                                    {isFilled(1) ? 'sarah@tech.co' : ''}
                                </div>
                                {/* Impact Flash */}
                                <div className={`absolute inset-0 bg-blue-400/20 rounded z-20 pointer-events-none transition-opacity duration-300 ${step === 4 ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>

                            {/* Field 2: Phone */}
                            <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-600 mb-1 block">Phone number</label>
                                <div className={`h-8 w-full rounded border flex items-center px-2 text-xs font-medium transition-all duration-500 ${isFilled(5) ? 'bg-white border-blue-400 shadow-[0_0_0_2px_rgba(59,130,246,0.1)] text-slate-800' : 'bg-slate-100 border-slate-200 text-transparent'}`}>
                                    <Smartphone size={12} className={`mr-2 ${isFilled(5) ? 'text-slate-500' : 'opacity-0'}`} />
                                    {isFilled(5) ? '+1 555-0199' : ''}
                                </div>
                                <div className={`absolute inset-0 bg-blue-400/20 rounded z-20 pointer-events-none transition-opacity duration-300 ${step === 8 ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>

                            {/* Field 3: Deal Value */}
                            <div className="relative group">
                                <label className="text-[10px] font-bold text-slate-600 mb-1 block">Deal Amount</label>
                                <div className={`h-8 w-full rounded border flex items-center px-2 text-xs font-medium transition-all duration-500 ${isFilled(9) ? 'bg-white border-blue-400 shadow-[0_0_0_2px_rgba(59,130,246,0.1)] text-slate-800' : 'bg-slate-100 border-slate-200 text-transparent'}`}>
                                    <DollarSign size={12} className={`mr-2 ${isFilled(9) ? 'text-slate-500' : 'opacity-0'}`} />
                                    {isFilled(9) ? '25,000.00' : ''}
                                </div>
                                <div className={`absolute inset-0 bg-blue-400/20 rounded z-20 pointer-events-none transition-opacity duration-300 ${step === 12 ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Chat Area */}
                    <div className="flex-1 bg-[#E4DDD5] p-5 flex flex-col relative overflow-hidden">
                        {/* WhatsApp Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]"></div>

                        {/* Chat Header */}
                        <div className="flex items-center gap-2 mb-6 z-10 self-center">
                             <div className="bg-white/90 backdrop-blur border border-white/50 px-2 py-0.5 rounded shadow-sm text-[9px] font-bold text-slate-500 uppercase tracking-wide">Today</div>
                        </div>

                        <div className="space-y-4 z-10 relative">
                            
                            {/* Msg 1 */}
                            <div className={`transition-all duration-500 ${isMsgVisible(1) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%] relative inline-block">
                                    <p className="text-xs text-slate-800">
                                        Hi! Here is my email: <span className={`transition-colors duration-300 font-medium ${isScanning(1) ? 'bg-blue-100 text-blue-700' : 'text-slate-800'}`}>sarah@tech.co</span>
                                    </p>
                                    <span className="text-[9px] text-slate-400 block text-right mt-1">10:42 AM</span>
                                    
                                    {/* Synced Badge */}
                                    <div className={`absolute -right-2 -top-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 transition-all duration-300 ${isFilled(1) ? 'scale-100' : 'scale-0'}`}>
                                        <div className="w-3.5 h-3.5 bg-brand-blue rounded-full flex items-center justify-center">
                                            <Check size={8} className="text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Msg 2 */}
                            <div className={`transition-all duration-500 ${isMsgVisible(5) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%] relative inline-block">
                                    <p className="text-xs text-slate-800">
                                        Please call me at <span className={`transition-colors duration-300 font-medium ${isScanning(5) ? 'bg-blue-100 text-blue-700' : 'text-slate-800'}`}>+1 555-0199</span>
                                    </p>
                                    <span className="text-[9px] text-slate-400 block text-right mt-1">10:45 AM</span>

                                    <div className={`absolute -right-2 -top-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 transition-all duration-300 ${isFilled(5) ? 'scale-100' : 'scale-0'}`}>
                                        <div className="w-3.5 h-3.5 bg-brand-blue rounded-full flex items-center justify-center">
                                            <Check size={8} className="text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Msg 3 */}
                            <div className={`transition-all duration-500 ${isMsgVisible(9) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%] relative inline-block">
                                    <p className="text-xs text-slate-800">
                                        Budget is <span className={`transition-colors duration-300 font-medium ${isScanning(9) ? 'bg-blue-100 text-blue-700' : 'text-slate-800'}`}>$25,000</span> for Enterprise.
                                    </p>
                                    <span className="text-[9px] text-slate-400 block text-right mt-1">10:48 AM</span>

                                     <div className={`absolute -right-2 -top-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 transition-all duration-300 ${isFilled(9) ? 'scale-100' : 'scale-0'}`}>
                                        <div className="w-3.5 h-3.5 bg-brand-blue rounded-full flex items-center justify-center">
                                            <Check size={8} className="text-white" strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ANIMATION LAYER: Flying Orbs */}
                    {/* Orb 1: Email */}
                    <div className={`absolute w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-50 pointer-events-none transition-all duration-700 ease-in-out ${isFlying(1) ? 'opacity-100 scale-100 left-[38px] top-[148px]' : 'opacity-0 scale-50 left-[60%] top-[20%]'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                    
                    {/* Orb 2: Phone */}
                     <div className={`absolute w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-50 pointer-events-none transition-all duration-700 ease-in-out ${isFlying(5) ? 'opacity-100 scale-100 left-[38px] top-[200px]' : 'opacity-0 scale-50 left-[60%] top-[35%]'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}></div>

                    {/* Orb 3: Deal */}
                     <div className={`absolute w-3 h-3 bg-brand-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] z-50 pointer-events-none transition-all duration-700 ease-in-out ${isFlying(9) ? 'opacity-100 scale-100 left-[38px] top-[252px]' : 'opacity-0 scale-50 left-[60%] top-[50%]'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}></div>

                </div>
            </div>
        </div>
    );
};

const FeatureBlock: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
    const isEven = index % 2 === 0;
    const badgeColor = 'text-brand-blue bg-blue-50 border-blue-100'; 
    const primaryColor = 'text-brand-blue';

    return (
        <section className={`py-24 border-b border-slate-200 ${isEven ? 'bg-white' : 'bg-brand-muted'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row gap-20 items-center ${feature.alignRight ? 'lg:flex-row-reverse' : ''}`}>
                    
                    <div className="flex-1 space-y-8">
                        <div>
                            <span className={`inline-block font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-btn border ${badgeColor}`}>
                                {feature.badge}
                            </span>
                            <h2 className="mt-6 text-4xl font-sans font-bold text-brand-ink leading-tight">
                                {feature.headline}
                            </h2>
                            <p className="mt-6 text-lg text-slate-600 leading-relaxed font-light">
                                {feature.description}
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {feature.points.map((point, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <Check size={20} className={`flex-shrink-0 mt-0.5 ${primaryColor}`} strokeWidth={2.5} />
                                    <span className="text-slate-800 font-medium">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4">
                            <Button variant="outline" className="text-brand-ink border-slate-300 hover:border-brand-blue hover:text-brand-blue">
                                {feature.cta} <ArrowRight size={16} className="ml-2"/>
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex-1 w-full">
                         <div className="aspect-[4/3] bg-white rounded-card border border-slate-200 shadow-engineering p-2 flex items-center justify-center relative overflow-hidden group hover:shadow-overlay transition-shadow duration-500">
                            <div className="absolute inset-0 bg-slate-50 grid-bg opacity-50"></div>
                            {feature.imageComponent ? feature.imageComponent : (
                                <div className="text-slate-300 font-mono text-xs">Feature Visual: {feature.badge}</div>
                            )}
                         </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

// Visual Placeholders for other sections
const MiniCRMVisual = () => (
    <div className="relative w-full h-full bg-white flex">
        <div className="w-1/3 border-r border-slate-100 bg-slate-50"></div>
        <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="h-4 w-24 bg-slate-800 rounded"></div>
                <div className="h-4 w-4 bg-brand-blue rounded-full"></div>
            </div>
            <div className="space-y-4">
                <div className="h-20 border border-slate-200 rounded bg-slate-50"></div>
                <div className="h-8 bg-brand-blue text-white text-xs font-bold flex items-center justify-center rounded-btn">Update Stage</div>
            </div>
        </div>
    </div>
);

const RevenueVisual = () => (
    <div className="w-full max-w-sm bg-white rounded-card shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-10 border-b border-slate-100 flex items-center px-4 bg-slate-50">
            <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
            <span className="ml-2 text-xs font-bold text-slate-500">Revenue Inbox</span>
        </div>
        <div className="p-2 space-y-2">
            {[1,2,3].map(i => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                     <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                     <div className="flex-1">
                         <div className="h-2 w-20 bg-slate-800 rounded mb-1"></div>
                         <div className="h-1.5 w-12 bg-brand-blue/40 rounded"></div>
                     </div>
                </div>
            ))}
        </div>
    </div>
);

const CopilotVisual = () => (
    <div className="relative w-full h-full p-8 flex items-center justify-center">
        <div className="absolute inset-0 grid-bg opacity-50"></div>
        {/* Split View: Chat Assistant vs Admin Dashboard */}
        <div className="w-full max-w-sm flex gap-4">
            
            {/* Left: Rep Assistant */}
            <div className="flex-1 bg-white rounded-card shadow-overlay border border-slate-200 p-3 relative z-10">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-100 pb-2">
                    <Bot size={14} className="text-brand-blue" />
                    <span className="text-[10px] font-bold text-slate-700">Rep Assistant</span>
                </div>
                <div className="space-y-2">
                    <div className="bg-slate-50 p-2 rounded text-[10px] text-slate-600">
                        "Drafted reply for John. Reminder set for Tuesday."
                    </div>
                    <div className="h-6 w-full bg-brand-blue rounded flex items-center justify-center text-[10px] text-white font-bold">
                        Approve Reply
                    </div>
                </div>
            </div>

            {/* Right: Revenue Ops Dashboard */}
             <div className="flex-1 bg-brand-ink rounded-card shadow-overlay border border-slate-700 p-3 relative z-10 mt-8">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                    <BarChart3 size={14} className="text-brand-green" />
                    <span className="text-[10px] font-bold text-white">RevOps Intel</span>
                </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[8px] text-slate-400">
                        <span>Response Time</span>
                        <span className="text-brand-green">↓ 12%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full">
                        <div className="w-3/4 bg-brand-green h-1 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-400 mt-2">
                        <span>Deal Velocity</span>
                        <span className="text-brand-green">↑ 8%</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
);


export const Features: React.FC = () => {
    const featuresList: Feature[] = [
        {
            id: 'capture',
            badge: 'Conversation Capture',
            headline: 'Every message. Automatically in your CRM.',
            description: 'Stop asking reps to forward conversations. Eazybe captures every WhatsApp message and syncs it to HubSpot, Salesforce, Zoho, in-house CRMs and many more—in real-time.',
            points: [
                'Real-time sync — Messages appear in CRM within seconds',
                'Full context — Attachments, voice notes, and media included',
                'Cloud backup — Never lose data when devices change or reps leave',
                'Personal numbers — Track conversations from personal WhatsApp too'
            ],
            cta: 'See how sync works',
            imageComponent: <CaptureVisual />,
            alignRight: false
        },
        {
            id: 'mini-crm',
            badge: 'Mini CRM View',
            headline: 'Your CRM, inside WhatsApp',
            description: 'Stop switching tabs. Mini CRM View puts contact history, deal info, and quick actions right inside WhatsApp Web. See everything about a contact while you chat.',
            points: [
                'Full contact and deal history at a glance',
                'Update stages with one click',
                'Add notes without leaving WhatsApp'
            ],
            cta: 'See Mini CRM View',
            imageComponent: <MiniCRMVisual />,
            alignRight: true
        },
        {
            id: 'workflow',
            badge: 'Workflow Automations',
            headline: 'Automate what happens after the conversation',
            description: 'Once messages sync, trigger actions automatically. Route leads. Create deals. Send follow-ups. Build fully functional chatbots using CRM workflows—no code required.',
            points: [
                'Trigger CRM workflows from WhatsApp events',
                'Auto-create contacts, deals, and tasks',
                'Build chatbots that pull and push CRM data',
                'Schedule follow-ups based on response patterns'
            ],
            cta: 'Explore automations',
            alignRight: false
        },
        {
            id: 'revenue-inbox',
            badge: 'Revenue Inbox',
            headline: 'Unreplied. Hot. Stalled. Ghosted. All in one view.',
            description: 'Revenue Inbox filters your WhatsApp conversations by what matters—combining chat signals with CRM data. See unreplied chats. Spot hot deals asking for pricing. Catch escalations before they blow up. Find ghosted clients before they churn.',
            points: [
                'Unreplied chats — See who\'s waiting, sorted by wait time',
                'Hot deals — Leads showing buying signals (pricing, demo, contract mentions)',
                'Escalation alerts — Frustrated clients flagged before they escalate',
                'Ghosted & stalled — Clients who stopped responding, deals going cold'
            ],
            cta: 'Explore Revenue Inbox',
            imageComponent: <RevenueVisual />,
            alignRight: true
        },
        {
            id: 'rep-radar',
            badge: 'Rep Radar',
            headline: 'Know who\'s following up. Who\'s not.',
            description: 'See response times, follow-up rates, and unreplied chat counts across your team. Identify who needs coaching before deals are lost.',
            points: [
                'Average response time by rep',
                'Unreplied conversation count',
                'Team benchmarks and rankings',
                'Trend tracking over time'
            ],
            cta: 'See analytics',
            alignRight: false
        },
        {
            id: 'whatsapp-copilot',
            badge: 'WhatsApp Copilot',
            headline: 'AI Agents for Sales, Support & Revenue Ops',
            description: 'A complete AI workforce for your revenue team. The Rep Assistant lives in WhatsApp to handle follow-ups and data entry. The Revenue Operations Agent analyzes deal health and team performance for leadership.',
            points: [
                'Rep Assistant — Lives in WhatsApp, drafts replies, and nudges reps',
                'Instant CRM Updates — Update HubSpot/Salesforce deals via chat',
                'Revenue Ops Agent — Provides managers with deal intelligence',
                'Admin Dashboards — Chat with AI to build reports and analyze trends'
            ],
            cta: 'Explore WhatsApp Copilot',
            imageComponent: <CopilotVisual />,
            alignRight: true
        }
    ];

    return (
        <div id="features">
            {featuresList.map((feature, index) => (
                <FeatureBlock key={feature.id} feature={feature} index={index} />
            ))}
        </div>
    );
};