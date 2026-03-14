import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Newspaper, Mic2, Globe, Volume2, VolumeX, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════
   MESA DIRECTIVA — PRENSA (PRESS)
   Dystopian Ministry of Truth Aesthetic · Live News API
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

  // NewsAPI Integration
  const [articles, setArticles] = useState<any[]>([]);
  const NEWS_API_KEY = '95c3fa4d082646649edd8049594c9655';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?q=UN&apiKey=${NEWS_API_KEY}`);
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 8));
        } else {
          throw new Error('No articles');
        }
      } catch (err) {
        setArticles([
          { title: "SISTEMA DE VERDAD ACTUALIZADO: PROTOCOLO DE DESINFORMACIÓN NIVEL 5 ACTIVADO.", source: { name: "MINISTRY" } },
          { title: "PAVIMUN 2026: NUEVA DIMENSIÓN DE PERIODISMO DIPLOMÁTICO.", source: { name: "CENTRAL" } },
          { title: "ALERTA DE CENSURA: DATOS EXTERNOS FILTRADOS POR EL CORTAFUEGOS.", source: { name: "TECH" } },
          { title: "EDITORIAL: LA VERDAD ES LO QUE NOSOTROS DECIMOS QUE ES.", source: { name: "VERITAS" } },
        ]);
      }
    };
    fetchNews();
  }, []);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.15], [0.7, 1]);

  const authorities = [
    {
      role: 'Directora Editorial · Estratega ONU',
      name: 'Valeska Corobo',
      image: '/images/mesas/prensa/v.jpeg',
      title: 'Presidente de Mesa',
      tag: 'EDITORIAL CHIEF',
      experience: '3 Años de Trayectoria en MUN',
      bio: [
        '¡Hola! Soy Valeska Corobo, Presidente del Comité de Prensa. Llevo 3 años participando en los Modelos de Naciones Unidas, siendo mi primer modelo en febrero de 2023.',
        'Principalmente me destaco por ser delegada de comités ONU, consiguiendo ganar una Mejor Delegación en un comité de Consejo de Seguridad, sin embargo, también me he dado la oportunidad de delegar en otros comités cómo Crisis y Prensa.',
        'Cómo Mesa Directiva en modelos, tuve mi primera oportunidad de manejar en octubre de 2024, estableciéndome como misión que los delegados de prensa tuvieran mayor presencia dentro de los modelos de Naciones Unidas.'
      ],
      stats: [
        { label: 'Experiencia', value: '3+ Años' },
        { label: 'Especialidad', value: 'Comités ONU' },
        { label: 'Misión', value: 'Visibilidad' }
      ]
    },
    {
      role: 'Faculty Advisor · Analista de Comunicación',
      name: 'Sara Riera',
      image: '/images/mesas/prensa/s.jpeg',
      title: 'Vice-Presidente de Mesa',
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
    <div className="min-h-screen bg-[#050505] text-[#d1d5db] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <audio ref={audioRef} src="/audio/fuera2.mp3" loop preload="auto" />

      {/* ═══ CYBER BACKGROUND ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        {/* Floating Light Blobs */}
        <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />
        
        {/* ═══ SIDE DECORATIONS (VERTICAL) ═══ */}
        <motion.div style={{ opacity: sideOpacity }} className="hidden md:flex fixed left-0 top-0 h-screen w-16 border-r border-blue-500/10 flex-col items-center justify-between py-10 z-[35]">
          <div className="text-[10px] font-mono text-blue-500/40 vertical-text tracking-[0.8em] uppercase">SYSTEM_P01_PRENSA</div>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          <div className="flex flex-col gap-6 items-center">
             <Zap className="w-4 h-4 text-blue-500/20 animate-pulse" />
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 animate-pulse" />
          </div>
          <div className="w-[1px] h-32 bg-gradient-to-t from-transparent via-blue-500/20 to-transparent" />
          <div className="text-[10px] font-mono text-blue-500/40 vertical-text tracking-[0.8em] uppercase">LIVE_UPLINK_STABLE</div>
        </motion.div>

        <motion.div style={{ opacity: sideOpacity }} className="hidden md:flex fixed right-0 top-0 h-screen w-16 border-l border-blue-500/10 flex-col items-center justify-between py-10 z-[35]">
          <div className="text-[10px] font-mono text-blue-500/40 vertical-text tracking-[0.8em] uppercase">TRUTH_MINISTRY_SYNC</div>
          <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
          <div className="space-y-4">
             {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-[1px] bg-blue-500/10" />)}
          </div>
          <div className="w-[1px] h-32 bg-gradient-to-t from-transparent via-blue-500/20 to-transparent" />
          <div className="text-[10px] font-mono text-blue-500/40 vertical-text tracking-[0.8em] uppercase">CORE_U9_V01</div>
        </motion.div>

        {/* Glitchy Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-40 w-full animate-scanline" />
      </div>

      {/* ═══ NEWS TICKER ═══ */}
      <div className="fixed top-[72px] left-0 w-full z-40 bg-[#050505]/80 backdrop-blur-xl border-y border-white/5 h-10 flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div animate={{ x: "-100%" }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="flex gap-12 pr-12">
            {articles.length > 0 ? articles.map((art, i) => (
              <span key={i} className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.4em] text-blue-300 uppercase">
                {art.title} • {art.source?.name || 'PAVIMUN'} •
              </span>
            )) : (
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.4em] text-blue-400">
                BREAKING: PAVIMUN PRESS TERMINAL ONLINE • SYNCING WITH MINISTRY OF TRUTH • NO RECORDS FOUND •
              </span>
            )}
          </motion.div>
        </div>
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
        <Link to="/prensa" className="inline-flex items-center gap-2 text-blue-500/60 hover:text-blue-400 font-mono text-xs tracking-widest transition-all group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          TERMINAL_PRENSA
        </Link>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div style={{ rotateX, scale }} className="perspective-2000">
          <div className="relative p-10 sm:p-20 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl text-center md:text-left">
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <div className="absolute bottom-10 left-10 w-12 h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-lg" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30 text-[10px] font-mono text-blue-400 tracking-[0.3em] uppercase">STATUS: TRANSMITTING</div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black italic tracking-tighter leading-none">
                  <span className="block text-white/10">MESA</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-blue-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">PRENSA</span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-200/40 font-mono tracking-widest uppercase">MINISTRY OF TRUTH · INFORMATION HUB</p>
              </div>
              <div className="hidden lg:block relative w-64 h-64">
                <motion.div animate={{ rotateY: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-48 h-48 border-[0.5px] border-blue-500/20 rounded-full animate-spin-slow" />
                  <Newspaper className="relative w-24 h-24 text-blue-500 drop-shadow-[0_0_30px_#3b82f6]" />
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
            <motion.div key={auth.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.2 }} className="flex flex-col gap-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
                  <img src={auth.image} alt={auth.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-[1px] w-8 bg-blue-500/50" />
                      <span className="text-blue-400 font-mono text-[10px] tracking-[0.4em] uppercase">{auth.tag}</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black italic text-white tracking-tighter uppercase mb-2">{auth.name}</h2>
                    <p className="text-blue-100/60 font-mono text-xs uppercase tracking-widest">{auth.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden backdrop-blur-sm">
                <Mic2 className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                <div className="space-y-4">
                  {auth.bio.map((p, pIdx) => <p key={pIdx} className="text-zinc-400 leading-relaxed text-sm sm:text-base text-justify">{p}</p>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ LIVE NEWS FEED ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16 flex items-center gap-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-blue-500/20" />
          <h2 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400 uppercase tracking-[0.3em]">ÚLTIMAS VERDADES</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-blue-500/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {articles.map((art, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all overflow-hidden">
               {/* Censorship Animation */}
               <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 6 }} className="absolute h-4 w-24 bg-black/80 top-8 left-8 z-20 blur-[1px]" />
               
               <div className="flex flex-col gap-4 relative z-10">
                 <div className="flex justify-between items-center text-[9px] font-mono text-blue-500/50 uppercase tracking-widest">
                   <span>SOURCE: {art.source?.name || 'MINISTRY'}</span>
                   <span>VERIFIED_OK</span>
                 </div>
                 <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors leading-tight">{art.title}</h3>
                 <div className="h-[1px] w-12 bg-blue-500/20 group-hover:w-full transition-all duration-700" />
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center border-t border-white/5 overflow-hidden">
        {/* Ink Leak Svg */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 pointer-events-none opacity-[0.03] hidden lg:block">
           <svg viewBox="0 0 200 200" className="fill-blue-500">
             <path d="M44.7,-76.4C58.1,-69.2,69.5,-59.1,77.7,-46.7C85.9,-34.3,90.8,-19.7,88.9,-5.8C87,8.1,78.2,21.3,69.5,33.4C60.8,45.5,52.2,56.5,41,65C29.8,73.5,15.9,79.5,1.2,77.7C-13.5,75.9,-28.9,66.3,-41.2,56.8C-53.5,47.3,-62.7,37.8,-69.3,26.4C-75.9,15,-79.9,1.7,-77.8,-11.2C-75.7,-24.1,-67.5,-36.6,-57,-44.8C-46.5,-53.1,-33.7,-57.1,-21.9,-65.4C-10.1,-73.7,0.7,-86.3,13.6,-86.6C26.5,-86.9,44.7,-74.9,44.7,-76.4Z" transform="translate(100 100)" />
           </svg>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <Globe className="w-8 h-8 text-blue-500/10 animate-spin-slow" />
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-blue-500/30 uppercase tracking-[0.5em]">GLOBAL_INFORMATION_SYSTEM_ONLINE</p>
            <p className="text-xs text-white/5 font-mono tracking-widest uppercase">PAVIMUN 2026 OFFICIAL PRESS TERMINAL</p>
          </div>
        </div>
      </footer>

      {/* Mute Button */}
      <button onClick={toggleMute} className="fixed bottom-8 right-8 z-[60] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-blue-500 shadow-2xl hover:scale-110 transition-transform">
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      <style>{`
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
        .perspective-2000 { perspective: 2000px; }
        @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
        .animate-scanline { animation: scanline 10s linear infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </div>
  );
};

export default MesaPrensa;
