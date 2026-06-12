import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Twitter, Instagram, Youtube, ArrowRight, Gamepad2,
  Ghost, Wind, CircleDot, Waves, Baby, Heart,
  Droplets, Star, Moon, Cloud, Briefcase, Building2,
} from 'lucide-react';
import { config } from '@/data/ghoul.config';
import GooGooParticles from '@/components/GooGooParticles';
import EcosystemMap from '@/components/EcosystemMap';
import MarketStats from '@/components/MarketStats';
import IPBadge from '@/components/IPBadge';
import RoadmapTimeline from '@/components/RoadmapTimeline';
import InvestorCTA from '@/components/InvestorCTA';

gsap.registerPlugin(ScrollTrigger);

const GHOULVERSE_LINK = config.crossLinks.find((g) => g.id === 'ghoulverse');
const OTHER_GHOULS = config.crossLinks.filter((g) => g.id !== 'ghoulverse');

const PRODUCT_ICONS = [Droplets, Heart, Baby, Star, Moon, Cloud, Wind, CircleDot, Waves];
const TABS = [
  { key: 'core' as const, label: 'Core' },
  { key: 'pro' as const, label: 'Pro' },
  { key: 'tool' as const, label: 'Tools' },
  { key: 'refill' as const, label: 'Refills' },
  { key: 'limited' as const, label: 'Limited' },
];

