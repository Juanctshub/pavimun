import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Newspaper, Mic2, Globe, Volume2, VolumeX, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════
   MESA DIRECTIVA — PRENSA (PRESS)
   High-End 3D Holographic UI · Interactive Editorial Design
   ═══════════════════════════════════════════════════════════ */

const MesaPrensa = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Audio setup
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const fadeIn = () => {
      let v = 0; a.volume = 0;
      const i = setInterval(() => { v += 0.005; if (v >= 0.35) { v = 0.35; clearInterval(i); } a.volume = v; }, 100);
    };
    a.volume = 0; a.muted = false;
    a.play().then(fadeIn).catch(() => {
      const t = () => { a.volume = 0; a.play().then(() => { fadeIn(); document.removeEventListener('click', t); document.removeEventListener('touchstart', t); }).catch(() => {}); };
      document.addEventListener('click', t); document.addEventListener('touchstart', t);
    });
    return () => { a.pause(); a.currentTime = 0; };
  }, []);

  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !muted; setMuted(!muted); } };

  // Scroll parallax for 3D elements
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const authorities = [
    {
      role: 'Presidente de Mesa',
      name: 'Valeska Corobo',
      image: '/images/mesas/prensa/v.jpeg',
      title: 'Directora Editorial · Estratega ONU',
      tag: 'EDITORIAL CHIEF',
      experience: '3 Años de Trayectoria en MUN',
      bio: [
        '¡Hola! Soy Valeska Corobo, Presidente del Comité de Prensa. Llevo 3 años participando en los Modelos de Naciones Unidas, siendo mi primer modelo en febrero de 2023.',
        'Principalmente me destaco por ser delegada de comités ONU, consiguiendo ganar una Mejor Delegación en un comité de Consejo de Seguridad, sin embargo, también me he dado la oportunidad de delegar en otros comités cómo Crisis y Prensa.',
        'Cómo Mesa Directiva en modelos, tuve mi primera oportunidad de manejar un comité de prensa en octubre de 2024, estableciéndome como misión que los delegados de prensa tuvieran mayor presencia dentro de los modelos de Naciones Unidas.'
      ],
      stats: [
        { label: 'Experiencia', value: '3+ Años' },
        { label: 'Especialidad', value: 'Comités ONU' },
        { label: 'Misión', value: 'Visibilidad' }
      ]
    },
    {
      role: 'Vice-Presidenta de Mesa',
      name: 'Sara Riera',
      image: '/images/mesas/prensa/s.jpeg',
      title: 'Faculty Advisor · Analista de Comunicación',
      tag: 'LEAD ANALYST',
      experience: 'Desde 2022 · SVPMUN Elite',
      bio: [
        '¡Hola, delegados! Mi nombre es Sara Riera, delegada y Faculty Advisor de SVPMUN.',
        'Inicié mi camino en los Modelos de Naciones Unidas en 2022, coincidiendo con mi entrada a bachillerato. Desde entonces, mi pasión por esta actividad no ha dejado de crecer, desempeñándome principalmente en comités de la ONU y de prensa.',
        'Los invito a vivir este modelo con una perspectiva completamente nueva. No olviden que la clave del éxito reside en la disciplina, la preparación y la constancia; todo aquello que realmente vale la pena requiere tiempo.',
        'Siempre mantengan la cabeza en alto y, sobretodo, confíen en sus capacidades porque ustedes, mejor que nadie, conocen el potencial y el arduo trabajo que los ha traído hasta aquí. ¡Mucho éxito!'
      ],
      stats: [
        { label: 'Path begun', value: '2022' },
        { label: 'Rol', value: 'Faculty Advisor' },
        { label: 'Objetivo', value: 'Excelencia' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#d1d5db] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      <audio ref={audioRef} src="/audio/fuera2.mp3" loop preload="auto" />

      {/* ═══ CYBER BACKGROUND ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        {/* Floating Light Blobs */}
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" 
        />
        {/* Glitchy Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent h-40 w-full animate-scanline shadow-[0_0_50px_rgba(6,182,212,0.1)]" />

        {/* Floating Editorial Phrases */}
        <div className="absolute inset-0 z-0">
          {[
            { text: 'VERITAS', top: '15%', left: '10%', delay: 0 },
            { text: 'OBJECTIVE', top: '45%', right: '5%', delay: 2 },
            { text: 'EDITORIAL', top: '75%', left: '20%', delay: 4 },
            { text: 'UPLINK_09', top: '30%', left: '70%', delay: 1 },
          ].map((phrase, pi) => (
             <motion.div
               key={pi}
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 0.2, 0] }}
               transition={{ duration: 5, repeat: Infinity, delay: phrase.delay }}
               className="absolute font-mono text-[4rem] font-black text-white/5 select-none pointer-events-none tracking-[1em]"
               style={{ top: phrase.top, left: phrase.left, right: phrase.right }}
             >
               {phrase.text}
             </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ FLOATING NEWS TICKER — POSITIONED BELOW NAV ═══ */}
      <div className="fixed top-[72px] left-0 w-full z-40 bg-blue-600/20 backdrop-blur-xl border-y border-white/10 h-10 flex items-center overflow-hidden">
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-12"
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.4em] text-cyan-300 drop-shadow-[0_0_8px_#06b6d4]">
              PAVIMUN PRESS EXCLUSIVE • BREAKING NEWS • NEW DIMENSION OF JOURNALISM • LIVE UPDATES FROM THE CORE • SYNC_ESTABLISHED •
            </span>
          ))}
        </motion.div>
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <Link to="/prensa" className="inline-flex items-center gap-2 text-cyan-500/60 hover:text-cyan-400 font-mono text-xs tracking-widest transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          TERMINAL_PRENSA
        </Link>
      </nav>

      {/* ═══ HERO SECTION (3D Dynamic) ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div 
          style={{ rotateX, scale }}
          className="perspective-2000"
        >
          <div className="relative p-10 sm:p-20 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Holographic Glitch lines */}
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-cyan-500 shadow-[0_0_15px_#06b6d4]" />
            <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent shadow-[0_0_15px_#06b6d4]" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl text-center md:text-left">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-center md:justify-start gap-3"
                >
                  <div className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30 text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">
                    Status: Directing
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                  </div>
                </motion.div>

                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black italic tracking-tighter leading-none">
                  <span className="block text-white opacity-20 outline-text">MESA</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-500 drop-shadow-glow">PRENSA</span>
                </h1>

                <p className="text-lg sm:text-xl text-cyan-200/40 font-mono tracking-widest uppercase">
                  PAVIMUN INFORMATION CENTER · FIRST EDITION
                </p>
              </div>

              {/* 3D Floating Icon Mesh (Visible only on PC) */}
              <div className="hidden lg:block relative w-64 h-64">
                <motion.div 
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-48 h-48 border-[0.5px] border-cyan-500/20 rounded-full animate-spin-slow" />
                  <div className="absolute w-32 h-32 border-[0.5px] border-cyan-400/30 rounded-full rotate-45 animate-spin-reverse" />
                  <Newspaper className="relative w-24 h-24 text-cyan-500 drop-shadow-[0_0_30px_#06b6d4]" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ MESA PROFILES ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col gap-10"
            >
              {/* Profile Card Overlay Styling */}
              <div className="relative group">
                {/* Back glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                  <img 
                    src={auth.image} 
                    alt={auth.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Digital Overlays */}
                  <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-[1px] w-8 bg-cyan-500/50" />
                      <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">{auth.tag}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black italic text-white tracking-tighter uppercase mb-1">
                      {auth.name}
                    </h2>
                    <p className="text-cyan-100/60 font-mono text-xs tracking-wider uppercase">{auth.role}</p>
                  </div>
                  
                  {/* Interactive Stats Panel (Visible only on PC) */}
                  <div className="absolute top-6 right-6 hidden md:flex flex-col gap-3">
                    {auth.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="px-3 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-center min-w-[100px]">
                        <p className="text-[8px] font-mono text-cyan-400/50 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-xs font-bold text-white uppercase">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Corner Marks */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 rounded-tl-xl" />
                </div>
              </div>

              {/* Bio Content — Editorial Style */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <Terminal className="w-4 h-4 text-cyan-500" />
                   <h3 className="text-xl font-bold text-white tracking-tight uppercase">{auth.title}</h3>
                </div>
                
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden backdrop-blur-sm">
                  <Mic2 className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                  <div className="space-y-4">
                    {auth.bio.map((p, pIdx) => (
                      <p key={pIdx} className="text-[#a0a0a0] leading-relaxed text-sm sm:text-base text-justify">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Mobile Statistics */}
                <div className="md:hidden grid grid-cols-3 gap-4">
                  {auth.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                      <p className="text-[8px] font-mono text-cyan-400/50 uppercase mb-1">{stat.label}</p>
                      <p className="text-[10px] font-bold text-white uppercase">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center border-t border-white/5">
        <div className="flex flex-col items-center gap-6">
          <Globe className="w-8 h-8 text-cyan-500/20 animate-spin-slow" />
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-cyan-400/30 uppercase tracking-[0.5em]">GLOBAL_INFORMATION_SYSTEM_ONLINE</p>
            <p className="text-xs text-white/10 font-mono tracking-widest">© PAVIMUN 2026 OFFICIAL PRESS CENTER</p>
          </div>
        </div>
      </footer>

      {/* ═══ MUTE OVERLAY ═══ */}
      <button 
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-[60] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-cyan-500 hover:text-cyan-400 transition-all hover:scale-110 group shadow-2xl"
      >
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* ═══ CSS OVERRIDES ═══ */}
      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .outline-text { -webkit-text-stroke: 1px rgba(255,255,255,0.1); }
        .drop-shadow-glow { filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.4)); }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scanline { animation: scanline 8s linear infinite; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 8s linear infinite; }
      `}</style>

    </div>
  );
};

export default MesaPrensa;
