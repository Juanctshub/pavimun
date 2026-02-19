import { useState, useEffect, useRef } from 'react';
import { Scale, Gavel, Download, ChevronDown, Play, Pause } from 'lucide-react';

// --- Subcomponents ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-16 relative">
    <div className="flex flex-col items-center gap-4">
      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-amber-200/50 to-transparent" />
      {subtitle && (
        <span className="text-amber-400/60 text-[10px] tracking-[0.4em] uppercase font-cinzel">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-playfair text-white tracking-wide">
        {children}
      </h2>
      <div className="w-[1px] h-20 bg-gradient-to-b from-amber-200/50 via-transparent to-transparent" />
    </div>
  </div>
);

const EvidenceItem = ({ img, title, number }: { img: string, title: string, number: string }) => (
  <div className="group relative w-full aspect-[4/5] overflow-hidden cursor-none">
    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700 z-10" />

    {/* Image */}
    <div className="w-full h-full overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] grayscale-[0.5] group-hover:grayscale-0"
      />
    </div>

    {/* Overlay Content */}
    <div className="absolute inset-0 p-8 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
      <span className="text-amber-200/50 font-cinzel text-xl border-l border-amber-500/50 pl-4">{number}</span>
      <div>
        <h4 className="text-white font-playfair text-2xl italic mb-2">{title}</h4>
        <div className="h-[1px] w-0 group-hover:w-full bg-amber-500/50 transition-all duration-700 delay-100" />
      </div>
    </div>
  </div>
);

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Loading Case Files");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    setTimeout(() => setText("Decrypting Evidence"), 1500);
    setTimeout(() => setText("Accessing SDNY Database"), 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center">
      <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden mb-8">
        <div
          className="absolute inset-0 bg-amber-200"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
      <div className="h-8 overflow-hidden relative">
        <p className="font-cinzel text-xs tracking-[0.3em] text-white/40 animate-pulse text-center uppercase">
          {text}
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---

const Corte = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initial Autoplay Setup
  useEffect(() => {
    if (loading) return;

    // Attempt autoplay muted video
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Video autoplay blocked", e));
    }

    // Start audio muted then fade in
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        // Fade in
        let vol = 0;
        const interval = setInterval(() => {
          if (vol < 0.3) {
            vol += 0.01;
            if (audioRef.current) audioRef.current.volume = vol;
          } else {
            clearInterval(interval);
          }
        }, 100);
      }).catch(e => {
        console.log("Audio autoplay blocked", e);
        setIsPlaying(false);
      });
    }
  }, [loading]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-amber-900/30 selection:text-amber-200 overflow-x-hidden">

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 contrast-125 saturate-0"
        >
          <source src="/videos/epstein.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/videos/epsteinsong.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero Section */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-6">
        <div className="absolute top-0 left-0 p-8 md:p-12 w-full flex justify-between items-start opacity-70">
          <Scale className="w-6 h-6 text-amber-100/50" />
          <span className="font-cinzel text-xs tracking-[0.3em] text-amber-100/50">CASE 19-CR-490</span>
        </div>

        <div className="text-center relative z-10 space-y-8 animate-fade-in-up">
          <p className="font-cinzel text-amber-200/60 tracking-[0.5em] text-xs md:text-sm uppercase mb-4">
            The United States District Court
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tight leading-[0.9]">
            EPSTEIN
          </h1>

          <div className="flex items-center justify-center gap-6 my-8">
            <span className="h-[1px] w-12 bg-amber-500/40" />
            <span className="font-playfair italic text-2xl text-amber-500/80">vs</span>
            <span className="h-[1px] w-12 bg-amber-500/40" />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 tracking-tight leading-[0.9]">
            JUSTICE
          </h1>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>

        {/* Audio Control */}
        <button
          onClick={togglePlayback}
          className="absolute bottom-12 right-12 text-xs font-cinzel tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center gap-3 uppercase group"
        >
          <span>Soundtrack</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </div>
        </button>
      </section>

      {/* The Evidence Gallery */}
      <section className="py-32 px-6 md:px-12 bg-[#080808]">
        <SectionTitle subtitle="Visual Evidence">
          The Exhibits
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto border border-white/5">
          {/* Exhibit 001 - Donald 1 */}
          <EvidenceItem
            img="/images/donald.jpg"
            title="Flight Logs: Palm Beach"
            number="EXHIBIT 001"
          />

          {/* Text Content */}
          <div className="p-12 md:p-20 flex flex-col justify-center border-l border-white/5 bg-[#0a0a0a]">
            <h3 className="font-playfair text-3xl text-white mb-6">A Web of Influence</h3>
            <p className="font-serif text-white/50 leading-relaxed text-lg">
              "It was a network that transcended borders. They thought they were untouchable.
              The evidence suggests a systemic pattern of exploitation hidden in plain sight,
              protected by the very institutions meant to serve justice."
            </p>
          </div>

          {/* Text Content */}
          <div className="p-12 md:p-20 flex flex-col justify-center border-t border-r border-white/5 bg-[#0a0a0a] md:order-3 order-4">
            <h3 className="font-playfair text-3xl text-white mb-6">Sealed Documents</h3>
            <p className="font-serif text-white/50 leading-relaxed text-lg">
              "Names redacted. Lives destroyed. The unsealed documents reveal a horrifying truth about
              power and complicity. What you are about to see constitutes the core of the prosecution's case."
            </p>
          </div>

          {/* Exhibit 002 - Donald 2 */}
          <div className="md:order-4 order-3">
            <EvidenceItem
              img="/images/donald2.jpg"
              title="The Social Circle"
              number="EXHIBIT 002"
            />
          </div>
        </div>
      </section>

      {/* The Case Description */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Gavel className="w-12 h-12 text-amber-600/60 mx-auto mb-12" />
          <h3 className="text-2xl md:text-4xl font-playfair leading-normal text-white/90 mb-12">
            "The challenge of this committee is not just legal; it is moral.
            You must decide if the system can prosecute its own architects."
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-t border-b border-white/10 py-12">
            {[
              { label: "Charges", val: "Trafficking" },
              { label: "Venue", val: "SDNY Court" },
              { label: "Status", val: "Ongoing" },
              { label: "Date", val: "2025-2026" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-cinzel text-xs text-amber-500/60 tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="font-playfair text-xl text-white">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources / Footer */}
      <section className="bg-[#0a0a0a] py-32 border-t border-white/5">
        <SectionTitle subtitle="Access Restricted">
          Court Materials
        </SectionTitle>

        <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
          <a
            href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
            target="_blank"
            className="group relative px-12 py-6 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex flex-col items-center gap-4 min-w-[300px]"
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="font-cinzel text-xs text-amber-500/60 tracking-[0.2em] mb-2">OFFICIAL GUIDE</p>
              <p className="font-playfair text-xl text-white">Academic Paper</p>
            </div>
          </a>

          <a
            href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
            target="_blank"
            className="group relative px-12 py-6 bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex flex-col items-center gap-4 min-w-[300px]"
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className="font-cinzel text-xs text-amber-500/60 tracking-[0.2em] mb-2">SPECIAL RULES</p>
              <p className="font-playfair text-xl text-white">Procedure</p>
            </div>
          </a>
        </div>
      </section>

    </div>
  );
};

export default Corte;
