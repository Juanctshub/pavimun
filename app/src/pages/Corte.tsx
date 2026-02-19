import { useState, useEffect, useRef, useCallback } from 'react';
import { Scale, ChevronDown, ExternalLink, Volume2, VolumeX, Gavel, AlertTriangle, Users, FileText, Eye } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   CORTE — Jeffrey Epstein Case
   PAVIMUN Judicial Committee
   Modern Elite / Premium Documentary Experience
   ═══════════════════════════════════════════════════════════ */

// ═══════ LOADING: TV SCREEN → EPSTEIN REVEAL → TV OFF ═══════
const TVIntro = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);
  const tvVideoRef = useRef<HTMLVideoElement>(null);
  // 0: TV off (black)
  // 1: TV turns on (static), video starts loading
  // 2: Video playing in TV, silhouette overlay
  // 3: Silhouette fades, Epstein text appears over video
  // 4: TV static flash
  // 5: TV shrinks to horizontal line
  // 6: Line gone, done

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => {
        setPhase(2);
        if (tvVideoRef.current) {
          tvVideoRef.current.play().catch(() => { });
        }
      }, 2000),
      setTimeout(() => setPhase(3), 3800),
      setTimeout(() => setPhase(4), 5500),
      setTimeout(() => setPhase(5), 5900),
      setTimeout(() => setPhase(6), 6400),
      setTimeout(onDone, 6800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
      {/* Room ambient — faint light from TV */}
      <div className={`absolute inset-0 transition-all duration-1000 ${phase >= 2 ? 'bg-[#0a0a12]' : 'bg-black'}`} />
      {phase >= 2 && phase < 5 && (
        <div className="absolute inset-0 bg-blue-900/[0.03] animate-pulse pointer-events-none" />
      )}

      {/* THE TV SET */}
      <div className="relative z-10 flex flex-col items-center">
        {/* TV Frame (rounded retro edges) */}
        <div className={`relative overflow-hidden rounded-lg shadow-[0_0_80px_rgba(100,150,255,0.08)] transition-all duration-500 ${phase >= 5 ? 'w-[80vw] md:w-[600px]' : 'w-[85vw] md:w-[640px]'
          }`}
          style={{
            aspectRatio: phase >= 5 ? undefined : '16/9',
            height: phase >= 5 ? (phase >= 6 ? '0px' : '2px') : undefined,
            transition: phase >= 5 ? 'height 0.4s cubic-bezier(0.7,0,1,1), opacity 0.2s ease 0.35s' : 'all 0.5s ease',
            opacity: phase >= 6 ? 0 : 1,
          }}
        >
          {/* TV Bezel border */}
          <div className="absolute inset-0 border-4 border-gray-800/50 rounded-lg z-30 pointer-events-none" />

          {/* Phase 0: TV OFF — black screen */}
          {phase === 0 && <div className="absolute inset-0 bg-black" />}

          {/* Phase 1: TV STATIC */}
          {phase === 1 && (
            <div className="absolute inset-0 z-20">
              <div className="w-full h-full animate-pulse opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '200px',
                }}
              />
              {/* Scanlines */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                }}
              />
            </div>
          )}

          {/* Phase 2+: VIDEO PLAYING INSIDE TV */}
          <video
            ref={tvVideoRef}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${phase >= 2 && phase < 5 ? 'opacity-70' : 'opacity-0'
              }`}
          >
            <source src="/videos/epstein.mp4" type="video/mp4" />
          </video>

          {/* Scanline overlay on video */}
          {phase >= 2 && phase < 5 && (
            <div className="absolute inset-0 z-20 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 3px)',
              }}
            />
          )}

          {/* Phase 2: SILHOUETTE OVERLAY — a man in a doorway */}
          {phase === 2 && (
            <div className="absolute inset-0 z-10 flex items-end justify-center">
              {/* Door light behind */}
              <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[140px] h-[90%] bg-gradient-to-t from-amber-100/10 via-white/20 to-amber-100/5 blur-[4px]" />
              {/* Silhouette (dark figure) */}
              <div className="relative mb-0 opacity-90">
                {/* Head */}
                <div className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[50px] h-[50px] rounded-full bg-black shadow-[0_0_30px_rgba(0,0,0,0.8)]" />
                {/* Shoulders + Body */}
                <div className="absolute -top-[115px] left-1/2 -translate-x-1/2 w-[90px] h-[90px] bg-black rounded-t-3xl shadow-[0_0_20px_rgba(0,0,0,0.6)]" />
                {/* Torso */}
                <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 w-[70px] h-[100px] bg-black" />
                <div className="w-[70px] h-[30px]" /> {/* spacer */}
              </div>
            </div>
          )}

          {/* Phase 3: TEXT REVEAL over video */}
          {phase === 3 && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30">
              <p className="text-[10px] md:text-xs tracking-[0.5em] text-white/40 uppercase mb-3 font-light animate-pulse">Case File No. 19-CR-490</p>
              <h2 className="text-4xl md:text-7xl font-extralight tracking-wide text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Jeffrey Epstein
              </h2>
              <div className="w-20 h-[1px] bg-amber-400/50 mt-4" />
            </div>
          )}

          {/* Phase 4: STATIC BURST */}
          {phase === 4 && (
            <div className="absolute inset-0 z-30">
              <div className="w-full h-full opacity-60"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '150px',
                }}
              />
            </div>
          )}

          {/* Phase 5: White line glow */}
          {phase === 5 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
              <div className="w-full h-[2px] bg-white shadow-[0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(255,255,255,0.4)]" />
            </div>
          )}
        </div>

        {/* Text below TV */}
        {phase < 5 && (
          <div className={`mt-8 text-center transition-opacity duration-700 ${phase >= 1 ? 'opacity-60' : 'opacity-0'}`}>
            <p className="text-[9px] tracking-[0.5em] text-white/30 uppercase">
              {phase <= 1 ? 'Signal acquired...' : phase === 2 ? 'Identifying subject...' : 'Case loaded.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════ MAIN PAGE ═══════
const Corte = () => {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDone = useCallback(() => setLoading(false), []);

  // Scroll
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Intersection observer — scroll reveal
  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setRevealed(p => new Set(p).add(e.target.id));
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  // Audio fade
  useEffect(() => {
    if (loading) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.play().then(() => {
      let v = 0;
      const i = setInterval(() => {
        v += 0.005;
        if (v >= 0.15) { v = 0.15; clearInterval(i); }
        a.volume = v;
      }, 80);
    }).catch(() => { });
  }, [loading]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const vis = (id: string) => revealed.has(id);

  if (loading) return <TVIntro onDone={handleDone} />;

  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-x-hidden selection:bg-amber-500/30">
      <audio ref={audioRef} loop><source src="/videos/epsteinsong.mp3" type="audio/mpeg" /></audio>

      {/* ── VIDEO BACKGROUND ── */}
      <div className="fixed inset-0 z-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover"
          style={{ transform: `scale(${1 + scrollY * 0.0001})` }}
        >
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/60 via-transparent to-[#060608]" />
      </div>

      {/* ── MUTE BUTTON ── */}
      <button onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(200,170,100,0.12)] group"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 px-3 py-1.5 rounded-lg text-[10px] tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity uppercase">
          {muted ? 'Activar Audio' : 'Silenciar'}
        </span>
      </button>

      {/* ═══════════════════════════════════════════
          HERO 
          ═══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-8 md:p-12">
          <div className="flex items-center gap-3">
            <Scale className="w-4 h-4 text-amber-400/60" />
            <span className="text-[10px] tracking-[0.4em] text-white/25 uppercase font-light">
              Case No. 19-CR-490
            </span>
          </div>
          <span className="text-[10px] tracking-[0.4em] text-white/25 uppercase font-light">
            PAVIMUN · Comité Judicial
          </span>
        </div>

        <div className="text-center max-w-6xl">
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mb-14" />

          <p className="text-amber-400/50 text-[10px] md:text-xs tracking-[0.6em] uppercase mb-10 font-light">
            The United States of America
          </p>

          <h1 className="text-8xl md:text-[12rem] font-extralight tracking-[-0.05em] leading-[0.8] mb-2 text-white/95 drop-shadow-[0_0_100px_rgba(200,170,100,0.08)]"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Epstein
          </h1>

          <div className="flex items-center justify-center gap-10 my-8">
            <div className="w-28 h-[1px] bg-gradient-to-r from-transparent to-white/15" />
            <span className="text-amber-400/70 text-2xl font-extralight italic tracking-wider">vs</span>
            <div className="w-28 h-[1px] bg-gradient-to-l from-transparent to-white/15" />
          </div>

          <h2 className="text-5xl md:text-8xl font-extralight tracking-[0.2em] text-white/40 uppercase">
            Justice
          </h2>

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-14" />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-25">
          <span className="text-[8px] tracking-[0.5em] uppercase font-light">Declassified</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTRODUCTION — What is this case?
          ═══════════════════════════════════════════ */}
      <section id="intro" data-reveal className={`relative z-10 py-32 transition-all duration-[1.5s] ${vis('intro') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="pavi-container max-w-5xl mx-auto px-6">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-[2rem] p-10 md:p-20 shadow-[0_50px_150px_rgba(0,0,0,0.6)] relative overflow-hidden hover:border-amber-400/10 transition-colors duration-700">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/[0.03] rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-600/5 flex items-center justify-center border border-amber-400/10">
                <Eye className="w-5 h-5 text-amber-400/80" />
              </div>
              <div>
                <p className="text-amber-400/40 text-[9px] tracking-[0.4em] uppercase font-light">Dossier</p>
                <p className="text-white/60 text-sm font-light">Resumen del Caso</p>
              </div>
            </div>

            <p className="text-xl md:text-3xl font-extralight leading-[1.9] text-white/55 relative z-10">
              Este comité judicial aborda el caso contra <span className="text-white font-normal border-b border-amber-400/30 pb-1">Jeffrey Epstein</span> —
              centrado en cargos de <span className="text-amber-300/80 font-normal">tráfico sexual</span>,
              <span className="text-amber-300/80 font-normal"> lavado de dinero</span>, y una red de influencia
              que alcanza los <span className="text-white font-normal">más altos escalones del poder global</span>.
              Los delegados deberán desenredar la red de complicidad que protegió a uno de los
              <span className="text-amber-300/80 font-normal"> depredadores más peligrosos</span> de la era moderna.
            </p>

            <div className="mt-16 pt-10 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { label: 'Tribunal', value: 'SDNY', sub: 'Southern District' },
                { label: 'Estado', value: 'Activo', sub: 'En proceso' },
                { label: 'Cargos', value: '6', sub: 'Counts filed' },
                { label: 'Clasificación', value: 'Sealed', sub: 'Eyes Only' },
              ].map((s, i) => (
                <div key={i} className="group cursor-default text-center md:text-left">
                  <p className="text-[8px] tracking-[0.4em] uppercase text-amber-400/30 mb-2 font-light group-hover:text-amber-400/60 transition-colors">{s.label}</p>
                  <p className="text-3xl font-extralight text-white/80 group-hover:text-white transition-colors">{s.value}</p>
                  <p className="text-[10px] text-white/20 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NARRATIVE: The Network — Split layout with images
          ═══════════════════════════════════════════ */}
      <section id="network" data-reveal className={`relative z-10 py-24 transition-all duration-[1.5s] ${vis('network') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-24">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Investigación</p>
            <h3 className="text-4xl md:text-6xl font-extralight text-white/80">La Red</h3>
            <div className="w-12 h-[1px] bg-amber-400/30 mx-auto mt-6" />
          </div>

          {/* Row 1: Image Left + Text Right */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-tr from-amber-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.01] transition-transform duration-700">
                <img src="/images/donald.jpg" alt="Asociados" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.3em] text-amber-400/60 uppercase mb-1">Exhibit A</p>
                  <p className="text-sm text-white/70 font-light">Conexiones documentadas</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-amber-400/60 mb-4">
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Los Asociados</span>
              </div>
              <h4 className="text-3xl md:text-4xl font-extralight text-white/90 leading-tight">
                Una Red de <br />
                <span className="text-amber-300/80">Poder e Impunidad</span>
              </h4>
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/[0.04]">
                <p className="text-white/45 leading-[1.9] font-light text-lg">
                  Jeffrey Epstein construyó una red que incluía <strong className="text-white/80 font-normal">políticos</strong>,
                  <strong className="text-white/80 font-normal"> billonarios</strong>, y
                  <strong className="text-white/80 font-normal"> figuras de la realeza</strong>.
                  Su isla privada, apodada "Pedophile Island", fue el
                  epicentro de crímenes que el mundo entero ignoró —o eligió ignorar— durante décadas.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Text Left + Winni Poh Right */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-6 order-2 md:order-1">
              <div className="flex items-center gap-3 text-amber-400/60 mb-4">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">El Escándalo</span>
              </div>
              <h4 className="text-3xl md:text-4xl font-extralight text-white/90 leading-tight">
                Relaciones <br />
                <span className="text-amber-300/80">Comprometedoras</span>
              </h4>
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/[0.04]">
                <p className="text-white/45 leading-[1.9] font-light text-lg">
                  Las pruebas fotográficas y testimonios revelan vínculos profundos entre Epstein y las élites globales.
                  Cada imagen cuenta una historia de <strong className="text-white/80 font-normal">complicidad silenciosa</strong>.
                  Los delegados deben determinar: ¿quién sabía qué, y cuándo lo supieron?
                </p>
              </div>
            </div>

            <div className="relative group order-1 md:order-2">
              <div className="absolute -inset-3 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.01] transition-transform duration-700">
                <img src="/images/winni-poh.webp" alt="Evidencia" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.3em] text-amber-400/60 uppercase mb-1">Exhibit B</p>
                  <p className="text-sm text-white/70 font-light">Material comprometedor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Image Left + Text Right */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-tr from-red-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform group-hover:scale-[1.01] transition-transform duration-700">
                <img src="/images/donald2.jpg" alt="Círculo interno" className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.3em] text-amber-400/60 uppercase mb-1">Exhibit C</p>
                  <p className="text-sm text-white/70 font-light">El círculo íntimo</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-red-400/60 mb-4">
                <Gavel className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">El Juicio</span>
              </div>
              <h4 className="text-3xl md:text-4xl font-extralight text-white/90 leading-tight">
                ¿Justicia o <br />
                <span className="text-red-300/80">Encubrimiento?</span>
              </h4>
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/[0.04]">
                <p className="text-white/45 leading-[1.9] font-light text-lg">
                  La muerte de Epstein en su celda dejó más preguntas que respuestas.
                  ¿Fue suicidio o asesinato? Los delegados ahora tienen acceso a la lista completa de
                  <strong className="text-white/80 font-normal bg-red-900/20 px-1"> asociados desclasificados</strong>.
                  Es hora de que el sistema rinda cuentas.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE CHARGES
          ═══════════════════════════════════════════ */}
      <section id="charges" data-reveal className={`relative z-10 py-32 transition-all duration-[1.5s] ${vis('charges') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-amber-400/40 mb-4 font-light">Federal Indictment</p>
            <h3 className="text-4xl md:text-6xl font-extralight text-white/80">Los Cargos</h3>
            <div className="w-12 h-[1px] bg-amber-400/30 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Tráfico Sexual', code: '§ 1591', desc: 'Reclutamiento y tráfico de menores para explotación sexual a escala internacional', color: 'from-red-500/10 to-transparent' },
              { num: '02', title: 'Conspiración', code: '§ 371', desc: 'Empresa criminal coordinada que abarcó múltiples estados y países', color: 'from-amber-500/10 to-transparent' },
              { num: '03', title: 'Lavado de Dinero', code: '§ 1956', desc: 'Ocultación de fondos ilícitos a través de empresas fantasma en paraísos fiscales', color: 'from-blue-500/10 to-transparent' },
              { num: '04', title: 'Obstrucción', code: '§ 1512', desc: 'Manipulación de testigos, destrucción de evidencia y amenazas a víctimas', color: 'from-purple-500/10 to-transparent' },
              { num: '05', title: 'Abuso de Menores', code: '§ 2241', desc: 'Abuso sexual agravado contra víctimas menores de edad durante más de una década', color: 'from-red-600/10 to-transparent' },
              { num: '06', title: 'Soborno', code: '§ 201', desc: 'Pagos ilegales a oficiales públicos para garantizar protección e impunidad', color: 'from-emerald-500/10 to-transparent' },
            ].map((c, i) => (
              <div key={i} className={`group bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/15 transition-all duration-500 relative overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}>
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-5xl font-extralight text-white/[0.06] group-hover:text-amber-400/20 transition-colors duration-500">{c.num}</span>
                    <span className="text-[8px] tracking-widest text-white/15 border border-white/10 px-3 py-1 rounded-full group-hover:border-amber-400/20 group-hover:text-amber-400/40 transition-all">{c.code}</span>
                  </div>
                  <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors mb-3">{c.title}</h4>
                  <p className="text-sm font-light text-white/20 group-hover:text-white/45 transition-colors leading-relaxed">{c.desc}</p>
                  <div className="w-0 group-hover:w-12 h-[2px] bg-amber-400/50 mt-6 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WARNING / DILEMMA QUOTE
          ═══════════════════════════════════════════ */}
      <section id="dilemma" data-reveal className={`relative z-10 py-32 transition-all duration-[1.5s] ${vis('dilemma') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-b from-red-950/15 to-transparent border border-red-900/20 rounded-[2rem] p-10 md:p-16 text-center backdrop-blur-xl">
            <AlertTriangle className="w-10 h-10 text-red-500/60 mx-auto mb-8" />
            <h3 className="text-2xl md:text-3xl font-extralight text-white/80 mb-6">El Dilema Central</h3>
            <blockquote className="text-xl md:text-2xl font-extralight leading-[1.8] text-white/45 italic mb-8">
              "El desafío no es solo legal — es moral. ¿Puede el sistema realmente enjuiciar
              a aquellos que lo construyeron? ¿O la justicia es un privilegio reservado
              para quienes no pueden pagarla?"
            </blockquote>
            <div className="w-16 h-[1px] bg-red-400/20 mx-auto" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMMITTEE INFO
          ═══════════════════════════════════════════ */}
      <section id="committee" data-reveal className={`relative z-10 py-24 transition-all duration-[1.5s] ${vis('committee') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] rounded-[2rem] p-10 md:p-16 relative overflow-hidden hover:border-amber-400/10 transition-colors duration-700">
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/[0.02] rounded-full blur-[80px] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start gap-10 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/15 to-amber-600/5 flex items-center justify-center border border-amber-400/10 flex-shrink-0">
                <Gavel className="w-7 h-7 text-amber-400/80" />
              </div>
              <div>
                <p className="text-amber-400/40 text-[9px] tracking-[0.4em] uppercase font-light mb-2">Tipo de Comité</p>
                <h3 className="text-3xl md:text-4xl font-extralight text-white/90 mb-4">Comité Judicial</h3>
                <p className="text-lg font-extralight leading-[1.9] text-white/40">
                  Este comité simula un juicio real. Los delegados asumirán los roles de fiscales,
                  abogados defensores, jueces y miembros del jurado. Se requiere preparación previa
                  y conocimiento profundo del sistema legal estadounidense.
                  <strong className="text-white/70 font-normal"> El destino del caso está en sus manos.</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { role: 'Fiscal', icon: '⚖️' },
                { role: 'Defensa', icon: '🛡️' },
                { role: 'Juez', icon: '👨‍⚖️' },
                { role: 'Jurado', icon: '📋' },
              ].map((r, i) => (
                <div key={i} className="text-center py-6 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-300 cursor-default group">
                  <span className="text-2xl mb-2 block">{r.icon}</span>
                  <span className="text-sm font-light text-white/50 group-hover:text-amber-400/80 transition-colors">{r.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESOURCES / DOWNLOADS
          ═══════════════════════════════════════════ */}
      <section id="resources" data-reveal className={`relative z-10 py-24 mb-12 transition-all duration-[1.5s] ${vis('resources') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-white/10" />
              <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-light">Archivos Desclasificados</span>
              <div className="h-[1px] w-16 bg-white/10" />
            </div>
            <h3 className="text-3xl md:text-5xl font-extralight text-white/80">Materiales</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" target="_blank"
              className="group flex items-center gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/20 transition-colors">
                <FileText className="w-6 h-6 text-amber-400/60 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/40 mb-1 font-light">Descargar</p>
                <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors">Guía Académica</h4>
                <p className="text-xs text-white/20 mt-1">Documentación del caso</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/10 group-hover:text-amber-400/60 transition-colors flex-shrink-0" />
            </a>

            <a href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo" target="_blank"
              className="group flex items-center gap-6 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 hover:border-amber-400/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-red-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-400/20 transition-colors">
                <Scale className="w-6 h-6 text-red-400/60 group-hover:text-red-400 transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] tracking-[0.3em] uppercase text-red-400/40 mb-1 font-light">Acceder</p>
                <h4 className="text-xl font-light text-white/80 group-hover:text-white transition-colors">Reglamento</h4>
                <p className="text-xs text-white/20 mt-1">Reglas de procedimiento</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/10 group-hover:text-red-400/60 transition-colors flex-shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 py-16 text-center border-t border-white/[0.04]">
        <div className="flex flex-col items-center gap-4">
          <Scale className="w-5 h-5 text-white/10" />
          <p className="text-[8px] tracking-[0.6em] uppercase font-light text-white/15">
            United States District Court · Southern District of New York
          </p>
          <p className="text-[8px] tracking-[0.4em] uppercase text-white/10">
            PAVIMUN 2025
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Corte;
