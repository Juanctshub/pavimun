import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, Gavel, Shield, BookOpen, Award, Briefcase, GraduationCap, Volume2, VolumeX, Landmark, Star, FileText } from 'lucide-react';
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
      const i = setInterval(() => { v += 0.005; if (v >= 0.15) { v = 0.15; clearInterval(i); } a.volume = v; }, 80);
    };
    a.volume = 0; a.muted = false;
    a.play().then(fadeIn).catch(() => {
      const tryPlay = () => { a.volume = 0; a.play().then(() => { fadeIn(); document.removeEventListener('click', tryPlay); document.removeEventListener('touchstart', tryPlay); }).catch(() => {}); };
      document.addEventListener('click', tryPlay); document.addEventListener('touchstart', tryPlay);
    });
    return () => { a.pause(); a.currentTime = 0; };
  }, []);

  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !muted; setMuted(!muted); } };

  const authorities = [
    {
      role: 'PRESIDENTE DE MESA',
      name: 'Gerardo Valenzuela',
      image: '/images/mesas/corte/g.jpeg',
      caseNumber: 'CIJ-2026-001',
      title: 'Abogado Corporativo · Docente Universitario',
      credentials: [
        { icon: 'grad', text: 'Abogado corporativo' },
        { icon: 'grad', text: 'Magíster en Derecho de la Empresa, Banca y Finanzas' },
        { icon: 'grad', text: 'Politólogo Cum Laude #1 de la promoción LVI-UFT/2023' },
        { icon: 'work', text: 'Docente por concurso de oposición en Derecho Mercantil I — UCLA-DCEE' },
        { icon: 'work', text: 'Docente de postgrado — Universidad Latinoamericana de Ciencias Jurídicas (Miami-EEUU)' },
        { icon: 'work', text: 'Experto en litigios civiles y corporativos, propiedad intelectual, evidencias digitales y negocios petroleros' },
        { icon: 'award', text: '10 años de experiencia en Modelos de Naciones Unidas' },
        { icon: 'award', text: '4 veces distinguido como Mejor Mesa Directiva (SPMUN, CAMIMUN×2 y CABMUN)' },
        { icon: 'star', text: 'Eterno estudiante de leyes...' },
      ],
    },
    {
      role: 'VICE-PRESIDENTA DE MESA',
      name: 'Deikary Pérez',
      image: '/images/mesas/corte/d.jpeg',
      caseNumber: 'CIJ-2026-002',
      title: 'Estudiante de Derecho · Especialista en Corte',
      motto: '"Fiel creyente de que la educación y la cultura son los pilares para una sociedad civilizada y exitosa"',
      credentials: [
        { icon: 'grad', text: 'Estudiante de Derecho en la Universidad Fermín Toro' },
        { icon: 'work', text: 'Apasionada por las Ciencias Políticas, la Sociología y la Economía' },
        { icon: 'award', text: 'Trayectoria en Modelos de Naciones Unidas desde 2022, especializada en Comités de Corte' },
        { icon: 'award', text: '5 veces distinguida como Mejor Mesa Directiva' },
      ],
    }
  ];

  const CredIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'grad': return <GraduationCap className="w-4 h-4 text-[#002244]" />;
      case 'work': return <Briefcase className="w-4 h-4 text-[#002244]" />;
      case 'award': return <Award className="w-4 h-4 text-[#bf9b30]" />;
      case 'star': return <Star className="w-4 h-4 text-[#bf9b30]" />;
      default: return <FileText className="w-4 h-4 text-[#002244]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#1a1a1a] font-serif relative overflow-hidden">
      
      <audio ref={audioRef} src="/videos/aa.mp3" loop preload="auto" />

      {/* Mute */}
      <button onClick={toggleMute} className="fixed bottom-6 right-6 z-[60] group" title={muted ? 'Activar sonido' : 'Silenciar'}>
        {!muted && <div className="absolute inset-0 rounded-full bg-[#002244]/30 animate-ping" />}
        <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${!muted ? 'bg-[#002244]/90 border-[#002244]/50 text-white shadow-[#002244]/30' : 'bg-white/80 border-gray-300 text-gray-400 hover:text-[#002244] shadow-gray-200'}`}>
          {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
      </button>

      {/* Subtle paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* DECORATIVE BACKGROUND ELEMENTS: Justice Pillars */}
      <div className="fixed inset-0 pointer-events-none flex justify-between px-10 opacity-[0.03] z-0">
        <div className="h-full w-24 border-x-4 border-[#002244] relative">
          <div className="absolute top-0 w-full h-20 bg-[#002244]" />
          <div className="absolute bottom-0 w-full h-20 bg-[#002244]" />
        </div>
        <div className="h-full w-24 border-x-4 border-[#002244] relative">
          <div className="absolute top-0 w-full h-20 bg-[#002244]" />
          <div className="absolute bottom-0 w-full h-20 bg-[#002244]" />
        </div>
      </div>

      {/* ═══ DOJ HEADER BANNER ═══ */}
      <div className="relative bg-[#002244] overflow-hidden">
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001833] to-[#003366] opacity-50" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#bf9b30]/5 to-transparent" />
        
        {/* Federal stars pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' fill='white' font-size='14'%3E★%3C/text%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-20">
          <Link to="/corte" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-sans text-xs tracking-wider mb-10 transition-colors uppercase group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Regresar a Corte
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Official seal */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#bf9b30] to-[#8B6914] p-[3px]">
                <div className="w-full h-full rounded-full bg-[#002244] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <Scale className="w-12 h-12 sm:w-14 sm:h-14 text-[#bf9b30] relative z-10" />
                </div>
              </div>
              {/* Seal ring */}
              <div className="absolute -inset-2 rounded-full border border-[#bf9b30]/20" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Landmark className="w-4 h-4 text-[#bf9b30]" />
                <span className="text-[#bf9b30] font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold">Corte Internacional de Justicia</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-3">
                Mesa Directiva
              </h1>
              <p className="text-white/30 font-sans text-xs sm:text-sm tracking-[0.15em] uppercase">Directorio Oficial · PAVIMUN I Edición · 2026</p>
            </div>
          </div>

          {/* Official gold rule with ornaments */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#bf9b30] to-[#bf9b30]" />
            <Gavel className="w-5 h-5 text-[#bf9b30]" />
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#bf9b30] to-[#bf9b30]" />
          </div>

          {/* Jurisdiction bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 font-sans text-[10px] text-white/30 tracking-widest uppercase">
            <span>Jurisdicción Universal</span>
            <span className="text-[#bf9b30]">•</span>
            <span>Derecho Internacional</span>
            <span className="text-[#bf9b30]">•</span>
            <span>Justicia Global</span>
          </div>
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">

        {/* Background watermark */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.015]">
          <Scale className="w-[500px] h-[500px] text-[#002244]" />
        </div>

        <div className="relative z-10 space-y-24 md:space-y-32 text-left">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Case file header */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <div className="flex items-center gap-2 bg-[#002244] text-white px-4 py-2.5">
                  <Gavel className="w-4 h-4 text-[#bf9b30]" />
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase">{auth.role}</span>
                </div>
                <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#002244] via-[#002244]/50 to-transparent" />
                <div className="flex items-center gap-2 px-3 py-2 border border-[#002244]/20 bg-white">
                  <FileText className="w-3 h-3 text-[#002244]/40" />
                  <span className="font-sans text-[10px] text-[#002244]/50 tracking-wider">EXPEDIENTE {auth.caseNumber}</span>
                </div>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-14 ${idx % 2 === 1 ? '' : ''}`}>
                
                {/* Photo — 2 of 5 cols */}
                <div className={`md:col-span-2 relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative overflow-hidden shadow-2xl">
                    {/* Double gold frame */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      <div className="absolute inset-0 border-[3px] border-[#bf9b30]/40" />
                      <div className="absolute inset-2 border border-[#bf9b30]/20" />
                    </div>
                    {/* Top gold bar */}
                    <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-to-r from-[#bf9b30] via-[#ffcf40] to-[#bf9b30]" />
                    
                    <img
                      src={auth.image}
                      alt={auth.name}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    />

                    {/* OFFICIAL WAX SEAL ORNAMENT */}
                    <div className="absolute -top-6 -left-6 z-30 w-16 h-16 pointer-events-none drop-shadow-lg">
                      <div className="w-full h-full rounded-full bg-red-700 border-2 border-red-800 flex items-center justify-center relative overflow-hidden">
                        <Scale className="w-8 h-8 text-white/50" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20" />
                      </div>
                    </div>

                    {/* EVIDENCE SCANNING EFFECT */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-blue-400/30 blur-sm z-30 animate-scanline-fast opacity-0 group-hover:opacity-100" />
                    <div className="absolute inset-y-0 left-0 w-1 bg-blue-400/30 blur-sm z-30 animate-pulse opacity-0 group-hover:opacity-100" />
                    
                    {/* Official nameplate */}
                    <div className="absolute bottom-0 inset-x-0 z-20">
                      <div className="bg-gradient-to-t from-[#002244] via-[#002244]/95 to-transparent pt-24 p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-3 h-3 text-[#bf9b30]" />
                          <span className="text-[#bf9b30] font-sans text-[10px] tracking-[0.3em] uppercase font-bold">Magistrado</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                          {auth.name}
                        </h2>
                        <p className="text-white/40 font-sans text-xs mt-2 tracking-wider">{auth.title}</p>
                      </div>
                    </div>

                    {/* Corner official stamps */}
                    <div className="absolute top-4 right-4 z-20 bg-[#cf102d]/90 text-white font-sans text-[8px] font-bold tracking-wider px-2 py-1 uppercase">
                      Verificado
                    </div>
                  </div>
                </div>

                {/* Content — 3 of 5 cols */}
                <div className={`md:col-span-3 flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  
                  {/* Quote */}
                  {auth.motto && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-8 relative"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#bf9b30] to-[#bf9b30]/30 rounded-full" />
                      <div className="pl-6 py-2">
                        <p className="text-[#002244]/60 italic text-lg sm:text-xl leading-relaxed font-serif">{auth.motto}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Credentials card */}
                  <div className="bg-white border border-gray-200 shadow-lg overflow-hidden">
                    {/* Card header */}
                    <div className="bg-[#002244] px-5 sm:px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-[#bf9b30]" />
                        <h3 className="text-white font-sans text-sm font-bold tracking-[0.15em] uppercase">Credenciales & Trayectoria</h3>
                      </div>
                      <BookOpen className="w-4 h-4 text-white/30" />
                    </div>

                    {/* Gold accent line */}
                    <div className="h-[2px] bg-gradient-to-r from-[#bf9b30] via-[#ffcf40] to-[#bf9b30]" />

                    {/* Credentials list */}
                    <div className="p-5 sm:p-6 space-y-0">
                      {auth.credentials.map((cred, cIdx) => (
                        <motion.div
                          key={cIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: cIdx * 0.05 }}
                          className={`flex items-start gap-4 py-3.5 ${cIdx < auth.credentials.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                            <CredIcon type={cred.icon} />
                          </div>
                          <p className="text-gray-700 text-base leading-relaxed pt-1">{cred.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Official stamp footer */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#002244]/25 font-sans text-[10px] tracking-widest uppercase">
                      <Scale className="w-4 h-4" />
                      <span>Expediente Verificado</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#bf9b30]/40 font-sans text-[10px] tracking-wider">
                      <span>PAVIMUN 2026</span>
                      <Gavel className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator between profiles */}
              {idx < authorities.length - 1 && (
                <div className="mt-20 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#002244]/15 to-transparent" />
                  <div className="p-2 rounded-full border border-[#002244]/10">
                    <Scale className="w-5 h-5 text-[#002244]/15" />
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#002244]/15 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="mt-24 md:mt-32">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#002244]/10 to-transparent mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#002244]/5 flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#002244]/20" />
              </div>
              <div>
                <p className="text-[#002244]/40 font-sans text-xs font-bold tracking-wider uppercase text-left">Corte Internacional de Justicia</p>
                <p className="text-[#002244]/20 font-sans text-[10px] tracking-widest uppercase mt-0.5 text-left">Directorio Oficial · Fin del Expediente</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[#bf9b30]/30 font-sans text-xs tracking-widest uppercase">
              <Landmark className="w-4 h-4" />
              <span>PAVIMUN · I Ed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesaCorte;
