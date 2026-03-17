import { motion } from 'framer-motion';
import { Award, FileText, ChevronRight, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Baremos = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white overflow-hidden pt-28 md:pt-32 pb-20">
      <div className="pavi-container max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 text-amber-700 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            <Award className="w-4 h-4" />
            Excelencia Académica
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            Baremos de <span className="text-amber-600 italic">Evaluación</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent mb-8" />
        </div>

        {/* Main Content Card */}
        <div className="reveal relative group">
          {/* Decorative background blur */}
          <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/5 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative p-8 md:p-16 bg-white border border-gray-100 rounded-[3rem] shadow-2xl shadow-amber-900/5 overflow-hidden">
            {/* Subtle patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/30 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/30 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Text Side */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-amber-500" />
                    Criterios de Evaluación
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    En este documento se encuentra la escala que será utilizada para evaluar el desempeño de los delegados en los comités de la Primera Edición de PAVIMUN.
                  </p>
                  <p className="text-gray-500 italic text-sm">
                    * Después del evento, se adjuntará la versión con las ponderaciones correspondientes.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <CheckCircle2 className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Transparencia</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <Star className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Mérito</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Imparcialidad</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Excelencia</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://drive.google.com/drive/folders/1J5kGLKG1y41ZZA7LsTGpOuzQhkLFmHIP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-[2rem] shadow-xl shadow-amber-900/20 font-black text-lg tracking-wider group/btn uppercase"
                >
                  Acceder al Documento
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              {/* Decorative Side */}
              <div className="hidden lg:block relative">
                <div className="aspect-square relative flex items-center justify-center">
                  {/* Rotating golden circles */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-4 border-2 border-dashed border-amber-200/50 rounded-full" 
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-12 border-2 border-amber-100/30 rounded-full" 
                  />
                  
                  {/* Main Icon container */}
                  <div className="relative w-48 h-48 bg-gradient-to-br from-amber-50 to-white rounded-[4rem] shadow-2xl flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform duration-700">
                    <Award className="w-24 h-24 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
                    
                    {/* Floating mini-icons */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-xl border border-amber-50 flex items-center justify-center animate-bounce">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* School Footer Ornament */}
        <div className="mt-24 reveal opacity-50 flex flex-col items-center gap-6">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <img
            src="/images/colegio-logo.jpg"
            alt="Colegio Pablo VI"
            className="h-14 w-auto grayscale opacity-40"
          />
          <p className="text-[10px] font-mono text-gray-400 tracking-[0.5em] uppercase">PAVIMUN · EXCELLENCE SYNCED</p>
        </div>

      </div>
    </div>
  );
};

export default Baremos;
