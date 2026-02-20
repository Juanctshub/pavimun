import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Globe, Newspaper, FileText } from 'lucide-react';

const Prensa = () => {
  const [loading, setLoading] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [crtPhase, setCrtPhase] = useState(0); // 0=playing, 1=static, 2=shrink, 3=done
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Simple HTML5 Audio ref
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // HIDE NAVIGATION DURING LOADING
  useEffect(() => {
    const nav = document.querySelector('header');
    if (nav) {
      if (loading) {
        nav.style.opacity = '0';
        nav.style.visibility = 'hidden';
        nav.style.pointerEvents = 'none';
      } else {
        nav.style.opacity = '1';
        nav.style.visibility = 'visible';
        nav.style.pointerEvents = 'auto';
      }
    }
    return () => {
      if (nav) {
        nav.style.opacity = '1';
        nav.style.visibility = 'visible';
        nav.style.pointerEvents = 'auto';
      }
    }
  }, [loading]);

  // Mouse Parallax
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // MULTI-PHASE CRT SHUTDOWN when video ends
  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Phase 1: Static/noise flash (200ms)
    setCrtPhase(1);
    setTimeout(() => {
      // Phase 2: Shrink to line (400ms)
      setCrtPhase(2);
      setTimeout(() => {
        // Phase 3: Fade dot out (300ms)
        setCrtPhase(3);
        setTimeout(() => {
          setLoading(false);
          window.scrollTo(0, 0);
        }, 300);
      }, 400);
    }, 250);
  };

  // START BG MUSIC WHEN LOADING FINISHES
  useEffect(() => {
    if (!loading) {
      const audio = new Audio('/audio/prensamusic.mp3');
      audio.loop = true;
      audio.volume = 0;
      bgAudioRef.current = audio;

      const playAndFade = async () => {
        try {
          await audio.play();
          setIsPlaying(true);

          // Fade in 0 -> 0.6 over ~4s
          let vol = 0;
          const target = 0.6;
          const step = target / 80;
          const fade = setInterval(() => {
            vol += step;
            if (vol >= target) {
              vol = target;
              clearInterval(fade);
            }
            if (bgAudioRef.current) {
              bgAudioRef.current.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 50);
        } catch (err) {
          console.warn("Audio autoplay blocked:", err);
          setIsPlaying(false);
        }
      };

      setTimeout(playAndFade, 200);

      return () => {
        audio.pause();
        audio.src = '';
        bgAudioRef.current = null;
      };
    }
  }, [loading]);

  const toggleAudio = () => {
    if (bgAudioRef.current) {
      if (isPlaying) {
        bgAudioRef.current.pause();
      } else {
        bgAudioRef.current.volume = 0.6;
        bgAudioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // CRT phase CSS classes
  const getCrtClass = () => {
    if (crtPhase === 1) return 'crt-static';
    if (crtPhase === 2) return 'crt-shrink';
    if (crtPhase === 3) return 'crt-dot-out';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-blue-500/30 selection:text-blue-200 -mt-[72px]">

      {/* ====== LOADING SCREEN — TV MONITOR ====== */}
      {loading && (
        <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden ${crtPhase >= 3 ? 'opacity-0 transition-opacity duration-300' : 'opacity-100'}`}>

          {/* Ambient glow */}
          <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 ${videoEnded ? 'opacity-0' : 'opacity-100'}`}
            style={{ background: 'radial-gradient(circle at center, rgba(20,30,50,0.3) 0%, #000000 70%)' }}
          />

          {/* Monitor Container */}
          <div className={`relative z-10 origin-center ${getCrtClass()}`}>

            {/* Monitor Frame */}
            <div className="relative bg-[#1a1a1a] p-3 md:p-6 rounded-[2rem] border border-gray-800 shadow-[0_0_80px_rgba(0,100,255,0.15)] max-w-[90vw] md:max-w-4xl mx-auto">

              {/* Screen */}
              <div className="relative overflow-hidden rounded-xl border-4 border-gray-900 bg-black aspect-video shadow-inner">

                {/* Video — NOT muted */}
                <video
                  ref={introVideoRef}
                  src="/videos/prensa_intro.mp4"
                  autoPlay
                  playsInline
                  className={`w-full h-full object-contain bg-white transition-opacity duration-200 ${crtPhase >= 1 ? 'opacity-0' : 'opacity-100'}`}
                  onEnded={handleVideoEnd}
                />

                {/* Static noise overlay — appears during phase 1 */}
                {crtPhase >= 1 && (
                  <div className="absolute inset-0 crt-noise-bg animate-noise" />
                )}

                {/* Scanlines - always visible */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }} />

                {/* Phosphor glow during shutdown */}
                {crtPhase >= 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_60px_rgba(100,150,255,0.4)] animate-pulse" />
                  </div>
                )}

                {/* LIVE badge */}
                <div className={`absolute top-4 left-6 flex items-center gap-3 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 transition-opacity duration-200 ${crtPhase >= 1 ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                  <span className="text-white font-bold tracking-widest text-[10px] drop-shadow-md font-mono">LIVE FEED // UPLINK</span>
                </div>

                {/* REC */}
                <div className={`absolute top-4 right-6 text-[10px] font-mono text-red-500 animate-pulse font-bold tracking-widest transition-opacity duration-200 ${crtPhase >= 1 ? 'opacity-0' : 'opacity-100'}`}>● REC</div>

                {/* Timecode */}
                <div className={`absolute bottom-4 right-6 text-[10px] font-mono text-white/30 transition-opacity duration-200 ${crtPhase >= 1 ? 'opacity-0' : 'opacity-100'}`}>
                  TC 00:00:00:00
                </div>

                {/* Channel badge */}
                <div className={`absolute bottom-4 left-6 text-[10px] font-mono text-white/20 transition-opacity duration-200 ${crtPhase >= 1 ? 'opacity-0' : 'opacity-100'}`}>
                  CH-01 // ENCRYPTED
                </div>

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.6)]" />
              </div>

              {/* Glass reflection */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[2rem]" />
            </div>

            {/* Status text */}
            <div className={`text-center mt-6 space-y-2 transition-opacity duration-200 ${crtPhase >= 2 ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-blue-500 font-mono text-xs tracking-[0.3em] animate-pulse">ESTABLISHING SECURE CONNECTION...</p>
              <div className="h-0.5 w-32 bg-blue-900/50 mx-auto rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-loading-bar w-1/2" />
              </div>
            </div>
          </div>

          {/* White flash */}
          <div className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-100 ${crtPhase === 1 ? 'opacity-30' : 'opacity-0'}`} />
        </div>
      )}

      {/* ====== MAIN CONTENT ====== */}

      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-50 filter contrast-110 saturate-100"
          src="/videos/prensa.mp4"
          autoPlay loop muted playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_130%)] opacity-70" />
      </div>

      <section className={`relative z-10 min-h-screen flex items-center justify-center px-2 md:px-8 pt-40 md:pt-24 perspective-1000 transition-all duration-1000 ease-out ${loading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>

        <div
          className="w-full max-w-6xl transition-transform duration-100 ease-out preserve-3d"
          style={typeof window !== 'undefined' && window.innerWidth >= 768 ? { transform: `rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)` } : {}}
        >
          <div className="flex flex-col items-center justify-center text-center mb-16 translate-z-20 w-full relative z-20 mt-12 md:mt-0">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-black/60 border border-blue-500/50 rounded-full mb-6 md:mb-8 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              <span className="w-2 h-2 bg-red-600 rounded-full absolute" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white uppercase">Live Broadcast</span>
            </div>
            <h1 className="text-[20vw] leading-[0.8] sm:text-8xl md:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl select-none w-full relative z-10 py-2">
              PRENSA
            </h1>
            <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4 md:mt-6 mb-4 md:mb-6" />
            <h2 className="text-[3.5vw] sm:text-2xl md:text-3xl font-light tracking-[0.2em] md:tracking-[0.4em] text-blue-100 uppercase opacity-90 select-none font-mono">
              CONOCIENDO LA REALIDAD
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 px-4">
            <div className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl hover:bg-black/60 transition-all duration-500 translate-z-10 hover:translate-z-20 hover:border-blue-500/30">
              <div className="absolute -top-10 -left-6 bg-blue-600/20 backdrop-blur-md border border-blue-500/50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Globe className="w-10 h-10 text-blue-200" />
              </div>
              <h3 className="text-3xl font-bold mb-4 mt-4 text-white group-hover:text-blue-400 transition-colors">La Voz de la Verdad</h3>
              <p className="text-lg text-gray-300 leading-relaxed font-light text-justify">
                El comité de prensa tomará el papel de puente entre la diplomacia y la realidad de los hechos. Durante los tres días de constantes actualizaciones y negociaciones, los representantes de cada medio de comunicación tendrán la responsabilidad de mantener a la gente informada.
              </p>
            </div>
            <div className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl hover:bg-black/60 transition-all duration-500 translate-z-10 hover:translate-z-20 hover:border-blue-500/30 delay-100">
              <div className="absolute -top-10 -right-6 bg-white/10 backdrop-blur-md border border-white/30 w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] rotate-[-6deg] group-hover:rotate-0 transition-transform duration-500">
                <Newspaper className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4 mt-4 text-white group-hover:text-blue-400 transition-colors">Testigos de la Historia</h3>
              <p className="text-lg text-gray-300 leading-relaxed font-light text-justify">
                En un mundo de secretos y crisis globales, la prensa es el único bastión de la realidad. Este comité no solo observa, sino que fiscaliza: los corresponsales tienen el deber de informar con veracidad y exponer las agendas ocultas.
              </p>
            </div>
          </div>

          <div className="mb-20 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:bg-blue-900/10 transition-colors text-center group translate-z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📰</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Periodismo</h3>
                <p className="text-gray-400 text-sm tracking-wide">Informar con veracidad los acontecimientos</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:bg-blue-900/10 transition-colors text-center group translate-z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📸</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Fotografía</h3>
                <p className="text-gray-400 text-sm tracking-wide">Capturar los momentos más importantes</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:bg-blue-900/10 transition-colors text-center group translate-z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎙️</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Entrevistas</h3>
                <p className="text-gray-400 text-sm tracking-wide">Cuestionar a los delegados</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 to-black/40 backdrop-blur-md border border-blue-500/20 rounded-2xl p-10 max-w-4xl mx-auto text-center translate-z-20 shadow-[0_0_30px_rgba(30,58,138,0.2)]">
              <div className="text-5xl mb-6">📺</div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">Agencia Mundial de Prensa</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Los corresponsales de prensa tienen la misión de documentar todos los eventos del modelo, entrevistar a delegados y publicar artículos que informen sobre las decisiones tomadas en cada comité.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-12 translate-z-0">
            <a href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" target="_blank" rel="noopener noreferrer" className="group relative cursor-pointer">
              <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative flex items-center gap-5 bg-[#0a0a0a] border border-blue-500/30 px-8 py-5 rounded-full hover:border-blue-400 hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="p-3 bg-blue-600/20 rounded-full group-hover:bg-blue-600 text-blue-400 group-hover:text-white transition-colors duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold group-hover:text-blue-300">Documentación Oficial</span>
                  <span className="text-xl font-bold text-white group-hover:text-white transition-colors">Guía Académica</span>
                </div>
                <div className="ml-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-blue-400">→</div>
              </div>
            </a>
            <div className="text-center max-w-2xl mx-auto opacity-70 mb-20">
              <p className="text-2xl font-serif italic text-gray-400">"Si no se comunica, la historia simplemente no existe."</p>
              <div className="w-16 h-1 bg-blue-500 mx-auto mt-6 rounded-full opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-1000 ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full border backdrop-blur-lg transition-all shadow-2xl hover:scale-110 active:scale-95 ${!isPlaying ? 'bg-black/40 border-white/20 text-gray-400' : 'bg-blue-600 border-blue-400 text-white shadow-blue-500/50'}`}
        >
          {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .perspective-1000 { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .translate-z-0 { transform: translateZ(0px); }
          .translate-z-10 { transform: translateZ(30px); }
          .translate-z-20 { transform: translateZ(60px); }
          .translate-z-30 { transform: translateZ(90px); }
        }
        .animate-loading-bar { animation: loading-bar 1.5s ease-in-out infinite; }

        /* CRT Phase Animations */
        .crt-static {
          animation: crt-glitch 0.15s steps(3) 2;
        }
        .crt-shrink {
          animation: crt-shrink 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .crt-dot-out {
          animation: crt-dot-out 0.3s ease-out forwards;
        }

        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes crt-glitch {
          0%   { transform: translate(0, 0) scale(1); filter: brightness(1.5) saturate(2); }
          25%  { transform: translate(-2px, 1px) scale(1.002); filter: brightness(2) saturate(0); }
          50%  { transform: translate(2px, -1px) scale(0.998); filter: brightness(1) saturate(3); }
          75%  { transform: translate(-1px, 2px) scale(1.001); filter: brightness(3) hue-rotate(20deg); }
          100% { transform: translate(0, 0) scale(1); filter: brightness(1); }
        }

        @keyframes crt-shrink {
          0%   { transform: scaleX(1) scaleY(1); opacity: 1; filter: brightness(1); }
          30%  { transform: scaleX(1.05) scaleY(0.005); opacity: 1; filter: brightness(4); }
          100% { transform: scaleX(0) scaleY(0.005); opacity: 0.6; filter: brightness(6); }
        }

        @keyframes crt-dot-out {
          0%   { transform: scaleX(0) scaleY(0.005); opacity: 0.6; filter: brightness(6); }
          100% { transform: scale(0); opacity: 0; filter: brightness(0); }
        }

        /* CRT Noise Background */
        .crt-noise-bg {
          background: repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.03) 0px,
            rgba(0,0,0,0.05) 1px,
            rgba(255,255,255,0.05) 2px
          );
          background-size: 100% 3px;
        }
        .animate-noise {
          animation: noise 0.15s steps(5) infinite;
        }
        @keyframes noise {
          0%   { background-position: 0 0; }
          20%  { background-position: -2px 3px; }
          40%  { background-position: 3px -1px; }
          60%  { background-position: -1px 4px; }
          80%  { background-position: 2px -3px; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
};

export default Prensa;
