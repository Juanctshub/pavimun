import { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle, FileText, Download, Crown, Volume2, VolumeX } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Investigacion = () => {
  useScrollReveal();

  const [entered, setEntered] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted if possible, but browser might force it
  const videoRef = useRef<HTMLVideoElement>(null);

  // Entrance sequence
  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 1000);
    const t2 = setTimeout(() => setTitleVisible(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Video Config
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
      videoRef.current.currentTime = 8;

      // Force play unmuted
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsMuted(false)).catch(e => {
          console.warn("Autoplay blocked, muting", e);
          videoRef.current!.muted = true;
          videoRef.current!.play();
          setIsMuted(true);
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] text-white font-serif selection:bg-[#fff0f5]/20">

      {/* ====== BACKGROUND VIDEO ====== */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-50 scale-105"
          src="/videos/crown.mp4"
          loop
          // Removed 'muted' attribute to enable sound. 
          // If browser blocks it, user can use the button.
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Darker overlay for text readability */}
      </div>

      {/* Audio Control (Optional but recommended since autoplay audio is often blocked) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleMute}
          className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white/70 hover:text-white"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* ====== LOADING SCREEN (Restored Neon Crown) ====== */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-[2000ms] ease-in-out pointer-events-none ${entered ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className={`flex flex-col items-center gap-6 transition-all duration-[1500ms] ${entered ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}`}>
          {/* Neon Crown Icon using Lucide */}
          <div className="relative">
            <Crown className="w-16 h-16 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] animate-pulse" strokeWidth={1.5} />
          </div>

          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#ffd700]/50 to-transparent" />
          <p className="text-[#ffd700] text-xs font-mono tracking-[0.4em] uppercase">Confidential</p>
        </div>
      </div>

      {/* ====== EASTER EGG MODAL (Reverted to gales.png) ====== */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-500 ${showEasterEgg ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowEasterEgg(false)}
      >
        <div className="relative transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            onClick={() => setShowEasterEgg(false)}
            className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className={`relative p-3 bg-white/5 border border-white/10 shadow-2xl rounded-sm transform transition-all duration-700 ${showEasterEgg ? 'scale-100 rotate-0' : 'scale-90 rotate-3'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/gales.png"
              alt="Lady Di"
              className="max-h-[70vh] w-auto object-contain rounded-sm shadow-inner"
            />
            <p className="text-center font-serif italic text-white/40 mt-3 text-sm tracking-widest">
              The People's Princess
            </p>
          </div>
        </div>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pb-20">

        <div className={`relative z-20 text-center transition-all duration-[2000ms] delay-500 ${titleVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>

          {/* Logo / Icon */}
          <div className="mb-8 flex justify-center animate-float">
            <div className="p-5 rounded-full border border-[#ffd700]/20 bg-[#ffd700]/5 backdrop-blur-sm shadow-[0_0_40px_rgba(255,215,0,0.1)]">
              <Crown className="w-12 h-12 md:w-16 md:h-16 text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" strokeWidth={1} />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-7xl md:text-9xl font-serif font-bold text-white mb-4 tracking-tight drop-shadow-2xl cursor-pointer hover:text-[#ffd700]/90 transition-colors duration-500"
            onClick={() => setShowEasterEgg(true)}
          >
            Lady Di
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-white/80 font-light italic tracking-wide mb-12">
            Muerte de Diana de Gales 1997
          </p>

          {/* London Police Logo */}
          <div className="mb-12 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <img
              src="/images/policia-londres-logo.png"
              alt="Policía Metropolitana de Londres"
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg mx-auto grayscale hover:grayscale-0 transition-all duration-500"
            />
            <p className="text-[10px] text-white/40 font-mono tracking-widest mt-2 uppercase">Official Investigation</p>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${titleVisible ? 'opacity-50' : 'opacity-0'}`}>
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase mb-2 block text-center">Desplazar</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </div>
      </section>

      {/* ====== DOSSIER / DOCS CONTENT ====== */}
      <section className="relative z-10 py-32 bg-[#0a0a0a]">
        <div className="pavi-container max-w-5xl">

          {/* Context Text */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32 reveal">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                La Conspiración <br />
                <span className="italic text-[#ffd700]">Real</span>.
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-light text-justify">
                <span className="text-5xl float-left mr-3 mt-[-10px] font-serif text-[#ffd700]">31</span>
                de agosto, 1997. El Puente del Alma se convierte en el escenario del accidente más mediático del siglo XX.
                Mientras el mundo llora a la "Princesa del Pueblo", las sombras de una trama compleja emergen. ¿Fue realmente un accidente o el cumplimiento de una sentencia real?
              </p>
            </div>

            {/* Decorative Element - Kept fotico.jpeg here as "Foto Confidencial" per previous context, 
                  but the Easter Egg (modal) is back to gales.png */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 to-transparent rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-[#151515] p-2 rotate-1 group-hover:rotate-0 transition-transform duration-700">
                <div
                  className="aspect-video bg-black flex items-center justify-center border border-white/10 cursor-pointer overflow-hidden relative"
                // Clicking this could also show the Easter Egg or just be decorative.
                // Let's keep it decorative or distinct. User only asked to change the Title click Easter Egg back to gales.png.
                >
                  <img
                    src="/images/fotico.jpeg"
                    alt="Classified"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-80 transition-opacity duration-500 blur-sm hover:blur-0"
                  />
                  <p className="font-mono text-xs text-white tracking-widest z-10 bg-black/50 px-3 py-1 border border-white/20">FOTO CONFIDENCIAL</p>
                </div>
              </div>
            </div>
          </div>

          {/* DOCUMENTATION LINKS */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal">
              <AlertTriangle className="w-8 h-8 mx-auto text-[#ffd700] mb-4" />
              <h3 className="text-2xl font-serif text-white">Archivos del Caso</h3>
              <div className="h-[1px] w-24 bg-[#ffd700]/30 mx-auto mt-4" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Guide */}
              <a
                href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-start p-8 bg-white/[0.03] border border-white/10 hover:border-[#ffd700]/50 transition-all duration-500 hover:-translate-y-1"
              >
                <FileText className="w-8 h-8 text-[#ffd700] opacity-70 group-hover:opacity-100 mr-6 mt-1" />
                <div>
                  <h4 className="text-xl font-serif text-white mb-2 group-hover:text-[#ffd700] transition-colors">Guía Académica</h4>
                  <p className="text-sm text-white/50 font-mono">Lectura obligatoria</p>
                </div>
              </a>

              {/* Regulation */}
              <a
                href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-start p-8 bg-white/[0.03] border border-white/10 hover:border-[#ffd700]/50 transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: '100ms' }}
              >
                <Download className="w-8 h-8 text-[#ffd700] opacity-70 group-hover:opacity-100 mr-6 mt-1" />
                <div>
                  <h4 className="text-xl font-serif text-white mb-2 group-hover:text-[#ffd700] transition-colors">Reglamento Especializado</h4>
                  <p className="text-sm text-white/50 font-mono">Normativa y protocolos</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10 py-16 bg-black text-center border-t border-white/5">
        <p className="text-white/30 text-xs font-mono uppercase tracking-[0.3em]">
          Muerte de Diana de Gales · Expediente Cerrado
        </p>
      </footer>

    </div>
  );
};

export default Investigacion;
