import { useState, useEffect, useRef, useCallback } from 'react';
import { Scale, ChevronDown, ExternalLink, Volume2, VolumeX } from 'lucide-react';

/* ───────────────────────────────────────────
   CORTE — Modern Elite / Luxury Aesthetic
   Epstein Case · PAVIMUN Judicial Committee
   ─────────────────────────────────────────── */

// ═══ INTRO: Silhouette → Door → TV-Off ═══
const IntroScreen = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);
  // 0: dark, 1: door light, 2: silhouette visible, 3: name reveal, 4: TV static, 5: TV off (shrink line), 6: done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),    // Door light appears
      setTimeout(() => setPhase(2), 1800),   // Silhouette walks in
      setTimeout(() => setPhase(3), 3200),   // Name appears
      setTimeout(() => setPhase(4), 4500),   // TV static flash
      setTimeout(() => setPhase(5), 4900),   // TV shrink to line
      setTimeout(() => setPhase(6), 5600),   // Line disappears
      setTimeout(onDone, 6000),              // Done
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
      {/* CRT scanlines overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* TV CONTENT AREA — everything inside the "screen" */}
      <div className={`relative w-full h-full flex items-center justify-center transition-all ${phase >= 5 ? 'scale-x-100 scale-y-0 opacity-100' : ''
        } ${phase >= 6 ? 'scale-x-0 opacity-0' : ''}`}
        style={{
          transition: phase >= 5 ? 'transform 0.5s cubic-bezier(0.7,0,1,1), opacity 0.3s ease 0.4s' : 'none',
          transform: phase >= 5
            ? phase >= 6 ? 'scaleX(0) scaleY(0)' : 'scaleX(1) scaleY(0.005)'
            : 'scaleX(1) scaleY(1)',
        }}
      >
        {/* Door light glow */}
        <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 w-[200px] h-[80%] transition-all duration-[1500ms] ease-out ${phase >= 1 ? 'opacity-100' : 'opacity-0'
          }`}>
          {/* Door frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-100/5 via-amber-50/15 to-amber-100/5 blur-[2px]" />
          {/* Bright center slit */}
          <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-white/20 blur-[8px] transition-all duration-[1200ms] ${phase >= 1 ? 'w-[60px] opacity-100' : 'w-0 opacity-0'
            }`} />
          {/* Floor light spill */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-amber-200/10 blur-[40px] rounded-full transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'
            }`} />
        </div>

        {/* Silhouette */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
          }`}>
          {/* Human silhouette using CSS */}
          <div className="relative w-32 h-64 mb-8">
            {/* Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-black border-2 border-white/5 shadow-[0_0_40px_rgba(200,170,100,0.15)]" />
            {/* Body */}
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-24 h-32 bg-black rounded-t-xl border-x-2 border-t-2 border-white/5" />
            {/* Legs */}
            <div className="absolute top-44 left-[22px] w-10 h-20 bg-black border-l-2 border-white/5 rounded-bl-lg" />
            <div className="absolute top-44 right-[22px] w-10 h-20 bg-black border-r-2 border-white/5 rounded-br-lg" />
            {/* Ambient glow behind */}
            <div className="absolute inset-0 -z-10 bg-amber-200/5 blur-[30px] scale-150" />
          </div>

          {/* Name reveal */}
          <div className={`text-center transition-all duration-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            <p className="text-[10px] tracking-[0.6em] text-white/20 uppercase mb-2">Case File</p>
            <p className="text-3xl md:text-5xl font-extralight tracking-wide text-white/90">
              Jeffrey Epstein
            </p>
            <div className="w-16 h-[1px] bg-amber-400/40 mx-auto mt-4" />
          </div>
        </div>

        {/* TV static flash (phase 4) */}
        {phase === 4 && (
          <div className="absolute inset-0 z-30 animate-pulse">
            <div className="w-full h-full opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }} />
          </div>
        )}
      </div>

      {/* White horizontal line (TV shutoff) visible during phase 5 */}
      {phase >= 5 && phase < 6 && (
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.6)] z-50 animate-pulse" />
      )}
    </div>
  );
};

// ═══ MAIN COMPONENT ═══
const Corte = () => {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDone = useCallback(() => setLoading(false), []);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for scroll reveals
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(e.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Audio fade-in
  useEffect(() => {
    if (loading) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.play().then(() => {
      let v = 0;
      const fade = setInterval(() => {
        v += 0.006;
        if (v >= 0.2) { v = 0.2; clearInterval(fade); }
        audio.volume = v;
      }, 80);
    }).catch(() => { });
  }, [loading]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  if (loading) return <IntroScreen onDone={handleDone} />;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-amber-500/30">

      <audio ref={audioRef} loop><source src="/videos/epsteinsong.mp3" type="audio/mpeg" /></audio>

      {/* ── VIDEO BACKGROUND (VISIBLE) ── */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ transform: `scale(${1 + scrollY * 0.00015})` }}
        >
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      </div>

      {/* ── AUDIO TOGGLE ── */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(200,170,100,0.15)]"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4 text-amber-400/60" />
            <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-light">Case 19-CR-490</span>
          </div>
          <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-light">PAVIMUN · Judicial Committee</span>
        </div>

        <div className="text-center max-w-5xl">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12" />

          <p className="text-amber-400/60 text-xs md:text-sm tracking-[0.5em] uppercase mb-8 font-light animate-pulse">
            The United States of America
          </p>

          <h1 className="text-7xl md:text-[11rem] font-extralight tracking-[-0.04em] leading-[0.85] mb-4 text-white/90 drop-shadow-[0_0_80px_rgba(200,170,100,0.1)]">
            Epstein
          </h1>

          <div className="flex items-center justify-center gap-8 my-8">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-amber-400/80 text-xl font-light italic">vs</span>
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
          </div>

          <h2 className="text-4xl md:text-7xl font-extralight tracking-[0.15em] text-white/50 uppercase">
            The People
          </h2>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-12" />
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
          <span className="text-[9px] tracking-[0.4em] uppercase font-light">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ═══════════ CASE OVERVIEW ═══════════ */}
      <section id="overview" data-reveal className={`relative z-10 py-32 px-6 transition-all duration-[1.2s] ${isVisible('overview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-[2rem] p-10 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.5)] hover:border-amber-400/10 transition-colors duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-400/40 font-light">Classified</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-light">Case Summary</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl font-extralight leading-[2] text-white/60">
              This judicial committee addresses the case against <span className="text-white font-normal border-b border-amber-400/30">Jeffrey Epstein</span> —
              centered on charges of <span className="text-amber-300/80 font-normal">sex trafficking</span>,
              <span className="text-amber-300/80 font-normal"> money laundering</span>, and a network of influence
              reaching the <span className="text-white font-normal">highest echelons of global power</span>.
              Delegates must unravel the web of complicity that protected one of the most
              <span className="text-amber-300/80 font-normal"> dangerous predators</span> of the modern era.
            </p>

            <div className="mt-14 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Venue', value: 'SDNY' },
                { label: 'Status', value: 'Active' },
                { label: 'Charges', value: '6 Counts' },
                { label: 'Classification', value: 'Sealed' },
              ].map((s, i) => (
                <div key={i} className="group cursor-default">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/30 mb-2 font-light group-hover:text-amber-400/60 transition-colors">{s.label}</p>
                  <p className="text-xl font-extralight text-white/70 group-hover:text-white transition-colors">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ KEY FIGURES — 3 images ═══════════ */}
      <section id="figures" data-reveal className={`relative z-10 py-24 px-6 transition-all duration-[1.2s] delay-100 ${isVisible('figures') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Visual Evidence</p>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">Key Figures</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Figure 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl hover:border-amber-400/20 transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="/images/donald.jpg" alt="Connected Figure" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.2s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-400/50 mb-2 font-light">Exhibit A</p>
                <h4 className="text-lg font-light text-white/90">The Connection</h4>
                <div className="w-0 group-hover:w-full h-[1px] bg-amber-400/40 mt-3 transition-all duration-700" />
              </div>
            </div>

            {/* Figure 2 — Winni Poh (Epstein special) */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl hover:border-amber-400/20 transition-all duration-500 md:scale-105 md:z-10">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="/images/winni-poh.webp" alt="Evidence" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.2s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-400/50 mb-2 font-light">Exhibit B</p>
                <h4 className="text-lg font-light text-white/90">The Untold Story</h4>
                <div className="w-0 group-hover:w-full h-[1px] bg-amber-400/40 mt-3 transition-all duration-700" />
              </div>
            </div>

            {/* Figure 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl hover:border-amber-400/20 transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="/images/donald2.jpg" alt="Inner Circle" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.2s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-400/50 mb-2 font-light">Exhibit C</p>
                <h4 className="text-lg font-light text-white/90">The Inner Circle</h4>
                <div className="w-0 group-hover:w-full h-[1px] bg-amber-400/40 mt-3 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CHARGES ═══════════ */}
      <section id="charges" data-reveal className={`relative z-10 py-24 px-6 transition-all duration-[1.2s] delay-200 ${isVisible('charges') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Federal Indictment</p>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">The Charges</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.04] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
            {[
              { num: '01', title: 'Sex Trafficking', code: '18 U.S.C. § 1591', desc: 'Recruiting and trafficking minors for sexual exploitation' },
              { num: '02', title: 'Conspiracy', code: '18 U.S.C. § 371', desc: 'Coordinated criminal enterprise across state lines' },
              { num: '03', title: 'Money Laundering', code: '18 U.S.C. § 1956', desc: 'Concealing illicit funds through shell companies' },
              { num: '04', title: 'Obstruction', code: '18 U.S.C. § 1512', desc: 'Tampering with witnesses and destroying evidence' },
            ].map((charge, i) => (
              <div key={i} className="bg-black/70 backdrop-blur-2xl p-8 md:p-10 group hover:bg-white/[0.04] transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-extralight text-amber-400/15 group-hover:text-amber-400/40 transition-colors duration-500">{charge.num}</span>
                  <span className="text-[8px] tracking-widest text-white/15 border border-white/10 px-3 py-1 rounded-full group-hover:text-white/30 group-hover:border-amber-400/20 transition-all">{charge.code}</span>
                </div>
                <h4 className="text-2xl font-light text-white/80 group-hover:text-white transition-colors mb-2">{charge.title}</h4>
                <p className="text-sm font-light text-white/25 group-hover:text-white/50 transition-colors">{charge.desc}</p>
                <div className="w-0 group-hover:w-16 h-[2px] bg-amber-400/50 mt-6 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ QUOTE ═══════════ */}
      <section id="quote" data-reveal className={`relative z-10 py-32 px-6 transition-all duration-[1.5s] ${isVisible('quote') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-7xl text-amber-400/15 mb-4 font-serif leading-none">"</div>
          <blockquote className="text-2xl md:text-4xl font-extralight leading-[1.6] text-white/50 italic mb-8">
            The challenge is not merely legal — it is moral. Can the system truly prosecute
            those who built it?
          </blockquote>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />
        </div>
      </section>

      {/* ═══════════ COMMITTEE INFO ═══════════ */}
      <section id="committee" data-reveal className={`relative z-10 py-24 px-6 transition-all duration-[1.2s] ${isVisible('committee') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-[2rem] p-10 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.5)] hover:border-amber-400/10 transition-colors duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center">
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/50 font-light">Judicial Committee</p>
            </div>

            <h3 className="text-3xl font-extralight text-white/90 mb-6">About This Committee</h3>
            <p className="text-lg font-extralight leading-[1.9] text-white/45 mb-10">
              This committee simulates a real trial where delegates serve as prosecutors,
              defense attorneys, judges, and jury members. Prior preparation and deep knowledge
              of the U.S. legal system is mandatory. The fate of the case rests in your hands.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Prosecutor', 'Defense', 'Judge', 'Jury'].map((role, i) => (
                <div key={i} className="text-center py-5 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-300 cursor-default group">
                  <span className="text-sm font-light text-amber-400/50 group-hover:text-amber-400/80 transition-colors">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ RESOURCES ═══════════ */}
      <section id="resources" data-reveal className={`relative z-10 py-24 px-6 mb-12 transition-all duration-[1.2s] ${isVisible('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Access</p>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">Materials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
              target="_blank"
              className="group flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/40 mb-2 font-light">Download</p>
                <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors">Academic Guide</h4>
              </div>
              <ExternalLink className="w-5 h-5 text-white/15 group-hover:text-amber-400/60 transition-colors" />
            </a>

            <a
              href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
              target="_blank"
              className="group flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/40 mb-2 font-light">Download</p>
                <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors">Rules of Procedure</h4>
              </div>
              <ExternalLink className="w-5 h-5 text-white/15 group-hover:text-amber-400/60 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <div className="relative z-10 text-center pb-16 opacity-15">
        <div className="w-8 h-[1px] bg-amber-400/30 mx-auto mb-6" />
        <p className="text-[8px] tracking-[0.6em] uppercase font-light">
          United States District Court · Southern District of New York
        </p>
      </div>
    </div>
  );
};

export default Corte;
