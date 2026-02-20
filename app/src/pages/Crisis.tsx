import { useState, useEffect, useRef } from 'react';
import { BookOpen, FileText, AlertTriangle, History, ChevronDown, Volume2, VolumeX } from 'lucide-react';

const Crisis = () => {
  const [entered, setEntered] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Page entrance transition — after loading screen fades, unmute video with fade-in
  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 800);
    const t2 = setTimeout(() => setContentVisible(true), 1200);

    // After loading overlay fades (1.5s), auto-unmute video with volume ramp
    const t3 = setTimeout(() => {
      if (videoRef.current) {
        // Unmute and start volume at 0, ramp up
        videoRef.current.muted = false;
        videoRef.current.volume = 0;
        setIsMuted(false);

        let vol = 0;
        const targetVol = 0.7;
        const ramp = setInterval(() => {
          vol += 0.01;
          if (vol >= targetVol) {
            vol = targetVol;
            clearInterval(ramp);
          }
          if (videoRef.current) {
            videoRef.current.volume = vol;
          } else {
            clearInterval(ramp);
          }
        }, 40); // ~2.8s total ramp
      }
    }, 1800); // After loading overlay is gone

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Autoplay video (muted for browser policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.warn("Video autoplay blocked", e));
    }
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.7;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black text-[#f0e6d2] font-serif selection:bg-[#c9a980]/40 selection:text-white">

      {/* ====== BACKGROUND VIDEO ====== */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-100"
          src="/videos/venezuela.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* ====== LOADING OVERLAY ====== */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0908] transition-opacity duration-[1500ms] ease-out pointer-events-none ${entered ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative mb-6">
          <History className="w-12 h-12 text-[#c9a980] animate-spin-slow opacity-80" />
          <div className="absolute inset-0 border border-[#c9a980]/20 rounded-full animate-ping" />
        </div>
        <p className="text-[#c9a980] text-xs font-mono tracking-[0.5em] uppercase">Cargando Archivos...</p>
      </div>

      {/* Audio Toggle Button */}
      <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-1000 ${entered ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={toggleAudio}
          className="p-3 bg-black/40 backdrop-blur-md border border-[#c9a980]/30 rounded-full text-[#c9a980] hover:bg-[#c9a980]/20 transition-all"
        >
          {!isMuted ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32">

        <div className={`relative w-full max-w-5xl mx-auto flex flex-col items-center text-center transition-all duration-[1000ms] ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Logo */}
          <div className="mb-12 relative animate-float">
            <img
              src="/images/congreso_logo_v2.png"
              alt="Congreso de la República"
              className="relative h-48 md:h-64 w-auto object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Titles */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-6 opacity-90">
              <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#c9a980] to-transparent" />
              <span className="text-[#c9a980] text-sm md:text-lg font-mono tracking-[0.4em] uppercase text-shadow-sm">
                Congreso de la República
              </span>
              <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#c9a980] to-transparent" />
            </div>

            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight drop-shadow-2xl">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#fffaf0] to-[#c9a980]">
                Crisis
              </span>
            </h1>

            <p className="text-4xl md:text-6xl text-[#c9a980] font-light italic tracking-wide drop-shadow-lg">
              1973 — 1998
            </p>
          </div>

          {/* Quote Card */}
          <div className="mt-16 p-8 md:p-10 bg-black/40 backdrop-blur-md border border-[#c9a980]/20 rounded-sm max-w-3xl transform hover:scale-[1.02] transition-transform duration-500">
            <p className="text-xl md:text-2xl text-[#e0d8cc] font-serif leading-relaxed italic">
              "Una nación en la encrucijada de su destino, obligada a elegir entre la grandeza o el olvido."
            </p>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 ${contentVisible ? 'opacity-70' : 'opacity-0'}`}>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#c9a980]">EXPLORAR</span>
          <ChevronDown className="w-6 h-6 text-[#c9a980] animate-bounce" />
        </div>
      </section>

      {/* ====== CONTENT SECTION ====== */}
      <section className="relative z-10 py-24 md:py-32 bg-black/90 backdrop-blur-sm border-t border-red-900/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-20 items-center">

            {/* Image Block */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-[#c9a980]/10 rounded-sm rotate-3 group-hover:rotate-1 transition-transform duration-700" />
              <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-2xl border border-[#c9a980]/10">
                <img
                  src="/images/venezuela_congress.jpg"
                  alt="Sesión del Congreso"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 border-l-2 border-[#c9a980] pl-4">
                  <p className="text-white font-serif text-xl">Archivo Histórico</p>
                  <p className="text-[#c9a980] text-sm font-mono mt-1">Caracas, Venezuela</p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-10">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-[#c9a980] mb-4">El Deber Patriótico</h2>
                <div className="h-1 w-20 bg-[#c9a980]" />
              </div>

              <div className="space-y-8 text-lg md:text-xl text-[#d6d3cd] leading-loose font-light">
                <p className="drop-shadow-md">
                  <strong className="text-[#c9a980] font-bold">Venezuela</strong> se encuentra en un momento decisivo. La riqueza petrolera y la estabilidad democrática están a prueba frente a los desafíos económicos y sociales que definirán el próximo siglo.
                </p>
                <p className="drop-shadow-md">
                  En este comité, usted no es solo un delegado: es un <span className="italic text-white">parlamentario</span> con el poder de reescribir la historia. ¿Podrá su bancada superar la polarización y legislar para el progreso, o caerá la República en el estancamiento?
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====== DOCUMENTATION CARDS ====== */}
      <section className="relative z-10 py-32 bg-[#12100e] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a980]/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c9a980]/5 rounded-full blur-[100px]" />

        <div className="pavi-container relative z-10">
          <div className="text-center mb-20">
            <AlertTriangle className="w-12 h-12 text-[#c9a980] mx-auto mb-6" strokeWidth={1.5} />
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Documentación Oficial</h3>
            <p className="text-[#a89f91] font-mono uppercase tracking-[0.2em] text-sm">Acceso Permitido Exclusivamente a Congresistas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            <a
              href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-10 bg-[#1c1917] hover:bg-[#25211e] border border-[#c9a980]/10 hover:border-[#c9a980]/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
              <div className="relative flex items-center gap-6">
                <div className="w-16 h-16 bg-[#c9a980]/10 rounded-full flex items-center justify-center group-hover:bg-[#c9a980]/20 transition-colors">
                  <BookOpen className="w-8 h-8 text-[#c9a980]" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif text-white mb-2 group-hover:text-[#c9a980] transition-colors">Guía Académica</h4>
                  <p className="text-[#888] text-sm font-mono">Lectura obligatoria para sesiones</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <div className="w-8 h-8 rounded-full border border-[#c9a980] flex items-center justify-center">
                    <span className="text-[#c9a980] text-lg">→</span>
                  </div>
                </div>
              </div>
            </a>

            <a
              href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-10 bg-[#1c1917] hover:bg-[#25211e] border border-[#c9a980]/10 hover:border-[#c9a980]/40 transition-all duration-500 overflow-hidden"
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
              <div className="relative flex items-center gap-6">
                <div className="w-16 h-16 bg-[#c9a980]/10 rounded-full flex items-center justify-center group-hover:bg-[#c9a980]/20 transition-colors">
                  <FileText className="w-8 h-8 text-[#c9a980]" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif text-white mb-2 group-hover:text-[#c9a980] transition-colors">Reglamento Especializado</h4>
                  <p className="text-[#888] text-sm font-mono">Normativa y protocolos</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <div className="w-8 h-8 rounded-full border border-[#c9a980] flex items-center justify-center">
                    <span className="text-[#c9a980] text-lg">→</span>
                  </div>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10 py-16 bg-black text-center border-t border-[#c9a980]/10">
        <p className="text-[#444] text-xs font-mono uppercase tracking-[0.4em]">Memoria y Cuenta 1973-1998</p>
      </footer>

    </div>
  );
};

export default Crisis;
