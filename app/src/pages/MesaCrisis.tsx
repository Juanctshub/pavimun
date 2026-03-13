import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Award, Landmark, Flag, BookOpen, Shield, Sword, Volume2, VolumeX, Crown, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════
   MESA DIRECTIVA — COMITÉ DE CRISIS
   Congreso Bicameral de Venezuela · 1973–1998
   Theme: Venezuelan national pride · Gold & tricolor accents
   ═══════════════════════════════════════════════════════════ */

const MesaCrisis = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Audio
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const fadeIn = () => {
      let v = 0; a.volume = 0;
      const i = setInterval(() => { v += 0.005; if (v >= 0.2) { v = 0.2; clearInterval(i); } a.volume = v; }, 60);
    };
    a.volume = 0; a.muted = false;
    a.play().then(fadeIn).catch(() => {
      const t = () => { a.volume = 0; a.play().then(() => { fadeIn(); document.removeEventListener('click', t); document.removeEventListener('touchstart', t); }).catch(() => {}); };
      document.addEventListener('click', t); document.addEventListener('touchstart', t);
    });
    return () => { a.pause(); a.currentTime = 0; };
  }, []);

  const toggleMute = () => { if (audioRef.current) { audioRef.current.muted = !muted; setMuted(!muted); } };

  // Eight Stars (Venezuelan flag) rendered as a decorative arc
  const EightStars = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center justify-center gap-1.5 ${className}`}>
      {[...Array(8)].map((_, i) => (
        <Star key={i} className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );

  // Venezuelan Flag Bar
  const TricolorBar = ({ className = '' }: { className?: string }) => (
    <div className={`flex h-1.5 overflow-hidden rounded-full ${className}`}>
      <div className="flex-1 bg-[#FFCC00]" />
      <div className="flex-1 bg-[#003DA5]" />
      <div className="flex-1 bg-[#CF142B]" />
    </div>
  );

  const authorities = [
    {
      role: 'Presidente de Mesa',
      name: 'Daniel Guanipa',
      fullName: 'Daniel Guanipa Álvarez',
      image: '/images/mesas/crisis/h.jpeg',
      district: 'DISTRITO I — AUTORIDAD EJECUTIVA',
      expediente: 'EXP-CRISIS-001',
      title: 'Profesor de Inglés · Programador · Arquitecto ML',
      highlights: [
        { icon: 'flag', text: 'Participante activo en MUN desde el año 2022' },
        { icon: 'award', text: 'Primer lugar en el San Ignacio de Loyola, Caracas' },
        { icon: 'award', text: 'Primeras posiciones en Los Caminos de Acarigua y Rio Claro de Barquisimeto' },
        { icon: 'work', text: 'Profesor de Inglés y Reclutador para Tech Research Studies' },
        { icon: 'work', text: 'Certificación técnica en Arquitectura de Machine Learning' },
        { icon: 'flag', text: 'Crisis Staff en la Universidad Fermín Toro y Colegio San Pedro' },
        { icon: 'flag', text: 'Experiencia en circuitos de Maracaibo y Caracas' },
      ],
      bio: [
        '¡Saludos delegados! Mi nombre es Daniel Guanipa Álvarez, y seré vuestro Presidente de Mesa en la Crisis del Congreso Bicameral de Venezuela.',
        'Desde el año 2022, he participado activamente en el Modelo de Naciones Unidas, completando logros importantes dentro y fuera del estado. Entre mis reconocimientos más destacados se encuentran mis primeras posiciones en diversos colegios, como Los Caminos de Acarigua y el Rio Claro en Barquisimeto, siendo mi primer lugar en el San Ignacio del Loyola en Caracas el más destacado de todos. Aún así, a lo largo de estos años mi crecimiento se ha manifestado más en el desarrollo de mis habilidades blandas, que me permiten desempeñarme mejor en mis trabajos.',
        'Trabajo como Profesor de Inglés y Reclutador para Tech Research Studies, además de ser programador y en ese campo específico, con una certificación técnica en Arquitectura de Machine Learning; y las habilidades que mejor ha unido todas mis competencias, es el liderazgo, la oratoria y la academia que me ha dado el MUN.',
        'Después de haber participado en otros circuitos, como en Maracaibo y Caracas, he llegado a la conclusión de que el Modelo de Naciones Unidas no solo me ha ayudado a mi a incrementar mi nivel académico, si no el de todo un compendio de generaciones, dispuestas a educarse por un país que necesita de mentes ilustradas para madurar, socioculturalmente.',
        'Este comité forma parte de un proyecto importante para contribuir al desarrollo del pensamiento crítico juvenil sobre nuestra historia democrática e ilustrar generaciones venideras con debates sobre temas muy nuestros.',
        'En mi facultad como Mesa Directiva, me he destacado en eventos importantes, no solo apoyando activamente a mi delegación SVPMUN; pues anteriormente fungí como Crisis Staff en la Universidad Fermín Toro, y en el Colegio San Pedro. En esta oportunidad, me encuentro a la disposición de ustedes para dirigirles en este y posteriores eventos. ¡Nos vemos pronto!',
      ],
    },
    {
      role: 'Vice-Presidenta de Mesa',
      name: 'María Gracia',
      fullName: 'María Gracia Acuña Artuza',
      image: '/images/mesas/crisis/l.jpeg',
      district: 'DISTRITO II — AUTORIDAD LEGISLATIVA',
      expediente: 'EXP-CRISIS-002',
      title: 'Secretaria Académica · CLFMUN',
      motto: '"Les deseo mucho éxito delegados, la suerte es para mediocres."',
      highlights: [
        { icon: 'flag', text: 'Miembro de CLFMUN desde el año escolar 2024-2025' },
        { icon: 'work', text: 'Secretaria Académica (SA) del Staff Organizador CLFMUN' },
        { icon: 'work', text: 'Estudiante de 4to año — U.E. Colegio Las Fuentes, Barquisimeto' },
      ],
      mesaExperience: [
        'Presidente de Mesa — Comité de Crisis, Primer Drill Interinstitucional CLFMUN',
        'Vicepresidente de Mesa — Comité de Crisis Cámara B, VII Edición CELCMUN',
        'Presidente de Mesa — Comité de Crisis, III Edición MASMUN',
      ],
      bio: [
        'Siendo miembro de la delegación de CLFMUN "Agentes del cambio"; mi objetivo al ejercer como Mesa Directiva, es transmitir la excelencia académica y la integralidad personal que debe tener un delegado del Modelo de Naciones Unidas: continuar un legado de maestría, donde, más allá de un certificado o un pin, se trata de un kaisen personal, vivir experiencias y aprender a manejar situaciones de la mejor manera.',
        'En esta ocasión, les doy la bienvenida al Comité de Crisis, en el cual me complace ejercer como Vicepresidente de Mesa en la Primera Edición del Modelo de Naciones Unidas del Colegio Pablo VI.',
        'Por último, como siempre digo: les deseo mucho éxito delegados, la suerte es para mediocres.',
      ],
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'award': return <Award className="w-4 h-4 text-[#FFD700]" />;
      case 'work': return <Shield className="w-4 h-4 text-[#c9a980]" />;
      case 'flag': return <Flag className="w-4 h-4 text-[#CF142B]" />;
      default: return <Star className="w-4 h-4 text-[#FFD700]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0806] text-[#e8e0d0] font-serif relative overflow-hidden">
      
      <audio ref={audioRef} src="/audio/will.mp3" loop preload="auto" />

      {/* Mute */}
      <button onClick={toggleMute} className="fixed bottom-6 right-6 z-[60] group" title={muted ? 'Activar sonido' : 'Silenciar'}>
        {!muted && <div className="absolute inset-0 rounded-full bg-[#FFD700]/20 animate-ping" />}
        <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${!muted ? 'bg-[#1c1917]/90 border-[#c9a980]/50 text-[#FFD700] shadow-[#FFD700]/20' : 'bg-black/80 border-[#c9a980]/20 text-gray-600 hover:text-[#FFD700]'}`}>
          {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
      </button>

      {/* ═══ BACKGROUND EFFECTS ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* Tricolor side accents */}
        <div className="absolute top-0 left-0 w-1 h-full">
          <div className="h-1/3 bg-[#FFCC00]/20" />
          <div className="h-1/3 bg-[#003DA5]/20" />
          <div className="h-1/3 bg-[#CF142B]/20" />
        </div>
        <div className="absolute top-0 right-0 w-1 h-full">
          <div className="h-1/3 bg-[#FFCC00]/20" />
          <div className="h-1/3 bg-[#003DA5]/20" />
          <div className="h-1/3 bg-[#CF142B]/20" />
        </div>
        {/* Warm radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c9a980]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#CF142B]/3 rounded-full blur-[100px]" />
      </div>

      {/* ═══ GRAND HEADER ═══ */}
      <div className="relative z-10 bg-gradient-to-b from-[#1a1510] via-[#0e0c08] to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
          
          <Link to="/crisis" className="inline-flex items-center gap-2 text-[#c9a980]/50 hover:text-[#c9a980] font-mono text-xs tracking-wider mb-10 transition-colors uppercase group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Regresar al Comité
          </Link>

          {/* Venezuelan tricolor bar */}
          <TricolorBar className="mb-8 max-w-sm mx-auto sm:mx-0" />

          {/* Header content */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Landmark className="w-5 h-5 text-[#c9a980]" />
                <span className="text-[#c9a980]/60 font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase">República de Venezuela</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#c9a980] to-[#8B7355]">Mesa</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e8e0d0] to-[#c9a980]">Directiva</span>
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-[#c9a980]/40 font-mono text-[10px] tracking-widest uppercase">
                <span>Congreso Bicameral</span>
                <span className="text-[#FFD700]">★</span>
                <span>Crisis 1973—1998</span>
                <span className="text-[#FFD700]">★</span>
                <span>PAVIMUN 2026</span>
              </div>
            </div>

            {/* Ads Gallery - Replaces Seal */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-6 mt-8 lg:mt-0">
              <div className="relative group overflow-hidden border border-[#c9a980]/30 p-1.5 bg-black shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <img src="/images/mesas/crisis/ads/hh.jpg" alt="Vintage Ad 1" className="w-56 h-auto sm:w-80 lg:w-96 sepia-[0.2] hover:sepia-0 transition-all duration-700" />
                <div className="absolute inset-0 border border-[#c9a980]/20 pointer-events-none" />
              </div>
              <div className="relative group overflow-hidden border border-[#c9a980]/30 p-1.5 bg-black shadow-2xl transform rotate-[3deg] hover:rotate-0 transition-transform duration-500">
                <img src="/images/mesas/crisis/ads/jj.jpg" alt="Vintage Ad 2" className="w-56 h-auto sm:w-80 lg:w-96 sepia-[0.2] hover:sepia-0 transition-all duration-700" />
                <div className="absolute inset-0 border border-[#c9a980]/20 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Gold divider with stars */}
          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c9a980]/40 to-[#c9a980]" />
            <EightStars />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c9a980]/40 to-[#c9a980]" />
          </div>

          {/* National quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-[#c9a980]/50 italic font-serif text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              "Una nación en la encrucijada de su destino, obligada a elegir entre la grandeza o el olvido."
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══ PROFILES ═══ */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="space-y-28 md:space-y-36">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: idx * 0.1 }}
            >
              {/* District header bar */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <div className="flex items-center gap-3 bg-gradient-to-r from-[#1c1917] to-[#1c1917]/80 border border-[#c9a980]/20 px-4 sm:px-5 py-2.5">
                  <Sword className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-[#c9a980] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold">{auth.role}</span>
                </div>
                <div className="hidden sm:block h-[1px] flex-1 bg-gradient-to-r from-[#c9a980]/30 to-transparent" />
                <span className="text-[#c9a980]/30 font-mono text-[9px] tracking-[0.25em] uppercase hidden sm:inline">{auth.district}</span>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-14 ${idx % 2 === 1 ? '' : ''}`}>
                
                {/* ── Photo Panel — 2/5 ── */}
                <div className={`md:col-span-2 relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative overflow-hidden">
                    {/* Triple border frame */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      <div className="absolute inset-0 border-2 border-[#c9a980]/30" />
                      <div className="absolute inset-1.5 border border-[#c9a980]/15" />
                    </div>
                    
                    {/* Top tricolor accent */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex h-1">
                      <div className="flex-1 bg-[#FFCC00]" />
                      <div className="flex-1 bg-[#003DA5]" />
                      <div className="flex-1 bg-[#CF142B]" />
                    </div>

                    <img
                      src={auth.image}
                      alt={auth.name}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover transition-all duration-700 group-hover:scale-[1.04] filter grayscale-[15%] group-hover:grayscale-0"
                    />

                    {/* Nameplate overlay */}
                    <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-20 p-5 sm:p-6">
                      <EightStars className="mb-3 justify-start" />
                      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase">
                        {auth.name}
                      </h2>
                      <p className="text-[#c9a980]/60 font-mono text-xs mt-2 tracking-wider">{auth.fullName}</p>
                      <p className="text-[#c9a980]/40 font-mono text-[10px] mt-1 tracking-wider">{auth.title}</p>
                    </div>

                    {/* Expediente badge */}
                    <div className="absolute top-4 right-4 z-20 bg-[#1c1917]/90 backdrop-blur-sm border border-[#c9a980]/30 px-3 py-1.5">
                      <span className="text-[#c9a980] font-mono text-[9px] tracking-widest">{auth.expediente}</span>
                    </div>
                  </div>

                  {/* Advertisement below photo for President */}
                  {auth.name === 'Daniel Guanipa' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-2 bg-black border border-[#c9a980]/20 shadow-2xl relative group overflow-hidden"
                    >
                      <img 
                        src="/images/mesas/crisis/ads/l_ad.jpg" 
                        alt="Publicidad Epoca" 
                        className="w-full h-auto sepia-[0.2] group-hover:sepia-0 transition-all duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </motion.div>
                  )}

                  {/* Easter Egg for Vice President */}
                  {auth.name === 'María Gracia' && (
                    <div className="mt-6 flex flex-col items-center">
                      <button 
                        onClick={() => setShowEasterEgg(!showEasterEgg)}
                        className="px-6 py-2 border border-[#FFD700]/40 text-[#FFD700]/60 hover:text-[#FFD700] hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all duration-300 font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 group"
                      >
                        <Star className={`w-3 h-3 ${showEasterEgg ? 'fill-[#FFD700]' : ''} transition-all`} />
                        {showEasterEgg ? 'Cerrar Archivo' : 'Ver Archivo Clasificado'}
                      </button>
                      
                      {showEasterEgg && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 p-2 bg-black border border-[#c9a980]/20 shadow-2xl overflow-hidden"
                        >
                          <img 
                            src="/images/mesas/crisis/ads/n.jpg" 
                            alt="Publicidad Secreta" 
                            className="w-full h-auto sepia-[0.2]" 
                          />
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Content Panel — 3/5 ── */}
                <div className={`md:col-span-3 flex flex-col justify-center space-y-8 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  
                  {/* Quote if exists */}
                  {auth.motto && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative pl-6 py-3 border-l-2 border-[#FFD700]"
                    >
                      <Quote className="absolute -left-3 -top-1 w-6 h-6 text-[#FFD700]/40 bg-[#0a0806]" />
                      <p className="text-[#FFD700]/80 italic text-lg sm:text-xl leading-relaxed">{auth.motto}</p>
                    </motion.div>
                  )}

                  {/* Highlights card */}
                  <div className="bg-[#1c1917]/80 border border-[#c9a980]/15 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#1c1917] to-[#25211e] px-5 py-3.5 flex items-center justify-between border-b border-[#c9a980]/10">
                      <div className="flex items-center gap-3">
                        <Crown className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-[#c9a980] font-mono text-xs tracking-[0.15em] uppercase font-bold">Trayectoria & Logros</span>
                      </div>
                      <Flag className="w-4 h-4 text-[#CF142B]/40" />
                    </div>
                    {/* Tricolor accent line */}
                    <div className="flex h-[2px]">
                      <div className="flex-1 bg-[#FFCC00]" />
                      <div className="flex-1 bg-[#003DA5]" />
                      <div className="flex-1 bg-[#CF142B]" />
                    </div>
                    <div className="p-5 sm:p-6 space-y-0">
                      {auth.highlights.map((h, hIdx) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: hIdx * 0.04 }}
                          className={`flex items-start gap-4 py-3 ${hIdx < auth.highlights.length - 1 ? 'border-b border-[#c9a980]/5' : ''}`}
                        >
                          <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-[#c9a980]/5 flex items-center justify-center">
                            {getIcon(h.icon)}
                          </div>
                          <p className="text-[#d4cbb8] text-sm sm:text-base leading-relaxed pt-0.5">{h.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Mesa directiva experience (María Gracia) */}
                  {auth.mesaExperience && (
                    <div className="bg-[#1c1917]/80 border border-[#c9a980]/15 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#1c1917] to-[#25211e] px-5 py-3.5 flex items-center gap-3 border-b border-[#c9a980]/10">
                        <Sword className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-[#c9a980] font-mono text-xs tracking-[0.15em] uppercase font-bold">Experiencia como Mesa Directiva</span>
                      </div>
                      <div className="flex h-[2px]">
                        <div className="flex-1 bg-[#FFCC00]" />
                        <div className="flex-1 bg-[#003DA5]" />
                        <div className="flex-1 bg-[#CF142B]" />
                      </div>
                      <div className="p-5 sm:p-6 space-y-3">
                        {auth.mesaExperience.map((exp, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-3">
                            <Star className="w-3 h-3 text-[#FFD700] fill-[#FFD700] mt-1.5 flex-shrink-0" />
                            <p className="text-[#d4cbb8] text-sm leading-relaxed">{exp}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bio — Full text */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="w-4 h-4 text-[#c9a980]/50" />
                      <span className="text-[#c9a980]/40 font-mono text-[10px] tracking-[0.2em] uppercase">Biografía Completa</span>
                      <div className="h-[1px] flex-1 bg-[#c9a980]/10" />
                    </div>
                    {auth.bio.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-[#b0a896] leading-relaxed text-sm sm:text-base text-justify">
                        {pIdx === 0 && <span className="text-[#FFD700] font-bold text-2xl sm:text-3xl float-left mr-3 leading-none mt-1">{paragraph.charAt(0)}</span>}
                        {pIdx === 0 ? paragraph.substring(1) : paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Separator */}
              {idx < authorities.length - 1 && (
                <div className="mt-20 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c9a980]/20 to-transparent" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFCC00]/30" />
                    <div className="w-2 h-2 rounded-full bg-[#003DA5]/30" />
                    <div className="w-2 h-2 rounded-full bg-[#CF142B]/30" />
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c9a980]/20 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ═══ GRAND FOOTER ═══ */}
        <div className="mt-28 md:mt-36">
          <TricolorBar className="mb-8 max-w-xs mx-auto" />
          
          <div className="text-center space-y-4">
            <EightStars />
            <div className="flex items-center justify-center gap-3">
              <Landmark className="w-5 h-5 text-[#c9a980]/20" />
              <p className="text-[#c9a980]/30 font-mono text-xs tracking-[0.3em] uppercase">Congreso de la República de Venezuela</p>
              <Landmark className="w-5 h-5 text-[#c9a980]/20" />
            </div>
            <p className="text-[#c9a980]/15 font-mono text-[10px] tracking-widest uppercase">PAVIMUN · I Edición · Comité de Crisis · 2026</p>
          </div>

          <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-[#c9a980]/10 to-transparent" />
          <p className="text-center text-[#c9a980]/10 font-mono text-[9px] tracking-widest uppercase mt-6">— Fin del Expediente —</p>
        </div>
      </div>
    </div>
  );
};

export default MesaCrisis;
