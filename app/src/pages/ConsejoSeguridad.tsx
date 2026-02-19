
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Users, ShieldAlert, Radio, FileText, Lock, Globe, Flame, Skull } from 'lucide-react';

const ConsejoSeguridad = () => {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false); // For exit transition
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showStartBtn, setShowStartBtn] = useState(false);

  useEffect(() => {
    const attemptPlay = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          console.warn("Autoplay blocked", e);
          setShowStartBtn(true);
        }
      }
    };
    attemptPlay();

    const timer = setTimeout(() => {
      if (!showStartBtn) {
        setExiting(true);
        setTimeout(() => setLoading(false), 800);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [showStartBtn]);

  const handleManualStart = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    setShowStartBtn(false);
    setExiting(true);
    setTimeout(() => setLoading(false), 800);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className={`fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${exiting ? 'scale-y-0 opacity-0 brightness-200' : ''}`}>

        {/* === BACKGROUND LAYERS === */}
        {/* Deep Dark Blue (Top) */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#020617] to-[#001a4d] z-0"></div>
        {/* Deep Dark Red (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#2d0303] to-[#5c0a0a] z-0"></div>

        {/* Noise & Texture - INCREASED INTENSITY */}
        <div className="absolute inset-0 z-10 opacity-50 pointer-events-none animate-noise bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] mix-blend-overlay"></div>

        {/* CRT Scanlines - INCREASED VISIBILITY */}
        <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-80"></div>

        {/* Moving Scan Bar */}
        <div className="absolute inset-x-0 h-4 bg-white/20 z-20 animate-scan-down"></div>

        {/* Vignette (Dark Corners) */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] pointer-events-none"></div>

        {/* === CONTENT === */}
        <div className="relative z-30 text-center space-y-8">
          <div className="inline-block border-4 border-red-900/50 p-6 md:p-10 bg-black/80 backdrop-blur-sm relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-red-900/20 animate-ping"></div>
            <h1 className="text-6xl md:text-9xl font-black text-[#ff0000] tracking-tighter animate-glitch glitch-text relative z-10 drop-shadow-[0_0_25px_rgba(255,0,0,0.8)]">
              NO SIGNAL
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 text-red-600 font-mono text-xl animate-bounce tracking-widest bg-black px-4 py-1">
              <AlertTriangle className="w-6 h-6 animate-spin" />
              <span className="animate-pulse">CONNECTION LOST</span>
              <AlertTriangle className="w-6 h-6 animate-spin" />
            </div>

            {showStartBtn ? (
              <button
                onClick={handleManualStart}
                className="mt-4 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase rounded shadow-[0_0_30px_red] animate-pulse"
              >
                RE-ESTABLISH UPLINK
              </button>
            ) : (
              <>
                <div className="h-2 w-64 bg-gray-900 rounded overflow-hidden border border-gray-800 relative">
                  <div className="absolute inset-0 bg-red-900/50"></div>
                  <div className="h-full bg-red-600 animate-progress-indeterminate"></div>
                </div>
                <p className="text-gray-500 font-mono text-xs tracking-[0.5em] animate-pulse">
                  ATTEMPTING TO RECONNECT...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0a0505] text-gray-200 font-sans selection:bg-red-900/50 selection:text-white">

      {/* ====== BACKGROUND ASSETS ====== */}
      {/* Video Background (Muted) */}
      <div className="fixed inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-50 filter grayscale contrast-125 brightness-75 scale-105"
          src="/videos/haiti_bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Gritty Overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
      </div>

      {/* Audio Background */}
      <audio ref={audioRef} src="/audio/haiti_music.mp3" loop />

      {/* Audio Control Floating Button */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full border backdrop-blur-md transition-all shadow-xl group ${!isPlaying ? 'bg-red-600/20 border-red-500/50 text-red-500' : 'bg-green-600/20 border-green-500/50 text-green-400'}`}
        >
          {isPlaying ? <Radio className="w-6 h-6 animate-pulse" /> : <ShieldAlert className="w-6 h-6" />}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? "MOOD AUDIO: ON" : "PLAY MOOD AUDIO"}
          </span>
        </button>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center">

        <div className="mb-6 relative group animate-fade-in-up">
          <div className="absolute -inset-4 bg-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          {/* UN Logo from Downloads */}
          <img
            src="/images/onu.png"
            alt="United Nations"
            className="relative w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <div className="space-y-4 max-w-5xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 text-red-500 animate-pulse bg-black/60 backdrop-blur-sm py-1 px-4 rounded border border-red-900/50 inline-flex mx-auto">
            <Radio className="w-4 h-4 animate-spin-slow" />
            <span className="tracking-[0.2em] font-bold text-xs md:text-sm uppercase">Live Transmission: Port-au-Prince</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(220,38,38,0.5)] mb-2 leading-none">
            CRISIS: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900 animate-pulse glitch-text">HAITÍ</span>
          </h1>

          <div className="max-w-3xl mx-auto border-y border-red-900/30 py-4 bg-black/60 backdrop-blur-md">
            <h2 className="text-sm md:text-xl text-gray-300 tracking-[0.2em] font-mono uppercase">
              Consejo de Seguridad · Sesión de Emergencia
            </h2>
          </div>
        </div>

        {/* Crisis Summary Card */}
        <div className="max-w-4xl mx-auto bg-black/70 backdrop-blur-md border-l-4 border-red-600 p-6 md:p-8 rounded-r-lg shadow-2xl relative overflow-hidden animate-slide-up-fade">
          <div className="absolute top-0 right-0 p-4 opacity-50">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed text-justify relative z-10">
            "Haití no está al borde del abismo; <span className="text-white font-bold bg-red-900/40 px-1">ha caído en él.</span> Puerto Príncipe es hoy una zona de guerra urbana donde coaliciones de pandillas armadas controlan más del 80% de la capital, desafiando abiertamente la soberanía del Estado."
          </p>
        </div>

      </section>

      {/* ====== SITUATION REPORT & CONTENT ====== */}
      <section className="relative z-10 py-20 bg-black/40 backdrop-blur-sm border-t border-red-900/20">
        <div className="container mx-auto px-4 md:px-8">

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Visuals Column */}
            <div className="space-y-8 sticky top-24">
              <div className="relative group rounded-xl overflow-hidden border border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img src="/images/haiti_crisis.jpg" alt="Crisis in Haiti" className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0" />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center gap-2 text-red-500 mb-1">
                    <Flame className="w-5 h-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">Civil Unrest</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Estado de Sitio</h3>
                </div>
              </div>

              <div className="bg-[#1a0505] border border-red-900/30 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4 border-b border-red-900/20 pb-4">
                  <div className="p-3 bg-red-900/20 rounded-full text-red-500">
                    <Skull className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Colapso Total</h4>
                    <p className="text-red-400 text-xs tracking-wider uppercase">Institutional Disintegration</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Tras el magnicidio de Jovenel Moïse, el tejido institucional se ha desintegrado.
                  La situación humanitaria es catastrófica (Fase 4 de la CIP). El bloqueo de terminales de combustible, el resurgimiento del cólera y la violencia sexual sistemática definen la "vida" diaria.
                </p>
                <div className="w-full bg-red-900/10 h-1 rounded overflow-hidden">
                  <div className="h-full bg-red-600 w-[95%] animate-pulse"></div>
                </div>
                <p className="text-right text-[10px] text-red-500 mt-1 font-mono">DANGER LEVEL: CRITICAL</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-12">

              {/* Mission Statement */}
              <div className="bg-black/60 border-l-2 border-red-600 pl-6 py-2">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <ShieldAlert className="w-8 h-8 text-red-600" />
                  Misión del Consejo
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                  Ante el colapso institucional y el control territorial de las bandas armadas, el Consejo de Seguridad se reúne de urgencia.
                  Los delegados deben debatir la viabilidad de una <strong className="text-white">intervención internacional</strong> y el restablecimiento del orden democrático antes de que la violencia alcance un punto de no retorno.
                </p>
              </div>

              {/* The Debate */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Globe className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">El Dilema Diplomático</h4>
                    <p className="text-gray-400 leading-relaxed">
                      El debate oscila entre el principio de <strong className="text-white">“No Intervención”</strong> y la <strong className="text-white">“Responsabilidad de Proteger” (R2P)</strong>.
                      ¿Es ético intervenir militarmente en una nación soberana para salvarla de sí misma?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Acción Requerida</h4>
                    <p className="text-gray-400 leading-relaxed">
                      Los delegados deben trazar una hoja de ruta política para un gobierno de transición legítimo e implementar el embargo de armas (Resolución 2653).
                      La retórica se ha agotado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Blockquote */}
              <blockquote className="border-l-4 border-white/20 pl-6 italic text-xl text-gray-500 my-8 py-4">
                "Haití se desangra ante los ojos del mundo. El fracaso aquí no es una opción diplomática; es una sentencia de muerte para millones."
              </blockquote>

              {/* Documentation Links */}
              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                {/* Guia */}
                <a
                  href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" // Update if different specific folder needed
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#1a0505] hover:bg-[#2a0a0a] border border-red-900/30 hover:border-red-600/50 rounded transition-all group"
                >
                  <div className="p-3 bg-red-900/20 rounded text-red-500 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Guía Académica</h5>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Protocolos de Crisis</span>
                  </div>
                </a>

                {/* Reglamento */}
                <a
                  href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo" // Update if different specific folder needed
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#1a0505] hover:bg-[#2a0a0a] border border-red-900/30 hover:border-red-600/50 rounded transition-all group"
                >
                  <div className="p-3 bg-red-900/20 rounded text-red-500 group-hover:text-white transition-colors">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">Reglamento</h5>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Normativa Especial</span>
                  </div>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ConsejoSeguridad;
