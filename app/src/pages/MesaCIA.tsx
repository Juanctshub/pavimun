import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Volume2, 
  VolumeX, 
  Lock, 
  FileText, 
  AlertTriangle, 
  Terminal, 
  X,
  Eye,
  Fingerprint,
  Users,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  image: string;
  clearance: string;
}

const MesaCIA = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [glitchActive, setGlitchActive] = useState(false);

  const staff: StaffMember[] = [
    {
      id: 'isaias',
      name: 'Isaias Tovar',
      role: 'Ingeniero de Sistemas · Estratega MK',
      title: 'Presidente de Mesa',
      image: '/images/mesas/cia/isaias.jpeg',
      clearance: 'LEVEL 5 - ULTRA',
      bio: 'Estudiante de ingeniería informática de la UCLA. Con una trayectoria iniciada en 2021 en SPMUN, Isaias aporta una visión técnica y estratégica fundamental para el desarrollo de protocolos de inteligencia. Su reincorporación en 2024 marca una nueva etapa en la gestión de crisis psicológicas y debate de alto impacto. Fiel creyente de que los modelos son una experiencia transformadora que forja amistades y conocimientos únicos.'
    },
    {
      id: 'geraldine',
      name: 'Geraldine Juárez',
      role: 'Abogado · Especialista en Derecho Internacional',
      title: 'Vice-Presidente de Mesa',
      image: '/images/mesas/cia/geraldine.jpeg',
      clearance: 'LEVEL 4 - TOP SECRET',
      bio: 'Abogada con vasta experiencia en Derecho Mercantil, Tributario y Civil. Egresada del Conservatorio Vicente Emilio Sojo, Geraldine combina la disciplina del músico con el rigor del jurista. Condecorada como Mejor Mesa Directiva en SPMUN 2026, su enfoque se centra en la resolución de crisis a través del diálogo, la negociación y la defensa de los Derechos Humanos en el ámbito de la migración.'
    },
    {
      id: 'antonella',
      name: 'Antonella Sciulli',
      role: 'Arquitecto UCV · Analista de Crisis',
      title: 'Crisis Staff',
      image: '/images/mesas/cia/antonella.jpeg',
      clearance: 'LEVEL 3 - CLASSIFIED',
      bio: 'Estudiante de arquitectura en la UCV y participante activa desde 2022. Formada en la delegación COAMUN y actualmente en KAMEMUN, Antonella se especializa en comités de crisis. Su formación le ha enseñado el valor de la paciencia, el trabajo bajo presión y la importancia de escuchar para forjar el carácter. Su misión: crear una huella en la sociedad a través de la estrategia.'
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (!isMuted) {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err));
      }
    }
  }, [isMuted]);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-green-500 font-mono relative overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* CRT SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-[100] animate-scanline opacity-[0.03] bg-white" />
      
      {/* AUDIO ELEMENT */}
      <audio ref={audioRef} src="/videos/sub.mp3" loop />

      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-[8px] space-y-1">
          <p>DOD_PROTOCOL_V.7.0</p>
          <p>MKULTRA_SUBJECT_LOG: ACTIVE</p>
          <p>ENCRYPTION: 2048-BIT-AES</p>
        </div>
        <div className="absolute bottom-10 right-10 text-[8px] text-right">
          <p>PROPERTY OF CIA</p>
          <p>CLASSIFIED_MATERIAL</p>
          <p>UNAUTHORIZED_ACCESS_IS_FELONY</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`pavi-container py-16 relative z-10 transition-all duration-75 ${glitchActive ? 'translate-x-1 skew-x-2 brightness-150' : ''}`}>
        
        {/* HEADER */}
        <header className="mb-16 border-b border-green-900/50 pb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-black px-2 py-0.5 text-xs font-bold leading-none animate-pulse">
                  TOP SECRET
                </div>
                <div className="text-xs tracking-[0.3em] font-bold text-green-800 uppercase">
                  Central Intelligence Agency
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                MESA <span className="text-white">MK-ULTRA</span>
              </h1>
              <p className="text-sm text-green-900 max-w-xl">
                PERSONAL CLASIFICADO ASIGNADO AL PROYECTO DE MODIFICACIÓN CONDUCTUAL. 
                CUALQUIER FILTRACIÓN DE ESTOS DATOS RESULTARÁ EN ACCIÓN DISCIPLINARIA NIVEL 5.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 px-4 py-2 border border-green-900/50 hover:bg-green-500/10 transition-colors rounded-sm"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span className="text-xs font-bold">{isMuted ? "UNMUTE" : "MUTE"} AUDIO</span>
              </button>
              <Link 
                to="/cia"
                className="flex items-center gap-2 px-4 py-2 bg-green-900 text-black font-bold text-xs hover:bg-green-500 transition-colors rounded-sm"
              >
                BACK_TO_INTEL
              </Link>
            </div>
          </div>
        </header>

        {/* STAFF GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {staff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedStaff(member)}
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-green-900/50 group-hover:border-green-500 transition-all duration-300">
                {/* PHOTO */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                />
                
                {/* OVERLAYS */}
                <div className="absolute inset-0 bg-green-500/5 group-hover:bg-transparent transition-colors" />
                
                {/* ID TAG */}
                <div className="absolute top-4 right-4 bg-black/80 border border-green-500/50 px-2 py-1 text-[10px] font-bold text-green-500 backdrop-blur-sm">
                  {member.clearance}
                </div>

                {/* SCANNER LINE */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100">
                  <div className="h-[2px] w-full bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)] animate-scanline-fast" />
                </div>

                {/* BOTTOM INFO */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-green-500/30">
                  <div className="font-bold text-sm uppercase tracking-wider">{member.name}</div>
                  <div className="text-[10px] text-green-700 font-bold uppercase">{member.title}</div>
                </div>
              </div>

              {/* CARD FOOTER (Static Info) */}
              <div className="mt-4 space-y-1">
                <div className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">{member.name}</div>
                <div className="text-xs text-green-800 font-bold uppercase tracking-widest">{member.title}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[1px] flex-1 bg-green-900/50" />
                  <div className="text-[10px] text-green-900">VER_ST_FILE</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATUS FOOTER */}
        <footer className="mt-20 flex flex-wrap items-center justify-between gap-8 border-t border-green-900/30 pt-12">
          <div className="flex items-center gap-6 opacity-40">
            <div className="flex items-center gap-2">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[10px]">SYSTEM_LOAD: 42%</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span className="text-[10px]">AUTHORIZED: 03</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={14} />
              <span className="text-[10px]">SECURE: YES</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="text-[10px] tracking-[0.2em] font-bold">PAVIMUN // MK-ULTRA // 2024</div>
            <img src="/images/colegio-logo.jpg" alt="Logo" className="h-8 opacity-20 filter grayscale" />
          </div>
        </footer>

      </div>

      {/* DOSSIER MODAL */}
      <AnimatePresence>
        {selectedStaff && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={() => setSelectedStaff(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: -20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 20 }}
              className="relative w-full max-w-4xl bg-[#0d0d0d] border border-green-500/30 overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.1)] p-1 rounded-sm"
            >
              {/* DOSSIER HEADER */}
              <div className="flex items-center justify-between bg-green-900/20 px-6 py-4 border-b border-green-500/20">
                <div className="flex items-center gap-4">
                  <Shield size={20} className="text-green-500" />
                  <div>
                    <h3 className="text-sm font-bold tracking-widest uppercase">Dossier Clasificado: {selectedStaff.id.toUpperCase()}</h3>
                    <p className="text-[10px] text-green-800">EXPEDIENTE #{Math.floor(Math.random() * 900000 + 100000)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStaff(null)}
                  className="p-2 hover:bg-red-500/20 text-green-500 hover:text-red-500 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* DOSSIER CONTENT */}
              <div className="grid md:grid-cols-[300px_1fr] h-full max-h-[70vh] md:max-h-none overflow-y-auto">
                <div className="p-8 border-b md:border-b-0 md:border-r border-green-500/20 space-y-6">
                  <div className="relative aspect-square border border-green-500/30">
                    <img src={selectedStaff.image} alt={selectedStaff.name} className="w-full h-full object-cover grayscale" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600 opacity-50" />
                  </div>
                  
                  <div className="space-y-4 font-mono">
                    <div>
                      <div className="text-[10px] text-green-900 uppercase font-bold">STATUS_LEVEL</div>
                      <div className="text-sm text-green-400 font-bold">{selectedStaff.clearance}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-green-900 uppercase font-bold">CURRENT_ASSIGNMENT</div>
                      <div className="text-sm text-white font-bold">{selectedStaff.title}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-green-900 uppercase font-bold">IDENTIFIED_ROLE</div>
                      <div className="text-xs text-green-400">{selectedStaff.role}</div>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-500 mb-2">
                      <Terminal size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Historical_Data</span>
                    </div>
                    <div className="text-sm md:text-base leading-relaxed text-gray-400 font-sans italic space-y-4">
                      {selectedStaff.bio.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <Fingerprint size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Psychological_Evaluation</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-500/5 p-4 border border-green-500/10 flex items-start gap-3">
                        <Eye size={14} className="mt-1 opacity-50" />
                        <div>
                          <div className="text-[10px] text-green-900 mb-1 uppercase font-bold">STABILITY_CODE</div>
                          <div className="text-xs text-green-400 font-mono">STABLE // ALPHA-9</div>
                        </div>
                      </div>
                      <div className="bg-green-500/5 p-4 border border-green-500/10 flex items-start gap-3">
                        <FileText size={14} className="mt-1 opacity-50" />
                        <div>
                          <div className="text-[10px] text-green-900 mb-1 uppercase font-bold">INTEGRITY_INDEX</div>
                          <div className="text-xs text-green-400 font-mono">98.4% // SECURE</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center p-4 bg-red-950/20 border border-red-900/30">
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle size={18} />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Destroy After Reading</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-scanline-fast {
          animation: scanline 2s linear infinite;
        }
        .typing-effect {
          overflow: hidden;
          border-right: .15em solid #0f0;
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: .15em;
          animation: 
            typing 3.5s steps(40, end),
            blink-caret .75s step-end infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #0f0; }
        }
      `}</style>
    </div>
  );
};

export default MesaCIA;
