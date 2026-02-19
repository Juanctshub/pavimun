import { useState, useEffect, useRef } from 'react';
import { BookOpen, FileText, Scale, Eye, AlertTriangle, Fingerprint, Lock, Siren } from 'lucide-react';

// --- Subcomponents (Hoisted) ---

const Redacted = ({ children }: { children: React.ReactNode }) => (
  <span className="relative group cursor-help inline-block mx-1 align-bottom">
    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 font-bold select-none absolute inset-0">
      {children}
    </span>
    <span className="bg-black text-transparent hover:bg-transparent transition-all duration-300 px-1 select-none">
      {children}
    </span>
  </span>
);

const EvidenceCard = ({ title, icon, code }: { title: string, icon: React.ReactNode, code: string }) => (
  <div className="bg-white/[0.03] border border-white/5 p-6 rounded hover:bg-white/[0.08] transition-all group hover:border-red-500/30">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-red-950/30 rounded text-red-500 group-hover:text-red-400 group-hover:scale-110 transition-all">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-gray-500 border border-gray-800 px-2 py-0.5 rounded">
        {code}
      </span>
    </div>
    <h4 className="text-xl font-bold text-gray-200 mb-1 group-hover:text-white">{title}</h4>
    <div className="w-full h-1 bg-white/5 mt-4 overflow-hidden">
      <div className="h-full bg-red-600/50 w-0 group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  </div>
);

const LoadingScreen = ({ phase }: { phase: number }) => (
  <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono overflow-hidden">
    <div className="text-red-600 font-bold tracking-[0.2em] text-xl md:text-2xl mb-8 animate-pulse">
      {phase === 0 && "INITIALIZING..."}
      {phase === 1 && "DECLASSIFYING_EVIDENCE..."}
      {phase >= 2 && "SUBJECT: JEFFREY_EPSTEIN"}
      {phase >= 3 && "ACCESS GRANTED"}
    </div>

    {/* Subliminal Image Flashes */}
    {phase === 2 && (
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-overlay">
        <img src="/images/donald.jpg" className="absolute top-[20%] left-[20%] w-64 animate-ping opacity-20" />
        <img src="/images/donald2.jpg" className="absolute bottom-[20%] right-[20%] w-64 animate-ping opacity-20 animation-delay-200" />
      </div>
    )}

    {/* Loading Bar */}
    <div className="w-64 h-2 bg-gray-900 border border-gray-800 rounded-full overflow-hidden relative">
      <div
        className="h-full bg-red-700 transition-all duration-300 ease-out absolute left-0 top-0"
        style={{ width: `${phase * 33}%` }}
      />
    </div>

    {/* Decoding Grid Effect */}
    <div className="absolute inset-0 pointer-events-none opacity-10"
      style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    />
  </div>
);


