import { useState, useEffect, useRef, useCallback } from 'react';
import { Scale, ChevronDown, ExternalLink, Volume2, VolumeX, Gavel, Users, FileText, Eye, ShieldAlert } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   CORTE PENAL INTERNACIONAL — Caso Epstein (2019)
   Carpeta de investigación abierta · Sin veredicto
   PAVIMUN · Comité Judicial
   ═══════════════════════════════════════════════════════════ */

// ═══ TV INTRO ═══
const TVIntro = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);
  const tvVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => { setPhase(2); tvVideoRef.current?.play().catch(() => { }); }, 1800),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 5200),
      setTimeout(() => setPhase(5), 5600),
      setTimeout(() => setPhase(6), 6100),
      setTimeout(onDone, 6500),
    ];
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-[#020204] flex items-center justify-center overflow-hidden">
      {/* Ambient light from TV */}
      {phase >= 2 && phase < 5 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-blue-500/[0.015] rounded-full blur-[100px] animate-pulse" />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center">
        {/* TV FRAME */}
        <div
          className="relative overflow-hidden bg-black"
          style={{
            width: phase >= 5 ? '70vw' : '85vw',
            maxWidth: phase >= 5 ? '550px' : '680px',
            aspectRatio: phase >= 5 ? undefined : '16/10',
            height: phase >= 5 ? (phase >= 6 ? '0px' : '3px') : undefined,
            borderRadius: phase >= 5 ? '0' : '6px',
            boxShadow: phase >= 2 && phase < 5 ? '0 0 120px rgba(80,120,200,0.06), 0 20px 60px rgba(0,0,0,0.8)' : '0 20px 60px rgba(0,0,0,0.8)',
            transition: phase >= 5 ? 'height 0.35s cubic-bezier(0.8,0,1,1), width 0.3s, border-radius 0.2s, opacity 0.15s ease 0.3s' : 'all 0.6s ease',
            opacity: phase >= 6 ? 0 : 1,
          }}
        >
          {/* Bezel */}
          <div className="absolute inset-0 border-[3px] border-neutral-800/60 rounded-[6px] z-40 pointer-events-none" />
          <div className="absolute inset-[3px] border border-neutral-700/20 rounded-[4px] z-40 pointer-events-none" />

          {/* P0: OFF */}
          {phase === 0 && (
            <div className="absolute inset-0 bg-[#0a0a0c]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-900/30" />
            </div>
          )}

          {/* P1: Static */}
          {phase === 1 && (
            <div className="absolute inset-0 z-20 overflow-hidden">
              <div className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 opacity-30 animate-[grain_0.3s_steps(6)_infinite]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '256px' }}
              />
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 3px)' }} />
              {/* Channel number flicker */}
              <div className="absolute top-4 right-6 text-green-400/40 font-mono text-xs animate-pulse">CH-19</div>
            </div>
          )}

          {/* P2+: Video */}
          <video ref={tvVideoRef} muted playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${phase >= 2 && phase < 5 ? 'opacity-60' : 'opacity-0'}`}
          >
            <source src="/videos/epstein.mp4" type="video/mp4" />
          </video>

          {/* Scanlines on video */}
          {phase >= 2 && phase < 5 && (
            <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-[0.07]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)' }}
            />
          )}

          {/* P2: Silhouette in doorway */}
          {phase === 2 && (
            <div className="absolute inset-0 z-10 flex items-end justify-center overflow-hidden">
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[120px] h-[84%]">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-100/8 via-white/15 to-amber-50/5 blur-[6px]" />
                <div className="absolute inset-x-4 top-0 bottom-0 bg-white/[0.08] blur-[3px]" />
              </div>
              <div className="relative mb-0 z-20">
                <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[44px] h-[44px] rounded-full bg-[#0a0a0c] shadow-[0_0_40px_rgba(0,0,0,0.9)]" />
                <div className="absolute -top-[110px] left-1/2 -translate-x-1/2 w-[80px] h-[80px] bg-[#0a0a0c] rounded-t-2xl" />
                <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 w-[60px] h-[100px] bg-[#0a0a0c]" />
                <div className="w-[60px] h-[30px]" />
              </div>
            </div>
          )}

          {/* P3: Text reveal */}
          {phase === 3 && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <p className="text-[9px] md:text-[11px] tracking-[0.7em] text-white/30 uppercase mb-4 font-light">
                Carpeta de Investigación
              </p>
              <h2 className="text-5xl md:text-8xl font-[200] tracking-wider text-white/95" style={{ fontFamily: 'system-ui' }}>
                Jeffrey Epstein
              </h2>
              <div className="w-24 h-[1px] bg-amber-400/40 mt-5" />
              <p className="text-[9px] tracking-[0.5em] text-amber-400/30 uppercase mt-4">2019</p>
            </div>
          )}

          {/* P4: Static burst */}
          {phase === 4 && (
            <div className="absolute inset-0 z-30 bg-white/10">
              <div className="w-full h-full opacity-70"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '128px' }}
              />
            </div>
          )}

          {/* P5: White line */}
          {phase === 5 && (
            <div className="absolute inset-0 z-30 flex items-center bg-black">
              <div className="w-full h-[3px] bg-white shadow-[0_0_40px_#fff,0_0_80px_rgba(255,255,255,0.3)]" />
            </div>
          )}
        </div>

        {/* Subtext */}
        {phase >= 1 && phase < 5 && (
          <p className="mt-6 text-[8px] tracking-[0.5em] text-white/15 uppercase transition-opacity duration-500">
            {phase === 1 ? 'Sintonizando...' : phase === 2 ? 'Sujeto identificado' : 'Expediente cargado'}
          </p>
        )}
      </div>

      {/* CSS anim for grain movement */}
      <style>{`@keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-5%,-10%)} 30%{transform:translate(3%,5%)} 50%{transform:translate(-3%,8%)} 70%{transform:translate(8%,-3%)} 90%{transform:translate(-8%,3%)} }`}</style>
    </div>
  );
};

// ═══ ANIMATED COUNTER ═══
const Counter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = end / (duration / 16);
        const iv = setInterval(() => {
          start += step;
          if (start >= end) { start = end; clearInterval(iv); }
          setVal(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ═══ MAIN ═══
const Corte = () => {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setRevealed(p => new Set(p).add(e.target.id)); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play().then(() => {
      let v = 0;
      const i = setInterval(() => { v += 0.004; if (v >= 0.12) { clearInterval(i); } a.volume = Math.min(v, 0.12); }, 80);
    }).catch(() => { });
  }, [loading]);

  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !muted; setMuted(!muted); } };
  const vis = (id: string) => revealed.has(id);

  if (loading) return <TVIntro onDone={handleDone} />;

  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-x-hidden selection:bg-amber-500/20">
      <audio ref={audioRef} loop><source src="/videos/epsteinsong.mp3" type="audio/mpeg" /></audio>

      {/* ── VIDEO BG ── */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ transform: `scale(${1 + scrollY * 0.00008})` }}>
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#050507]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/50 via-transparent to-[#050507]" />
      </div>

      {/* ── MUTE ── */}
      <button onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-all duration-300 hover:scale-110 group"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* ═══════════════════════════
          HERO — Massive typography
          ═══════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-16 py-12">
        {/* Top */}
        <div className="flex justify-between items-start pt-4">
          <div>
            <p className="text-[9px] tracking-[0.5em] text-white/20 uppercase">Comité Judicial</p>
            <p className="text-[8px] tracking-[0.3em] text-amber-400/25 uppercase mt-1">PAVIMUN 2025</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] tracking-[0.5em] text-white/20 uppercase">Expediente</p>
            <p className="text-[8px] tracking-[0.3em] text-amber-400/25 uppercase mt-1">No. 19-CR-490</p>
          </div>
        </div>

        {/* Center */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-12">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-16" />

          <p className="text-amber-400/40 text-[10px] tracking-[0.8em] uppercase mb-8 font-light">
            Carpeta de Investigación Abierta
          </p>

          <h1 className="text-center leading-[0.8]">
            <span className="block text-[clamp(4rem,15vw,14rem)] font-[100] tracking-[-0.04em] text-white/90"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Epstein
            </span>
          </h1>

          <div className="flex items-center gap-8 my-8">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <Scale className="w-5 h-5 text-amber-400/30" />
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-white/25 text-[10px] tracking-[0.6em] uppercase font-light">
            United States District Court · Southern District of New York · 2019
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-16" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 opacity-20 pb-4">
          <span className="text-[8px] tracking-[0.5em] uppercase">Desclasificado</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════
          STATS BAR — Animated counters
          ═══════════════════════════ */}
      <section id="stats" data-reveal className={`relative z-10 py-16 border-y border-white/[0.04] bg-black/40 backdrop-blur-xl transition-all duration-[1.5s] ${vis('stats') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: 36, s: '', label: 'Víctimas identificadas', sub: 'Hasta julio 2019' },
            { n: 80, s: '+', label: 'Testimonios recopilados', sub: 'Declaraciones juradas' },
            { n: 15, s: '', label: 'Años de investigación', sub: 'Desde 2005' },
            { n: 3, s: '', label: 'Jurisdicciones', sub: 'NY · FL · USVI' },
          ].map((d, i) => (
            <div key={i} className="group cursor-default">
              <p className="text-4xl md:text-5xl font-[100] text-white/80 mb-2 tabular-nums">
                <Counter end={d.n} />{d.s}
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">{d.label}</p>
              <p className="text-[8px] text-white/15">{d.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          CASE OVERVIEW — Glass card
          ═══════════════════════════ */}
      <section id="overview" data-reveal className={`relative z-10 py-28 transition-all duration-[1.5s] ${vis('overview') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-white/[0.025] backdrop-blur-2xl border border-white/[0.05] rounded-[2.5rem] p-10 md:p-20 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400/[0.02] rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400/[0.02] rounded-full blur-[80px]" />

            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/10 to-amber-600/5 flex items-center justify-center border border-amber-400/10">
                <Eye className="w-5 h-5 text-amber-400/70" />
              </div>
              <div>
                <p className="text-amber-400/40 text-[9px] tracking-[0.5em] uppercase">Expediente</p>
                <p className="text-white/50 text-sm font-light">Resumen de la investigación</p>
              </div>
            </div>

            <p className="text-xl md:text-[1.7rem] font-[200] leading-[2] text-white/50 relative z-10">
              En julio de 2019, el Distrito Sur de Nueva York abrió una
              <span className="text-white/90 font-normal"> carpeta de investigación</span> contra
              <span className="text-white/90 font-normal"> Jeffrey Epstein</span>, financista estadounidense,
              por presuntas actividades de <span className="text-amber-300/70">tráfico sexual de menores</span> y
              <span className="text-amber-300/70"> conspiración</span>. La investigación busca determinar
              el alcance de una supuesta red que involucra a figuras de
              <span className="text-white/90 font-normal"> las más altas esferas del poder</span>.
              Hasta el momento, <span className="text-amber-300/70 border-b border-amber-400/20 pb-0.5">no se ha emitido veredicto alguno</span>.
              Los delegados asumen el rol de la corte encargada de evaluar la evidencia.
            </p>

            <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-wrap gap-4">
              {['Investigación Abierta', 'Sin Veredicto', 'Evidencia Bajo Revisión', 'Testimonios Pendientes'].map((tag, i) => (
                <span key={i} className="text-[9px] tracking-[0.3em] uppercase text-amber-400/30 border border-amber-400/10 px-4 py-2 rounded-full hover:bg-amber-400/5 hover:text-amber-400/50 transition-all cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          EVIDENCE — Split narrative rows
          ═══════════════════════════ */}
      <section id="evidence" data-reveal className={`relative z-10 py-20 transition-all duration-[1.5s] ${vis('evidence') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-24">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/30 mb-4">Material de Investigación</p>
            <h3 className="text-4xl md:text-6xl font-[100] text-white/80">La Evidencia</h3>
            <div className="w-10 h-[1px] bg-amber-400/25 mx-auto mt-8" />
          </div>

          {/* ROW 1 */}
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center mb-32">
            <div className="relative group order-2 md:order-1">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/[0.06] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl">
                <img src="/images/donald.jpg" alt="Evidencia fotográfica" className="w-full aspect-[4/3] object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[8px] tracking-[0.4em] text-amber-400/40 uppercase mb-2">Exhibit A · Fotografía</p>
                  <p className="text-sm text-white/60 font-light">Registro fotográfico bajo análisis</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className="flex items-center gap-3 text-amber-400/50">
                <Users className="w-5 h-5" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Presuntas Conexiones</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-[100] text-white/85 leading-[1.15]">
                ¿Quién sabía<br /><span className="text-amber-300/60">y calló?</span>
              </h4>
              <p className="text-white/35 leading-[1.9] text-lg font-light bg-white/[0.02] rounded-xl p-6 border border-white/[0.04]">
                La investigación <strong className="text-white/70 font-normal">no ha determinado culpabilidad</strong>.
                Sin embargo, las fotografías sugieren vínculos sociales con figuras de poder.
                El comité deberá evaluar si estas conexiones constituyen evidencia relevante
                o mera coincidencia circunstancial.
              </p>
            </div>
          </div>

          {/* ROW 2 — Winni Poh (wide) */}
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center mb-32">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-amber-400/50">
                <ShieldAlert className="w-5 h-5" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Material Bajo Revisión</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-[100] text-white/85 leading-[1.15]">
                Lo que las imágenes<br /><span className="text-amber-300/60">sugieren</span>
              </h4>
              <p className="text-white/35 leading-[1.9] text-lg font-light bg-white/[0.02] rounded-xl p-6 border border-white/[0.04]">
                Cada pieza de evidencia presentada requiere <strong className="text-white/70 font-normal">verificación independiente</strong>.
                Los delegados tienen la responsabilidad de separar hechos de especulaciones
                y construir un caso que se sostenga bajo escrutinio legal riguroso.
                <span className="text-amber-300/50"> Presunción de inocencia</span> hasta que se demuestre lo contrario.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-bl from-amber-400/[0.06] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl">
                <img src="/images/winni-poh.webp" alt="Evidencia" className="w-full aspect-[4/3] object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[8px] tracking-[0.4em] text-amber-400/40 uppercase mb-2">Exhibit B · Documento</p>
                  <p className="text-sm text-white/60 font-light">Material comprometedor bajo análisis</p>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
            <div className="relative group order-2 md:order-1">
              <div className="absolute -inset-4 bg-gradient-to-tr from-red-400/[0.05] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.05] shadow-2xl">
                <img src="/images/donald2.jpg" alt="Círculo social" className="w-full aspect-[4/3] object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[8px] tracking-[0.4em] text-amber-400/40 uppercase mb-2">Exhibit C · Registro</p>
                  <p className="text-sm text-white/60 font-light">Actividades sociales documentadas</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className="flex items-center gap-3 text-red-400/50">
                <Gavel className="w-5 h-5" />
                <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Punto de Inflexión</span>
              </div>
              <h4 className="text-3xl md:text-5xl font-[100] text-white/85 leading-[1.15]">
                El proceso<br /><span className="text-red-300/50">apenas comienza</span>
              </h4>
              <p className="text-white/35 leading-[1.9] text-lg font-light bg-white/[0.02] rounded-xl p-6 border border-white/[0.04]">
                Con la apertura del expediente, se inicia un proceso que podría
                <strong className="text-white/70 font-normal"> redefinir los límites del poder</strong>.
                ¿Puede el sistema judicial estadounidense procesar a quienes supuestamente
                operaron bajo su protección? Los delegados decidirán el rumbo de esta investigación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          ALLEGATIONS (not charges)
          ═══════════════════════════ */}
      <section id="allegations" data-reveal className={`relative z-10 py-28 transition-all duration-[1.5s] ${vis('allegations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/30 mb-4">Presuntos Cargos</p>
            <h3 className="text-4xl md:text-6xl font-[100] text-white/80">Acusaciones Bajo Investigación</h3>
            <p className="text-sm text-white/20 mt-4 font-light">Ninguno de estos cargos ha sido probado en corte</p>
            <div className="w-10 h-[1px] bg-amber-400/25 mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'Tráfico Sexual', desc: 'Se investiga el presunto reclutamiento de menores para explotación', color: 'red' },
              { num: '02', title: 'Conspiración', desc: 'Presunta coordinación de una empresa criminal organizada', color: 'amber' },
              { num: '03', title: 'Lavado de Activos', desc: 'Supuesta ocultación de fondos mediante estructuras offshore', color: 'blue' },
              { num: '04', title: 'Obstrucción', desc: 'Presunta manipulación de testigos y destrucción de evidencia', color: 'purple' },
              { num: '05', title: 'Abuso de Menores', desc: 'Se investigan acusaciones de abuso sexual agravado', color: 'red' },
              { num: '06', title: 'Intimidación', desc: 'Presuntas amenazas a víctimas para evitar denuncias', color: 'emerald' },
            ].map((c, i) => (
              <div key={i} className="group bg-white/[0.02] backdrop-blur-xl border border-white/[0.04] rounded-2xl p-7 hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-4xl font-[100] text-white/[0.04] group-hover:text-white/[0.1] transition-colors block mb-4">{c.num}</span>
                  <h4 className="text-lg font-light text-white/75 group-hover:text-white/95 transition-colors mb-2">{c.title}</h4>
                  <p className="text-xs text-white/20 group-hover:text-white/35 transition-colors leading-relaxed">{c.desc}</p>
                  <div className="w-0 group-hover:w-8 h-[1px] bg-amber-400/40 mt-5 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          CENTRAL QUESTION
          ═══════════════════════════ */}
      <section id="question" data-reveal className={`relative z-10 py-32 transition-all duration-[2s] ${vis('question') ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-7xl text-amber-400/10 leading-none mb-4">"</div>
          <blockquote className="text-2xl md:text-3xl font-[200] leading-[1.7] text-white/40 italic">
            ¿Puede el sistema realmente investigar a quienes lo sostienen?
            ¿O la justicia es un privilegio que se compra con el poder suficiente?
          </blockquote>
          <div className="w-12 h-[1px] bg-amber-400/20 mx-auto mt-10" />
          <p className="text-[9px] tracking-[0.5em] text-white/15 uppercase mt-6">La pregunta que este comité debe resolver</p>
        </div>
      </section>

      {/* ═══════════════════════════
          COMMITTEE INFO
          ═══════════════════════════ */}
      <section id="committee" data-reveal className={`relative z-10 py-24 transition-all duration-[1.5s] ${vis('committee') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative bg-white/[0.025] backdrop-blur-2xl border border-white/[0.05] rounded-[2.5rem] p-10 md:p-16 overflow-hidden">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-400/[0.015] rounded-full blur-[80px]" />

            <div className="flex flex-col md:flex-row items-start gap-10 mb-14">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/10 to-amber-600/5 flex items-center justify-center border border-amber-400/10 flex-shrink-0">
                <Gavel className="w-7 h-7 text-amber-400/70" />
              </div>
              <div>
                <p className="text-amber-400/30 text-[9px] tracking-[0.5em] uppercase mb-2">Formato</p>
                <h3 className="text-3xl md:text-4xl font-[100] text-white/90 mb-5">Comité Judicial</h3>
                <p className="text-lg font-[200] leading-[1.9] text-white/35">
                  Este comité simula los procedimientos de una corte federal estadounidense.
                  Los delegados asumirán roles legales y deberán construir argumentos basados
                  en la evidencia presentada. Se requiere
                  <strong className="text-white/60 font-normal">preparación previa</strong> en derecho procesal.
                  La investigación está abierta — <strong className="text-amber-300/50 font-normal">ustedes definirán su curso</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { role: 'Fiscalía', emoji: '⚖️', desc: 'Construye el caso' },
                { role: 'Defensa', emoji: '🛡️', desc: 'Protege al acusado' },
                { role: 'Juez', emoji: '👨‍⚖️', desc: 'Dirige el proceso' },
                { role: 'Jurado', emoji: '📋', desc: 'Emite veredicto' },
              ].map((r, i) => (
                <div key={i} className="text-center py-6 px-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-400/15 hover:bg-white/[0.04] transition-all duration-300 cursor-default group">
                  <span className="text-2xl block mb-2">{r.emoji}</span>
                  <span className="text-sm font-light text-white/50 group-hover:text-amber-400/70 transition-colors block">{r.role}</span>
                  <span className="text-[9px] text-white/15 mt-1 block">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════
          RESOURCES
          ═══════════════════════════ */}
      <section id="resources" data-reveal className={`relative z-10 py-24 mb-8 transition-all duration-[1.5s] ${vis('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-14">
            <div className="h-[1px] w-12 bg-white/[0.06]" />
            <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase">Documentos</span>
            <div className="h-[1px] w-12 bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <a href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" target="_blank"
              className="group flex items-center gap-5 bg-white/[0.02] backdrop-blur-xl border border-white/[0.04] rounded-2xl p-7 hover:border-amber-400/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/15 transition-colors">
                <FileText className="w-5 h-5 text-amber-400/50 group-hover:text-amber-400/80 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-light text-white/70 group-hover:text-white/90 transition-colors">Guía Académica</h4>
                <p className="text-[10px] text-white/15 mt-0.5">Documentación del caso</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-amber-400/40 transition-colors flex-shrink-0" />
            </a>

            <a href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo" target="_blank"
              className="group flex items-center gap-5 bg-white/[0.02] backdrop-blur-xl border border-white/[0.04] rounded-2xl p-7 hover:border-amber-400/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.08] transition-colors">
                <Scale className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-light text-white/70 group-hover:text-white/90 transition-colors">Reglamento</h4>
                <p className="text-[10px] text-white/15 mt-0.5">Reglas de procedimiento</p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/10 group-hover:text-white/40 transition-colors flex-shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-14 text-center border-t border-white/[0.03]">
        <Scale className="w-4 h-4 text-white/[0.06] mx-auto mb-3" />
        <p className="text-[7px] tracking-[0.6em] uppercase text-white/[0.08]">
          Southern District of New York · 2019 · PAVIMUN
        </p>
      </footer>
    </div>
  );
};

export default Corte;
