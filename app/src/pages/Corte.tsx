import { useState, useEffect, useRef } from 'react';
import { BookOpen, FileText, Scale, Gavel, Eye, ChevronDown } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Corte = () => {
  useScrollReveal();

  const [entered, setEntered] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [showStartBtn, setShowStartBtn] = useState(false);

  // Page entrance transition
  useEffect(() => {
    // Only proceed if not waiting for button
    if (!showStartBtn) {
      const t1 = setTimeout(() => setEntered(true), 100);
      const t2 = setTimeout(() => setContentVisible(true), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [showStartBtn]);

  // Ensure video plays & start music
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }

    // Aggressive Audio Autoplay
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      const play = async () => {
        try {
          await audioRef.current!.play();
          setMusicPlaying(true);
        } catch {
          setShowStartBtn(true);
          setMusicPlaying(false);
        }
      };
      play();
    }
  }, []);

  const handleManualStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setMusicPlaying(true);
    }
    setShowStartBtn(false);
  };

  // Audio toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(() => { });
    }
    setMusicPlaying(!musicPlaying);
  };

  const evidence = [
    { icon: '📋', label: 'Acusaciones formales', detail: 'Tráfico sexual y conspiración' },
    { icon: '🏦', label: 'Lavado de dinero', detail: 'Transacciones financieras ilícitas' },
    { icon: '🔗', label: 'Red de chantaje', detail: 'Involucra a la élite global' },
    { icon: '📑', label: 'Pruebas forenses', detail: 'Documentos y testimonios clave' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/videos/epsteinsong.mp3" type="audio/mpeg" />
      </audio>

      {/* Start Button Overlay */}
      {showStartBtn && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a1a]/95 backdrop-blur-xl">
          <button
            onClick={handleManualStart}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-serif text-xl border border-amber-400 rounded-lg shadow-2xl hover:scale-105 transition-transform"
          >
            ENTRAR A LA SALA
          </button>
        </div>
      )}

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        style={{
          background: musicPlaying
            ? 'linear-gradient(135deg, rgba(26,26,46,0.9), rgba(74,25,66,0.9))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,252,245,0.95))',
          backdropFilter: 'blur(12px)',
          border: musicPlaying ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
        }}
        aria-label={musicPlaying ? 'Silenciar música' : 'Reproducir música'}
      >
        {musicPlaying ? (
          <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
      {/* ====== ENTRANCE TRANSITION OVERLAY ====== */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0a0a1a] flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${entered ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <div className={`flex flex-col items-center gap-6 transition-all duration-700 ${entered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}>
          <Scale className="w-16 h-16 text-amber-400/80" />
          <div className="text-center">
            <p className="text-amber-400/40 text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
              Southern District Court of New York
            </p>
            <p className="text-white/90 text-2xl md:text-3xl font-extrabold tracking-tight">
              CASO N° 19-CR-490
            </p>
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </div>
      </div>

      {/* ====== VIDEO BACKGROUND ====== */}
      <div className="fixed inset-0 -z-20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        {/* White frosted overlay — reduced so video is more visible */}
        <div className="absolute inset-0 bg-white/[0.55] backdrop-blur-[1px]" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/50 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/60 to-transparent" />
      </div>

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <div className={`pavi-container text-center transition-all duration-1000 delay-300 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {/* Classified Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 bg-[#0a0a1a]/[0.06] backdrop-blur-sm rounded-full border border-black/[0.06]">
              <Gavel className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-500">
                United States District Court · SDNY
              </span>
            </div>
          </div>

          {/* Court Logo */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/10 to-red-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="/images/corte-logo.png"
                alt="Southern District Court of New York"
                className="relative w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-lg transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.05] mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #4a1942 50%, #1a1a2e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              El Estado de Nueva York
            </span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-400/50" />
            <span className="text-amber-600 font-bold text-sm tracking-[0.15em] uppercase">vs</span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#1a1a2e] mb-8">
            Jeffrey E. Epstein
          </h2>

          {/* Scroll Hint */}
          <div className="mt-12 flex flex-col items-center gap-2 text-gray-400">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Ver expediente</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ====== CASE DESCRIPTION ====== */}
      <section className="relative py-20 md:py-28">
        <div className="pavi-container">
          <div className="max-w-4xl mx-auto">
            {/* Section Label */}
            <div className="reveal flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#1a1a2e]/30" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a2e]/40">
                Expediente del Caso
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#1a1a2e]/30" />
            </div>

            {/* Case File Card */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <div
                className="relative p-8 md:p-12 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,252,245,0.9))',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(180, 160, 120, 0.15)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                {/* Decorative court seal watermark */}
                <div className="absolute top-8 right-8 w-24 h-24 opacity-[0.04]">
                  <Scale className="w-full h-full" />
                </div>

                {/* Case stamp */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-amber-900/[0.08]">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-600/60">
                      Documento clasificado
                    </p>
                    <p className="text-sm font-semibold text-[#1a1a2e]/80">
                      Acta de acusación · Caso 19-CR-490 (RMB)
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg text-gray-600 leading-[1.9] text-justify">
                  Este comité aborda el proceso judicial contra Jeffrey Epstein, centrado en acusaciones
                  de tráfico sexual, lavado de dinero y una presunta red de chantaje que involucra a la
                  élite global. Los participantes deberán analizar las pruebas y argumentos presentados
                  por la fiscalía y la defensa para determinar si Epstein es el arquitecto de una maquinaria
                  criminal sistemática o si existe una duda razonable sobre su culpabilidad. En este entorno
                  de alta presión, será labor del jurado decidir el veredicto final, que dependerá de la
                  capacidad de las partes para desentrañar la verdad detrás de los secretos de poder más
                  polémicos del siglo XXI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== EVIDENCE GRID ====== */}
      <section className="relative pb-20">
        <div className="pavi-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="reveal text-2xl md:text-3xl font-extrabold text-center mb-10 tracking-[-0.03em]">
              <span style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #4a1942 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Puntos clave del caso
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidence.map((item, index) => (
                <div
                  key={index}
                  className="reveal group p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-900/[0.06] cursor-default"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,252,245,0.85))',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(180,160,120,0.1)',
                    transitionDelay: `${index * 0.06}s`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a2e] mb-1 tracking-tight">{item.label}</h3>
                      <p className="text-sm text-gray-400">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== RESOURCES ====== */}
      <section className="relative pb-20">
        <div className="pavi-container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#1a1a2e]/30" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a1a2e]/40">
                Material del Comité
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#1a1a2e]/30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-center gap-4 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1a237e]/[0.06]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(232,234,246,0.4))',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(26,35,126,0.08)',
                }}
              >
                <div className="w-12 h-12 bg-[#e8eaf6] rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#1a237e] group-hover:scale-110">
                  <BookOpen className="w-5 h-5 text-[#1a237e] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-bold text-[#1a237e] tracking-tight">Guía Académica</p>
                  <p className="text-xs text-gray-400 mt-0.5">Material de preparación</p>
                </div>
              </a>

              <a
                href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-center gap-4 p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2e7d32]/[0.06]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(232,245,233,0.4))',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(46,125,50,0.08)',
                  transitionDelay: '0.08s',
                }}
              >
                <div className="w-12 h-12 bg-[#e8f5e9] rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#2e7d32] group-hover:scale-110">
                  <FileText className="w-5 h-5 text-[#2e7d32] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-bold text-[#2e7d32] tracking-tight">Reglamento Especializado</p>
                  <p className="text-xs text-gray-400 mt-0.5">Normas del comité judicial</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====== COMMITTEE INFO BANNER ====== */}
      <section className="relative pb-20">
        <div className="pavi-container">
          <div className="max-w-3xl mx-auto">
            <div
              className="reveal relative p-8 md:p-10 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(26,26,46,0.95) 0%, rgba(10,10,26,0.98) 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              {/* Reflection */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent rounded-t-3xl" />

              {/* Decorative gavel */}
              <div className="absolute top-6 right-8 opacity-[0.06]">
                <Gavel className="w-20 h-20 text-amber-400" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-400/50 text-[10px] font-bold tracking-[0.2em] uppercase">
                      Tipo de comité
                    </p>
                    <h3 className="text-xl font-bold text-white tracking-tight">Comité Judicial</h3>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Este comité simula un juicio real donde los delegados actuarán como fiscales,
                  defensores, jueces y jurado. Se requiere preparación previa y conocimiento
                  del sistema legal estadounidense.
                </p>

                {/* Roles */}
                <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Fiscal', 'Defensor', 'Juez', 'Jurado'].map((role, i) => (
                    <div
                      key={i}
                      className="text-center p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 cursor-default"
                    >
                      <span className="text-xs font-semibold text-amber-400/70">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== VERDICT STAMP ====== */}
      <section className="relative pb-24">
        <div className="pavi-container">
          <div className="reveal flex justify-center">
            <div
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl border-2 border-dashed border-red-300/40 bg-red-50/50 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-[0.15em] text-red-700/70 uppercase">
                Caso abierto · Pendiente de veredicto
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Corte;
