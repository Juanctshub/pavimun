import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Award, Crosshair, Siren, AlertTriangle, Radio, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaConsejo = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const authorities = [
    {
      role: 'Presidente de Mesa',
      name: 'Flavia Pérez',
      age: '15 años',
      image: '/images/mesas/consejo/flavia.jpeg',
      codename: 'SIERRA-01',
      clearance: 'NIVEL ALFA',
      bio: `¡Saludos delegados! Soy Flavia Pérez y en esta oportunidad fungiré como su Presidente de mesa. Tengo 15 años y he participado activamente en el MUN desde hace 3 años y medio, donde incursioné en modelos a nivel regional y nacional, siendo reconocida con diversos méritos a lo largo de mi desarrollo como delegada y mesa directiva.

Me fascinan los buenos debates y soy una amante de la redacción, además que soy una fiel creyente de que la diplomacia y los valores sí pueden cambiar el mundo.

¡Nos vemos pronto!`,
    },
    {
      role: 'Vice-Presidenta de Mesa',
      name: 'María Claudia Oropeza',
      alias: 'Cay',
      image: '/images/mesas/consejo/maria.jpeg',
      codename: 'SIERRA-02',
      clearance: 'NIVEL ALFA',
      bio: `¡Hola! Soy María Claudia Oropeza, aunque algunos me conocen como Cay. Mi trayectoria comenzó en 2024 y pertenezco a CLFMUN, desde entonces, esta experiencia me ha brindado herramientas invaluables como la oratoria, el conocimiento a las problemas mundiales y el liderazgo.

Al asumir por segunda vez el rol de mesa directiva, me entusiasma el crecimiento que este reto representa tanto para mí como para ustedes. Los invito a dar su máximo esfuerzo en cada sesión, este es el espacio ideal para descubrir talentos ocultos, aprender a resolver conflictos complejos y forjar las habilidades necesarias para ser los agentes de cambio que el futuro exige.

¡Bienvenidos a PAVIMUN 1era EDICIÓN! ♥️🥰`,
    }
  ];

  return (
    <div className="min-h-screen bg-[#050202] text-gray-200 font-sans selection:bg-red-900/50 selection:text-white relative overflow-hidden pb-32">
      
      {/* ── Layered Background Effects ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grunge noise */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        {/* Red ambient glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/15 rounded-full blur-[120px]" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a0505] to-transparent" />
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[length:100%_3px]" />
        {/* Side warning stripes */}
        <div className="absolute top-0 left-0 w-1 h-full bg-[repeating-linear-gradient(180deg,#ff0000_0px,#ff0000_8px,transparent_8px,transparent_16px)] opacity-10" />
        <div className="absolute top-0 right-0 w-1 h-full bg-[repeating-linear-gradient(180deg,#ff0000_0px,#ff0000_8px,transparent_8px,transparent_16px)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 lg:pt-40">

        {/* ══ HEADER ══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-20"
        >
          <Link
            to="/consejo-seguridad"
            className="inline-flex items-center gap-2 text-red-500/60 hover:text-red-400 font-mono text-xs tracking-[0.3em] mb-8 transition-colors uppercase group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Retornar al Comité
          </Link>

          {/* Classification bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="origin-left flex items-center gap-3 bg-red-900/20 border border-red-900/40 px-4 py-2 mb-8"
          >
            <Siren className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-mono text-red-500 text-xs tracking-[0.3em] uppercase font-bold">Expediente Clasificado — Acceso Restringido</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-red-500/60 text-[10px] tracking-wider">LIVE</span>
            </div>
          </motion.div>

          {/* Title block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-red-900/30 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="w-10 h-10 text-red-600" />
                <AlertTriangle className="w-6 h-6 text-red-500/50" />
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                Directorio
              </h1>
              <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900 uppercase tracking-tighter leading-none">
                Oficial
              </h1>
              <p className="text-red-500/40 font-mono text-xs mt-4 tracking-[0.2em]">CONSEJO DE SEGURIDAD DE LAS NACIONES UNIDAS // PAVIMUN 2026</p>
            </div>
            <div className="text-right font-mono text-xs space-y-1 text-red-900/60 uppercase border border-red-900/20 p-3 bg-red-900/5">
              <p>Access Level: <span className="text-red-500">Director</span></p>
              <p>Protocol: <span className="text-red-500">UNSC-PAVI-26</span></p>
              <p>Status: <span className="text-green-500">ACTIVE</span></p>
            </div>
          </div>
        </motion.div>

        {/* ══ PROFILES ══ */}
        <div className="space-y-28">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
            >
              {/* Agent badge bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-900/20 border border-red-900/40">
                  <Crosshair className="w-3 h-3 text-red-500" />
                  <span className="font-mono text-red-500 text-xs tracking-[0.2em] uppercase font-bold">{auth.codename}</span>
                </div>
                <div className="h-[1px] flex-1 bg-red-900/20" />
                <div className="flex items-center gap-2 px-3 py-1.5 border border-red-900/20">
                  <Award className="w-3 h-3 text-red-500/60" />
                  <span className="font-mono text-red-500/50 text-[10px] tracking-widest uppercase">{auth.role}</span>
                </div>
                <div className="h-[1px] flex-1 bg-red-900/20" />
                <span className="font-mono text-red-900/40 text-[10px]">{auth.clearance}</span>
              </div>

              <div className={`grid md:grid-cols-[2fr_3fr] gap-10 lg:gap-16 ${idx % 2 === 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
                
                {/* ── Image Panel ── */}
                <div className={`relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  {/* Red glow behind */}
                  <div className="absolute -inset-4 bg-red-600/5 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative aspect-[3/4] bg-[#0d0303] border border-red-900/30 overflow-hidden">
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500 z-20" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500 z-20" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500 z-20" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500 z-20" />

                    {/* Center crosshair overlay */}
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-500/30" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-500/30" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-red-500/40 rounded-full" />
                    </div>
                    
                    <img
                      src={auth.image}
                      alt={auth.name}
                      className="w-full h-full object-cover filter grayscale-[30%] contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                    />
                    
                    {/* Bottom info overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-16">
                      <div className="flex items-center gap-2 mb-2">
                        <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                        <span className="text-red-500/80 font-mono text-[10px] tracking-widest uppercase">Identity Verified</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                        {auth.name}
                      </h2>
                      {auth.alias && (
                        <p className="text-red-400/60 font-mono text-sm mt-1">A.K.A. "{auth.alias}"</p>
                      )}
                      {auth.age && (
                        <p className="text-gray-500 font-mono text-xs mt-1">{auth.age}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Content Panel ── */}
                <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  
                  {/* Bio */}
                  <div className="relative">
                    <div className={`text-gray-400 leading-relaxed text-lg space-y-4 overflow-hidden transition-all duration-700 ${expandedIdx === idx ? 'max-h-[3000px]' : 'max-h-[250px]'}`}>
                      {auth.bio.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-justify">
                          {pIdx === 0 && <span className="text-red-500 font-bold text-3xl float-left mr-3 leading-none mt-1">{paragraph.charAt(0)}</span>}
                          {pIdx === 0 ? paragraph.substring(1) : paragraph}
                        </p>
                      ))}
                    </div>
                    {expandedIdx !== idx && (
                      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050202] to-transparent" />
                    )}
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      className="mt-4 flex items-center gap-2 text-red-500/60 hover:text-red-400 font-mono text-xs tracking-widest uppercase transition-colors"
                    >
                      {expandedIdx === idx ? 'Cerrar expediente' : 'Abrir expediente completo'}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedIdx === idx ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-32 border-t border-red-900/20 pt-8">
          <div className="flex items-center justify-between text-red-900/40 font-mono text-xs">
            <span>// END OF FILE</span>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-900/30" />
              <span>UNSC.CLASSIFIED.2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesaConsejo;
