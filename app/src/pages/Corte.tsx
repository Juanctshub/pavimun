import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronRight, FileText, Scale, X, Volume2, VolumeX, Download } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

  // 0: Initial empty search bar
  // 1: Typing
  // 2: Done typing, wait for autocomplete & mouse
  // 3: Mouse clicks "Voy a tener suerte" -> Loading bar
  // 4: Screen glitches heavily
  // 5: CRT shrink to line
  // 6: Done

  useEffect(() => {
    // Typing effect
    if (phase === 1) {
      if (typedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, Math.random() * 80 + 70);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase(2), 600); // Trigger autocomplete & mouse
      }
    }
  }, [phase, typedText]);

  useEffect(() => {
    // Initial start
    const t0 = setTimeout(() => setPhase(1), 1000);
    return () => clearTimeout(t0);
  }, []);

  useEffect(() => {
    // Phases after typing
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 1500); // Wait for mouse travel, then "click"
      return () => clearTimeout(t);
    }
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 1000); // Wait for fake loading, trigger glitch
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      const t = setTimeout(() => setPhase(5), 400); // 4 is static glitch, 5 is shrink
      return () => clearTimeout(t);
    }
    if (phase === 5) {
      const t = setTimeout(() => setPhase(6), 550); // Shrink -> disappear
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
          // TV shrink effect
          transform: phase >= 5 ? 'scaleY(0.005) scaleX(0.8)' : 'scale(1)',
          opacity: phase >= 6 ? 0 : 1,
          filter: phase >= 5 ? 'brightness(10)' : phase === 4 ? 'contrast(2) saturate(0) invert(1) hue-rotate(90deg)' : 'none',
          transition: phase >= 5 ? 'transform 0.3s cubic-bezier(0.8,0,1,1), filter 0.3s, opacity 0.2s 0.3s' : 'none'
        }}
      >

        {/* Google Interface */}
        <div className={`w-full max-w-[584px] px-5 flex flex-col items-center animate-fade-in relative z-10 transition-transform ${phase === 4 ? 'translate-x-2 -translate-y-1 scale-105 blur-[1px]' : ''}`}>

          {/* Fake Google Logo */}
          <div className="text-7xl font-sans font-medium mb-8 tracking-tighter select-none flex">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          {/* Search container with dropdown */}
          <div className="w-full relative">
            <div className={`w-full h-12 bg-white rounded-full border border-gray-200 flex items-center px-4 transition-all z-20 relative ${phase >= 2 ? 'rounded-b-none shadow-md border-b-transparent' : 'hover:shadow-md focus-within:shadow-md'}`}>
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1 text-base text-gray-800 outline-none font-sans relative flex items-center">
                <span>{typedText}</span>
                {phase <= 2 && (
                  <span className="w-[1px] h-5 bg-black animate-pulse opacity-70 ml-[1px]" />
                )}
              </div>
              {typedText.length > 0 && phase < 3 && <X className="w-5 h-5 text-gray-400 cursor-pointer" />}
            </div>

            {/* Fake Autocomplete Dropdown */}
            {phase >= 2 && phase < 4 && (
              <div className="absolute top-[47px] left-0 w-full bg-white rounded-b-[24px] border border-gray-200 border-t-0 shadow-md pt-2 pb-4 z-10 flex flex-col">
                <div className="px-4 py-1.5 flex items-center gap-3 hover:bg-gray-100 text-gray-800 text-base font-sans cursor-default">
                  <Search className="w-4 h-4 text-gray-400" /> <span><b>jeffrey epstein</b> island</span>
                </div>
                <div className={`px-4 py-1.5 flex items-center gap-3 text-gray-800 text-base font-sans cursor-default ${phase >= 2 ? 'bg-gray-100' : 'hover:bg-gray-100'}`}>
                  <Search className="w-4 h-4 text-gray-400" /> <span><b>jeffrey epstein</b> court case record</span>
                </div>
                <div className="px-4 py-1.5 flex items-center gap-3 hover:bg-gray-100 text-gray-800 text-base font-sans cursor-default">
                  <Search className="w-4 h-4 text-gray-400" /> <span><b>jeffrey epstein</b> flight logs pdf</span>
                </div>

                <div className="mt-4 flex gap-3 justify-center mb-2">
                  <div className="bg-[#f8f9fa] border border-[#f8f9fa] px-4 py-2 text-sm text-[#3c4043] rounded cursor-default">Buscar con Google</div>
                  <div className={`bg-[#f8f9fa] px-4 py-2 text-sm text-[#3c4043] rounded cursor-default ${phase >= 3 ? 'border border-blue-500 shadow-sm' : 'border border-[#f8f9fa]'}`}>
                    Voy a tener suerte
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons when no dropdown */}
          {phase < 2 && (
            <div className="mt-8 flex gap-3 z-0">
              <div className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm text-[#3c4043] rounded cursor-default select-none">
                Buscar con Google
              </div>
              <div className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm text-[#3c4043] rounded cursor-default select-none">
                Voy a tener suerte
              </div>
            </div>
          )}

          {/* Animated Mouse Cursor */}
          {phase >= 2 && phase < 4 && (
            <div className="absolute pointer-events-none z-[60]"
              style={{
                top: phase === 2 ? '150px' : '205px',
                left: phase === 2 ? '100px' : '360px',
                transform: phase === 3 ? 'scale(0.9) translate(-2px, 2px)' : 'scale(1)',
                transition: phase === 2 ? 'all 1s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s'
              }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                <path d="M5.5 2.5L20.5 10L12.5 12L10 20.5L5.5 2.5Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Loading bar after click */}
          {phase === 3 && (
            <div className="absolute -bottom-8 w-[200px] h-1 bg-blue-50 overflow-hidden rounded">
              <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-blue-500 rounded animate-[slide_1s_infinite_ease-in-out]" />
            </div>
          )}
        </div>

        {/* Phase 4: Static Flash overlay before shrink */}
        {phase >= 4 && (
          <div className="absolute inset-0 z-50 bg-white">
            <div className="w-full h-full opacity-60 mix-blend-difference"
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

  // Enable scroll reveals
  useScrollReveal([loading]);

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
      <div className="bg-[#1b1b1b] text-white py-1.5 px-4 md:px-8 text-[11px] flex items-center gap-3 relative z-20">
        <span className="text-xl">🇺🇸</span>
        <span className="opacity-90">An official website of the United States government</span>
        <span className="opacity-70 flex items-center gap-1 cursor-pointer hover:underline ml-2">
          Here's how you know <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* ── DOJ Header ── */}
      <header className="bg-[#002244] text-white border-b-4 border-[#cf102d] relative z-20">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-amber-500/80 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform hover:scale-105">
              <Scale className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-[28px] font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                THE UNITED STATES DEPARTMENT OF JUSTICE
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm font-semibold tracking-wider">
            <span className="hover:text-amber-400 cursor-pointer transition-colors">AGENCIES</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">RESOURCES</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">NEWS</span>
            <span className="hover:text-amber-400 cursor-pointer transition-colors">CAREERS</span>
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
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#002244] text-white flex items-center justify-center shadow-lg hover:bg-[#cf102d] hover:scale-110 transition-all group"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* ── Main Content Container ── */}
      <main className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">

        {/* Left Column (Content) */}
        <section className="lg:col-span-8">

          <p className="reveal text-[#002244] font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            U.S. Attorney's Office, Southern District of New York
          </p>

          <h2 className="reveal text-3xl md:text-5xl text-[#1a1a1a] mb-8 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Financier Jeffrey Epstein Indicted For Sex Trafficking Of Minors
          </h2>

          <div className="reveal text-sm md:text-base text-gray-700 mb-10 border-y border-gray-200 py-4 font-semibold flex flex-wrap items-center gap-3">
            FOR IMMEDIATE RELEASE <span className="mx-3 font-normal text-gray-300">|</span> Monday, July 8, 2019
            <span className="ml-auto bg-red-100 text-[#cf102d] text-xs px-2 py-1 rounded font-bold tracking-wider animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#cf102d] block"></span>
              ACTIVE INVESTIGATION
            </span>
          </div>

          <article className="prose prose-lg max-w-none prose-p:text-[#1a1a1a] prose-p:leading-[1.8] prose-p:mb-8" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

            <p className="reveal font-bold bg-yellow-50/50 p-4 border-l-4 border-yellow-400 hover:bg-yellow-100/50 transition-colors">
              NUEVA YORK – Geoffrey S. Berman, Fiscal Federal para el Distrito Sur de Nueva York,
              anunció hoy la apertura de una carpeta de investigación y el desvelamiento de una
              acusación formal (<em className="font-normal italic">Indictment</em>) contra JEFFREY EPSTEIN.
            </p>

            <p className="reveal hover:text-gray-600 transition-colors">
              En julio de 2019, el Distrito Sur de Nueva York abrió una investigación formal contra
              Jeffrey Epstein, financista estadounidense, relacionada con presuntas actividades
              de tráfico sexual de menores y conspiración. La investigación busca determinar el alcance
              de una supuesta red que involucra a miembros prominentes de la sociedad.
            </p>

            {/* Click-to-play Video Preview for ua.mp4 */}
            <div className="reveal my-12 border border-gray-300 shadow-md p-1 bg-gray-50 flex flex-col items-center group relative cursor-pointer" onClick={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) { video.paused ? video.play() : video.pause(); }
            }}>
              <div className="w-full bg-[#002244] text-white text-[11px] font-bold px-3 py-2 uppercase flex justify-between tracking-wide items-center">
                <span>Evidence File: UA_Surveillance_Footage.mp4</span>
                <span className="bg-[#cf102d] px-2 py-0.5 rounded text-[9px] animate-pulse">DOJ CLASS-1</span>
              </div>
              <div className="relative w-full overflow-hidden bg-black">
                <video
                  controls
                  preload="metadata"
                  className="w-full max-h-[500px] h-auto object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  poster="/images/f2.jpeg"
                >
                  <source src="/videos/ua.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 hover:!opacity-0 transition-opacity bg-black/40 pointer-events-none">
                  <div className="w-16 h-16 bg-[#cf102d]/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="ml-1 w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent"></span>
                  </div>
                  <span className="text-white text-xs mt-3 uppercase tracking-widest font-bold">Review Material</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic py-3 text-center w-full bg-gray-100 border-t border-gray-300">
                Video Evidence Preview. Click video window to review footage directly.
              </p>
            </div>

            <h3 className="reveal text-2xl font-bold text-[#002244] mt-14 mb-6 border-b border-gray-200 pb-3 flex items-center gap-3" style={{ fontFamily: 'Georgia, serif' }}>
              Summary of Investigations (Líneas de Investigación Abiertas)
            </h3>

            <p className="reveal">
              La fiscalía ha abierto formalmente una carpeta de investigación basada en información preliminar y testimonios
              recopilados por las agencias federales. En esta etapa procesal temprana del año 2019, nos encontramos exclusivamente
              frente a presunciones e indicios. <strong>El Sr. Jeffrey Epstein no ha sido juzgado ni condenado</strong> por
              estos hechos, gozando de plena <span className="underline decoration-wavy decoration-[#cf102d]/30 underline-offset-4">presunción de inocencia ante la ley.</span>
            </p>

            <p className="reveal">
              Las líneas de investigación activas (Dossier Preliminar No. 19-CR-490) buscan esclarecer las siguientes hipótesis:
            </p>

            <ul className="reveal list-none pl-0 space-y-4 my-8 text-[#1a1a1a]">
              <li className="flex gap-4 p-4 border border-gray-200 rounded-sm hover:border-[#002244] hover:shadow-md transition-all bg-white">
                <div className="w-1.5 bg-[#cf102d] rounded-full shrink-0"></div>
                <div>
                  <strong className="text-[#002244] block mb-1">Posible Tráfico Sexual:</strong>
                  <span className="text-gray-700">Se indaga si existió un patrón de reclutamiento o transporte no consentido de menores para explotación.</span>
                </div>
              </li>
              <li className="flex gap-4 p-4 border border-gray-200 rounded-sm hover:border-[#002244] hover:shadow-md transition-all bg-white">
                <div className="w-1.5 bg-[#cf102d] rounded-full shrink-0"></div>
                <div>
                  <strong className="text-[#002244] block mb-1">Presunta Conspiración:</strong>
                  <span className="text-gray-700">Las agencias evalúan la posible existencia de una red de facilitadores y cómplices.</span>
                </div>
              </li>
              <li className="flex gap-4 p-4 border border-gray-200 rounded-sm hover:border-[#002244] hover:shadow-md transition-all bg-white">
                <div className="w-1.5 bg-[#cf102d] rounded-full shrink-0"></div>
                <div>
                  <strong className="text-[#002244] block mb-1">Manejo de Activos:</strong>
                  <span className="text-gray-700">Se auditan los movimientos financieros para descartar el uso de corporaciones offshore para ocultar fondos ilícitos.</span>
                </div>
              </li>
              <li className="flex gap-4 p-4 border border-gray-200 rounded-sm hover:border-[#002244] hover:shadow-md transition-all bg-white relative overflow-hidden group">
                {/* Simulated redacted text revealed on hover */}
                <div className="absolute inset-0 bg-black flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10 cursor-help">
                  <span className="text-white font-mono tracking-widest">[ CLASSIFIED - HOVER TO REVEAL ]</span>
                </div>
                <div className="w-1.5 bg-[#cf102d] rounded-full shrink-0"></div>
                <div>
                  <strong className="text-[#002244] block mb-1">Testimonios (Testigos Ocultos):</strong>
                  <span className="text-gray-700">Se monitorea que los testigos protegidos no enfrenten presiones indebidas ni alteraciones de evidencia por parte de la cúpula política.</span>
                </div>
              </li>
            </ul>

            <h3 className="reveal text-2xl font-bold text-[#002244] mt-10 mb-4 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              The Network and Compromising Material
            </h3>

            <p className="reveal">
              Los memorandos desclasificados y las fotografías adjuntas (ver barra lateral de Componentes y Evidencia)
              sugieren supuestas conexiones entre el imputado y figuras de alto nivel de influencia, incluyendo políticos
              y funcionarios de estado. Las imágenes documentadas ilustran niveles de acceso inusuales.
            </p>

            <div className="reveal bg-[#f1f1f1] border-l-4 border-[#002244] p-6 my-8 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[url('/images/noise.png')] opacity-10 rounded-full mix-blend-multiply group-hover:scale-150 transition-transform duration-700"></div>
              <p className="mb-0 font-bold text-[#002244] uppercase tracking-wide text-sm flex items-center gap-2">
                <Scale className="w-4 h-4" /> Nota del Comité (PAVIMUN)
              </p>
              <p className="mb-0 mt-3 text-sm italic text-gray-700 leading-relaxed relative z-10">
                "Este comité simula los procedimientos de una corte federal. Los delegados asumirán roles de fiscalía,
                defensa, jueces y miembros del jurado. El desafío principal es determinar si se puede investigar, con la ley en mano, a individuos
                amparados por altos niveles de influencia y poder. Ustedes definirán el rumbo del caso."
              </p>
            </div>

            <p className="reveal">
              Las leyes de los Estados Unidos establecen procedimientos estrictos para estos procesos;
              el destino de las investigaciones recaerá sobre las pruebas y el marco probatorio analizado ante el tribunal.
            </p>

            <p className="reveal text-sm mt-12 mb-2 p-4 bg-gray-50 border border-gray-200 text-gray-500 rounded">
              <strong className="text-gray-700 block mb-1">DISCLAIMER:</strong>
              The charges contained in the indictment are merely allegations, and the defendant is presumed
              innocent unless and until proven guilty in a court of law.
            </p>
          </article>
        </section>

        {/* Right Column (Sidebar / Components) */}
        <aside className="lg:col-span-4 space-y-8">

          {/* Component: Downloads / Topic */}
          <div className="reveal bg-[#f1f1f1] p-6 border-t-4 border-[#cf102d] shadow-sm">
            <h3 className="text-lg font-bold text-[#002244] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Attachment(s) (Attachments):
            </h3>

            <div className="space-y-4">
              <a href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 group bg-white p-4 border border-gray-300 shadow-sm hover:shadow-lg hover:border-[#002244] transition-all rounded">
                <div className="bg-red-50 p-2 rounded group-hover:bg-red-100 transition-colors">
                  <FileText className="w-8 h-8 text-[#cf102d] flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-[#005ea2] font-bold text-base group-hover:underline leading-tight mb-1">Guía Académica.pdf</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">DOJ dossier</p>
                </div>
                <Download className="w-5 h-5 text-gray-300 group-hover:text-[#005ea2] transition-colors self-center" />
              </a>

              <a href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 group bg-white p-4 border border-gray-300 shadow-sm hover:shadow-lg hover:border-[#002244] transition-all rounded">
                <div className="bg-red-50 p-2 rounded group-hover:bg-red-100 transition-colors">
                  <FileText className="w-8 h-8 text-[#cf102d] flex-shrink-0" />
                </div>
                <div className="flex-1">
                  <p className="text-[#005ea2] font-bold text-base group-hover:underline leading-tight mb-1">Reglamento.pdf</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Procedural Rules</p>
                </div>
                <Download className="w-5 h-5 text-gray-300 group-hover:text-[#005ea2] transition-colors self-center" />
              </a>
            </div>
          </div>

          {/* Component: Exhibits */}
          <div className="reveal border border-gray-200 p-6 bg-white shadow-sm relative">
            {/* Fake confidential stamp */}
            <div className="absolute top-2 right-2 border-[3px] border-red-600/20 text-red-600/20 font-bold uppercase tracking-widest px-2 py-1 transform rotate-12 text-xs select-none pointer-events-none z-0">
              EVIDENCE
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-5 border-b border-gray-200 pb-2 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
              Court Exhibits (2019 Archive)
            </h3>

            <div className="space-y-6 relative z-10">
              {/* Image 1 (f3 - Pope) */}
              <div className="group">
                <a href="/images/f3.jpeg" target="_blank" className="block border border-gray-300 p-1 bg-white shadow-sm group-hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#002244]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                  <img src="/images/f3.jpeg" alt="Exhibit A" className="w-full h-auto object-cover filter contrast-125 sepia-[0.3] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500" />
                </a>
                <div className="mt-2 pl-2 border-l-2 border-[#cf102d]">
                  <p className="text-sm text-[#002244] font-bold">Exhibit A</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider">High Profile Associations Log</p>
                </div>
              </div>

              {/* Image 2 (f2) */}
              <div className="group">
                <a href="/images/f2.jpeg" target="_blank" className="block border border-gray-300 p-1 bg-white shadow-sm group-hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#002244]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                  <img src="/images/f2.jpeg" alt="Exhibit B" className="w-full h-auto object-cover filter contrast-125 sepia-[0.3] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500" />
                </a>
                <div className="mt-2 pl-2 border-l-2 border-gray-400">
                  <p className="text-sm text-[#002244] font-bold">Exhibit B</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider">Financial Audit Document</p>
                </div>
              </div>

              {/* Image 3 (f1) */}
              <div className="group">
                <a href="/images/f1.jpeg" target="_blank" className="block border border-gray-300 p-1 bg-white shadow-sm group-hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#002244]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                  <img src="/images/f1.jpeg" alt="Exhibit C" className="w-full h-auto object-cover filter contrast-125 sepia-[0.3] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500" />
                </a>
                <div className="mt-2 pl-2 border-l-2 border-gray-400">
                  <p className="text-sm text-[#002244] font-bold">Exhibit C</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider">Property Records / Warrants</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal bg-[#002244] text-white p-6 mt-8 shadow-md">
            <h4 className="font-bold text-sm mb-2" style={{ fontFamily: 'Georgia, serif' }}>Primary Topic</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs border border-white/20 transition-colors cursor-default">Organized Human Trafficking</span>
              <span className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs border border-white/20 transition-colors cursor-default">Corruption</span>
            </div>

            <h4 className="font-bold text-sm mb-2 mt-6" style={{ fontFamily: 'Georgia, serif' }}>Investigating Component</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs border border-white/20 transition-colors cursor-default flex items-center gap-2">
                <Scale className="w-3 h-3 text-amber-500" /> USAO - New York, Southern
              </span>
            </div>
          </div>

        </aside>

      </main>

      {/* ── DOJ Footer Area ── */}
      <footer className="bg-[#1b1b1b] text-white mt-12 py-16">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Scale className="w-12 h-12 text-gray-400 mb-4 hover:text-white transition-colors" />
            <p className="font-bold mb-2">U.S. Department of Justice</p>
            <p className="text-sm text-gray-400">950 Pennsylvania Avenue, NW</p>
            <p className="text-sm text-gray-400">Washington, DC 20530-0001</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">About</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">The Attorney General</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">DOJ Agencies</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Budget & Performance</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">Resources</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Forms</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Publications</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Information Quality</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">Policies</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Privacy Policy</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Legal Policies & Disclaimers</p>
            <p className="text-gray-400 hover:text-white hover:underline cursor-pointer">Accessibility</p>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-xs text-gray-500 text-center flex flex-col gap-2">
          <p>PAVIMUN Educational Simulation. Not an official government record.</p>
          <p className="opacity-70 text-[10px] max-w-2xl mx-auto leading-relaxed">Uso Exclusivo con fines academicos para el evento del Modelo de las Naciones Unidas del Colegio Pablo VI, informacion vigente y disponible unicamente durante el periodo de sesiones.</p>
        </div>
      </footer>

    </div>
  );
};

export default Corte;
