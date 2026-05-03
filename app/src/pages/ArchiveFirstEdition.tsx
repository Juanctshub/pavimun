import { motion } from 'framer-motion';
import { 
  Users, BookOpen, Clipboard, UserPlus, Image as ImageIcon, 
  Gavel, Search, AlertTriangle, Shield, Radio, Radiation, Newspaper,
  ChevronRight, Award, History, Sparkles, Box
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ArchiveFirstEdition = () => {
  useScrollReveal();

  const infoItems = [
    { path: '/i-edicion/staff', label: 'Staff Organizador', icon: <Users className="w-7 h-7" />, color: 'from-blue-500 to-indigo-600', description: 'El equipo que lideró la primera edición.' },
    { path: '/i-edicion/matrices', label: 'Matrices', icon: <Clipboard className="w-7 h-7" />, color: 'from-emerald-500 to-teal-600', description: 'Asignaciones oficiales de países y cargos.' },
    { path: '/i-edicion/inscripciones', label: 'Inscripciones', icon: <UserPlus className="w-7 h-7" />, color: 'from-indigo-500 to-purple-600', description: 'Formatos y registros históricos.' },
    { path: '/i-edicion/reglamentos', label: 'Reglamentos', icon: <BookOpen className="w-7 h-7" />, color: 'from-sky-500 to-blue-600', description: 'Normativas y protocolos académicos.' },
    { path: '/i-edicion/baremos', label: 'Baremos', icon: <Award className="w-7 h-7" />, color: 'from-amber-500 to-orange-600', description: 'Criterios de evaluación de excelencia.' },
    { path: '/i-edicion/galeria', label: 'Galería', icon: <ImageIcon className="w-7 h-7" />, color: 'from-purple-500 to-pink-600', description: 'Momentos capturados en alta resolución.' },
  ];

  const committeeItems = [
    { path: '/i-edicion/corte', label: 'Corte', icon: <Gavel className="w-6 h-6" />, color: 'slate', tag: 'Judicial' },
    { path: '/i-edicion/investigacion', label: 'Investigación', icon: <Search className="w-6 h-6" />, color: 'amber', tag: 'Especial' },
    { path: '/i-edicion/crisis', label: 'Crisis', icon: <AlertTriangle className="w-6 h-6" />, color: 'red', tag: 'Alta Tensión' },
    { path: '/i-edicion/cia', label: 'CIA', icon: <Shield className="w-6 h-6" />, color: 'blue', tag: 'Inteligencia' },
    { path: '/i-edicion/consejo-seguridad', label: 'Consejo de Seguridad', icon: <Radio className="w-6 h-6" />, color: 'red', tag: 'Urgencia' },
    { path: '/i-edicion/oiea', label: 'OIEA', icon: <Radiation className="w-6 h-6" />, color: 'cyan', tag: 'Atómico' },
    { path: '/i-edicion/prensa', label: 'Prensa', icon: <Newspaper className="w-6 h-6" />, color: 'blue', tag: 'Comunicación' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] translate-y-1/2" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="pavi-container max-w-7xl mx-auto px-6 pt-32 pb-32 relative z-10">
        
        {/* ====== HERO SECTION ====== */}
        <header className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-indigo-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-8 shadow-xl shadow-black/20"
          >
            <History className="w-4 h-4" />
            Repositorio Histórico de Excelencia
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none"
          >
            PAVIMUN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-600">I EDICIÓN</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-12"
          >
            El origen de una nueva era académica. Navega a través de los documentos, 
            protagonistas y escenarios que definieron nuestro primer encuentro.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-4"
          >
             <div className="h-1 w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
             <Sparkles className="w-6 h-6 text-indigo-500/50 animate-pulse" />
             <div className="h-1 w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
          </motion.div>
        </header>

        {/* ====== CONTENT GRID ====== */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Información Section (Left) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-6 mb-4 reveal">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <Box className="w-6 h-6 text-indigo-500" />
                Legado
              </h2>
              <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="space-y-4">
              {infoItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="group relative flex items-center gap-6 p-6 bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-[2rem] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-500"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shadow-black/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {item.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Comités Section (Right) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="flex items-center gap-6 mb-4 reveal">
              <div className="h-px flex-grow bg-gradient-to-l from-white/10 to-transparent" />
              <h2 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                Comités
                <Award className="w-6 h-6 text-purple-500" />
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {committeeItems.map((item, idx) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="group relative h-full flex flex-col p-8 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm border border-white/5 rounded-[2.5rem] hover:border-purple-500/30 transition-all duration-700 overflow-hidden"
                  >
                    {/* Animated background glow */}
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-[60px] group-hover:bg-purple-600/20 group-hover:scale-150 transition-all duration-1000" />
                    
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all duration-500">
                        {item.icon}
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                        {item.tag}
                      </span>
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="text-3xl font-black text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">{item.label}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500/60 uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">
                        Protocolo de Archivo
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* ====== FOOTER CREDIT ====== */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 pt-16 border-t border-white/5 flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-10">
            <img
              src="/images/pavimun-logo.jpg"
              alt="PAVIMUN Logo"
              className="h-16 w-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700 opacity-30 hover:opacity-100 cursor-pointer"
            />
            <div className="h-8 w-px bg-white/10" />
            <img
              src="/images/colegio-logo.jpg"
              alt="Colegio Pablo VI"
              className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-700 opacity-30 hover:opacity-100 cursor-pointer"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.6em]">PAVIMUN · DIGITAL ARCHIVE</p>
            <p className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em]">© 2026 — Preservando la excelencia académica</p>
          </div>
          
          <div className="mt-4 px-6 py-2 bg-white/5 rounded-full border border-white/5 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            Diseño por Samuel Agreda <span className="text-indigo-500/50">(@fotagreda)</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ArchiveFirstEdition;
