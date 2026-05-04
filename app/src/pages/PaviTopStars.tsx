import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, Sparkles, User, Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaviTopStars = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden font-sans selection:bg-[#d4af37]/30">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020202]"
          >
            {/* Gold Dust Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 10,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 0.8, 0],
                    x: `+=${(Math.random() - 0.5) * 200}`
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 3,
                    ease: "linear"
                  }}
                  className="absolute w-0.5 h-0.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#ffd700]"
                />
              ))}
            </div>

            <div className="relative">
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border border-[#d4af37]/10 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60px] border border-[#d4af37]/5 rounded-full"
              />
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-b from-[#d4af37] to-[#b38728] p-[2px] shadow-[0_0_50px_rgba(212,175,55,0.3)]"
              >
                <div className="w-full h-full rounded-full bg-[#020202] flex items-center justify-center overflow-hidden">
                   <Star className="w-12 h-12 text-[#d4af37] fill-[#d4af37] animate-pulse" />
                   <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-16 text-center"
            >
              <h2 className="text-3xl font-black tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">
                PAVI Top Stars
              </h2>
              <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mt-4" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-1500 ${mounted && !loading ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Fixed Background - No interference with Nav */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-[#b38728]/3 rounded-full blur-[100px]" />
          
          {/* Subtle star field */}
          <div className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)', 
              backgroundSize: '80px 80px' 
            }} 
          />
        </div>

        {/* Improved Header Area to avoid Nav interference */}
        <div className="pt-32 pb-16">
          <nav className="pavi-container mb-12 flex items-center justify-between">
            <Link to="/" className="group flex items-center gap-3 text-white/30 hover:text-[#d4af37] transition-all">
              <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-[#d4af37]/30 transition-colors bg-white/2">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Página de Inicio</span>
            </Link>
            
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/30" />
               <Award className="w-5 h-5 text-[#d4af37]" />
               <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/30" />
            </div>
          </nav>

          <header className="pavi-container text-center">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 mb-8">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Salón de la Excelencia</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
                <span className="text-white">PAVI</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] animate-shimmer-gold">
                  Top Stars
                </span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-lg font-medium leading-relaxed tracking-wide opacity-80">
                Un tributo a los líderes del mañana. Aquí celebramos la destreza intelectual, 
                la diplomacia audaz y el carácter excepcional de nuestros delegados estrella.
              </p>
            </motion.div>
          </header>
        </div>

        {/* The Grid - Premium Gold Placeholders */}
        <section className="pavi-container pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, duration: 1 }}
                className="group relative aspect-[3/4.2] rounded-[2rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 hover:border-[#d4af37]/40 hover:-translate-y-2 shadow-2xl"
              >
                {/* Gold Inner Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Premium Placeholder Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-10 w-full h-full">
                  <div className="mt-auto mb-10 relative">
                    <div className="w-24 h-24 rounded-full bg-black border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 group-hover:border-[#d4af37]/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <User className="w-10 h-10 text-white/5 group-hover:text-[#d4af37]/40 transition-colors" />
                    </div>
                    {/* Floating star on hover */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                      <Star className="w-6 h-6 text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </div>
                  </div>

                  <div className="mb-auto space-y-4 w-full">
                    <div className="h-[2px] w-12 bg-[#d4af37]/20 mx-auto" />
                    <div className="space-y-2">
                       <div className="h-4 w-3/4 bg-white/5 rounded-full mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent animate-shimmer" />
                       </div>
                       <div className="h-3 w-1/2 bg-white/5 rounded-full mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/5 to-transparent animate-shimmer" />
                       </div>
                    </div>
                    <div className="pt-6">
                       <div className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center mx-auto group-hover:border-[#d4af37]/20 transition-colors">
                          <Sparkles className="w-4 h-4 text-white/5 group-hover:text-[#d4af37]/30" />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Metallic Border Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 flex flex-col items-center"
          >
             <p className="text-[#d4af37]/30 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Under development</p>
             <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
          </motion.div>
        </section>
      </div>

      <style>{`
        .animate-shimmer-gold {
          background-size: 200% auto;
          animation: shimmer-gold 6s linear infinite;
        }
        @keyframes shimmer-gold {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          transform: translateX(-100%);
          animation: shimmer 2.5s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PaviTopStars;
