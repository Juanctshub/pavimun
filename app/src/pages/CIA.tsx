import { useState, useEffect, useRef } from 'react';
import { Shield, Lock, AlertTriangle, Fingerprint, FileText, ChevronDown, Volume2, VolumeX, Eye, Brain } from 'lucide-react';

const CIA = () => {
  // No useScrollReveal - ensuring content visibility

  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [accessGranted, setAccessGranted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showStartBtn, setShowStartBtn] = useState(false);

  // Boot Sequence Logic
  useEffect(() => {
    const lines = [
      "INITIALIZING SECURE CONNECTION...",
      "BYPASSING FIREWALLS...",
      "ACCESSING CENTRAL INTELLIGENCE DATABASE...",
      "DECRYPTING FILE: MK-ULTRA...",
      "SUBJECT: THEODORE KACZYNSKI...",
      "STATUS: CLASSIFIED [TOP SECRET]",
      "ACCESS GRANTED."
    ];

    let delay = 0;
    lines.forEach((line, index) => {
      delay += Math.random() * 400 + 300;
      setTimeout(() => {
        setBootSequence(prev => [...prev, line]);
        if (index === lines.length - 1) {
          // Only grant access if we aren't waiting for audio manual start
          if (!showStartBtn) {
            setTimeout(() => setAccessGranted(true), 800);
          }
        }
      }, delay);
    });
  }, [showStartBtn]);



  // Video Config
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3; // Skip initial black transition
      videoRef.current.playbackRate = 1.0;

      const attemptPlay = async () => {
        try {
          videoRef.current!.volume = 1.0;
          await videoRef.current!.play();
          setIsMuted(false);
        } catch (e) {
          console.warn("Autoplay blocked", e);
          setShowStartBtn(true);
        }
      };
      attemptPlay();
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!accessGranted) {
    return (
      <div className="fixed inset-0 bg-black text-[#0f0] font-mono p-10 z-[100] flex flex-col justify-end">
        <div className="space-y-2">
          {bootSequence.map((line, i) => (
            <p key={i} className="typing-effect animate-pulse">{`> ${line}`}</p>
          ))}
          <p className="animate-blink">_</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#050510] text-gray-200 font-sans selection:bg-blue-900/50 selection:text-white">

      {/* ====== BACKGROUND VIDEO & OVERLAYS ====== */}
      <div className="fixed inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60 filter blur-[2px] scale-105"
          src="/videos/mkultra_v3.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        {/* Difuminado/Overlay requested */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/90 via-[#050510]/60 to-[#050510]/95 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
      </div>

      {/* Audio Control */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full border backdrop-blur-md transition-all shadow-xl group ${isMuted ? 'bg-red-600/20 border-red-500/50 text-red-500' : 'bg-blue-600/20 border-blue-500/50 text-blue-400'}`}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
          </span>
        </button>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-4 text-center w-full">

        <div className="animate-float mb-8 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
          <img src="/images/cia-logo.png" alt="CIA" className="relative w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl" />
        </div>

        <div className="space-y-6 max-w-4xl mx-auto w-full mb-12">
          <div className="flex items-center justify-center gap-3 text-red-600 animate-pulse bg-red-950/20 py-1 px-4 rounded-full border border-red-900/30 inline-flex mx-auto">
            <AlertTriangle className="w-4 h-4" />
            <span className="tracking-[0.2em] font-bold text-xs md:text-sm uppercase">Ultra Top Secret · Eyes Only</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-2">
            MK<span className="text-red-600">-</span>ULTRA
          </h1>

          <div className="max-w-2xl mx-auto border-y border-white/10 py-4 bg-black/40 backdrop-blur-sm">
            <h2 className="text-sm md:text-lg text-blue-200 tracking-[0.15em] font-mono leading-relaxed">
              PROTOCOLOS DE MODIFICACIÓN CONDUCTUAL
            </h2>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3 opacity-60 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] text-white uppercase font-bold">Scroll to Decrypt</span>
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </section>

      {/* ====== INTRODUCCIÓN & MISIÓN ====== */}
      <section className="relative z-10 py-24 bg-transparent border-t border-white/5">
        <div className="pavi-container">

          {/* Intro Text */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <div className="inline-block mb-6 p-2 bg-blue-900/10 rounded-full border border-blue-500/10">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light text-justify md:text-center drop-shadow-md">
              "Bajo el manto del secreto máximo, este comité de investigación se adentra en las fronteras más oscuras de la psicología y la defensa nacional.
              El objetivo es analizar los límites de la resistencia mental humana y la efectividad de tácticas de interrogatorio extremas mediante el uso de sustancias y condicionamiento.
              Como responsables de este programa, los delegados deben debatir si el fin de la seguridad global justifica la transgresión de la integridad individual o si existen barreras éticas infranqueables en la búsqueda del control mental.
              La misión es clara: <strong className="text-white font-medium">definir hasta dónde es capaz de llegar la ciencia en nombre del poder.</strong>"
            </p>
          </div>

          {/* Comité Info Card */}
          <div className="max-w-5xl mx-auto bg-[#0a0a1a]/80 backdrop-blur-md border border-blue-900/30 rounded-lg p-8 md:p-12 mb-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[60px]" />
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="p-6 bg-blue-950/30 rounded-full border border-blue-500/20">
                <Brain className="w-16 h-16 text-blue-400" />
              </div>
              <div className="text-center md:text-left space-y-4">
                <h3 className="text-3xl font-bold text-white tracking-wide">Comité de Inteligencia</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Los delegados asumen el rol de agentes de inteligencia y científicos durante el controvertido programa MK ULTRA.
                  Debatirán los límites éticos de la investigación en control mental y tortura psicológica.
                </p>
              </div>
            </div>
          </div>

          {/* NARRATIVA HISTÓRICA & IMÁGENES */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">

            {/* Text Block 1 */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold tracking-widest uppercase">Guerra Fría · 1959</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                La Carrera por la <br />
                <span className="text-red-600">Mente Humana</span>
              </h3>
              <p className="text-gray-400 leading-loose text-justify bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                Estamos en el punto álgido de la Guerra Fría. La inteligencia soviética y china ha avanzado peligrosamente en técnicas de lavado de cerebro; Estados Unidos no puede permitirse quedar atrás.
                La mente humana es la nueva frontera de la guerra y el objetivo es claro: lograr el control total de la psique, la reprogramación de la memoria y la creación del “agente perfecto”.
              </p>
            </div>

            {/* Image MK1 */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/20 to-red-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-[1.01] transition-transform duration-500">
                <img src="/images/mk1.jpg" alt="MK Ultra Experiments" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-xs text-white/70 font-mono">FIG 1.A: SENSORY DEPRIVATION</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            {/* Image MK2 */}
            <div className="order-2 md:order-1 relative group">
              <div className="absolute -inset-2 bg-gradient-to-bl from-red-600/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg" />
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-[1.01] transition-transform duration-500">
                <img src="/images/mk2.jpg" alt="Subject Profile" className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-xs text-red-400 font-mono">TARGET ACQUIRED: HARVARD LAB</p>
                </div>
              </div>
            </div>

            {/* Text Block 2 */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <Fingerprint className="w-5 h-5" />
                <span className="text-xs font-bold tracking-widest uppercase">Subject Profile</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                El Experimento <br />
                <span className="text-blue-500">Harvard</span>
              </h3>
              <div className="space-y-4 text-gray-400 leading-loose text-justify bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-white/5">
                <p>
                  Bajo la supervisión del <strong className="text-white">Dr. Sidney Gottlieb</strong>, hemos establecido laboratorios clandestinos en universidades de élite.
                  Nuestro foco actual es el Departamento de Relaciones Sociales de Harvard.
                </p>
                <p>
                  Entre los sujetos de prueba destaca un joven matemático prodigio: <strong className="text-white bg-red-900/30 px-1 border border-red-500/20">Theodore Kaczynski</strong>.
                  Lo someteremos a pruebas de estrés extremo, deconstrucción del ego y ataques psicológicos.
                </p>
              </div>
            </div>
          </div>

          {/* Dilemma / Warning */}
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-red-950/20 to-transparent p-10 rounded-xl border border-red-900/30 mb-20 backdrop-blur-sm">
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Consecuencias Irreversibles</h3>
            <p className="text-gray-300 text-lg leading-relaxed italic">
              "Al intentar romper sus defensas, corremos el riesgo de fracturar la realidad del sujeto de forma irreversible.
              ¿Estamos creando al soldado perfecto o estamos engendrando, sin saberlo, una amenaza incontrolable para el futuro?"
            </p>
          </div>

          {/* Documentation Links */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="text-xs font-mono tracking-[0.3em] text-white/50 uppercase">Archivos Desclasificados</span>
              <div className="h-[1px] w-12 bg-white/20" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Guia */}
              <a
                href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-[#0f0f20]/80 backdrop-blur-md hover:bg-[#15152a] border border-blue-900/30 hover:border-blue-500/50 rounded-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Guía Académica</h4>
                <p className="text-sm text-gray-500">Protocolos de Modificación</p>
              </a>

              {/* Reglamento */}
              <a
                href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-[#0f0f20]/80 backdrop-blur-md hover:bg-[#15152a] border border-blue-900/30 hover:border-blue-500/50 rounded-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Reglamento Especializado</h4>
                <p className="text-sm text-gray-500">Normativa de Agentes</p>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="relative z-10 py-12 bg-black text-center border-t border-white/5">
        <div className="flex flex-col items-center gap-2">
          <Eye className="w-6 h-6 text-white/20" />
          <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
            Central Intelligence Agency
          </p>
        </div>
      </footer>

    </div>
  );
};

export default CIA;
