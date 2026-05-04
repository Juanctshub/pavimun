import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaviTopStars = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simular carga "increíble"
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          >
            {/* Star field animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.8, 0],
                    y: '-=100'
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full border-2 border-indigo-500/30 flex items-center justify-center animate-pulse">
                <Star className="w-10 h-10 text-indigo-400 fill-indigo-400" />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border-t-2 border-indigo-500 rounded-full"
              />
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 text-2xl font-black tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400"
            >
              PAVI TOP STARS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-2 text-indigo-300/40 text-[10px] font-bold tracking-[0.5em] uppercase"
            >
              Inmortalizando la Excelencia
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 transition-all duration-1000 ${mounted && !loading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <nav className="pavi-container py-8 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Regresar</span>
          </Link>
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
             <Star className="w-5 h-5 text-indigo-400 fill-indigo-400" />
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </nav>

        <header className="pavi-container pt-12 pb-20 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20">
                PAVI TOP
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                STARS
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-indigo-200/40 text-sm md:text-base font-medium leading-relaxed tracking-wide">
              Bienvenidos al panteón de la diplomacia. Aquí residen los delegados que, por su elocuencia, 
              liderazgo y valores, han dejado una huella imborrable en la historia de PAVIMUN.
            </p>
          </motion.div>
        </header>

        {/* The Grid - Empty state for now */}
        <section className="pavi-container pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8 }}
                className="group relative aspect-[3/4] rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden flex flex-col items-center justify-center transition-all duration-500 hover:bg-white/[0.05] hover:border-indigo-500/30"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Placeholder Content */}
                <div className="relative z-10 flex flex-col items-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:border-indigo-500/20 shadow-inner">
                    <User className="w-8 h-8 text-white/10 group-hover:text-indigo-400/40 transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-32 bg-white/5 rounded-full mx-auto overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    </div>
                    <div className="h-3 w-24 bg-white/5 rounded-full mx-auto overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/0 group-hover:border-indigo-500/40 transition-all duration-500 rounded-tr-xl" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/0 group-hover:border-indigo-500/40 transition-all duration-500 rounded-bl-xl" />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200/60">
                Próximamente más estrellas
              </span>
            </div>
          </motion.div>
        </section>
      </div>

      <style>{`
        @keyframes splash-orbit1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes splash-orbit2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes splash-orbit3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.2); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer {
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default PaviTopStars;
