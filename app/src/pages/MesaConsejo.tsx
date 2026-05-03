import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Award, Crosshair, Siren, AlertTriangle, Radio, Volume2, VolumeX, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaConsejo = () => {
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
      role: 'Presidente de Mesa',
      name: 'Flavia Pérez',
      age: '15 años',
      image: '/images/mesas/consejo/flavia.jpeg',
      codename: 'SIERRA-01',
      clearance: 'NIVEL ALFA',
      status: 'OPERATIVA',
      specialization: 'Diplomacia & Redacción',
      yearsActive: '3.5 años en MUN',
      bio: [
        '¡Saludos delegados! Soy Flavia Pérez y en esta oportunidad fungiré como su Presidente de mesa. Tengo 15 años y he participado activamente en el MUN desde hace 3 años y medio, donde incursioné en modelos a nivel regional y nacional, siendo reconocida con diversos méritos a lo largo de mi desarrollo como delegada y mesa directiva.',
        'Me fascinan los buenos debates y soy una amante de la redacción, además que soy una fiel creyente de que la diplomacia y los valores sí pueden cambiar el mundo.',
        '¡Nos vemos pronto!',
      ],
    },
    {
      role: 'Vice-Presidenta de Mesa',
      name: 'María Claudia Oropeza',
      alias: 'Cay',
      image: '/images/mesas/consejo/maria.jpeg',
      codename: 'SIERRA-02',
      clearance: 'NIVEL ALFA',
      status: 'OPERATIVA',
      specialization: 'Oratoria & Liderazgo',
      yearsActive: 'Desde 2024 · CLFMUN',
      bio: [
        '¡Hola! Soy María Claudia Oropeza, aunque algunos me conocen como Cay. Mi trayectoria comenzó en 2024 y pertenezco a CLFMUN, desde entonces, esta experiencia me ha brindado herramientas invaluables como la oratoria, el conocimiento a las problemas mundiales y el liderazgo.',
        'Al asumir por segunda vez el rol de mesa directiva, me entusiasma el crecimiento que este reto representa tanto para mí como para ustedes. Los invito a dar su máximo esfuerzo en cada sesión, este es el espacio ideal para descubrir talentos ocultos, aprender a resolver conflictos complejos y forjar las habilidades necesarias para ser los agentes de cambio que el futuro exige.',
        '¡Bienvenidos a PAVIMUN 1era EDICIÓN! ♥️🥰',
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-[#050202] text-gray-200 font-sans selection:bg-red-900/50 selection:text-white relative overflow-hidden">
      
      {/* Audio */}
      <audio ref={audioRef} src="/audio/haiti_music.mp3" loop preload="auto" />

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-[60] group"
        title={muted ? 'Activar sonido' : 'Silenciar'}
      >
        {!muted && <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />}
        <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          !muted
            ? 'bg-red-900/90 border-red-500/50 text-white shadow-red-900/30'
            : 'bg-black/80 border-red-900/30 text-gray-500 hover:text-red-400 shadow-black/10'
        }`}>
          {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
      </button>

      {/* ── Layered Background Effects ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/15 rounded-full blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a0505] to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[length:100%_3px]" />
        <div className="absolute top-0 left-0 w-1 h-full bg-[repeating-linear-gradient(180deg,#ff0000_0px,#ff0000_8px,transparent_8px,transparent_16px)] opacity-10" />
        <div className="absolute top-0 right-0 w-1 h-full bg-[repeating-linear-gradient(180deg,#ff0000_0px,#ff0000_8px,transparent_8px,transparent_16px)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-40 pb-32">

        {/* ══ HEADER ══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/i-edicion/consejo-seguridad"
              className="inline-flex items-center gap-2 text-red-500/60 hover:text-red-400 font-mono text-xs tracking-[0.3em] transition-colors uppercase group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retornar al Comité
            </Link>

            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-red-600 bg-red-600/10 text-red-500 font-mono text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.2)] group/reg"
            >
              <FileText size={18} className="group-hover/reg:animate-pulse" />
              <span>REGLAMENTO_OFICIAL</span>
            </motion.a>
          </div>

          {/* Classification bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="origin-left flex flex-wrap items-center gap-3 bg-red-900/20 border border-red-900/40 px-4 py-2 mb-8"
          >
            <Siren className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-mono text-red-500 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-bold">Expediente Clasificado — Acceso Restringido</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-red-500/60 text-[10px] tracking-wider">LIVE</span>
            </div>
          </motion.div>

          {/* Title block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-red-900/30 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <ShieldAlert className="w-8 sm:w-10 h-8 sm:h-10 text-red-600" />
                <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-red-500/50" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                Directorio
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900 uppercase tracking-tighter leading-none">
                Oficial
              </h1>
              <p className="text-red-500/40 font-mono text-[10px] sm:text-xs mt-4 tracking-[0.15em] sm:tracking-[0.2em]">CONSEJO DE SEGURIDAD DE LAS NACIONES UNIDAS // PAVIMUN 2026</p>
            </div>
            <div className="text-right font-mono text-[10px] sm:text-xs space-y-1 text-red-900/60 uppercase border border-red-900/20 p-3 bg-red-900/5">
              <p>Access Level: <span className="text-red-500">Director</span></p>
              <p>Protocol: <span className="text-red-500">UNSC-PAVI-26</span></p>
              <p>Status: <span className="text-green-500">ACTIVE</span></p>
            </div>
          </div>
        </motion.div>

        {/* ══ PROFILES ══ */}
        <div className="space-y-24 md:space-y-28">
          {authorities.map((auth, idx) => (
            <motion.div
              key={auth.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
            >
              {/* Agent badge bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-900/20 border border-red-900/40">
                  <Crosshair className="w-3 h-3 text-red-500" />
                  <span className="font-mono text-red-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold">{auth.codename}</span>
                </div>
                <div className="hidden sm:block h-[1px] flex-1 bg-red-900/20" />
                <div className="flex items-center gap-2 px-3 py-1.5 border border-red-900/20">
                  <Award className="w-3 h-3 text-red-500/60" />
                  <span className="font-mono text-red-500/50 text-[10px] tracking-widest uppercase">{auth.role}</span>
                </div>
                <div className="hidden sm:block h-[1px] flex-1 bg-red-900/20" />
                <span className="font-mono text-red-900/40 text-[10px]">{auth.clearance}</span>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 lg:gap-16 ${idx % 2 === 1 ? 'md:grid-cols-[3fr_2fr]' : ''}`}>
                
                {/* ── Image Panel ── */}
                <div className={`relative group ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="absolute -inset-4 bg-red-600/5 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative aspect-[3/4] bg-[#0d0303] border border-red-900/30 overflow-hidden">
                    <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-red-500 z-20" />
                    <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-red-500 z-20" />
                    <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-red-500 z-20" />
                    <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-red-500 z-20" />

                    {/* Crosshair overlay */}
                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-500/30" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-500/30" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-red-500/40 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-red-500/20 rounded-full" />
                    </div>
                    
                    <img
                      src={auth.image}
                      alt={auth.name}
                      className="w-full h-full object-cover filter grayscale-[30%] contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                    />
                    
                    {/* Bottom info overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6 pt-16">
                      <div className="flex items-center gap-2 mb-2">
                        <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                        <span className="text-red-500/80 font-mono text-[10px] tracking-widest uppercase">Identity Verified</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                        {auth.name}
                      </h2>
                      {auth.alias && (
                        <p className="text-red-400/60 font-mono text-sm mt-1">A.K.A. "{auth.alias}"</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Content Panel ── */}
                <div className={`flex flex-col justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  
                  {/* Stats bar */}
                  <div className="grid grid-cols-3 gap-3 mb-8 font-mono text-[10px]">
                    <div className="bg-red-900/10 border border-red-900/20 p-3 text-center">
                      <p className="text-red-500/40 uppercase tracking-wider mb-1">Status</p>
                      <p className="text-green-500 font-bold">{auth.status}</p>
                    </div>
                    <div className="bg-red-900/10 border border-red-900/20 p-3 text-center">
                      <p className="text-red-500/40 uppercase tracking-wider mb-1">Área</p>
                      <p className="text-red-400 font-bold text-[9px]">{auth.specialization}</p>
                    </div>
                    <div className="bg-red-900/10 border border-red-900/20 p-3 text-center">
                      <p className="text-red-500/40 uppercase tracking-wider mb-1">Servicio</p>
                      <p className="text-red-400 font-bold text-[9px]">{auth.yearsActive}</p>
                    </div>
                  </div>

                  {/* Bio — Full text, no truncation */}
                  <div className="space-y-4">
                    {auth.bio.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-400 leading-relaxed text-base sm:text-lg text-justify">
                        {pIdx === 0 && <span className="text-red-500 font-bold text-2xl sm:text-3xl float-left mr-3 leading-none mt-1">{paragraph.charAt(0)}</span>}
                        {pIdx === 0 ? paragraph.substring(1) : paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Separator between profiles */}
              {idx < authorities.length - 1 && (
                <div className="mt-20 flex items-center gap-4">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-red-900/30" />
                  <Crosshair className="w-4 h-4 text-red-900/30" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-red-900/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-24 md:mt-32 border-t border-red-900/20 pt-8">
          <div className="flex items-center justify-between text-red-900/40 font-mono text-[10px] sm:text-xs">
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
