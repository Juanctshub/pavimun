import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronRight, FileText, Scale, X, Volume2, VolumeX } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   CORTE — Jeffrey Epstein Case (2019)
   PAVIMUN Judicial Committee
   Exact U.S. Department of Justice (DOJ) Aesthetic
   ═══════════════════════════════════════════════════════════ */

// ═══ LOADING: GOOGLE SEARCH → CRT OFF ═══
const GoogleIntro = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const targetText = 'jeffrey epstein';

  // Audio Context for typing sound
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playKeystroke = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Mechanical click synthesis
    osc.type = 'square';
    osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }, []);

  // 0: Initial empty search bar
  // 1: Typing
  // 2: Done typing, wait
  // 3: Search button clicked / loading state
  // 4: TV static flash
  // 5: CRT shrink to line
  // 6: Done

  useEffect(() => {
    // Typing effect
    if (phase === 1) {
      if (typedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
          playKeystroke();
        }, Math.random() * 100 + 50); // random typing speed
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase(2), 600);
      }
    }
  }, [phase, typedText, playKeystroke]);

  useEffect(() => {
    // Initial start
    const t0 = setTimeout(() => setPhase(1), 1000);
    return () => clearTimeout(t0);
  }, []);

  useEffect(() => {
    // Phases after typing
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 500);
      return () => clearTimeout(t);
    }
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 1200);
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      const t = setTimeout(() => {
        // Play harsh click for TV turn off
        if (audioCtxRef.current) {
          const ctx = audioCtxRef.current;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(100, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.connect(gain); gain.connect(ctx.destination);
          osc.start(); osc.stop(ctx.currentTime + 0.2);
        }
        setPhase(5);
      }, 300);
      return () => clearTimeout(t);
    }
    if (phase === 5) {
      const t = setTimeout(() => setPhase(6), 550);
      return () => clearTimeout(t);
    }
    if (phase === 6) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">

      {/* CRT Wrapper */}
      <div className={`relative w-full h-full flex flex-col items-center pt-[20vh] bg-white transition-all`}
        style={{
          // The TV fix: It starts full size, then scales down radically
          transform: phase >= 5 ? 'scaleY(0.005) scaleX(0.8)' : 'scale(1)',
          opacity: phase >= 6 ? 0 : 1,
          filter: phase >= 5 ? 'brightness(10)' : 'none',
          transition: phase >= 5 ? 'transform 0.3s cubic-bezier(0.8,0,1,1), filter 0.3s, opacity 0.2s 0.3s' : 'none'
        }}
      >

        {/* Google stuff */}
        <div className="w-full max-w-[584px] px-5 flex flex-col items-center animate-fade-in">
          {/* Fake Google Logo */}
          <div className="text-7xl font-sans font-medium mb-8 tracking-tighter select-none">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          {/* Search Bar */}
          <div className={`w-full h-12 rounded-full border border-gray-200 hover:shadow-md focus-within:shadow-md flex items-center px-4 transition-shadow ${phase === 3 ? 'shadow-md shadow-blue-100 border-blue-200' : ''}`}>
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <div className="flex-1 text-base text-gray-800 outline-none font-sans relative flex items-center">
              <span>{typedText}</span>
              {phase <= 2 && (
                <span className="w-[1px] h-5 bg-black animate-pulse opacity-70 ml-[1px]" />
              )}
            </div>
            {typedText.length > 0 && phase < 3 && <X className="w-5 h-5 text-gray-400 cursor-pointer" />}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <div className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm text-[#3c4043] rounded cursor-default select-none">
              Buscar con Google
            </div>
            <div className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm text-[#3c4043] rounded cursor-default select-none">
              Voy a tener suerte
            </div>
          </div>

          {/* Loading state bar below search */}
          {phase === 3 && (
            <div className="w-full mt-4 h-1 bg-blue-50 overflow-hidden rounded relative">
              <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-blue-500 rounded animate-[slide_1s_infinite_ease-in-out]" />
            </div>
          )}
        </div>

        {/* Phase 4: Static Flash overlay before shrink */}
        {phase === 4 && (
          <div className="absolute inset-0 z-50 bg-white">
            <div className="w-full h-full opacity-60"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />
          </div>
        )}

      </div>

      <style>{`
        @keyframes slide {
          0% { left: -30%; width: 30%; }
          50% { width: 50%; }
          100% { left: 100%; width: 30%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ═══ MAIN PAGE (DOJ AESTHETIC) ═══
const Corte = () => {
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // DOJ Official Font: Public Sans or Arial for body, Merriweather/Georgia for headers.
  // We'll use system UI for sans, and Georgia for serif.

  const handleDone = useCallback(() => {
    setLoading(false);
    window.scrollTo(0, 0);
  }, []);

  // Audio fade-in logic
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
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  if (loading) return <GoogleIntro onDone={handleDone} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#002244] selection:text-white">

      {/* ── Official US Gov Banner ── */}
      <div className="bg-[#1b1b1b] text-white py-1.5 px-4 md:px-8 text-[11px] flex items-center gap-3">
        <span className="text-xl">🇺🇸</span>
        <span className="opacity-90">An official website of the United States government</span>
        <span className="opacity-70 flex items-center gap-1 cursor-pointer hover:underline ml-2">
          Here's how you know <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* ── DOJ Header ── */}
      <header className="bg-[#002244] text-white border-b-4 border-[#cf102d]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Fake DOJ Seal using an icon since we don't have the explicit seal image */}
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-amber-500/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <Scale className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-[28px] font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                THE UNITED STATES DEPARTMENT OF JUSTICE
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm font-semibold tracking-wider">
            <span className="hover:underline cursor-pointer">AGENCIES</span>
            <span className="hover:underline cursor-pointer">RESOURCES</span>
            <span className="hover:underline cursor-pointer">NEWS</span>
            <span className="hover:underline cursor-pointer">CAREERS</span>
            <div className="h-6 w-[1px] bg-white/30 mx-2" />
            <Search className="w-5 h-5 cursor-pointer hover:text-amber-400 transition-colors" />
          </div>
        </div>

        {/* Sub-nav banner */}
        <div className="bg-[#f0f0f0] border-t border-gray-300">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex">
            <div className="bg-white px-6 py-3 border-r border-gray-300 border-l border-t-2 border-t-[#002244] text-[#002244] font-bold text-sm tracking-wide">
              JUSTICE.GOV
            </div>
          </div>
        </div>
      </header>

      {/* ── Breadcrumbs ── */}
      <div className="bg-white border-b border-gray-200 relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-3 text-sm text-[#005ea2]">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="mx-2 text-gray-500">»</span>
          <span className="hover:underline cursor-pointer">Office of Public Affairs</span>
          <span className="mx-2 text-gray-500">»</span>
          <span className="hover:underline cursor-pointer">News</span>
          <span className="mx-2 text-gray-500">»</span>
          <span className="text-gray-600">Press Releases</span>
        </div>
      </div>

      {/* ── Audio Element & Mute Button ── */}
      <audio ref={audioRef} loop><source src="/videos/epsteinsong.mp3" type="audio/mpeg" /></audio>

      <button onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#002244] text-white flex items-center justify-center shadow-lg hover:bg-[#cf102d] transition-colors group"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* ── Main Content Container ── */}
      <main className="max-w-[1200px] mx-auto px-4 lg:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

        {/* Left Column (Content) */}
        <section className="lg:col-span-8">

          <p className="text-[#002244] font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            U.S. Attorney's Office, Southern District of New York
          </p>

          <h2 className="text-3xl md:text-5xl text-[#1a1a1a] mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Financier Jeffrey Epstein Indicted For Sex Trafficking Of Minors
          </h2>

          <div className="text-base text-gray-700 mb-8 border-y border-gray-200 py-3 font-semibold">
            FOR IMMEDIATE RELEASE <span className="mx-3 font-normal text-gray-300">|</span> Monday, July 8, 2019
          </div>

          {/* DOJ Preserves the Spanish text from previous versions as requested */}
          <article className="prose prose-lg max-w-none prose-p:text-[#1a1a1a] prose-p:leading-[1.8] prose-p:mb-6" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

            <p className="font-bold">
              NUEVA YORK – Geoffrey S. Berman, Fiscal Federal para el Distrito Sur de Nueva York,
              anunció hoy la apertura de una carpeta de investigación y el desvelamiento de una
              acusación formal (<em className="font-normal italic">Indictment</em>) contra JEFFREY EPSTEIN.
            </p>

            {/* Click-to-play Video Preview for ua.mp4 */}
            <div className="my-8 border border-gray-300 shadow-md p-1 bg-gray-50 max-w-2xl mx-auto">
              <div className="bg-[#002244] text-white text-[11px] font-bold px-3 py-1.5 uppercase flex justify-between tracking-wide">
                <span>Evidence File: UA_Surveillance.mp4</span>
                <span>DOJ Eyes Only</span>
              </div>
              <video
                controls
                preload="metadata"
                className="w-full h-auto max-h-[400px] object-contain bg-black"
                poster="/images/f2.jpeg"
              >
                <source src="/videos/ua.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-gray-500 italic mt-2 text-center">Video Evidence Preview. Click to review footage.</p>
            </div>

            <p>
              En julio de 2019, el Distrito Sur de Nueva York abrió una investigación formal contra
              Jeffrey Epstein, financista estadounidense, relacionada con presuntas actividades
              de tráfico sexual de menores y conspiración. La investigación busca determinar el alcance
              de una supuesta red que involucra a miembros prominentes de la sociedad.
            </p>

            <h3 className="text-2xl font-bold text-[#002244] mt-10 mb-4 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Summary of Investigations (Líneas de Investigación Abiertas)
            </h3>

            <p>
              La fiscalía ha abierto formalmente una carpeta de investigación basada en información preliminar y testimonios
              recopilados por las agencias federales. En esta etapa procesal temprana del año 2019, nos encontramos exclusivamente
              frente a presunciones e indicios. <strong>El Sr. Jeffrey Epstein no ha sido juzgado ni condenado</strong> por
              estos hechos, gozando de plena presunción de inocencia ante la ley.
            </p>

            <p>
              Las líneas de investigación activas (Dossier Preliminar No. 19-CR-490) buscan esclarecer las siguientes hipótesis:
            </p>

            <ul className="list-disc pl-6 space-y-4 my-6 text-[#1a1a1a]">
              <li><strong>Posible Tráfico Sexual:</strong> Se indaga si existió un patrón de reclutamiento o transporte no consentido de menores para explotación.</li>
              <li><strong>Presunta Conspiración:</strong> Las agencias evalúan la posible existencia de una red de facilitadores y cómplices.</li>
              <li><strong>Manejo de Activos:</strong> Se auditan los movimientos financieros para descartar el uso de corporaciones offshore para ocultar fondos ilícitos.</li>
              <li><strong>Testimonios:</strong> Se monitorea que los testigos protegidos no enfrenten presiones indebidas ni alteraciones de evidencia.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#002244] mt-10 mb-4 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              The Network and Compromising Material
            </h3>

            <p>
              Los memorandos desclasificados y las fotografías adjuntas (ver barra lateral de Componentes y Evidencia)
              sugieren supuestas conexiones entre el imputado y figuras de poder, incluyendo políticos y ejecutivos corporativos.
              Las imágenes documentadas, marcadas como "Exhibits", ilustran la vida social que Epstein mantenía
              mientras presuntamente operaba dicha red.
            </p>

            <div className="bg-[#f1f1f1] border-l-4 border-[#002244] p-6 my-8">
              <p className="mb-0 font-bold text-[#002244] uppercase tracking-wide text-sm">Nota del Comité (PAVIMUN)</p>
              <p className="mb-0 mt-2 text-sm italic">
                "Este comité simula los procedimientos de una corte federal. Los delegados asumirán roles de fiscalía,
                defensa, jueces y miembros del jurado. El desafío principal es determinar si se puede investigar a individuos
                amparados por altos niveles de influencia y poder. Ustedes definirán el rumbo del caso."
              </p>
            </div>

            <p>
              Las leyes establecen penas máximas severas para estos presuntos crímenes; sin embargo,
              la condena final recaerá sobre las pruebas presentadas ante el Gran Jurado y este tribunal.
            </p>

            <p className="text-sm mt-12 mb-2">
              The charges contained in the indictment are merely allegations, and the defendant is presumed
              innocent unless and until proven guilty.
            </p>
          </article>
        </section>

        {/* Right Column (Sidebar / Components) */}
        <aside className="lg:col-span-4 space-y-8">

          {/* Component: Downloads / Topic */}
          <div className="bg-[#f1f1f1] p-6 border-t-4 border-[#002244]">
            <h3 className="text-lg font-bold text-[#002244] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Attachment(s):
            </h3>

            <div className="space-y-4">
              <a href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0 group-hover:underline" />
                <div>
                  <p className="text-[#005ea2] font-semibold text-sm group-hover:underline leading-tight">Guía Académica.pdf</p>
                  <p className="text-xs text-gray-500 mt-1">Download (PAVIMUN Dossier)</p>
                </div>
              </a>

              <a href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0 group-hover:underline" />
                <div>
                  <p className="text-[#005ea2] font-semibold text-sm group-hover:underline leading-tight">Reglamento.pdf</p>
                  <p className="text-xs text-gray-500 mt-1">Download (Procedural Rules)</p>
                </div>
              </a>
            </div>
          </div>

          {/* Component: Exhibits */}
          <div className="border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-5 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Court Exhibits (2019 Archive)
            </h3>

            <div className="space-y-6">
              {/* Image 1 (f3 - Pope) */}
              <div>
                <a href="/images/f3.jpeg" target="_blank" className="block border border-gray-300 hover:shadow-md transition-shadow">
                  <img src="/images/f3.jpeg" alt="Exhibit A" className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all" />
                </a>
                <p className="text-xs text-gray-600 mt-2 font-semibold">Exhibit A - High Profile Associations</p>
                <p className="text-[11px] text-gray-500">Photographic logs currently under review.</p>
              </div>

              {/* Image 2 (f2) */}
              <div>
                <a href="/images/f2.jpeg" target="_blank" className="block border border-gray-300 hover:shadow-md transition-shadow">
                  <img src="/images/f2.jpeg" alt="Exhibit B" className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all" />
                </a>
                <p className="text-xs text-gray-600 mt-2 font-semibold">Exhibit B - Financial Audits</p>
                <p className="text-[11px] text-gray-500">Documentary evidence pending verification.</p>
              </div>

              {/* Image 3 (f1) */}
              <div>
                <a href="/images/f1.jpeg" target="_blank" className="block border border-gray-300 hover:shadow-md transition-shadow">
                  <img src="/images/f1.jpeg" alt="Exhibit C" className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all" />
                </a>
                <p className="text-xs text-gray-600 mt-2 font-semibold">Exhibit C - Property Records</p>
                <p className="text-[11px] text-gray-500">Details from search warrants executed.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#002244] text-white p-6 mt-8">
            <h4 className="font-bold text-sm mb-2" style={{ fontFamily: 'Georgia, serif' }}>Topic</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/20">Human Trafficking</span>
              <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/20">Corruption</span>
            </div>

            <h4 className="font-bold text-sm mb-2 mt-6" style={{ fontFamily: 'Georgia, serif' }}>Component</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/20">USAO - New York, Southern</span>
            </div>
          </div>

        </aside>

      </main>

      {/* ── DOJ Footer Area ── */}
      <footer className="bg-[#1b1b1b] text-white mt-12 py-16">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Scale className="w-12 h-12 text-gray-400 mb-4" />
            <p className="font-bold mb-2">U.S. Department of Justice</p>
            <p className="text-sm text-gray-400">950 Pennsylvania Avenue, NW</p>
            <p className="text-sm text-gray-400">Washington, DC 20530-0001</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">About</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">The Attorney General</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">DOJ Agencies</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Budget & Performance</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">Resources</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Forms</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Publications</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Information Quality</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">Policies</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Legal Policies & Disclaimers</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Accessibility</p>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-xs text-gray-500 text-center flex flex-col gap-2">
          <p>PAVIMUN Educational Simulation. Not an official government record.</p>
          <p className="opacity-70 text-[10px]">Uso Exclusivo con fines academicos para el evento del Modelo de las Naciones Unidas del Colegio Pablo VI, informacion vigente y disponible unicamente durante el periodo de sesiones.</p>
        </div>
      </footer>

    </div>
  );
};

export default Corte;
