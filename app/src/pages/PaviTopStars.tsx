import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, Sparkles, User, Award, ShieldCheck, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaviTopStars = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] overflow-hidden font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#050505]" />
        
        {/* Subtle Nebula Effects */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/2 rounded-full blur-[120px]" />
        
        {/* Gold Dust Particles */}
        <div className="absolute inset-0 opacity-40">
           {[...Array(25)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-[1px] h-[1px] bg-[#d4af37] rounded-full"
               initial={{ 
                 x: Math.random() * 100 + '%', 
                 y: Math.random() * 100 + '%',
                 opacity: Math.random() 
               }}
               animate={{ 
                 y: ['-10%', '110%'],
                 opacity: [0, 1, 0]
               }}
               transition={{ 
                 duration: 10 + Math.random() * 20, 
                 repeat: Infinity, 
                 ease: "linear",
                 delay: Math.random() * 10
               }}
             />
           ))}
        </div>
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(40px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
          >
            {/* Cinematic Centerpiece */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="relative z-10"
              >
                <div className="w-32 h-32 rounded-full border border-[#d4af37]/20 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/10 to-transparent" />
                   <Crown className="w-12 h-12 text-[#d4af37] fill-[#d4af37]/20 animate-pulse" />
                   
                   {/* Scanning Light */}
                   <motion.div 
                    className="absolute top-0 left-0 w-full h-[1px] bg-[#d4af37]"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   />
                </div>
              </motion.div>
              
              {/* Expanding Rings */}
              <motion.div 
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 border border-[#d4af37]/30 rounded-full"
              />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 text-center"
            >
              <h2 className="text-3xl font-serif italic tracking-[0.4em] uppercase text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                Aureate Prestige
              </h2>
              <p className="mt-4 text-[9px] font-bold tracking-[0.6em] uppercase text-white/20">
                The Digital Monument of PAVIMUN
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Content Hub */}
      <div className={`relative z-10 transition-all duration-[2000ms] ${mounted && !loading ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Floating Pill Navigation */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <motion.nav 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-8 px-8 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#d4af37] transition-colors">Inicio</Link>
            <div className="h-3 w-[1px] bg-white/10" />
            <Link to="/i-edicion" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#d4af37] transition-colors">I Edición</Link>
            <div className="h-3 w-[1px] bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Top Stars</span>
          </motion.nav>
        </div>

        <header className="pavi-container pt-44 pb-24 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
               <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
               <Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
               <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
            </div>
            
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-serif tracking-[-0.04em] mb-8 leading-none">
              <span className="block text-white">PAVI</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#d4af37] animate-shimmer-gold italic">
                Top Stars
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-white/40 text-xs md:text-sm font-medium leading-relaxed tracking-[0.2em] uppercase">
              The Legacy of Excellence • Since 2024
            </p>
          </motion.div>
        </header>

        {/* The Vault - Premium Grid */}
        <section className="pavi-container pb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[3/4.5] rounded-[0.5rem] bg-[#1a1a1a]/40 border border-white/5 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center transition-all duration-700 hover:border-[#d4af37]/30 hover:-translate-y-3"
              >
                {/* 22K Bezel Detail */}
                <div className="absolute inset-[1px] border border-white/[0.02] rounded-[0.45rem] pointer-events-none" />
                
                {/* Gold Glow on Hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Silhouette / Content Placeholder */}
                <div className="relative z-10 flex flex-col items-center p-12 w-full h-full">
                  <div className="mt-auto mb-12">
                     <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center group-hover:border-[#d4af37]/20 transition-all duration-700 shadow-2xl">
                          <User className="w-12 h-12 text-white/5 group-hover:text-[#d4af37]/40 transition-colors" />
                        </div>
                        {/* Status badge */}
                        <div className="absolute -bottom-2 right-0 w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                           <Award className="w-4 h-4 text-[#050505]" />
                        </div>
                     </div>
                  </div>

                  <div className="mb-auto space-y-6 w-full">
                    <div className="space-y-3">
                       <div className="h-[1px] w-12 bg-[#d4af37]/30 mx-auto" />
                       <div className="h-4 w-3/4 bg-white/5 rounded-sm mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent animate-shimmer" />
                       </div>
                       <div className="h-2 w-1/2 bg-white/5 rounded-sm mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent animate-shimmer" />
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                       <Sparkles className="w-3 h-3 text-[#d4af37]/50" />
                       <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4af37]/60">Ver Perfil</span>
                       <Sparkles className="w-3 h-3 text-[#d4af37]/50" />
                    </div>
                  </div>
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/0 group-hover:border-[#d4af37]/20 transition-all duration-700" />
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/0 group-hover:border-[#d4af37]/20 transition-all duration-700" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 text-center"
          >
             <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 mb-8">Architectural Design by PaviMUN</p>
             <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent mx-auto" />
          </motion.div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-serif {
          font-family: 'Noto Serif', serif;
        }
        
        .animate-shimmer-gold {
          background-size: 200% auto;
          animation: shimmer-gold 8s linear infinite;
        }
        @keyframes shimmer-gold {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default PaviTopStars;
