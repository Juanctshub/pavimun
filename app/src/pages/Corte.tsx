import { useState, useEffect, useRef } from 'react';
import { FileText, Gavel, Scale, Search, X, FolderOpen } from 'lucide-react';

// --- Assets & Icons ---
// Using Lucide icons for UI elements
// Background is procedurally generated via CSS to ensure performance

// --- Subcomponents ---

const Polaroid = ({
  src,
  caption,
  rotate = 0,
  top,
  left,
  delay = 0,
  scale = 1
}: {
  src: string,
  caption: string,
  rotate: number,
  top: string,
  left: string,
  delay?: number,
  scale?: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-grab active:cursor-grabbing z-10 hover:z-50`}
      style={{
        top,
        left,
        transform: isFocused
          ? 'translate(-50%, -50%) scale(2) rotate(0deg)'
          : `translate(-50%, -50%) scale(${scale}) rotate(${isHovered ? 0 : rotate}deg)`,
        transitionDelay: `${delay}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFocused(!isFocused)}
    >
      {/* Tape */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/20 backdrop-blur-[2px] rotate-2 shadow-sm z-20" />

      {/* Photo Frame */}
      <div className="bg-[#f0f0f0] p-4 pb-12 shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-64 md:w-72 relative">
        {/* Gritty Image Filter Layer */}
        <div className="relative overflow-hidden aspect-square bg-gray-900 border border-gray-300">
          <img
            src={src}
            alt={caption}
            className="w-full h-full object-cover filter contrast-[1.2] sepia-[0.3] brightness-[0.9] grayscale-[0.2]"
          />
          {/* Dust/Scratch Overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] pointer-events-none" />
        </div>

        {/* Caption */}
        <p className="absolute bottom-4 left-0 w-full text-center font-['Permanent_Marker'] text-gray-800 text-lg rotate-[-1deg]">
          {caption}
        </p>

        {/* Paper Clip */}
        <div className="absolute -right-2 top-10 w-4 h-12 border-2 border-gray-400 rounded-full rotate-12" />
      </div>

      {isFocused && (
        <button
          className="absolute -top-10 -right-10 bg-red-600 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          onClick={(e) => { e.stopPropagation(); setIsFocused(false); }}
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

const StickyNote = ({ text, top, left, rotate = 0, color = "bg-yellow-200" }: { text: string, top: string, left: string, rotate?: number, color?: string }) => (
  <div
    className={`absolute w-48 ${color} p-4 shadow-xl transform hover:scale-105 hover:rotate-0 transition-all duration-300 cursor-help z-20 font-['Permanent_Marker'] text-gray-900 text-sm leading-snug`}
    style={{ top, left, transform: `rotate(${rotate}deg)` }}
  >
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/30 backdrop-blur-sm" />
    "{text}"
  </div>
);

const LoadingDarkroom = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setPhase(1), 1000), // Red light on
      setTimeout(() => setPhase(2), 2500), // Developing
      setTimeout(() => setPhase(3), 4500), // Done
      setTimeout(onComplete, 5000)
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Red Safety Light */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-900/20 blur-[150px] rounded-full transition-opacity duration-[2000ms] ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Developing Trays Animation */}
        <div className="relative w-64 h-80 bg-stone-900 border-8 border-stone-800 shadow-2xl overflow-hidden mb-8 transform rotate-3">
          <div className="absolute inset-0 bg-[#3a0d0d] opacity-50 backdrop-blur-sm z-20 animate-pulse-slow" /> {/* Liquid */}
          <img
            src="/images/donald.jpg"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ease-in-out ${phase >= 2 ? 'opacity-80 blur-0 grayscale-[0.5] contrast-125' : 'opacity-0 blur-xl grayscale'}`}
          />
        </div>

        <p className="font-['Courier_Prime'] text-red-500/80 tracking-widest text-sm animate-pulse">
          {phase === 0 && "DARKROOM INITIALIZED..."}
          {phase === 1 && "DEVELOPING EVIDENCE..."}
          {phase === 2 && "FIXING IMAGE..."}
          {phase === 3 && "EVIDENCE READY"}
        </p>
      </div>
    </div>
  );
};

// --- Main Layout ---

const Corte = () => {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => { });
      // Slow fade in
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.02;
        if (vol >= 0.4) { vol = 0.4; clearInterval(fade); }
        if (audioRef.current) audioRef.current.volume = vol;
      }, 200);
      return () => clearInterval(fade);
    }
  }, [loading]);

  if (loading) return <LoadingDarkroom onComplete={() => setLoading(false)} />;

  return (
    <div
      className="min-h-screen bg-[#1a1a1a] text-[#dcdcdc] font-['Courier_Prime'] overflow-x-hidden relative selection:bg-red-900/50 selection:text-white"
      ref={containerRef}
    >
      {/* Background Texture (Wood Desk) */}
      <div className="fixed inset-0 -z-20 bg-[url('https://img.freepik.com/free-photo/dark-wooden-texture-background_23-2148817657.jpg?w=1380&t=st=1676840000~exp=1676840600~hmac=123')] bg-cover bg-center brightness-[0.4] contrast-125 saturate-50" />
      {/* Vignette */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,#000000_95%)] pointer-events-none" />

      {/* Ambient Audio */}
      <audio ref={audioRef} loop>
        <source src="/videos/epsteinsong.mp3" type="audio/mpeg" />
      </audio>

      {/* --- HERO: THE FILE FOLDER --- */}
      <section className="min-h-[90vh] flex items-center justify-center relative py-20">
        <div className="relative group perspective-1000">
          {/* Folder Tab */}
          <div className="absolute -top-8 left-0 w-40 h-10 bg-[#BC9E6C] rounded-t-lg z-0" />

          {/* Manila Folder Body */}
          <div className="relative w-[90vw] max-w-4xl bg-[#D6B67F] min-h-[60vh] rounded-r-lg rounded-bl-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-8 md:p-16 flex flex-col relative z-10 border-t border-[#ebd3aa]/30">

            {/* Coffee Stain */}
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-[6px] border-[#3e2723]/20 opacity-60 blur-[1px] pointer-events-none" />

            {/* Stamp */}
            <div className="absolute top-20 right-20 border-[4px] border-red-800/60 p-2 transform rotate-[-15deg] opacity-70 mask-grunge">
              <p className="text-red-900 font-black text-4xl tracking-widest uppercase opacity-80">CONFIDENTIAL</p>
              <p className="text-red-900 text-xs text-center uppercase tracking-widest font-bold mt-1">Eyes Only</p>
            </div>

            {/* Content Typewriter */}
            <div className="mt-12 max-w-2xl relative">
              <div className="flex items-center gap-4 mb-8 opacity-60">
                <Gavel className="w-8 h-8 text-[#3e2723]" />
                <div className="h-[1px] flex-1 bg-[#3e2723]" />
                <span className="text-[#3e2723] font-bold tracking-[0.2em] text-sm">CASE 19-CR-490</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-[#1a120b]/90 mb-6 tracking-tighter leading-[0.9]">
                EPSTEIN <br />
                <span className="text-4xl md:text-6xl text-[#3e2723]/80 font-normal italic">Network</span>
              </h1>

              <p className="text-[#3e2723] text-lg md:text-xl leading-relaxed font-bold bg-white/20 p-6 shadow-sm backdrop-blur-sm transform -rotate-1">
                CASE STATUS: <span className="text-red-700 bg-red-100 px-2">UNSEALED</span> <br /><br />
                The Judicial Committee of PAVIMUN is tasked with dissecting the architecture of a global sex trafficking ring.
                Delegates will reconstruct the timeline, examine the financial trails, and prosecute the enablers.
              </p>
            </div>

            {/* Floating Instructions */}
            <div className="absolute bottom-6 right-8 flex items-center gap-2 text-[#3e2723]/60 animate-bounce">
              <Search className="w-5 h-5" />
              <span className="text-sm font-bold tracking-widest uppercase">Inspect Evidence Below</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE EVIDENCE DESK (SCATTERED) --- */}
      <section className="relative min-h-[120vh] py-32 overflow-hidden">

        {/* Title on the Desk */}
        <div className="absolute top-10 left-10 md:left-32 text-white/10 text-9xl font-black select-none pointer-events-none z-0">
          EVIDENCE
        </div>

        {/* Scattered Polaroids */}
        <div className="relative w-full max-w-6xl mx-auto h-[800px]">

          <Polaroid
            src="/images/donald.jpg"
            caption="Unknown Associate #1"
            rotate={-6}
            top="10%"
            left="20%"
            delay={200}
            scale={1.1}
          />

          <Polaroid
            src="/images/donald2.jpg"
            caption="Social Gathering '02"
            rotate={4}
            top="40%"
            left="70%"
            delay={500}
            scale={1.2}
          />

          {/* Sticky Notes */}
          <StickyNote
            text="Who took these photos? Format suggests hidden camera."
            top="35%"
            left="15%"
            rotate={-2}
            color="bg-pink-200"
          />

          <StickyNote
            text="Cross-reference with flight logs. Dates match the Palm Beach trip."
            top="65%"
            left="75%"
            rotate={3}
          />

          {/* Documents / Files */}
          <div className="absolute top-[60%] left-[30%] w-64 h-80 bg-white shadow-xl transform rotate-[-3deg] p-6 text-xs text-gray-800 pointer-events-none brightness-90">
            <div className="border-b-2 border-black mb-4 pb-2 font-bold flex justify-between">
              <span>FLIGHT MANIFEST</span>
              <span>CONFIDENTIAL</span>
            </div>
            <div className="space-y-2 font-mono opacity-70">
              <p>DATE: 2002-05-14</p>
              <p>PASSENGER LIST: [REDACTED]</p>
              <p>DESTINATION: USVI</p>
              <p className="blur-[1px]">Clinton, William J.</p>
              <p className="bg-black text-black select-none">Trump, Donald J.</p>
              <p>Spacey, Kevin</p>
            </div>
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border-4 border-red-700/50 flex items-center justify-center transform rotate-[-20deg]">
              <span className="text-red-700 font-bold text-[8px] uppercase">Verified</span>
            </div>
          </div>

          <div className="absolute top-[10%] left-[60%] w-56 h-64 bg-gray-100 shadow-lg transform rotate-[5deg] z-0 p-4">
            <h4 className="font-bold underline mb-2 text-black">Witness List</h4>
            <ul className="list-disc pl-4 text-xs text-gray-700 leading-loose">
              <li>Maria Farmer</li>
              <li>Virginia Giuffre</li>
              <li><span className="bg-black text-black">Annie Farmer</span></li>
              <li>Sarah Ransome</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- FOOTER: ACCESS FILES --- */}
      <section className="bg-black/80 py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12 flex items-center justify-center gap-4">
            <FolderOpen className="w-8 h-8 text-amber-500" />
            <span className="tracking-widest uppercase">Official Records</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
              target="_blank"
              className="group flex items-center justify-between bg-[#2a2a2a] p-6 rounded border-l-4 border-amber-500 hover:bg-[#333] transition-colors"
            >
              <div className="text-left">
                <p className="text-amber-500 text-xs tracking-widest uppercase font-bold mb-1">DOWNLOAD</p>
                <h3 className="text-xl font-bold">Academic Guide</h3>
              </div>
              <FileText className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
              target="_blank"
              className="group flex items-center justify-between bg-[#2a2a2a] p-6 rounded border-l-4 border-red-500 hover:bg-[#333] transition-colors"
            >
              <div className="text-left">
                <p className="text-red-500 text-xs tracking-widest uppercase font-bold mb-1">ACCESS</p>
                <h3 className="text-xl font-bold">Rules of Procedure</h3>
              </div>
              <Scale className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div className="mt-16 opacity-30 text-xs tracking-[0.3em]">
            UNITED STATES DISTRICT COURT · SOUTHERN DISTRICT OF NEW YORK
          </div>
        </div>
      </section>

    </div>
  );
};

export default Corte;
