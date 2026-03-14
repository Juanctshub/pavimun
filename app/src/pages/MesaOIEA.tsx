import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Radiation, AlertTriangle, Atom, Volume2, VolumeX, Database, ShieldAlert, Thermometer, UserCheck } from 'lucide-react';
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
            name: 'Roberto Schanbuay',
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
    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.3]);

    return (
        <div className="min-h-screen bg-[#080808] text-amber-50 font-sans selection:bg-amber-500/30 selection:text-white relative overflow-hidden">
            
            {/* Audio */}
            <audio ref={audioRef} src="/videos/mac.mp3" loop preload="auto" />

            {/* Chernobyl Background Overlays */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div 
                    style={{ opacity: backgroundOpacity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),transparent_70%)]"
                />
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                
                {/* Geiger scan lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="w-full h-[2px] bg-amber-500/30 absolute shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-[geigerScan_4s_ease-in-out_infinite]" />
                </div>

                {/* Industrial grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes geigerScan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                @keyframes flicker {
                    0% { opacity: 0.8; }
                    5% { opacity: 0.9; }
                    10% { opacity: 0.4; }
                    15% { opacity: 1; }
                    20% { opacity: 0.8; }
                    100% { opacity: 1; }
                }
                .flicker-text { animation: flicker 3s infinite; }
            `}} />

            {/* Mute Button */}
            <button
                onClick={toggleMute}
                className="fixed bottom-6 right-6 z-[60] group"
                title={muted ? 'Activar sonido' : 'Silenciar'}
            >
                {!muted && <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />}
                <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                    !muted
                        ? 'bg-amber-600/90 border-amber-400/50 text-white shadow-amber-500/20'
                        : 'bg-black/80 border-amber-900/40 text-gray-500 hover:text-amber-500 shadow-black/10'
                }`}>
                    {!muted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
            </button>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-40 pb-32">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 md:mb-28"
                >
                    <Link
                        to="/oiea"
                        className="inline-flex items-center gap-2 text-amber-500/60 hover:text-amber-400 font-mono text-[10px] sm:text-xs tracking-[0.4em] mb-10 transition-colors uppercase group border border-amber-500/20 px-4 py-2 bg-amber-500/5 backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        RETORNAR AL COMITÉ
                    </Link>

                    <div className="flex flex-col md:flex-row items-baseline gap-4 mb-4">
                        <Radiation className="w-10 h-10 text-amber-500 animate-spin-slow" />
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 uppercase tracking-tighter leading-none italic">
                            OIEA
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-amber-500/60 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase">
                        <span className="bg-amber-500/10 border border-amber-500/30 px-3 py-1 flicker-text">IDENTIFICACIÓN DE MESA DIRECTIVA</span>
                        <div className="h-[1px] w-20 bg-amber-500/30" />
                        <span>VERSIÓN 1.0.CHERNOBYL</span>
                    </div>

                    {/* Warning Stripe */}
                    <div className="mt-8 h-4 w-full bg-[repeating-linear-gradient(45deg,#080808,#080808_10px,#f59e0b_10px,#f59e0b_20px)] opacity-40 rounded-full" />
                </motion.div>

                {/* ── Profiles ── */}
                <div className="space-y-40">
                    {authorities.map((auth, idx) => (
                        <motion.div
                            key={auth.name}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="relative"
                        >
                            {/* Background Number */}
                            <div className="absolute -top-20 -left-10 text-[200px] font-black text-amber-500/5 select-none pointer-events-none font-mono">
                                {String(idx + 1).padStart(2, '0')}
                            </div>

                            <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center ${idx % 2 === 1 ? 'lg:grid-cols-[1.5fr_1fr]' : ''}`}>
                                
                                {/* Photo Container */}
                                <div className={`relative group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                                    {/* Tech Borders */}
                                    <div className="absolute -inset-4 border border-amber-500/10 pointer-events-none group-hover:border-amber-500/30 transition-colors duration-500" />
                                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/40" />
                                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/40" />

                                    {/* Main Image */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
                                        <img
                                            src={auth.image}
                                            alt={auth.name}
                                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-105 group-hover:scale-100"
                                        />
                                        
                                        {/* Scanline Effect overlay on image */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                                        
                                        {/* Identity Label */}
                                        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                                            <div className="flex items-center gap-2 text-amber-500 mb-2">
                                                <UserCheck className="w-4 h-4" />
                                                <span className="text-[10px] font-mono tracking-widest uppercase">ID VERIFICADO</span>
                                            </div>
                                            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-1">
                                                {auth.name}
                                            </h2>
                                            {auth.alias && (
                                                <p className="text-amber-500/70 font-mono text-sm tracking-widest italic flicker-text">"{auth.alias}"</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Data Stats Card (Floating) */}
                                    <div className={`absolute -bottom-8 ${idx % 2 === 0 ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} z-20 bg-zinc-900/90 backdrop-blur-md border border-amber-500/30 p-4 min-w-[200px] shadow-2xl skew-x-[-12deg]`}>
                                        <div className="skew-x-[12deg] space-y-2">
                                            <div className="flex justify-between items-center border-b border-amber-500/10 pb-1">
                                                <span className="text-[8px] font-mono text-amber-500/50 uppercase">RAD_LEVEL</span>
                                                <span className="text-xs font-mono text-amber-500 font-bold">{auth.stats.level}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-amber-500/10 pb-1">
                                                <span className="text-[8px] font-mono text-amber-500/50 uppercase">STA_AUTO</span>
                                                <span className="text-[10px] font-mono text-green-500 font-bold">{auth.stats.status}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[8px] font-mono text-amber-500/50 uppercase">ACC_AUTH</span>
                                                <span className="text-[10px] font-mono text-white font-bold">{auth.stats.auth}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded">
                                            <Atom className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <div className="h-[2px] flex-1 bg-amber-500/20" />
                                        <span className="text-amber-500/60 font-mono text-xs tracking-widest font-bold uppercase">{auth.role}</span>
                                    </div>

                                    {/* Motto */}
                                    <div className="mb-10 relative">
                                        <div className="absolute left-0 top-0 w-[2px] h-full bg-amber-500/40" />
                                        <p className="pl-6 text-xl sm:text-2xl font-serif italic text-amber-200/90 leading-relaxed">
                                            {auth.motto}
                                        </p>
                                    </div>

                                    {/* Bio */}
                                    <div className="space-y-6">
                                        {auth.bio.map((para, pIdx) => (
                                            <p key={pIdx} className="text-zinc-400 text-sm sm:text-base leading-relaxed text-justify relative group">
                                                <span className="absolute -left-4 top-2 w-1 h-1 bg-amber-500/20 group-hover:bg-amber-500/60 transition-colors" />
                                                {para}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Industrial Decoration elements */}
                                    <div className="mt-12 flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2 border border-amber-500/20 px-3 py-1.5 rounded-sm bg-zinc-900/50 backdrop-blur-sm">
                                            <Thermometer className="w-4 h-4 text-amber-500/50" />
                                            <span className="text-[10px] font-mono text-amber-100 uppercase tracking-widest font-bold">CORE_TEMP: OPTIMAL</span>
                                        </div>
                                        <div className="flex items-center gap-2 border border-amber-500/20 px-3 py-1.5 rounded-sm bg-zinc-900/50 backdrop-blur-sm">
                                            <Database className="w-4 h-4 text-amber-500/50" />
                                            <span className="text-[10px] font-mono text-amber-100 uppercase tracking-widest font-bold">ARCHIVE_01: SYNC</span>
                                        </div>
                                        <div className="flex items-center gap-2 border border-amber-500/20 px-3 py-1.5 rounded-sm bg-zinc-900/50 backdrop-blur-sm">
                                            <ShieldAlert className="w-4 h-4 text-red-500/50" />
                                            <span className="text-[10px] font-mono text-red-100 uppercase tracking-widest font-bold">PROTOCOL_Z: IDLE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Separator ornament */}
                            {idx < authorities.length - 1 && (
                                <div className="mt-32 w-full flex items-center gap-4">
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/20" />
                                    <Radiation className="w-6 h-6 text-amber-500/20" />
                                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/20" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer Section - Industrial Warning */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 border-t border-amber-500/20 pt-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="flex items-center gap-4 group">
                            <div className="w-16 h-16 border-2 border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                                <AlertTriangle className="w-8 h-8 text-amber-500 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="font-black text-amber-100 uppercase tracking-widest text-sm">ZONA DE EXCLUSIÓN ACADÉMICA</h4>
                                <p className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.2em] mt-1">SÓLO PERSONAL DE MESA AUTORIZADO</p>
                            </div>
                        </div>
                        <div className="md:text-right">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">DISEÑADO PARA PAVIMUN 2026</span>
                            <div className="mt-2 text-zinc-800 font-mono text-[8px] uppercase tracking-[0.4em] overflow-hidden whitespace-nowrap">
                                010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MesaOIEA;
