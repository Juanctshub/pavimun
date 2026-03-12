import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Crown, Search, Eye, BookOpen, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaInvestigacion = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const authorities = [
    {
      role: 'Presidente del Comité',
      name: 'Amarantha Martorano Quintero',
      image: '/images/mesas/investigacion/Amarantha.jpeg',
      motto: '"La excelencia no es un acto, sino un hábito."',
      highlights: [
        'Primer Promedio de su promoción (2024-2025)',
        'Diplomado en Comercio Exterior por la UCV',
        '12 años como bailarina de flamenco',
        'Faculty Advisor de SVPMUN desde 2025',
        'Presidente del Congreso Nacional — SPMUN 2026',
      ],
      bio: `Mi camino en los Modelos de Naciones Unidas comenzó con una búsqueda incansable por la justicia social y la excelencia. Soy bachiller egresada del Colegio San Vicente de Paúl, donde estudié desde Primer Grado y tuve el honor de obtener el Primer Promedio de mi promoción (2024-2025). Cuento con un Diplomado en Comercio Exterior por la UCV, soy profesora de inglés y mentora en liderazgo. Además tengo 12 años de disciplina como bailarina de flamenco en escenarios nacionales e internacionales.

Mi historia en los MUN inició en SVPMUN en 2022 y, desde entonces, me he especializado en comités de Crisis. He recorrido el país junto con mi delegación representando a nuestra institución, y obteniendo diversos reconocimientos por mi desempeño:

Inicié obteniendo Mejor Delegación de Crisis en MASMUN 2022. En los modelos de SPMUN, he sido galardonada en diversas ocasiones: Segunda Mención Honorífica de Crisis (2023), Mejor Delegación de SPECPOL y Mejor DPO (2024), y Mejor Delegación de Crisis (2025). Asimismo, en CAMIMUN logré el reconocimiento de Mejor Delegación de Crisis por dos años consecutivos (2023 y 2025).

A Nivel Nacional, mi formación llegó hacia el estado Zulia, obteniendo la Segunda Mención Honorífica en Crisis en SAIMUN 2024 (Maracaibo).

Desde 2023, asumo la responsabilidad de formar a la nueva generación de SVPMUN, planificando clases y talleres de academia, liderazgo y oratoria. Dentro del Staff de SVPMUN, he servido como Secretaria Académica (2023), Secretaria General y Jefe de Delegación (2024), y desde 2025 desempeño el rol de Faculty Advisor. Mi experiencia organizativa incluye la ejecución de 4 drills y 3 Modelos formales.

Como Mesa Directiva he trabajado en diferentes cargos, desde Oficial de Conferencias (Drill SVPMUN 2023) y Vicepresidente de Crisis (MASMUN 2024), hasta cargos como Crisis Staff de SVPMUN 2025 y Presidente del Congreso Nacional en SPMUN 2026.

Además, tengo fascinación por temas de Medio Oriente, Historia de Venezuela y Estrategias de Campaña Electoral. Mi enfoque como Presidente de Mesa se fundamenta en la rigurosidad académica, la visión política y el compromiso con el crecimiento y formación de cada delegado.`,
      messageTitle: 'Para los delegados:',
      message: `Delegados, bienvenidos al Comité de Investigación. Como alguien que encontró su pasión en los comités de Crisis, aprendí que la verdadera clave del éxito no está solo en lo que se dice, sino en la profundidad de la estrategia y la rapidez del pensamiento. La excelencia no es un acto, sino un hábito; y bajo esta premisa, he aprendido que un MUN es mucho más que un debate: es el espacio donde se forman los nuevos líderes.

Mi compromiso con ustedes como su Presidente de Mesa es transformar la preparación académica en una herramienta de cambio y brindarles un entorno de debate crítico, análisis profundo y soluciones de alto impacto. Los invito a dar lo mejor de sí, a ser pragmáticos y audaces; a cuestionar lo establecido y, sobre todo, a disfrutar el proceso de aprendizaje. Cuenten conmigo para guiarlos en este camino de excelencia en PAVIMUN.`,
    },
    {
      role: 'Vice-Presidente de Mesa',
      name: 'Maurizio Belloto',
      alias: 'Mau',
      image: '/images/mesas/investigacion/Mauricio.jpeg',
      motto: '"La serenidad es el resultado de aceptar las cosas que no puedes cambiar y actuar con valor sobre las que sí puedes." — Marco Aurelio',
      highlights: [
        'Egresado del Colegio San Vicente de Paúl (Promo 59)',
        'Faculty Advisor de SVPMUN',
        'Delegado experimentado en múltiples modelos nacionales',
        'Estudiante de Economía en la UCLA',
      ],
      bio: `Holi mi gente bella y hermosa. Espero les esté yendo muy bien. Me pueden llamar Mau y es para mí un gusto poder participar en la 1era edición de PAVIMUN como miembro de la Mesa Directiva del Comité de Investigación.

No sé si para cuando lean esto tendré 20 o 21 años (porque cumplo el 19 de marzo), pero alguna de esas dos será mi edad. Estudié la muy gran mayoría de mi vida en el Colegio Curimagua. Sin embargo, soy egresado del Colegio San Vicente de Paúl (Promo 59). Y, por supuesto, fui delegado de su respectiva delegación: SVPMUN. Por los momentos, me desempeño como uno de los Faculty Advisors de SVPMUN y como Mesa Directiva espontánea. Además, estoy por empezar a estudiar Economía en la UCLA.

Por lo que se refiere a mi trayecto munero, como delegado participé en varios modelos: MASMUN 2022 (mi primer modelo), en donde participé en el comité de OMS; COAMUN 2023, en donde tuve la oportunidad de participar en el comité del Consejo de Seguridad; CAMIMUN 2023, en donde participé en el comité del Congreso de los Estados Unidos (shout out para Amirita, te extrañamos🫶), siendo este, el modelo en el que SVPMUN ganaba su primer premio a la Mejor Delegación (shout out a nuestro Faculty Advisor Vitalicio y mi hermano de vida Andrés Leal🫶); entre otros.

Como Mesa Directiva, probablemente me recuerden por participar en los modelos de SVPMUN y por mi participación en MASMUN.

Sin más nada que acotar, les deseo la mayor de las suertes, porque la excelencia ya la tienen, a cada uno de ustedes y también espero que todos podamos disfrutar de esta primera edición de PAVIMUN.`,
      message: null,
      messageTitle: null,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-[#ffd700]/30 selection:text-white relative overflow-hidden pb-32">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_75%)]" />
        {/* Gold grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* Decorative gold lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-[#ffd700]/20 via-transparent to-[#ffd700]/10" />
        <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#ffd700]/5 to-transparent" />
        <div className="absolute top-0 right-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#ffd700]/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 lg:pt-40">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-20"
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
            <p className="text-[#ffd700]/50 font-mono text-xs tracking-[0.5em] uppercase mb-4">Comité de Investigación</p>
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#daa520] to-[#8B6914] uppercase tracking-tight leading-none">
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
        <div className="space-y-32">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
            >
              {/* Role Badge */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center">
                  <span className="text-[#ffd700] font-mono font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="h-[1px] flex-1 bg-[#ffd700]/10" />
                <span className="text-[#ffd700]/60 font-mono text-xs tracking-[0.2em] uppercase">{auth.role}</span>
                <div className="h-[1px] flex-1 bg-[#ffd700]/10" />
              </div>

              <div className={`grid md:grid-cols-[2fr_3fr] gap-10 lg:gap-16 ${idx % 2 === 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
                
                {/* Image Card */}
                <div className={`relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  {/* Gold frame effect */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-[#ffd700]/20 via-transparent to-[#ffd700]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-[#ffd700]/40 to-[#ffd700]/10 rounded-lg" />
                  
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#111]">
                    <img
                      src={auth.image}
                      alt={auth.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Name on image */}
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
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
                      <p className="text-[#ffd700]/70 italic font-serif text-lg leading-relaxed">{auth.motto}</p>
                    </div>
                  )}

                  {/* Highlights */}
                  {auth.highlights && (
                    <div className="mb-8 space-y-2">
                      {auth.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3">
                          <Star className="w-3 h-3 text-[#ffd700] mt-1.5 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bio - Expandable */}
                  <div className="relative">
                    <div
                      className="text-gray-400 leading-relaxed text-base space-y-4 overflow-hidden transition-all duration-700"
                      style={{ maxHeight: expandedIdx === idx ? '5000px' : '200px' }}
                    >
                      {auth.bio.split('\n\n').map((p, pIdx) => (
                        <p key={pIdx} className="text-justify">
                          {pIdx === 0 && <span className="text-[#ffd700] font-bold text-2xl float-left mr-2 leading-none mt-1">{p.charAt(0)}</span>}
                          {pIdx === 0 ? p.substring(1) : p}
                        </p>
                      ))}
                    </div>
                    {expandedIdx !== idx && (
                      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                    )}
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      className="mt-4 flex items-center gap-2 text-[#ffd700]/60 hover:text-[#ffd700] font-mono text-xs tracking-widest uppercase transition-colors"
                    >
                      {expandedIdx === idx ? 'Leer menos' : 'Leer más'}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedIdx === idx ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Personal Message */}
                  {auth.message && (
                    <AnimatePresence>
                      {expandedIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5 }}
                          className="mt-8 overflow-hidden"
                        >
                          <div className="bg-[#ffd700]/[0.03] border border-[#ffd700]/20 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <BookOpen className="w-4 h-4 text-[#ffd700]" />
                              <h4 className="text-[#ffd700] font-bold text-sm tracking-wider uppercase">{auth.messageTitle}</h4>
                            </div>
                            {auth.message.split('\n\n').map((p, pIdx) => (
                              <p key={pIdx} className="text-gray-400 text-sm leading-relaxed mb-3 last:mb-0 text-justify italic">{p}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer ornament */}
        <div className="mt-32 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#ffd700]/20" />
          <Search className="w-4 h-4 text-[#ffd700]/20" />
          <span className="text-[#ffd700]/20 font-mono text-xs tracking-widest">FIN DEL EXPEDIENTE</span>
          <Search className="w-4 h-4 text-[#ffd700]/20" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#ffd700]/20" />
        </div>
      </div>
    </div>
  );
};

export default MesaInvestigacion;