function FloatingOrb({ delay, size, color, className }: { delay: number; size: number; color: string; className?: string }) {
  return (
    <div className={`absolute rounded-full pointer-events-none blur-3xl opacity-[0.08] ${className || ''}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        animation: `float-orb 12s ease-in-out infinite ${delay}s`,
      }} />
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'core' | 'pro' | 'tool' | 'refill' | 'limited'>('core');
  const heroRef = useRef<HTMLDivElement>(null);
  const gentleRef = useRef<HTMLDivElement>(null);
  const scienceRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const collectiveRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const ipRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        opacity: 0,
        y: 30,
        duration: 2,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 0.5,
      });

      gsap.to('.breathe', {
        scale: 1.03,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.utils.toArray('.orb-drift').forEach((orb: any, i: number) => {
        gsap.to(orb, {
          y: i % 2 === 0 ? -40 : 40,
          x: i % 3 === 0 ? 20 : -20,
          duration: 10 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      [gentleRef, scienceRef, productRef, collectiveRef, gameRef, portfolioRef, ctaRef, ecosystemRef, marketRef, ipRef, roadmapRef].forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current.querySelectorAll('.reveal'), {
            opacity: 0,
            y: 30,
            duration: 1.5,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const filtered = config.products.filter((p) => p.category === activeTab);

  return (
    <div className="relative font-sans min-h-screen overflow-x-hidden" style={{ background: '#f0f7ff' }}>
      {/* Floating orbs background */}
      <FloatingOrb delay={0} size={500} color="#3b82f6" className="-top-32 -left-32" />
      <FloatingOrb delay={3} size={400} color="#93c5fd" className="top-1/3 -right-24" />
      <FloatingOrb delay={6} size={350} color="#bfdbfe" className="bottom-0 left-1/3" />
      <FloatingOrb delay={2} size={300} color="#dbeafe" className="top-1/2 left-1/2" />

      <GooGooParticles />

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-8 md:px-16"
        style={{ background: 'rgba(240,247,255,0.7)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/ghoul_logo.png" alt={config.name} className="w-10 h-10 object-contain" draggable={false} />
            <span className="font-goo text-sm tracking-[0.3em] text-[#3b82f6]">{config.name}</span>
          </div>
          <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
            className="text-[10px] tracking-[0.3em] uppercase text-[#64748b] hover:text-[#3b82f6] transition-colors">
            GHOULVERSE
          </a>
          <a href="#ecosystem" className="hidden md:flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#94a3b8] hover:text-[#3b82f6] transition-colors">
            <Briefcase className="w-3 h-3" /> Investors
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-8 text-center">
        <div className="hero-fade mb-8 flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[9px] tracking-[0.3em] uppercase text-[#3b82f6]/70"
            style={{ background: 'rgba(59,130,246,0.06)', borderRadius: '9999px', border: '1px solid rgba(59,130,246,0.1)' }}>
            <Building2 className="w-3 h-3" /> House of GHOUL
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/60">The Nursery</span>
        </div>

        <h1 className="hero-fade font-goo leading-[0.9] mb-10">
          <span className="block text-[18vw] md:text-[12rem] text-[#3b82f6]/90">Goo</span>
          <span className="block text-[18vw] md:text-[12rem] text-[#93c5fd]/80 -mt-4 md:-mt-8">Goo</span>
        </h1>

        <p className="hero-fade text-[#64748b]/70 text-base md:text-lg max-w-sm mb-12 leading-relaxed font-light">
          Tiny messes, big solutions. Gentle precision for the smallest humans and their biggest disasters.
        </p>

        <div className="hero-fade">
          <a href="#nursery" className="group inline-flex items-center gap-3 px-8 py-4 font-goo text-sm tracking-wider text-[#3b82f6] transition-all hover:scale-105"
            style={{ border: '1px solid rgba(59,130,246,0.3)', borderRadius: '9999px' }}>
            Enter The Nursery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="mt-12 w-64 h-64 mx-auto">
          <img src="/ghoul_mascot.png" alt="GooGoo mascot" className="w-full h-full object-contain" draggable={false} style={{ animation: 'ghost-bob 2.5s ease-in-out infinite, ghost-sway 3.5s ease-in-out infinite' }} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 mx-auto" style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.3), transparent)' }} />
        </div>
      </section>

      {/* ===== GENTLE STATS ===== */}
      <section ref={gentleRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal mb-16">
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-6 leading-tight">
              Tiny messes, big cuddles.<br />
              <span className="text-[#3b82f6]">Gentle as a lullaby.</span>
            </h2>
            <p className="text-[#64748b]/70 text-base max-w-md mx-auto leading-relaxed font-light">
              Spilled milk, nappy surprises, and that mysterious spot on the onesie. No harsh chemicals, no scary smells — just soft bubbles, quiet clean-ups, and happy little sighs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Baby, value: '0+', label: 'Months Welcome', color: '#3b82f6' },
              { icon: Heart, value: '5.5', label: 'pH Balanced', color: '#93c5fd' },
              { icon: Cloud, value: '100%', label: 'Gentle Promise', color: '#3b82f6' },
              { icon: Building2, value: '12', label: 'House of GHOUL', color: '#3b82f6' },
            ].map((stat, i) => (
              <div key={i} className="reveal breathe p-10 text-center cloud-card transition-all duration-700 hover:scale-[1.04]"
                style={{ borderRadius: '50%', aspectRatio: '1 / 1.1', animationDelay: `${i * 0.4}s` }}>
                <stat.icon className="w-6 h-6 mx-auto mb-4" style={{ color: stat.color, opacity: 0.7 }} />
                <div className="font-goo text-3xl text-[#1e293b] mb-2">{stat.value}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#64748b]/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ECOSYSTEM ===== */}
      <section ref={ecosystemRef} id="ecosystem" className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">The Ecosystem</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">House of GHOUL</h2>
            <p className="font-goo text-lg text-[#3b82f6]/80">Twelve brands. One universe. Infinite potential.</p>
          </div>
          <div className="reveal">
            <EcosystemMap />
          </div>
        </div>
      </section>

      {/* ===== SCIENCE ===== */}
      <section ref={scienceRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">Proprietary Technology</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">The Science</h2>
            <p className="font-goo text-lg text-[#3b82f6]/80">{config.science.subtitle}</p>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-10" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '32px' }}>
              <p className="text-[#64748b]/80 leading-relaxed font-light">{config.science.description}</p>
            </div>
            <div className="p-10" style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '32px' }}>
              <p className="text-[#64748b]/60 leading-relaxed text-sm font-light">{config.science.adaptation}</p>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.science.stats.map((stat, i) => (
              <div key={i} className="p-8 text-center" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '24px' }}>
                <div className="font-goo text-2xl text-[#3b82f6] mb-1">{stat.value}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#64748b]/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IP ===== */}
      <section ref={ipRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">Intellectual Property</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">Protected Assets</h2>
            <p className="text-[#64748b]/60 max-w-sm mx-auto font-light">Trademarked. Registered. Defensible.</p>
          </div>
          <div className="reveal">
            <IPBadge />
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section ref={productRef} id="nursery" className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">Gentle Essentials</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">The Nursery</h2>
            <p className="text-[#64748b]/60 max-w-sm mx-auto font-light">Nine gentle essentials for the tiniest humans and their biggest adventures.</p>
          </div>

          {/* Tabs */}
          <div className="reveal flex flex-wrap justify-center gap-3 mb-16">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              const count = config.products.filter((p) => p.category === tab.key).length;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className="px-6 py-2.5 text-xs tracking-wider transition-all min-h-11"
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #3b82f6, #93c5fd)' : 'rgba(255,255,255,0.4)',
                    color: isActive ? '#fff' : '#64748b',
                    borderRadius: '9999px',
                    boxShadow: isActive ? '0 8px 25px rgba(59,130,246,0.2)' : 'none',
                  }}>
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Product Grid — Cloud soft cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, i) => {
              const Icon = PRODUCT_ICONS[i % PRODUCT_ICONS.length];
              const colors = ['#3b82f6', '#93c5fd', '#bfdbfe'];
              const color = colors[i % colors.length];

              return (
                <div key={i} className="reveal orb-drift group p-10 text-center cloud-card"
                  style={{ borderColor: `${color}30`, boxShadow: `0 8px 40px ${color}10` }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; e.currentTarget.style.boxShadow = `0 20px 60px ${color}20`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = `0 8px 40px ${color}10`; }}>

                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${color}12`, border: `2px solid ${color}20` }}>
                    <Icon className="w-6 h-6" style={{ color, opacity: 0.8 }} />
                  </div>

                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#64748b]/40 block mb-3">{product.category}</span>

                  <h3 className="font-goo text-lg text-[#1e293b] mb-2 break-words">{product.name}</h3>
                  <p className="text-[#3b82f6]/70 text-xs mb-3">{product.tagline}</p>
                  <p className="text-[#64748b]/50 text-xs leading-relaxed mb-4 font-light">{product.description}</p>

                  {product.heroIngredient && (
                    <div className="mb-3">
                      <span className="text-[9px] tracking-wider uppercase text-[#64748b]/30">Powered by </span>
                      <span className="text-[10px] font-medium" style={{ color }}>{product.heroIngredient}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 pt-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#64748b]/30">{product.volume}</span>
                    <span className="font-goo text-sm" style={{ color }}>{product.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== MARKET ===== */}
      <section ref={marketRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">Market Opportunity</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">The Numbers</h2>
            <p className="text-[#64748b]/60 max-w-sm mx-auto font-light">Baby care meets gaming. A $300B+ intersection.</p>
          </div>
          <div className="reveal">
            <MarketStats />
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section ref={roadmapRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">The Road Ahead</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">Roadmap</h2>
            <p className="text-[#64748b]/60 max-w-sm mx-auto font-light">From idea to empire. Milestone by milestone.</p>
          </div>
          <div className="reveal">
            <RoadmapTimeline />
          </div>
        </div>
      </section>

      {/* ===== COLLECTIVE (LINEUP) ===== */}
      <section ref={collectiveRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#93c5fd]/50 mb-4 block">The Collective</span>
            <h2 className="font-goo text-4xl md:text-5xl text-[#1e293b] mb-3">The Ghoulverse</h2>
            <p className="text-[#64748b]/60 max-w-sm mx-auto font-light">Twelve spirits. One universe. Find your path.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {OTHER_GHOULS.map((g) => (
              <a key={g.id}
                href={g.live ? g.domain : `https://www.ghoulverse.com/ghouls/${g.id}/`}
                target="_blank" rel="noopener noreferrer"
                className="reveal group flex flex-col items-center p-6 transition-all duration-700 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', width: '120px', height: '120px' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px ${g.color}10`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="text-3xl mb-2">{g.icon}</div>
                <h3 className="font-goo text-[10px] text-[#1e293b] tracking-wider">{g.name}</h3>
                {!g.live && <span className="text-[8px] text-[#64748b]/20 mt-0.5">TBA</span>}
              </a>
            ))}
          </div>

          <div className="reveal text-center">
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 font-goo text-sm tracking-wider text-[#3b82f6] transition-all hover:scale-105"
              style={{ border: '1px solid rgba(59,130,246,0.3)', borderRadius: '9999px' }}>
              Enter the GHOULVERSE <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== GAME ===== */}
      <section ref={gameRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="reveal p-12 md:p-20 text-center"
            style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '50%', aspectRatio: '1' }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full opacity-[0.03] blur-3xl" style={{ background: '#3b82f6' }} />
            </div>
            <Gamepad2 className="w-10 h-10 text-[#3b82f6]/60 mx-auto mb-6" />
            <h2 className="font-goo text-3xl md:text-4xl text-[#1e293b] mb-4">Dreamy GHOULVERSE</h2>
            <p className="text-[#64748b]/60 max-w-sm mx-auto mb-8 font-light">Float through the softest universe ever. Collect sleepy stars and cuddle all 12 ghouls.</p>
            <a href={config.gameUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-goo text-sm tracking-wider text-[#3b82f6] transition-all hover:scale-105"
              style={{ border: '1px solid rgba(59,130,246,0.3)', borderRadius: '9999px' }}>
              <Gamepad2 className="w-4 h-4" /> Play Now
            </a>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section ref={portfolioRef} className="relative py-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#64748b]/30 mb-2 block">The House of GHOUL</span>
            <h3 className="font-goo text-2xl text-[#1e293b]">The Portfolio</h3>
          </div>
          <div className="reveal flex flex-wrap justify-center gap-4">
            {config.crossLinks.map((g) => {
              const isActive = g.id === config.id;
              return (
                <a key={g.id}
                  href={g.live ? g.domain : `https://www.ghoulverse.com/ghouls/${g.id}/`}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 transition-all duration-500"
                  style={{
                    background: isActive ? `${g.color}08` : 'rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '90px',
                    height: '90px',
                    border: isActive ? `1px solid ${g.color}30` : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = `${g.color}20`; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = 'transparent'; }}>
                  <div className="text-xl group-hover:scale-110 transition-transform">{g.icon}</div>
                  <p className="text-[8px] tracking-wider uppercase text-[#1e293b] mt-1">{g.name.replace(' GHOUL', '').replace('GOO GOO', 'GOO GOO')}</p>
                  {isActive && <span className="text-[7px] mt-0.5" style={{ color: g.color }}>{config.products.length} Products</span>}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== INVESTOR CTA ===== */}
      <section className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal">
            <InvestorCTA />
          </div>
        </div>
      </section>

      {/* ===== CTA / FOOTER ===== */}
      <section ref={ctaRef} className="relative py-32 md:py-48 px-8 md:px-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="reveal mb-10">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#3b82f6]/50 mb-4 block">Stay in the Loop</span>
            <h2 className="font-goo text-4xl text-[#1e293b] mb-4">{config.cta.headline}</h2>
            <p className="text-[#64748b]/60 font-light">{config.cta.subheadline}</p>
          </div>

          <div className="reveal flex flex-col sm:flex-row gap-3 mb-16">
            <input type="email" placeholder={config.cta.placeholderText}
              className="flex-1 px-6 py-4 text-sm text-[#1e293b] placeholder:text-[#64748b]/25 outline-none bg-transparent font-light"
              style={{ border: '1px solid rgba(59,130,246,0.15)', borderRadius: '9999px' }} />
            <button className="px-8 py-4 font-goo text-sm tracking-wider text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #93c5fd)', borderRadius: '9999px', boxShadow: '0 8px 25px rgba(59,130,246,0.2)' }}>
              {config.cta.buttonText}
            </button>
          </div>

          <div className="reveal flex items-center justify-center gap-4 mb-10">
            {[Twitter, Instagram, Youtube].map((Icon, i) => {
              const colors = ['#3b82f6', '#93c5fd', '#3b82f6'];
              return (
                <div title="Coming soon" key={i} className="w-11 h-11 flex items-center justify-center transition-all hover:scale-110"
                  style={{ borderRadius: '50%', border: `1px solid ${colors[i]}15`, background: 'rgba(255,255,255,0.4)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${colors[i]}30`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${colors[i]}15`; }}>
                  <Icon className="w-4 h-4" style={{ color: colors[i], opacity: 0.6 }} />
                </div>
              );
            })}
          </div>

          <div className="reveal mb-8 flex items-center justify-center gap-4 text-xs font-light">
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer"
              className="text-[#64748b]/50 hover:text-[#3b82f6] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Ghost className="w-3 h-3" /> Explore GHOULVERSE
            </a>
            <span className="text-[#64748b]/10">|</span>
            <a href={config.gameUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#64748b]/50 hover:text-[#93c5fd] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Gamepad2 className="w-3 h-3" /> Play GHOULVERSE
            </a>
            <span className="text-[#64748b]/10">|</span>
            <a href="#ecosystem"
              className="text-[#64748b]/50 hover:text-[#f59e0b] transition-colors flex items-center gap-1 py-2 px-3 min-h-11">
              <Briefcase className="w-3 h-3" /> Investors
            </a>
          </div>

          <div className="reveal mb-4 flex items-center justify-center gap-3 text-[10px] tracking-wider uppercase text-[#78716c]/30">
            <a href="/privacy.html" className="hover:text-[#3b82f6] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="/terms.html" className="hover:text-[#3b82f6] transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="/cookies.html" className="hover:text-[#3b82f6] transition-colors">Cookie Policy</a>
          </div>

          <p className="reveal text-[#64748b]/15 text-xs tracking-wider font-light">
            &copy; 2025 <span className="font-goo text-[#3b82f6]/30">{config.name}</span> — Part of the{' '}
            <a href={GHOULVERSE_LINK?.domain || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-[#3b82f6] transition-colors">GHOULVERSE</a>
          </p>
        </div>
      </section>
    </div>
  );
}
