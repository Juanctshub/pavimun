import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, Sparkles, User, Award, Crown, Shield, Zap } from 'lucide-react';

const PaviTopStars = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020202] text-[#e5e2e1] overflow-hidden font-sans selection:bg-[#d4af37]/30 selection:text-white">
      
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#020202]" />
        
        {/* Animated Gold Nebula */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_50%)] blur-[100px]" 
        />

        {/* Dynamic Light Rays */}
        <div className="absolute inset-0 opacity-[0.2]">
           <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent rotate-[15deg] blur-sm" />
           <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#d4af37] to-transparent -rotate-[15deg] blur-sm" />
        </div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-1 h-1 bg-[#d4af37] rounded-full blur-[1px]"
          />
        ))}
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020202]"
          >
            {/* The Vault Doors */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.5 }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#080808] border-r border-[#d4af37]/10 z-10"
            >
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(45deg, #d4af37 25%, transparent 25%, transparent 50%, #d4af37 50%, #d4af37 75%, transparent 75%, transparent 100%)', backgroundSize: '60px 60px' }} />
            </motion.div>
            
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1], delay: 0.5 }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#080808] border-l border-[#d4af37]/10 z-10"
            >
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(-45deg, #d4af37 25%, transparent 25%, transparent 50%, #d4af37 50%, #d4af37 75%, transparent 75%, transparent 100%)', backgroundSize: '60px 60px' }} />
            </motion.div>

            {/* Central Seal */}
            <div className="relative z-20 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="relative"
              >
                <div className="w-48 h-48 rounded-full border-2 border-[#d4af37]/20 flex items-center justify-center bg-[#050505] shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden">
                   {/* Rotating light ring */}
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[4px] border-transparent border-t-[#d4af37]/40 rounded-full"
                   />
                   <Crown className="w-20 h-20 text-[#d4af37] fill-[#d4af37]/5" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 text-center"
              >
                <h2 className="text-5xl font-serif italic tracking-[0.4em] uppercase text-[#d4af37] mb-4">
                  Top Stars
                </h2>
                <div className="flex items-center gap-6 justify-center">
                   <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
                   <p className="text-[12px] font-black tracking-[1em] uppercase text-white/50">
                    Santuario de Élite
                   </p>
                   <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className={`relative z-10 transition-all duration-[2000ms] ${mounted && !loading ? 'opacity-100' : 'opacity-0 scale-95 blur-sm'}`}>
        
        {/* HERO SECTION */}
        <motion.header 
          style={{ opacity, scale }}
          className="pavi-container pt-56 pb-32 text-center"
        >
          <div className="inline-flex items-center justify-center gap-6 mb-16">
             <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
             <div className="p-3 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
             </div>
             <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-transparent" />
          </div>
          
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-serif tracking-[-0.07em] mb-12 leading-[0.8] mix-blend-difference">
            <span className="block text-white mb-4">PAVI</span>
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-b from-[#bf953f] via-[#fcf6ba] to-[#b38728] animate-shine">
              Top Stars
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-[#d4af37]/50 text-[11px] font-black leading-relaxed tracking-[0.9em] uppercase">
              The Sovereign Sanctuary of Diplomatic Excellence
            </p>
            <div className="flex justify-center gap-4">
               {[...Array(3)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#d4af37]/30 fill-[#d4af37]/10" />
               ))}
            </div>
          </div>
        </motion.header>

        {/* EXHIBITION GRID */}
        <section className="pavi-container pb-64 relative">
          
          {/* Vertical Separator Lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-[#d4af37]/20 via-transparent to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-y-32">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Background Shadow Glow */}
                <div className="absolute -inset-8 bg-[#d4af37]/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative aspect-[3/4.8] rounded-[2px] bg-[#050505] border border-white/[0.08] flex flex-col items-center p-1 overflow-hidden transition-all duration-1000 group-hover:border-[#d4af37]/40 group-hover:-translate-y-6">
                  
                  {/* Decorative Bezel */}
                  <div className="absolute inset-2 border border-white/[0.03] pointer-events-none" />
                  
                  {/* Image/Portrait Section */}
                  <div className="w-full aspect-[3/3.5] bg-[#0a0a0a] relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <User className="w-24 h-24 text-white/[0.03] group-hover:text-[#d4af37]/10 transition-colors duration-1000" />
                     </div>
                     
                     {/* Hover Rank Indicator */}
                     <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                        <div className="w-8 h-8 rounded-full border border-[#d4af37]/30 bg-black/60 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-20px] group-hover:translate-x-0">
                           <Shield className="w-4 h-4 text-[#d4af37]" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-[#d4af37]/30 bg-black/60 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-x-[-20px] group-hover:translate-x-0">
                           <Zap className="w-4 h-4 text-[#d4af37]" />
                        </div>
                     </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 w-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                     <div className="space-y-4">
                        <div className="h-[1px] w-12 bg-[#d4af37]/40 mx-auto transition-all duration-700 group-hover:w-24" />
                        <h3 className="text-xl font-serif italic tracking-wide text-white/90 group-hover:text-[#d4af37] transition-colors duration-700">
                          Honorary Delegate
                        </h3>
                        <p className="text-[9px] font-black tracking-[0.5em] uppercase text-white/30">
                          Class of 2026
                        </p>
                     </div>

                     <div className="pt-4 opacity-40 group-hover:opacity-100 transition-all duration-1000">
                        <div className="inline-flex items-center gap-3 px-6 py-2 border border-white/10 rounded-full group-hover:border-[#d4af37]/30 group-hover:bg-[#d4af37]/5">
                           <Award className="w-3 h-3 text-[#d4af37]" />
                           <span className="text-[8px] font-black uppercase tracking-[0.3em]">Excellence Merit</span>
                        </div>
                     </div>
                  </div>

                  {/* Corner Ornaments */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-[1px] border-l-[1px] border-[#d4af37]/0 group-hover:border-[#d4af37]/60 transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1px] border-r-[1px] border-[#d4af37]/0 group-hover:border-[#d4af37]/60 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Epic Footer Statement */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-64 flex flex-col items-center text-center gap-12"
          >
             <Crown className="w-12 h-12 text-[#d4af37] animate-pulse" />
             <div className="space-y-6">
                <h4 className="text-3xl font-serif italic text-white/80">"Victory is a state of mind"</h4>
                <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[1em] text-white/20">ETERNAL ACHIEVEMENT</p>
             </div>
          </motion.div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-serif {
          font-family: 'Noto Serif', serif;
        }
        
        .animate-shine {
          background-size: 200% auto;
          animation: shine 6s linear infinite;
        }
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* Smooth page transition overrides */
        .page-enter { opacity: 0; transform: translateY(20px); }
        .page-enter-active { opacity: 1; transform: translateY(0); transition: all 800ms; }
        .page-exit { opacity: 1; transform: translateY(0); }
        .page-exit-active { opacity: 0; transform: translateY(-20px); transition: all 500ms; }
      `}</style>
    </div>
  );
};

export default PaviTopStars;
