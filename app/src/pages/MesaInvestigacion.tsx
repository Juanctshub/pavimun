import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Eye, BookOpen, Star, Volume2, VolumeX, Award, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaInvestigacion = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Audio
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
      role: 'Presidente del Comité',
      name: 'Amarantha Martorano Quintero',
      image: '/images/mesas/investigacion/Amarantha.jpeg',
      motto: '"La excelencia no es un acto, sino un hábito."',
      achievements: [
        'Primer Promedio de su promoción (2024-2025)',
        'Diplomado en Comercio Exterior por la UCV',
        '12 años como bailarina de flamenco',
        'Faculty Advisor de SVPMUN desde 2025',
        'Presidente del Congreso Nacional — SPMUN 2026',
        'Mejor Delegación de Crisis — MASMUN 2022',
        'Mejor Delegación de Crisis — CAMIMUN 2023 y 2025',
      ],
      bio: [
        'Mi camino en los Modelos de Naciones Unidas comenzó con una búsqueda incansable por la justicia social y la excelencia. Soy bachiller egresada del Colegio San Vicente de Paúl, donde estudié desde Primer Grado y tuve el honor de obtener el Primer Promedio de mi promoción (2024-2025). Cuento con un Diplomado en Comercio Exterior por la UCV, soy profesora de inglés y mentora en liderazgo. Además tengo 12 años de disciplina como bailarina de flamenco en escenarios nacionales e internacionales.',
        'Mi historia en los MUN inició en SVPMUN en 2022 y, desde entonces, me he especializado en comités de Crisis. He recorrido el país junto con mi delegación representando a nuestra institución, y obteniendo diversos reconocimientos por mi desempeño.',
        'Inicié obteniendo Mejor Delegación de Crisis en MASMUN 2022. En los modelos de SPMUN, he sido galardonada en diversas ocasiones: Segunda Mención Honorífica de Crisis (2023), Mejor Delegación de SPECPOL y Mejor DPO (2024), y Mejor Delegación de Crisis (2025). Asimismo, en CAMIMUN logré el reconocimiento de Mejor Delegación de Crisis por dos años consecutivos (2023 y 2025).',
        'A Nivel Nacional, mi formación llegó hacia el estado Zulia, obteniendo la Segunda Mención Honorífica en Crisis en SAIMUN 2024 (Maracaibo).',
        'Desde 2023, asumo la responsabilidad de formar a la nueva generación de SVPMUN, planificando clases y talleres de academia, liderazgo y oratoria. Dentro del Staff de SVPMUN, he servido como Secretaria Académica (2023), Secretaria General y Jefe de Delegación (2024), y desde 2025 desempeño el rol de Faculty Advisor. Mi experiencia organizativa incluye la ejecución de 4 drills y 3 Modelos formales.',
        'Como Mesa Directiva he trabajado en diferentes cargos, desde Oficial de Conferencias (Drill SVPMUN 2023) y Vicepresidente de Crisis (MASMUN 2024), hasta cargos como Crisis Staff de SVPMUN 2025 y Presidente del Congreso Nacional en SPMUN 2026.',
        'Además, tengo fascinación por temas de Medio Oriente, Historia de Venezuela y Estrategias de Campaña Electoral. Mi enfoque como Presidente de Mesa se fundamenta en la rigurosidad académica, la visión política y el compromiso con el crecimiento y formación de cada delegado.',
      ],
      messageTitle: 'Para los delegados:',
      message: [
        'Delegados, bienvenidos al Comité de Investigación. Como alguien que encontró su pasión en los comités de Crisis, aprendí que la verdadera clave del éxito no está solo en lo que se dice, sino en la profundidad de la estrategia y la rapidez del pensamiento. La excelencia no es un acto, sino un hábito; y bajo esta premisa, he aprendido que un MUN es mucho más que un debate: es el espacio donde se forman los nuevos líderes.',
        'Mi compromiso con ustedes como su Presidente de Mesa es transformar la preparación académica en una herramienta de cambio y brindarles un entorno de debate crítico, análisis profundo y soluciones de alto impacto. Los invito a dar lo mejor de sí, a ser pragmáticos y audaces; a cuestionar lo establecido y, sobre todo, a disfrutar el proceso de aprendizaje. Cuenten conmigo para guiarlos en este camino de excelencia en PAVIMUN.',
      ],
    },
    {
      role: 'Vice-Presidente de Mesa',
      name: 'Maurizio Bellotto',
      alias: 'Mau',
      image: '/images/mesas/investigacion/Mauricio.jpeg',
      motto: '"La serenidad es el resultado de aceptar las cosas que no puedes cambiar y actuar con valor sobre las que sí puedes." — Marco Aurelio',
      achievements: [
        'Egresado del Colegio San Vicente de Paúl (Promo 59)',
        'Faculty Advisor de SVPMUN',
        'Estudiante de Economía en la UCLA',
        'Mesa Directiva experimentada en múltiples modelos',
      ],
      bio: [
        'Holi mi gente bella y hermosa. Espero les esté yendo muy bien. Me pueden llamar Mau y es para mí un gusto poder participar en la 1era edición de PAVIMUN como miembro de la Mesa Directiva del Comité de Investigación.',
        'No sé si para cuando lean esto tendré 20 o 21 años (porque cumplo el 19 de marzo), pero alguna de esas dos será mi edad. Estudié la muy gran mayoría de mi vida en el Colegio Curimagua. Sin embargo, soy egresado del Colegio San Vicente de Paúl (Promo 59). Y, por supuesto, fui delegado de su respectiva delegación: SVPMUN. Por los momentos, me desempeño como uno de los Faculty Advisors de SVPMUN y como Mesa Directiva espontánea. Además, estoy por empezar a estudiar Economía en la UCLA.',
        'Por lo que se refiere a mi trayecto munero, como delegado participé en varios modelos: MASMUN 2022 (mi primer modelo), en donde participé en el comité de OMS; COAMUN 2023, en donde tuve la oportunidad de participar en el comité del Consejo de Seguridad; CAMIMUN 2023, en donde participé en el comité del Congreso de los Estados Unidos (shout out para Amirita, te extrañamos🫶), siendo este, el modelo en el que SVPMUN ganaba su primer premio a la Mejor Delegación (shout out a nuestro Faculty Advisor Vitalicio y mi hermano de vida Andrés Leal🫶); entre otros.',
        'Como Mesa Directiva, probablemente me recuerden por participar en los modelos de SVPMUN y por mi participación en MASMUN.',
        'Sin más nada que acotar, les deseo la mayor de las suertes, porque la excelencia ya la tienen, a cada uno de ustedes y también espero que todos podamos disfrutar de esta primera edición de PAVIMUN.',
      ],
      messageTitle: null,
      message: null,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#ffd700]/30 selection:text-white relative overflow-hidden">
      
      {/* Audio */}
      <audio ref={audioRef} src="/videos/uu.mp3" loop preload="auto" />

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-[60] group"
        title={muted ? 'Activar sonido' : 'Silenciar'}
      >
        {!muted && <div className="absolute inset-0 rounded-full bg-[#ffd700]/30 animate-ping" />}
        <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          !muted
            ? 'bg-[#8B6914]/90 border-[#ffd700]/50 text-white shadow-[#ffd700]/20'
            : 'bg-black/80 border-[#ffd700]/20 text-gray-500 hover:text-[#ffd700] shadow-black/10'
        }`}>
          {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
      </button>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_75%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-[#ffd700]/20 via-transparent to-[#ffd700]/10" />
        <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#ffd700]/5 to-transparent" />
        <div className="absolute top-0 right-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#ffd700]/5 to-transparent" />
        {/* Gold ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ffd700]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-40 pb-32">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-16 md:mb-20"
        >
          <Link
            to="/investigacion"
            className="inline-flex items-center gap-2 text-[#ffd700]/60 hover:text-[#ffd700] font-mono text-xs tracking-[0.3em] mb-8 transition-colors uppercase group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Comité
          </Link>

          {/* Decorative top bar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ffd700]/30" />
            <Crown className="w-6 h-6 text-[#ffd700]" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ffd700]/30" />
          </div>

          <div className="text-center">
            <p className="text-[#ffd700]/50 font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4">Comité de Investigación · PAVIMUN 2026</p>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#daa520] to-[#8B6914] uppercase tracking-tight leading-none">
              Mesa Directiva
            </h1>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-[#ffd700]/30" />
              <Eye className="w-4 h-4 text-[#ffd700]/40" />
              <span className="text-[#ffd700]/30 font-serif italic text-sm">Líderes del Debate</span>
              <Eye className="w-4 h-4 text-[#ffd700]/40" />
              <div className="w-8 h-[1px] bg-[#ffd700]/30" />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ffd700]/30" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ffd700]/30" />
          </div>
        </motion.div>

        {/* ── Profiles ── */}
        <div className="space-y-24 md:space-y-32">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
            >
              {/* Role Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center">
                  <span className="text-[#ffd700] font-mono font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="hidden sm:block h-[1px] flex-1 bg-[#ffd700]/10" />
                <span className="text-[#ffd700]/60 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">{auth.role}</span>
                <div className="hidden sm:block h-[1px] flex-1 bg-[#ffd700]/10" />
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 lg:gap-16 ${idx % 2 === 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
                
                {/* Image Card */}
                <div className={`relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#ffd700]/20 via-transparent to-[#ffd700]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-[#ffd700]/40 to-[#ffd700]/10 rounded-lg" />
                  
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#0a0a0a]">
                    {/* UN Logo watermark behind the image for when aspect ratio doesn't fill */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <svg className="w-32 h-32 text-[#ffd700]" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1"/><text x="50" y="40" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">UN</text><text x="50" y="55" textAnchor="middle" fontSize="6" fill="currentColor">PAVIMUN</text><path d="M 20 65 Q 50 80 80 65" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M 20 35 Q 50 20 80 35" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
                    </div>
                    <img
                      src={auth.image}
                      alt={auth.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Name on image */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                        {auth.name}
                      </h2>
                      {auth.alias && (
                        <p className="text-[#ffd700]/70 font-mono text-sm mt-1">"{auth.alias}"</p>
                      )}
                    </div>

                    {/* Corner ornaments */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#ffd700]/40" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#ffd700]/40" />
                    <div className="absolute bottom-20 left-3 w-6 h-6 border-b border-l border-[#ffd700]/40" />
                    <div className="absolute bottom-20 right-3 w-6 h-6 border-b border-r border-[#ffd700]/40" />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  
                  {/* Quote */}
                  {auth.motto && (
                    <div className="mb-8 pl-4 border-l-2 border-[#ffd700]/30">
                      <p className="text-[#ffd700]/70 italic font-serif text-base sm:text-lg leading-relaxed">{auth.motto}</p>
                    </div>
                  )}

                  {/* Achievements */}
                  {auth.achievements && (
                    <div className="mb-8 space-y-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-[#ffd700]" />
                        <span className="text-[#ffd700]/60 font-mono text-[10px] tracking-widest uppercase">Logros Destacados</span>
                      </div>
                      {auth.achievements.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3">
                          <Star className="w-3 h-3 text-[#ffd700] mt-1.5 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bio — Full text, no truncation */}
                  <div className="space-y-4">
                    {auth.bio.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-400 leading-relaxed text-base text-justify">
                        {pIdx === 0 && <span className="text-[#ffd700] font-bold text-2xl float-left mr-2 leading-none mt-1">{paragraph.charAt(0)}</span>}
                        {pIdx === 0 ? paragraph.substring(1) : paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Personal Message */}
                  {auth.message && auth.messageTitle && (
                    <div className="mt-8 bg-[#ffd700]/[0.03] border border-[#ffd700]/20 rounded-lg p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-[#ffd700]" />
                        <h4 className="text-[#ffd700] font-bold text-sm tracking-wider uppercase">{auth.messageTitle}</h4>
                      </div>
                      {auth.message.map((p, pIdx) => (
                        <p key={pIdx} className="text-gray-400 text-sm leading-relaxed mb-3 last:mb-0 text-justify italic">{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Separator */}
              {idx < authorities.length - 1 && (
                <div className="mt-16 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ffd700]/20" />
                  <Crown className="w-4 h-4 text-[#ffd700]/20" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ffd700]/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer ornament */}
        <div className="mt-24 md:mt-32 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ffd700]/20" />
          <FileText className="w-4 h-4 text-[#ffd700]/20" />
          <span className="text-[#ffd700]/20 font-mono text-[10px] sm:text-xs tracking-widest">FIN DEL EXPEDIENTE</span>
          <FileText className="w-4 h-4 text-[#ffd700]/20" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ffd700]/20" />
        </div>
      </div>
    </div>
  );
};

export default MesaInvestigacion;
