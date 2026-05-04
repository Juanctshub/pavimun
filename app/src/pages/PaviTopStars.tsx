import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, User, Award, Crown } from 'lucide-react';

const PaviTopStars = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-[#e5e2e1] overflow-hidden font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[#020202]" />
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px]" />
        
        {/* Subtle Star Grid */}
        <div className="absolute inset-0 opacity-[0.1]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', 
            backgroundSize: '100px 100px' 
          }} 
        />
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
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0a0a] border-r border-[#d4af37]/20 z-10"
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(45deg, #d4af37 25%, transparent 25%, transparent 50%, #d4af37 50%, #d4af37 75%, transparent 75%, transparent 100%)', backgroundSize: '40px 40px' }} />
            </motion.div>
            
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
              className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a] border-l border-[#d4af37]/20 z-10"
            >
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(-45deg, #d4af37 25%, transparent 25%, transparent 50%, #d4af37 50%, #d4af37 75%, transparent 75%, transparent 100%)', backgroundSize: '40px 40px' }} />
            </motion.div>

            {/* Central Light & Icon */}
            <div className="relative z-20 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                {/* Aura */}
                <div className="absolute inset-[-40px] bg-[#d4af37]/10 rounded-full blur-2xl animate-pulse" />
                
                <div className="w-40 h-40 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-[#050505] shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                  <Crown className="w-16 h-16 text-[#d4af37] fill-[#d4af37]/10" />
                  
                  {/* Decorative rotating border */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-dashed border-[#d4af37]/20 rounded-full"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-12 text-center"
              >
                <h2 className="text-4xl font-serif italic tracking-[0.5em] uppercase text-[#d4af37] mb-2">
                  Top Stars
                </h2>
                <div className="flex items-center gap-4 justify-center">
                   <div className="h-[1px] w-8 bg-[#d4af37]/30" />
                   <p className="text-[10px] font-black tracking-[0.8em] uppercase text-white/40">
                    Aureate Prestige
                   </p>
                   <div className="h-[1px] w-8 bg-[#d4af37]/30" />
                </div>
              </motion.div>

              {/* Progress Line */}
              <div className="mt-16 w-48 h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
                />
              </div>
            </div>

            {/* Bright Flash on Exit */}
            <motion.div 
              initial={{ opacity: 0 }}
              exit={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
              className="absolute inset-0 bg-white z-[30]"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Content Hub */}
      <div className={`relative z-10 transition-all duration-[2000ms] ${mounted && !loading ? 'opacity-100' : 'opacity-0 scale-95 blur-sm'}`}>
        
        <header className="pavi-container pt-48 pb-24 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-12">
               <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
               <Sparkles className="w-4 h-4 text-[#d4af37]" />
               <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-[#d4af37]/40 to-transparent" />
            </div>
            
            <h1 className="text-[clamp(3rem,12vw,9rem)] font-serif tracking-[-0.05em] mb-8 leading-none">
              <span className="block text-white mb-2">PAVI</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] animate-shimmer-gold italic">
                Top Stars
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-[#d4af37]/40 text-[9px] md:text-[10px] font-black leading-relaxed tracking-[0.8em] uppercase">
              The Sovereign Sanctuary of Diplomatic Excellence
            </p>
          </motion.div>
        </header>

        {/* The Vault Grid */}
        <section className="pavi-container pb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[3/4.6] rounded-[0.25rem] bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center transition-all duration-700 hover:border-[#d4af37]/40 hover:-translate-y-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                {/* Premium Inner Frame */}
                <div className="absolute inset-4 border border-white/[0.03] pointer-events-none" />
                
                {/* Cinematic Hover Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                {/* Content Placeholder */}
                <div className="relative z-10 flex flex-col items-center p-12 w-full h-full">
                  <div className="mt-auto mb-16 relative">
                    <div className="w-32 h-32 rounded-full bg-[#020202] border border-white/10 flex items-center justify-center group-hover:border-[#d4af37]/30 transition-all duration-1000 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                      <User className="w-12 h-12 text-white/5 group-hover:text-[#d4af37]/40 transition-colors" />
                    </div>
                    {/* Floating star on hover */}
                    <motion.div 
                      className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-all duration-700"
                    >
                       <Star className="w-10 h-10 text-[#d4af37]/20 fill-[#d4af37]/10" />
                    </motion.div>
                  </div>

                  <div className="mb-auto space-y-6 w-full">
                    <div className="space-y-4">
                       <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto" />
                       <div className="h-4 w-5/6 bg-white/5 rounded-sm mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent animate-shimmer" />
                       </div>
                       <div className="h-2 w-3/5 bg-white/5 rounded-sm mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent animate-shimmer" />
                       </div>
                    </div>
                    
                    <motion.div 
                      className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    >
                       <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-sm">
                          <Award className="w-3 h-3 text-[#d4af37]" />
                          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Distinguished</span>
                       </div>
                    </motion.div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#d4af37]/0 group-hover:border-[#d4af37]/40 transition-all duration-1000" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#d4af37]/0 group-hover:border-[#d4af37]/40 transition-all duration-1000" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40 text-center"
          >
             <div className="inline-flex flex-col items-center gap-6">
                <Crown className="w-8 h-8 text-[#d4af37]/20" />
                <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                <p className="text-[9px] font-black uppercase tracking-[0.8em] text-white/10">Eternal Achievement</p>
             </div>
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
