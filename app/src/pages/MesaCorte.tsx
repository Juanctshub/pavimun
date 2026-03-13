import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, Gavel, Shield, BookOpen, Award, Briefcase, GraduationCap, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaCorte = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Audio — same as Corte page
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const fadeIn = () => {
      let v = 0;
      a.volume = 0;
      const i = setInterval(() => {
        v += 0.005;
        if (v >= 0.15) { v = 0.15; clearInterval(i); }
        a.volume = v;
      }, 80);
    };

    a.volume = 0;
    a.muted = false;
    a.play().then(fadeIn).catch(() => {
      const tryPlay = () => {
        a.volume = 0;
        a.play().then(() => {
          fadeIn();
          document.removeEventListener('click', tryPlay);
          document.removeEventListener('touchstart', tryPlay);
        }).catch(() => {});
      };
      document.addEventListener('click', tryPlay);
      document.addEventListener('touchstart', tryPlay);
    });

    return () => { a.pause(); a.currentTime = 0; };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const next = !muted;
      audioRef.current.muted = next;
      setMuted(next);
    }
  };

  const authorities = [
    {
      role: 'Presidente de Mesa',
      name: 'Gerardo Valenzuela',
      image: '/images/mesas/corte/g.jpeg',
      title: 'Abogado Corporativo & Docente Universitario',
      credentials: [
        'Abogado corporativo',
        'Magíster en Derecho de la Empresa, Banca y Finanzas',
        'Politólogo Cum Laude #1 de la promoción LVI-UFT/2023',
        'Docente por concurso de oposición en Derecho Mercantil I — UCLA-DCEE',
        'Docente de postgrado en la Universidad Latinoamericana de Ciencias Jurídicas (Miami-EEUU)',
        'Experto en litigios civiles y corporativos, propiedad intelectual, evidencias digitales y negocios petroleros',
        '10 años de experiencia en Modelos de Naciones Unidas',
        '4 veces distinguido como Mejor Mesa Directiva (SPMUN, CAMIMUN×2 y CABMUN)',
        'Eterno estudiante de leyes...',
      ],
    },
    {
      role: 'Vice-Presidenta de Mesa',
      name: 'Deikary Pérez',
      image: '/images/mesas/corte/d.jpeg',
      title: 'Estudiante de Derecho & Especialista en Corte',
      motto: '"Fiel creyente de que la educación y la cultura son los pilares para una sociedad civilizada y exitosa"',
      credentials: [
        'Estudiante de Derecho en la Universidad Fermín Toro',
        'Apasionada por las Ciencias Políticas, la Sociología y la Economía',
        'Trayectoria en Modelos de Naciones Unidas desde 2022, especializada en Comités de Corte',
        '5 veces distinguida como Mejor Mesa Directiva',
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-serif">
      
      {/* Audio */}
      <audio ref={audioRef} src="/videos/epsteinsong.mp3" loop preload="auto" />

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-[60] group"
        title={muted ? 'Activar sonido' : 'Silenciar'}
      >
        {!muted && <div className="absolute inset-0 rounded-full bg-[#002244]/30 animate-ping" />}
        <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          !muted
            ? 'bg-[#002244]/90 border-[#002244]/50 text-white shadow-[#002244]/30'
            : 'bg-white/80 border-gray-300 text-gray-400 hover:text-[#002244] shadow-gray-200'
        }`}>
          {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
      </button>

      {/* DOJ Navy Header Banner — like the real DOJ site */}
      <div className="bg-[#002244] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
          <Link
            to="/corte"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white font-sans text-xs tracking-wider mb-8 transition-colors uppercase group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Regresar a Corte
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* DOJ Seal */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
              <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" />
            </div>
            <div>
              <p className="text-white/40 font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2">Corte Internacional de Justicia · PAVIMUN 2026</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Mesa Directiva
              </h1>
              <p className="text-white/40 font-sans text-xs mt-2 tracking-wider">DIRECTORIO OFICIAL DE LA CORTE</p>
            </div>
          </div>

          {/* Gold rule */}
          <div className="mt-8 h-1 bg-gradient-to-r from-[#bf9b30] via-[#ffcf40] to-[#bf9b30] rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        
        {/* Judicial seal watermark */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.02]">
          <Scale className="w-[400px] h-[400px] text-[#002244]" />
        </div>

        <div className="relative z-10 space-y-20 md:space-y-28">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-3 px-4 py-2 bg-[#002244] text-white">
                  <Gavel className="w-4 h-4" />
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">{auth.role}</span>
                </div>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#002244] to-transparent" />
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 lg:gap-14 ${idx % 2 === 1 ? 'md:grid-cols-[2fr_1fr]' : ''}`}>
                
                {/* Photo */}
                <div className={`relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-sm shadow-2xl">
                    {/* Gold frame border */}
                    <div className="absolute inset-0 z-20 pointer-events-none border-4 border-[#bf9b30]/30 rounded-sm" />
                    <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-gradient-to-r from-[#bf9b30] via-[#ffcf40] to-[#bf9b30]" />
                    
                    <img
                      src={auth.image}
                      alt={auth.name}
                      className="w-full aspect-[3/4] object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    />
                    
                    {/* Official nameplate overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#002244] via-[#002244]/90 to-transparent pt-20 p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#bf9b30]" />
                        <span className="text-[#bf9b30] font-sans text-[10px] tracking-[0.3em] uppercase font-bold">Magistrado</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                        {auth.name}
                      </h2>
                      <p className="text-white/50 font-sans text-xs mt-1 tracking-wider">{auth.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  
                  {/* Quote if exists */}
                  {auth.motto && (
                    <div className="mb-8 pl-5 border-l-4 border-[#bf9b30]">
                      <p className="text-[#002244]/70 italic text-lg leading-relaxed">{auth.motto}</p>
                    </div>
                  )}

                  {/* Credentials — the main content */}
                  <div className="bg-gray-50 border border-gray-200 rounded-sm overflow-hidden">
                    <div className="bg-[#002244] px-5 py-3 flex items-center gap-3">
                      <Shield className="w-4 h-4 text-[#bf9b30]" />
                      <h3 className="text-white font-sans text-sm font-bold tracking-wider uppercase">Credenciales & Trayectoria</h3>
                    </div>
                    <div className="p-5 sm:p-6 space-y-4">
                      {auth.credentials.map((credential, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-4">
                          <div className="mt-1 flex-shrink-0">
                            {cIdx < 3 ? (
                              <GraduationCap className="w-4 h-4 text-[#002244]" />
                            ) : cIdx < 6 ? (
                              <Briefcase className="w-4 h-4 text-[#002244]" />
                            ) : (
                              <Award className="w-4 h-4 text-[#bf9b30]" />
                            )}
                          </div>
                          <p className="text-gray-700 text-base leading-relaxed">{credential}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official stamp */}
                  <div className="mt-6 flex items-center gap-3 text-[#002244]/30 font-sans text-[10px] tracking-widest uppercase">
                    <BookOpen className="w-4 h-4" />
                    <span>Expediente Verificado · PAVIMUN 2026</span>
                  </div>
                </div>
              </div>

              {/* Separator */}
              {idx < authorities.length - 1 && (
                <div className="mt-16 flex items-center gap-4">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#002244]/10 to-transparent" />
                  <Scale className="w-5 h-5 text-[#002244]/15" />
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#002244]/10 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 md:mt-28 pt-8 border-t-2 border-[#002244]/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#002244]/30 font-sans text-xs tracking-wider">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>CORTE INTERNACIONAL DE JUSTICIA</span>
            </div>
            <span>PAVIMUN · I EDICIÓN · 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesaCorte;
