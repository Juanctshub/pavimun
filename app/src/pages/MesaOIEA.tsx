import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Radiation, AlertTriangle, Atom, Volume2, VolumeX, Database, ShieldAlert, Thermometer, UserCheck, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaOIEA = () => {
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
                if (v >= 0.2) { v = 0.2; clearInterval(i); }
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
                }).catch(() => { });
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
            name: 'Alana Cuicas',
            alias: 'ADANA',
            image: '/images/mesas/oiea/alana.jpeg',
            motto: '"Liderazgo que irradia cambio."',
            stats: { level: '9.8 mSv/h', status: 'CRÍTICAMENTE ESTABLE', auth: 'NIVEL 5' },
            bio: [
                'Holi espero se encuentren muy bien, mi nombre es Alana pero por cariño me dicen Alanita, para mí es un gran orgullo poder ser parte de la 1era Edición de PAVIMUN cómo miembro de la mesa directiva de OIEA.',
                'Ahora les hablaré un poco más de mi y de mi recorrido en esta hermosa actividad. Tengo 17 años y actualmente estoy estudiando 5to año de Cs en el Colegio La Salle, formo parte de la Promo 113 de mi Colegio, inicié en el MUN cuando estaba en 2do año. Fuí la encargada de la reactivación de la delegación de mí colegio, y a partir de ahí empecé a participar activamente en la misma.',
                'He participado aproximadamente en 12 modelos, uno de ellos internacional. Actualmente soy la Secretaria General de LASAMUN, y también desde el año 2024 se me presentó la oportunidad de empezar a formar a la delegación emergente del Colegio Pablo VI. Tomé esa oportunidad con mucho orgullo y empecé formando 6 pollitos, los cuáles actualmente ya no son tan pollitos, luego de esto he seguidl formandolos hasta el día de hoy, que están acá haciendo su primer modelo. Espero que esta experiencia sea de su agrado y que se nutran de conocimiento con todos los comités los cuales fueron preparados con mucho esfuerzo para ustedes.',
            ],
        },
        {
            role: 'Vice-Presidente de Mesa',
            name: 'Roberto Scharbaay',
            image: '/images/mesas/oiea/r.jpeg',
            motto: '"La diplomacia es la herramienta de transformación técnica y social."',
            stats: { level: '2.4 mSv/h', status: 'OPERATIVO', auth: 'NIVEL 4' },
            bio: [
                'Representa un honor excepcional para mí integrar la Mesa Directiva de este foro, aportando la experiencia consolidada durante tres años de trayectoria ininterrumpida como delegado en diversos Modelos de Naciones Unidas. Mi formación académica tiene su base en el Colegio Andrés Bello, institución que ha forjado mi compromiso con la excelencia el pensamiento crítico y pluralista. A lo largo de estos años, he comprendido que la diplomacia no es solo un ejercicio de oratoria, sino una herramienta de transformación social y técnica que exige una preparación rigurosa y una ética inquebrantable.',
                'En mi recorrido por el ámbito diplomático estudiantil, destaca mi labor como uno de los miembros fundadores de PAVIMUN, una delegación cimentada sobre los pilares de la cortesía académica, el liderazgo propositivo y el rigor intelectual. Bajo esta insignia, he promovido una visión del debate donde el respeto al protocolo y la profundidad de los argumentos son los cimientos de toda negociación exitosa. Mi visión para este comité trasciende la gestión técnica; asumo la dirección con el firme propósito de guiar las deliberaciones hacia soluciones de alto impacto, garantizando que la ética y la elocuencia sean los motores de cada resolución.',
                'Como vicepresidente de esta Mesa, mi compromiso es fomentar un ambiente de sana competencia donde el liderazgo no se imponga, sino que se cultive a través del consenso y la cooperación. Entiendo que nos enfrentamos a un tema de una complejidad técnica y humanitaria sin precedentes, y es precisamente allí donde mi experiencia previa me permite actuar como un puente entre la teoría académica y la resolución de crisis reales. Mi objetivo final es que cada delegado aquí presente logre no solo defender los intereses de su nación, sino también contribuir al fortalecimiento de un orden internacional más seguro y resiliente.',
            ],
        }
    ];

    const { scrollYProgress } = useScroll();
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.4]);
    const bluePulse = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.1, 0.3, 0.1, 0.3, 0.1, 0.3]);

    return (
        <div className="min-h-screen bg-[#05080a] text-amber-50 font-sans selection:bg-cyan-500/30 selection:text-white relative overflow-hidden">
            
            {/* Audio */}
            <audio ref={audioRef} src="/videos/mac.mp3" loop preload="auto" />

            {/* Chernobyl & Cherenkov Background Overlays */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div 
                    style={{ opacity: backgroundOpacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_70%)]"
                />
                <motion.div 
                    style={{ opacity: bluePulse }}
                    className="absolute inset-0 bg-[#06b6d4]/5 mix-blend-screen"
                />
                <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                
                {/* Cherenkov scan lines (Blue) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                    <div className="w-full h-[1px] bg-cyan-400/40 absolute shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-[geigerScan_6s_linear_infinite]" />
                    <div className="w-full h-[1px] bg-amber-500/20 absolute shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-[geigerScan_8s_linear_infinite_reverse]" />
                </div>

                {/* Industrial grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:150px_150px]" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes geigerScan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(1100%); }
                }
                @keyframes reactor-pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                .reactor-glow { animation: reactor-pulse 4s ease-in-out infinite; }
            `}} />

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="fixed bottom-6 right-6 z-[60] group"
                title={muted ? 'Activar sonido' : 'Silenciar'}
            >
                {!muted && <div className="absolute inset-0 rounded-full bg-cyan-500/30 animate-ping" />}
                <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                    !muted
                        ? 'bg-cyan-600/90 border-cyan-400/50 text-white shadow-cyan-500/20'
                        : 'bg-black/80 border-cyan-900/40 text-gray-500 hover:text-cyan-500 shadow-black/10'
                }`}>
                    {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
            </button>

            <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-32 sm:pt-36 lg:pt-44 pb-32">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-32 md:mb-48 text-center md:text-left relative"
                >
                    <Link
                        to="/oiea"
                        className="inline-flex items-center gap-2 text-cyan-500/60 hover:text-cyan-400 font-mono text-[10px] sm:text-xs tracking-[0.4em] mb-14 transition-colors uppercase group border border-cyan-500/20 px-6 py-2.5 bg-cyan-500/5 backdrop-blur-md rounded-sm"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        TERMINAL DE COMITÉ
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-baseline gap-8 mb-8">
                        <div className="relative">
                            <Radiation className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 animate-spin-slow relative z-10" />
                            <div className="absolute inset-0 bg-cyan-500/40 blur-xl reactor-glow" />
                        </div>
                        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-white to-blue-600 uppercase tracking-tighter leading-none italic drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                            OIEA
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-cyan-500/70 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
                        <span className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-1.5 rounded-sm flex items-center gap-2">
                             <Activity className="w-4 h-4" /> REGISTRO DE MESA DIRECTIVA
                        </span>
                        <div className="hidden md:block h-[1px] w-32 bg-gradient-to-r from-cyan-500/40 to-transparent" />
                        <span className="text-amber-500/60">SECTOR: PRYPIAT '86</span>
                    </div>

                    {/* Industrial Danger stripes */}
                    <div className="mt-16 sm:mt-20 space-y-3">
                        <div className="h-2.5 w-full bg-[repeating-linear-gradient(45deg,#05080a,#05080a_20px,#f59e0b_20px,#f59e0b_40px)] opacity-20" />
                        <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#05080a,#05080a_10px,#06b6d4_10px,#06b6d4_20px)] opacity-20" />
                    </div>
                </motion.div>

                {/* ── Profiles ── */}
                <div className="space-y-56 sm:space-y-72 lg:space-y-80">
                    {authorities.map((auth, idx) => (
                        <motion.div
                            key={auth.name}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative group"
                        >
                            {/* Technical Overlays */}
                            <div className={`absolute -top-16 ${idx % 2 === 0 ? '-right-6' : '-left-6'} font-mono text-[100px] sm:text-[150px] font-black text-cyan-500/[0.03] select-none pointer-events-none leading-none z-0`}>
                                ATOM_{idx + 1}
                            </div>

                            <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 sm:gap-24 lg:gap-32 items-center ${idx % 2 === 1 ? 'lg:grid-cols-[1.4fr_1fr]' : ''}`}>
                                
                                {/* Photo Container */}
                                <div className={`relative z-10 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    {/* Tech Borders - Cherenkov Blue */}
                                    <div className="absolute -inset-6 border border-cyan-500/10 pointer-events-none group-hover:border-cyan-500/30 transition-all duration-700" />
                                    <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-500/50" />
                                    <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-500/50" />
                                    
                                    {/* Animated UI Elements around photo */}
                                    <div className="absolute -right-8 top-1/4 h-24 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent animate-pulse" />
                                    <div className="absolute -left-8 bottom-1/4 h-24 w-[2px] bg-gradient-to-b from-transparent via-amber-500/40 to-transparent animate-pulse delay-1000" />

                                    {/* Main Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] border border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.1)] mx-auto lg:mx-0 max-w-[450px]">
                                        <img
                                            src={auth.image}
                                            alt={auth.name}
                                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
                                        />
                                        
                                        {/* Interference overlay */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100%_3px] pointer-events-none opacity-40" />
                                        
                                        {/* Labels moved to solve overlap */}
                                        <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start pointer-events-none z-20">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 backdrop-blur-sm rounded-sm">
                                                <UserCheck className="w-3 h-3 text-cyan-400" />
                                                <span className="text-[9px] font-mono tracking-widest text-cyan-100 uppercase font-bold">ACCESO CONCEDIDO</span>
                                            </div>
                                            <div className="px-2 py-1 bg-amber-950/80 border border-amber-500/40 backdrop-blur-sm rounded-sm">
                                                <span className="text-[8px] font-mono text-amber-500 uppercase font-bold tracking-tighter">SEC_LVL_5</span>
                                            </div>
                                        </div>

                                        {/* Identity Detail Area */}
                                        <div className="absolute bottom-0 inset-x-0 p-8 sm:p-10 bg-gradient-to-t from-[#05080a] via-[#05080a]/90 to-transparent z-20">
                                            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-3 drop-shadow-lg">
                                                {auth.name}
                                            </h2>
                                            {auth.alias && (
                                                <div className="flex items-center gap-3">
                                                    <div className="h-[2px] w-6 bg-cyan-500/60" />
                                                    <p className="text-cyan-400 font-mono text-xl sm:text-2xl tracking-[0.2em] font-bold italic uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                                        {auth.alias}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Data Visualizer (Cyberdeck style) */}
                                    <div className={`absolute -bottom-8 md:-bottom-12 ${idx % 2 === 0 ? '-right-4 sm:-right-8' : '-left-4 sm:-left-8'} z-30 bg-cyan-950/90 backdrop-blur-xl border border-cyan-400/30 p-5 min-w-[200px] sm:min-w-[260px] shadow-2xl overflow-hidden`}>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-pulse" />
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-cyan-400/80">
                                                <span className="text-[9px] font-mono tracking-widest uppercase">RAD_INTENSITY</span>
                                                <span className="text-xs font-mono font-black">{auth.stats.level}</span>
                                            </div>
                                            <div className="w-full h-1 bg-cyan-900/50 rounded-full overflow-hidden">
                                                <div className="h-full bg-cyan-400 w-3/4 animate-[reactor-pulse_2s_infinite]" />
                                            </div>
                                            <div className="flex justify-between items-center text-cyan-400/80">
                                                <span className="text-[9px] font-mono tracking-widest uppercase">CORE_STATUS</span>
                                                <span className="text-[11px] font-mono text-cyan-100 font-bold flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                                    {auth.stats.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className={`z-10 text-center lg:text-left ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex flex-col lg:flex-row items-center gap-5 mb-12">
                                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/40 rounded-sm relative group/icon">
                                            <div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity" />
                                            <Atom className="w-8 h-8 text-cyan-400 relative z-10" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] font-black uppercase mb-1">POSICIÓN DIRECTIVA</span>
                                            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">{auth.role}</h3>
                                        </div>
                                        <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-cyan-500/20 to-transparent" />
                                    </div>

                                    {/* Motto with Cherenkov blue highlight */}
                                    <div className="mb-14 relative p-8 sm:p-10 bg-cyan-500/5 border-l-4 border-cyan-500/60 backdrop-blur-sm">
                                        <Zap className="absolute -top-3 -right-3 w-8 h-8 text-cyan-500/30" />
                                        <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-cyan-100/90 leading-tight">
                                            "{auth.motto}"
                                        </p>
                                    </div>

                                    {/* Bio Text */}
                                    <div className="space-y-10 relative">
                                        {auth.bio.map((para, pIdx) => (
                                            <p key={pIdx} className="text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed text-justify relative lg:pl-6 group/bio">
                                                <span className="hidden lg:block absolute left-0 top-3 w-2 h-[1px] bg-cyan-500/40 group-hover/bio:w-4 group-hover/bio:bg-cyan-400 transition-all duration-300" />
                                                {para}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Industrial Decoration elements (Blue focused) */}
                                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-5 justify-center lg:justify-start">
                                        <div className="flex items-center gap-4 border border-cyan-500/20 px-5 py-3 rounded-sm bg-[#05080a] group/stat hover:border-cyan-500/50 transition-colors">
                                            <Thermometer className="w-6 h-6 text-cyan-500/40 group-hover:text-cyan-400" />
                                            <div className="text-left">
                                                <div className="text-[9px] font-mono text-cyan-700 uppercase tracking-widest font-black leading-none mb-1">REACTOR_TEMP</div>
                                                <div className="text-[12px] font-mono text-cyan-100 uppercase tracking-widest font-bold">450.2°C</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 border border-cyan-500/20 px-5 py-3 rounded-sm bg-[#05080a] group/stat hover:border-cyan-500/50 transition-colors">
                                            <Database className="w-6 h-6 text-cyan-500/40 group-hover:text-cyan-400" />
                                            <div className="text-left">
                                                <div className="text-[9px] font-mono text-cyan-700 uppercase tracking-widest font-black leading-none mb-1">ARCHIVE_SYNC</div>
                                                <div className="text-[12px] font-mono text-cyan-100 uppercase tracking-widest font-bold">EN OPERACIÓN</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 border border-red-500/20 px-5 py-3 rounded-sm bg-[#05080a] group/stat hover:border-red-500/50 transition-colors">
                                            <ShieldAlert className="w-6 h-6 text-red-500/40 group-hover:text-red-400 animate-pulse" />
                                            <div className="text-left">
                                                <div className="text-[9px] font-mono text-red-700 uppercase tracking-widest font-black leading-none mb-1">EVAC_READY</div>
                                                <div className="text-[12px] font-mono text-red-100 uppercase tracking-widest font-bold">ESPERANDO ORDEN</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Separator ornament */}
                            {idx < authorities.length - 1 && (
                                <div className="mt-56 sm:mt-72 w-full flex items-center gap-14">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                                    <div className="flex items-center gap-5">
                                        <Radiation className="w-10 h-10 text-cyan-500/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40 animate-ping" />
                                    </div>
                                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-cyan-500/30 to-transparent" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section - Industrial Terminal */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-64 border-t border-cyan-500/20 pt-24 relative"
                >
                    <div className="absolute top-0 left-0 w-48 h-1 bg-cyan-400/40" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-16">
                        <div className="flex flex-col sm:flex-row items-center gap-8 group max-w-lg text-center sm:text-left">
                            <div className="relative shrink-0">
                                <AlertTriangle className="w-16 h-16 text-cyan-400 animate-pulse relative z-10" />
                                <div className="absolute inset-0 bg-cyan-400/20 blur-xl animate-pulse" />
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-black text-white uppercase tracking-[0.3em] text-xl leading-tight">ZONA DE EXCLUSIÓN</h4>
                                <p className="text-[11px] sm:text-xs font-mono text-cyan-500/70 uppercase leading-relaxed text-justify">
                                    COMITÉ OIEA: SE REQUIERE PROTECCIÓN ACADÉMICA NIVEL 4. CUALQUIER FALLO EN EL DEBATE RESULTARÁ EN COLAPSO DEL PROTOCOLO DE SEGURIDAD NUCLEAR INTERNACIONAL.
                                </p>
                            </div>
                        </div>

                        <div className="text-center md:text-right space-y-6">
                            <div className="inline-block px-5 py-2 border border-cyan-500/30 bg-cyan-500/5 font-mono text-cyan-400 text-[11px] tracking-[0.3em] uppercase rounded-sm">
                                STATUS_CHECK: PAVIMUN_PROD_SERVER_OK
                            </div>
                            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-[0.6em] whitespace-nowrap overflow-hidden opacity-50">
                                001 011 110 001 101 010 110 001 011 110 111 000
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MesaOIEA;
