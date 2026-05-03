import { motion } from 'framer-motion';
import { 
  Users, BookOpen, Clipboard, UserPlus, FileText, Image as ImageIcon, 
  Gavel, Search, AlertTriangle, Shield, Radio, Radiation, Newspaper,
  ChevronRight, Award, History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ArchiveFirstEdition = () => {
  useScrollReveal();

  const infoItems = [
    { path: '/i-edicion/staff', label: 'Staff Organizador', icon: <Users className="w-6 h-6" />, color: 'blue' },
    { path: '/i-edicion/matrices', label: 'Matrices', icon: <Clipboard className="w-6 h-6" />, color: 'emerald' },
    { path: '/i-edicion/inscripciones', label: 'Inscripciones', icon: <UserPlus className="w-6 h-6" />, color: 'indigo' },
    { path: '/i-edicion/reglamentos', label: 'Reglamentos', icon: <BookOpen className="w-6 h-6" />, color: 'sky' },
    { path: '/i-edicion/baremos', label: 'Baremos', icon: <Award className="w-6 h-6" />, color: 'amber' },
    { path: '/i-edicion/galeria', label: 'Galería', icon: <ImageIcon className="w-6 h-6" />, color: 'purple' },
  ];

  const committeeItems = [
    { path: '/i-edicion/corte', label: 'Corte', icon: <Gavel className="w-6 h-6" />, color: 'slate' },
    { path: '/i-edicion/investigacion', label: 'Investigación', icon: <Search className="w-6 h-6" />, color: 'amber' },
    { path: '/i-edicion/crisis', label: 'Crisis', icon: <AlertTriangle className="w-6 h-6" />, color: 'red' },
    { path: '/i-edicion/cia', label: 'CIA', icon: <Shield className="w-6 h-6" />, color: 'blue' },
    { path: '/i-edicion/consejo-seguridad', label: 'Consejo de Seguridad', icon: <Radio className="w-6 h-6" />, color: 'red' },
    { path: '/i-edicion/oiea', label: 'OIEA', icon: <Radiation className="w-6 h-6" />, color: 'cyan' },
    { path: '/i-edicion/prensa', label: 'Prensa', icon: <Newspaper className="w-6 h-6" />, color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-[#fafbff] pt-28 pb-20">
      <div className="pavi-container max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <header className="mb-16 text-center md:text-left reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100 text-indigo-700 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
            <History className="w-4 h-4" />
            Archivo Histórico
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            I Edición <span className="text-indigo-600 italic">PAVIMUN</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium">
            Revive la experiencia de nuestra primera edición. Accede a toda la información académica y los comités que marcaron el inicio de este legado.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Información Section */}
          <div className="lg:col-span-5 space-y-8 reveal">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-grow bg-gray-200" />
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Información</h2>
              <div className="h-px w-8 bg-gray-200" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {infoItems.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Comités Section */}
          <div className="lg:col-span-7 space-y-8 reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gray-200" />
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Comités</h2>
              <div className="h-px flex-grow bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {committeeItems.map((item, idx) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative flex flex-col p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle background glow */}
                  <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gray-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:rotate-6 transition-transform`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-2">{item.label}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Explorar Comité
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Credit */}
        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-6 opacity-60">
           <img
            src="/images/colegio-logo.jpg"
            alt="Colegio Pablo VI"
            className="h-12 w-auto grayscale"
          />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">PAVIMUN · Legado Histórico</p>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Creador por Samuel Agreda (@fotagreda)</p>
        </div>

      </div>
    </div>
  );
};

export default ArchiveFirstEdition;