const Corte = () => {
  const [loadingPhase, setLoadingPhase] = useState(0); // 0: init, 1: text, 2: flashes, 3: done
  const [accessGranted, setAccessGranted] = useState(false);
  const [muted, setMuted] = useState(false); // Initially Not Muted for UX, but video/audio logic below handles autoplay

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio Auto-Control
  useEffect(() => {
    // Start muted for autoplay to work
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => console.log("Audio autoplay blocked"));
    }
  }, []);

  // Loading Sequence
  useEffect(() => {
    const sequence = [
      setTimeout(() => setLoadingPhase(1), 500),  // "DECLASSIFYING..."
      setTimeout(() => setLoadingPhase(2), 2000), // Flashes start
      setTimeout(() => setLoadingPhase(3), 3500), // "ACCESS GRANTED"
      setTimeout(() => {
        setAccessGranted(true);
        // Fade in audio after access granted
        if (audioRef.current) {
          audioRef.current.volume = 0;
          let vol = 0;
          const fade = setInterval(() => {
            vol += 0.01;
            if (vol >= 0.3) { vol = 0.3; clearInterval(fade); }
            audioRef.current!.volume = vol;
          }, 50);
        }
      }, 4500)
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  if (!accessGranted) {
    return <LoadingScreen phase={loadingPhase} />;
  }

  return (
    <div className="min-h-screen relative bg-[#050510] text-gray-200 font-mono selection:bg-red-900/50 selection:text-white overflow-x-hidden">

      {/* BACKGROUND VIDEO */}
      <div className="fixed inset-0 -z-20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 invert-[.05] grayscale-[0.3]"
        >
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
      </div>

      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/videos/epsteinsong.mp3" type="audio/mpeg" />
      </audio>

      {/* MUTE CONTROLLER */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 p-4 bg-red-950/80 border border-red-500/30 text-red-500 rounded-full hover:bg-red-900/90 hover:scale-110 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]"
      >
        {muted ? <div className="w-6 h-6 flex items-center justify-center relative"><div className="w-full h-0.5 bg-current rotate-45 absolute" /><Siren className="w-6 h-6" /></div> : <Siren className="w-6 h-6 animate-pulse" />}
      </button>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center relative p-6 pt-20">
        <div className="max-w-4xl w-full relative z-10">

          {/* Top Secret Badge */}
          <div className="flex justify-center mb-6">
            <div className="border border-red-500/50 bg-red-950/20 px-6 py-2 rounded-sm transform -rotate-2 backdrop-blur-sm animate-pulse-slow">
              <p className="text-red-500 font-bold tracking-[0.5em] text-xs md:text-sm uppercase">
                Top Secret // Eyes Only
              </p>
            </div>
          </div>

          <div className="text-center mb-12 relative">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2 drop-shadow-lg">
              EPSTEIN
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-red-600 tracking-[0.8em] md:tracking-[1.2em] opacity-80 pl-2">
              FILES
            </h2>

            {/* Decorative Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/20 -z-10" />
            <div className="absolute top-0 left-1/2 h-full w-[1px] bg-red-500/20 -z-10" />
          </div>

          {/* Intro Text */}
          <div className="max-w-2xl mx-auto bg-black/60 border border-white/10 p-6 md:p-8 backdrop-blur-md relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-red-500" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-red-500" />

            <p className="text-justify leading-relaxed text-gray-300 text-sm md:text-base">
              <span className="bg-black text-white px-1 font-bold">CASE 19-CR-490:</span> The United States vs. Jeffrey Epstein.
              This committee simulates the judicial process exposing a global network of <Redacted>sex trafficking</Redacted>,
              <Redacted>money laundering</Redacted>, and elite corruption. Delegates must navigate through sealed evidence,
              conflicting testimonies, and the shadow of powerful figures who wish this case effectively <Redacted>buried</Redacted>.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <Fingerprint className="w-8 h-8 text-red-500" />
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to Access Evidence</span>
        </div>
      </section>

      {/* EVIDENCE BOARD SECTION (Photos & Polaroids) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5 rotate-3 scale-110 pointer-events-none" />

        <div className="pavi-container relative z-10">
          <h3 className="text-center text-2xl md:text-4xl font-black mb-16 tracking-tighter uppercase flex items-center justify-center gap-4">
            <span className="w-12 h-1 bg-red-600" />
            Visual Evidence
            <span className="w-12 h-1 bg-red-600" />
          </h3>

          <div className="relative h-[600px] md:h-[500px] w-full max-w-5xl mx-auto perspective-1000">

            {/* Center: Court Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-20 pointer-events-none">
              <img src="/images/corte-logo.png" alt="Court Seal" className="w-full h-full object-contain grayscale" />
            </div>

            {/* Polaroid 1: Donald */}
            <div className="absolute top-10 left-4 md:left-20 w-48 md:w-64 transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group">
              <div className="bg-white p-3 pb-8 shadow-2xl shadow-black/50 relative">
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/30 rotate-1 backdrop-blur-sm shadow-sm" />
                <img src="/images/donald.jpg" alt="Evidence #01" className="w-full h-auto filter sepia-[0.3] contrast-125 group-hover:filter-none transition-all" />
                <p className="absolute bottom-2 left-0 w-full text-center text-black/80 text-sm font-bold rotate-1" style={{ fontFamily: 'Permanent Marker, cursive' }}>
                  Exhibit A
                </p>
              </div>
            </div>

            {/* Polaroid 2: Donald 2 */}
            <div className="absolute bottom-20 right-4 md:right-20 w-48 md:w-60 transform rotate-3 hover:rotate-0 hover:scale-110 hover:z-20 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group">
              <div className="bg-white p-3 pb-8 shadow-2xl shadow-black/50 relative">
                {/* Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-100/30 -rotate-2 backdrop-blur-sm shadow-sm" />
                <img src="/images/donald2.jpg" alt="Evidence #02" className="w-full h-auto filter sepia-[0.5] contrast-110 group-hover:filter-none transition-all" />
                <p className="absolute bottom-2 left-0 w-full text-center text-black/80 text-sm font-bold -rotate-1" style={{ fontFamily: 'Permanent Marker, cursive' }}>
                  Exhibit B
                </p>
              </div>
            </div>

            {/* Sticky Note */}
            <div className="hidden md:block absolute top-[20%] right-[30%] w-48 bg-yellow-200 shadow-lg p-4 transform rotate-2 hover:rotate-0 transition-transform">
              <p className="text-black text-sm leading-tight" style={{ fontFamily: 'Permanent Marker, cursive' }}>
                "Check the flight logs. Who else was on the island?"
              </p>
            </div>

            {/* Red String Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
              <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </section>

      {/* CHARGES GRID */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="pavi-container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EvidenceCard title="Sex Trafficking" icon={<AlertTriangle />} code="18 U.S.C. § 1591" />
            <EvidenceCard title="Money Laundering" icon={<Scale />} code="18 U.S.C. § 1956" />
            <EvidenceCard title="Conspiracy" icon={<Eye />} code="18 U.S.C. § 371" />
            <EvidenceCard title="Obstruction" icon={<Lock />} code="18 U.S.C. § 1512" />
          </div>
        </div>
      </section>

      {/* FOOTER / RESOURCES */}
      <section className="py-20 text-center">
        <div className="inline-block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center divide-x divide-gray-600">
            <a
              href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
              target="_blank"
              className="pl-4 pr-4 py-4 bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors flex items-center gap-2 rounded-l-lg"
            >
              <BookOpen className="w-4 h-4 text-amber-500" /> Guide
            </a>
            <a
              href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
              target="_blank"
              className="pl-4 pr-4 py-4 bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors flex items-center gap-2 rounded-r-lg"
            >
              <FileText className="w-4 h-4 text-amber-500" /> Regulations
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};


export default Corte;
