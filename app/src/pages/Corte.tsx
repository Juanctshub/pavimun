import { useState, useEffect, useRef } from 'react';
import { Scale, ChevronDown, ExternalLink, Volume2, VolumeX } from 'lucide-react';

/* ───────────────────────────────────────────
   CORTE — Modern Elite / Luxury Aesthetic
   ─────────────────────────────────────────── */

// Loading screen
const IntroScreen = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => setFadeOut(true), 400); setTimeout(onDone, 1200); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Logo */}
      <img src="/images/corte-logo.png" alt="Court" className="w-28 h-28 object-contain mb-10 opacity-80 invert brightness-200" />

      <p className="text-[10px] tracking-[0.6em] text-white/30 uppercase mb-6 font-light">
        Southern District Court of New York
      </p>

      {/* Progress line */}
      <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-200 origin-left" style={{ transform: `scaleX(${progress / 100})`, transition: 'transform 0.1s linear' }} />
      </div>

      <p className="text-white/20 text-[10px] mt-4 tracking-widest">{progress}%</p>
    </div>
  );
};

// Main component
const Corte = () => {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll tracking for parallax
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Audio fade-in after loading
  useEffect(() => {
    if (loading) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;
    audio.play().then(() => {
      let v = 0;
      const fade = setInterval(() => {
        v += 0.008;
        if (v >= 0.25) { v = 0.25; clearInterval(fade); }
        audio.volume = v;
      }, 60);
    }).catch(() => { });
  }, [loading]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  if (loading) return <IntroScreen onDone={() => setLoading(false)} />;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-amber-500/30">

      {/* ── AUDIO ── */}
      <audio ref={audioRef} loop><source src="/videos/epsteinsong.mp3" type="audio/mpeg" /></audio>

      {/* ── FULL-SCREEN VIDEO BACKGROUND ── */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
        >
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        {/* Subtle darken — keeps video VISIBLE */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      {/* ── AUDIO TOGGLE ── */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all hover:scale-110"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4 text-amber-400/60" />
            <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-light">Case 19-CR-490</span>
          </div>
          <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-light">PAVIMUN · Judicial Committee</span>
        </div>

        <div className="text-center max-w-5xl">
          {/* Gold line accent */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-10" />

          <p className="text-amber-400/70 text-xs md:text-sm tracking-[0.5em] uppercase mb-6 font-light">
            The United States of America
          </p>

          <h1 className="text-7xl md:text-[10rem] font-extralight tracking-[-0.04em] leading-[0.85] mb-4 text-white/90">
            Epstein
          </h1>

          <div className="flex items-center justify-center gap-8 my-6">
            <div className="w-20 h-[1px] bg-white/20" />
            <span className="text-amber-400/80 text-lg font-light italic">vs</span>
            <div className="w-20 h-[1px] bg-white/20" />
          </div>

          <h2 className="text-4xl md:text-6xl font-extralight tracking-[0.1em] text-white/60 uppercase">
            The People
          </h2>

          {/* Gold line accent */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-10" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
          <span className="text-[9px] tracking-[0.4em] uppercase font-light">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ═══════════ CASE OVERVIEW ═══════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            {/* Label */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center">
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/50 font-light">Case Summary</p>
            </div>

            <p className="text-lg md:text-2xl font-extralight leading-[1.8] text-white/70">
              This judicial committee addresses the case against <span className="text-white font-normal">Jeffrey Epstein</span> —
              centered on charges of <span className="text-amber-300/90 font-normal">sex trafficking</span>,
              <span className="text-amber-300/90 font-normal">money laundering</span>, and a network of influence
              reaching the <span className="text-white font-normal">highest echelons of global power</span>.
            </p>

            <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Venue', value: 'SDNY' },
                { label: 'Status', value: 'Active' },
                { label: 'Charges', value: '6 Counts' },
                { label: 'Classification', value: 'Sealed' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/40 mb-2 font-light">{s.label}</p>
                  <p className="text-lg font-light text-white/80">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ KEY FIGURES ═══════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Visual Evidence</p>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">Key Figures</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Figure 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/donald.jpg"
                  alt="Key Figure"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-400/60 mb-2 font-light">Exhibit A</p>
                <h4 className="text-xl font-light text-white/90">Connected Figures</h4>
                <div className="w-0 group-hover:w-full h-[1px] bg-amber-400/40 mt-4 transition-all duration-700" />
              </div>
            </div>

            {/* Figure 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/donald2.jpg"
                  alt="Key Figure"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[9px] tracking-[0.4em] uppercase text-amber-400/60 mb-2 font-light">Exhibit B</p>
                <h4 className="text-xl font-light text-white/90">The Inner Circle</h4>
                <div className="w-0 group-hover:w-full h-[1px] bg-amber-400/40 mt-4 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ THE CHARGES ═══════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Federal Indictment</p>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">The Charges</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { num: '01', title: 'Sex Trafficking', code: '18 U.S.C. § 1591' },
              { num: '02', title: 'Conspiracy', code: '18 U.S.C. § 371' },
              { num: '03', title: 'Money Laundering', code: '18 U.S.C. § 1956' },
              { num: '04', title: 'Obstruction of Justice', code: '18 U.S.C. § 1512' },
            ].map((charge, i) => (
              <div key={i} className="bg-black/60 backdrop-blur-xl p-8 md:p-10 group hover:bg-white/[0.04] transition-all duration-500">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-5xl font-extralight text-amber-400/20 group-hover:text-amber-400/40 transition-colors">{charge.num}</span>
                  <span className="text-[9px] tracking-widest text-white/20 border border-white/10 px-3 py-1 rounded-full">{charge.code}</span>
                </div>
                <h4 className="text-2xl font-light text-white/80 group-hover:text-white transition-colors">{charge.title}</h4>
                <div className="w-0 group-hover:w-12 h-[2px] bg-amber-400/60 mt-6 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ QUOTE ═══════════ */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl text-amber-400/20 mb-6 font-serif">"</div>
          <blockquote className="text-2xl md:text-3xl font-extralight leading-relaxed text-white/60 italic">
            The challenge is not merely legal — it is moral. Can the system truly prosecute
            those who built it?
          </blockquote>
          <div className="w-12 h-[2px] bg-amber-400/30 mx-auto mt-10" />
        </div>
      </section>

      {/* ═══════════ COMMITTEE DETAILS ═══════════ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-10 md:p-16">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center">
                <Scale className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400/50 font-light">Committee Type</p>
            </div>

            <h3 className="text-3xl font-extralight text-white/90 mb-6">Judicial Committee</h3>
            <p className="text-lg font-extralight leading-[1.8] text-white/50 mb-10">
              This committee simulates a real trial. Delegates will serve as prosecutors,
              defense attorneys, judges, and jury members. Prior preparation and knowledge
              of the U.S. legal system is required.
            </p>

            {/* Roles Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Prosecutor', 'Defense', 'Judge', 'Jury'].map((role, i) => (
                <div key={i} className="text-center py-4 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-amber-400/20 transition-colors">
                  <span className="text-sm font-light text-amber-400/70">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ RESOURCES ═══════════ */}
      <section className="relative z-10 py-24 px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Access</p>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">Materials</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
              target="_blank"
              className="group flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/20 transition-all"
            >
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/50 mb-2 font-light">Download</p>
                <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors">Academic Guide</h4>
              </div>
              <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-amber-400/60 transition-colors" />
            </a>

            <a
              href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
              target="_blank"
              className="group flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/20 transition-all"
            >
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/50 mb-2 font-light">Download</p>
                <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors">Rules of Procedure</h4>
              </div>
              <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-amber-400/60 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer stamp ── */}
      <div className="relative z-10 text-center pb-16 opacity-20">
        <p className="text-[9px] tracking-[0.5em] uppercase font-light">
          United States District Court · Southern District of New York
        </p>
      </div>
    </div>
  );
};

export default Corte;
