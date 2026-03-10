import { useState, useRef } from 'react';
import { Landmark, TrendingUp, Target, Zap, Box, MapPin, Search, Scan, Lock } from 'lucide-react';

const Banco = () => {
  const [authPhase, setAuthPhase] = useState<'initial' | 'typing' | 'loading' | 'content'>('initial');
  const [pinInput, setPinInput] = useState('');
  const [loadingText, setLoadingText] = useState('INI. PROTOCOLO...');
  const [searchTerm, setSearchTerm] = useState('');
  const [flippedNotes, setFlippedNotes] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleFlip = (denom: number) => {
    setFlippedNotes(prev => prev.includes(denom) ? prev.filter(d => d !== denom) : [...prev, denom]);
  };

  const ADMIN_PIN = '0271987AA';

  const startSimulation = () => {
    setAuthPhase('typing');

    // Unlock audio element on exact user interaction to bypass autoplay block
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        audioRef.current?.pause();
      }).catch(() => { });
    }

    let currentInput = '';
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < ADMIN_PIN.length) {
        currentInput += ADMIN_PIN[i];
        setPinInput(currentInput);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => triggerLoginSequence(), 500);
      }
    }, 150);
  };

  const triggerLoginSequence = () => {
    setAuthPhase('loading');

    const sequence = [
      { text: 'VERIFICANDO RED DE MESA...', delay: 500 },
      { text: 'DESCIFRANDO BÓVEDA CENTRAL...', delay: 1500 },
      { text: 'ASIGNANDO CLAVE DE ACCESO...', delay: 2500 },
      { text: 'ACCESO TÁCTICO CONCEDIDO.', delay: 3500 },
    ];

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => setLoadingText(text), delay);
    });

    setTimeout(() => {
      setAuthPhase('content');
      // Reproducir música propia del Banco Central (now unlocked)
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          let vol = 0;
          const fade = setInterval(() => {
            vol += 0.02;
            if (vol >= 0.5) {
              vol = 0.5;
              clearInterval(fade);
            }
            if (audioRef.current) audioRef.current.volume = vol;
          }, 50);
        }).catch(() => { });
      }
    }, 4500);
  };

  const banknotes = [
    { denom: 1, front: '/images/pavi/1 PAVI.webp', back: '/images/pavi/1 PAVI (Cara Detras).webp', subtitle: 'BASE ASSET', description: 'EL INICIO DE LA ECONOMÍA PAVIMUN. DE CIRCULACIÓN PRINCIPAL EN TRANSACCIONES MENORES, VUELTOS Y COMPRAS LIGERAS EN LA TIENDITA.' },
    { denom: 2, front: '/images/pavi/2 PAVI.webp', back: '/images/pavi/2 PAVI (Cara Detras).webp', subtitle: 'POCKET RESERVE', description: 'PARA COMPENSACIONES MENORES Y PAGOS RÁPIDOS EN TRANSACCIONES COTIDIANAS DEL MODELO.' },
    { denom: 5, front: '/images/pavi/5 PAVI.webp', back: '/images/pavi/5 PAVI (Cara Detras).webp', subtitle: 'COMMON CIRCULATION', description: 'OPERATIVIDAD INMEDIATA PARA LA ADQUISICIÓN DE SNACKS MEDIOS Y SUMINISTROS BÁSICOS DURANTE LOS RECESOS.' },
    { denom: 10, front: '/images/pavi/10 PAVI.webp', back: '/images/pavi/10 PAVI (Cara Detras).webp', subtitle: 'GOLD STANDARD', description: 'EL ESTÁNDAR TÁCTICO DE ORO. EMPLEADO PARA COMPRAR GOLOSINAS PREMIUM Y ENVIAR ROSAS PARLAMENTARIAS CLASIFICADAS.' },
    { denom: 20, front: '/images/pavi/20 PAVI.webp', back: '/images/pavi/20 PAVI (Cara Detras).webp', subtitle: 'INVESTMENT TIER', character: 'Raulito', description: 'BILLETE DE INVERSIÓN PRINCIPAL. IDEAL PARA INICIAR APUESTAS EN LAS DINÁMICAS DE FERIA Y DOBLAR CAPITAL ACUMULADO.' },
    { denom: 50, front: '/images/pavi/50 PAVI.webp', back: '/images/pavi/50 PAVI (Cara Detras).webp', subtitle: 'MID RESERVE', character: 'Aura', description: 'RESERVA DE ALTO RIESGO Y VALOR. OTORGA EL PODER DE ADQUIRIR COMBOS DE LA TIENDITA O NEGOCIAR PRIVILEGIOS DE SESIÓN.' },
    { denom: 100, front: '/images/pavi/100 PAVI.webp', back: '/images/pavi/100 PAVI (Cara Detras).webp', subtitle: 'DIPLOMACY REWARD', description: 'EL PREMIO DE LITE DE LA DIPLOMACIA. SOLO PARA TRATADOS CRÍTICOS. SUFICIENTE PARA RECLAMAR STICKERS OFICIALES O BENEFICIOS PREMIUM.' },
    { denom: 200, front: '/images/pavi/200 PAVI.webp', back: '/images/pavi/200 PAVI (Cara Detras).webp', subtitle: 'CLASSIFIED ACCESS', description: 'EDICIÓN RESTRINGIDA. QUIEN PORTE ESTE BILLETE TIENE PODER ABSOLUTO SOBRE COMPRAS MAYORES Y ACCESO VIP A RESERVAS OCULTAS.' },
  ];

  const tienditaItems = [
    { name: '[ SNACKS SALADOS ]', alias: 'Doritos, Papas Fritas, Platanitos', price: 30, icon: <Box className="w-8 h-8" /> },
    { name: '[ GOLOSINAS ]', alias: 'Chocolates, Caramelos de Goma', price: 20, icon: <Zap className="w-8 h-8" /> },
    { name: '[ REFRESCOS ]', alias: 'Bebidas Carbonatadas y Sodas', price: 50, icon: <MapPin className="w-8 h-8" /> },
    { name: '[ THE STICKER ]', alias: 'Sticker Holográfico Oficial', price: 100, icon: <Target className="w-8 h-8" /> },
  ];

  const filteredItems = tienditaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <audio ref={audioRef} src="/audio/luis.mp3" loop preload="auto" />
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide {
            0% { transform: translateX(10%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes barload {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          /* Custom 3D Flips */
          .hero-flip-container { perspective: 1500px; }
          .hero-flip-inner {
            transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            transform: rotateY(0deg) rotateZ(-3deg);
          }
          .hero-flip-container:hover .hero-flip-inner,
          .hero-flip-container:active .hero-flip-inner,
          .hero-flip-container.is-flipped .hero-flip-inner {
            transform: rotateY(180deg) rotateZ(0deg) scale(1.05);
          }
          .gallery-flip-container { perspective: 1500px; }
          .gallery-flip-inner {
            transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            transform: rotateY(0deg);
          }
          .gallery-flip-container:hover .gallery-flip-inner,
          .gallery-flip-container:active .gallery-flip-inner,
          .gallery-flip-container.is-flipped .gallery-flip-inner {
            transform: rotateY(180deg) scale(1.1);
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}} />

      {/* STAGE 1: PIN SCREEN */}
      {(authPhase === 'initial' || authPhase === 'typing') && (
        <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center items-center text-white font-mono overflow-hidden px-4">
          <div className="absolute inset-4 sm:inset-6 md:inset-8 border-2 border-[#1a1a1a] pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-[#b89456]"></div>
            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-[#b89456]"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-[#b89456]"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-[#b89456]"></div>
          </div>

          <Landmark className="w-16 h-16 sm:w-24 sm:h-24 text-[#b89456] mb-8 animate-pulse" strokeWidth={1.5} />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 text-center">Bóveda Restringida</h1>
          <p className="text-[#b89456] tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm font-bold mb-12 text-center px-2">CONEXIÓN REQUERIDA PARA ACCEDER AL SISTEMA ECONÓMICO</p>

          <div className="relative z-10 w-full max-w-sm">
            {authPhase === 'initial' ? (
              <button onClick={startSimulation} className="w-full bg-[#b89456] hover:bg-white hover:text-[#b89456] text-black font-black uppercase tracking-widest py-4 text-base md:text-xl transition-all duration-300 drop-shadow-[0_10px_30px_rgba(184,148,86,0.3)]">
                [ ESTABLECER CONEXIÓN ]
              </button>
            ) : (
              <div className="w-full">
                <input
                  type="password"
                  value={pinInput}
                  readOnly
                  placeholder="___ ___ ___"
                  className="w-full bg-transparent border-b-4 border-[#b89456] text-[#b89456] text-center text-3xl md:text-4xl tracking-[0.2em] sm:tracking-[0.3em] pb-4 outline-none font-black placeholder:text-[#333]"
                />
                <button type="button" disabled className="w-full mt-10 bg-[#b89456] opacity-50 cursor-not-allowed text-black font-black uppercase tracking-widest py-4 text-base md:text-xl transition-all duration-300">
                  [ OMITIENDO FIREWALL... ]
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAGE 2: LOADING SCREEN */}
      {authPhase === 'loading' && (
        <div className="fixed inset-0 bg-[#b89456] z-50 flex flex-col justify-center items-center text-black font-sans overflow-hidden">
          {/* Background text moving huge */}
          <div className="absolute whitespace-nowrap text-[30vw] font-black opacity-[0.05] select-none animate-[slide_15s_linear_infinite]">
            LOADING SYSTEM LOADING SYSTEM LOADING SYSTEM
          </div>

          <Lock className="w-32 h-32 mb-8 z-10" strokeWidth={1} />
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter z-10 text-center px-4 leading-[0.85]">
            DESENCRIPTANDO<br />BÓVEDA
          </h2>

          <div className="absolute bottom-24 w-4/5 max-w-3xl z-10">
            <div className="flex justify-between font-mono text-sm md:text-base tracking-widest font-bold mb-4">
              <span>[ ESTADO ]</span>
              <span className="text-white bg-black px-2">{loadingText}</span>
            </div>
            <div className="w-full h-3 bg-black/20">
              <div className="h-full bg-black animate-[barload_4.5s_ease-out_forwards]"></div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: CONTENT */}
      {authPhase === 'content' && (
        <div className="-mt-[72px] pt-[72px] min-h-screen bg-[#050505] text-white selection:bg-[#b89456] selection:text-white font-sans overflow-x-hidden relative">

          {/* HERO */}
          <section className="relative w-full min-h-screen flex flex-col justify-center items-center border-b-8 border-[#b89456] overflow-hidden bg-[#050505]">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(184,148,86,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(184,148,86,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0"></div>

            {/* Hugest background text responsive */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-0 overflow-hidden w-full">
              <h1 className="text-[20vw] sm:text-[14vw] font-black uppercase tracking-tighter text-transparent select-none scale-y-110 drop-shadow-[0_0_100px_rgba(184,148,86,0.8)]" style={{ WebkitTextStroke: '4px rgba(184,148,86,0.9)' }}>
                ECONOMÍA
              </h1>
            </div>

            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-10 overflow-hidden w-full blur-[1px]">
              <h1 className="text-[20vw] sm:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] whitespace-nowrap text-transparent select-none scale-y-110" style={{ WebkitTextStroke: '2px rgba(255,255,255,1)' }}>
                ECONOMÍA
              </h1>
            </div>

            {/* 3D Banknote IN FRONT OF TEXT */}
            <div
              className={`relative z-30 w-[85vw] sm:w-[60vw] md:w-[35vw] lg:w-[35vw] flex justify-center mt-10 md:mt-16 hero-flip-container cursor-pointer drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] ${flippedNotes.includes(100) ? 'is-flipped' : ''}`}
              onClick={() => toggleFlip(100)}
            >
              <div className={`relative w-full aspect-auto min-h-[500px] hero-flip-inner transition-transform duration-1000`}>
                {/* Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
                  <img src="/images/pavi/100 PAVI.webp" alt="100 PAVI Front" className="w-full h-full object-contain pointer-events-none" />
                </div>
                {/* Back */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center">
                  <img src="/images/pavi/100 PAVI (Cara Detras).webp" alt="100 PAVI Back" className="w-full h-full object-contain pointer-events-none" />
                </div>
              </div>
            </div>

          </section>

          {/* CICLO TÁCTICO */}
          <section className="w-full bg-[#111] py-32 border-b border-[#333] relative">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                <div className="w-full lg:w-1/3 sticky top-32">
                  <div className="flex items-center gap-4 mb-6 text-[#b89456] font-mono tracking-widest text-sm font-bold">
                    <Landmark className="w-6 h-6 animate-pulse" /> ECONOMÍA PAVIMUN
                  </div>
                  <h2 className="text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white">
                    FLUJO<br /><span className="text-[#b89456] inline-block mt-2">ECONÓMICO</span>
                  </h2>
                  <p className="font-mono text-gray-400 text-sm tracking-widest leading-relaxed border-l-4 border-[#b89456] pl-4">
                    NORMAS OFICIALES DE PARTICIPACIÓN ECONÓMICA. PROCEDIMIENTO BANCARIO: GANA, INVIERTE Y ADQUIERE BIENES DURANTE LOS RECESOS.
                  </p>
                </div>

                <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* GANA */}
                  <div className="border border-[#333] bg-[#0a0a0a] p-10 hover:border-[#b89456] transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-[#333] group-hover:text-[#b89456] transition-colors"><TrendingUp className="w-12 h-12" strokeWidth={1} /></div>
                    <div className="text-white font-black text-6xl mb-6 group-hover:scale-110 transition-transform origin-left opacity-30 group-hover:opacity-100 group-hover:text-[#b89456]">01</div>
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4 text-white">Gana</h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed tracking-widest">
                      DEMUESTRA DIPLOMACIA IMPECABLE EN COMITÉ O SUPERA DESAFÍOS ESPECIALES. RECIBE DIVISAS DEL BANCO CENTRAL COMO RECOMPENSA POR TU EXCELENCIA.
                    </p>
                  </div>
                  {/* INVIERTE */}
                  <div className="border border-[#333] bg-[#0a0a0a] p-10 hover:border-[#b89456] transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-[#333] group-hover:text-[#b89456] transition-colors"><TrendingUp className="w-12 h-12" strokeWidth={1} /></div>
                    <div className="text-white font-black text-6xl mb-6 group-hover:scale-110 transition-transform origin-left opacity-30 group-hover:opacity-100 group-hover:text-[#b89456]">02</div>
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4 text-white">Invierte</h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed tracking-widest">
                      PARTICIPA EN LA FERIA DE INVERSIONES DURANTE LOS RECESOS. MULTIPLICA TUS ACTIVOS PARTICIPANDO EN LAS DISTINTAS DINÁMICAS PREPARADAS PARA LOS DELEGADOS.
                    </p>
                  </div>
                  {/* DISFRUTA */}
                  <div className="border border-[#333] bg-[#0a0a0a] p-10 hover:border-[#b89456] transition-colors group relative overflow-hidden md:col-span-2">
                    <div className="absolute top-0 right-0 p-4 text-[#333] group-hover:text-[#b89456] transition-colors"><TrendingUp className="w-12 h-12" strokeWidth={1} /></div>
                    <div className="text-[#b89456] font-black text-6xl mb-6 opacity-30 group-hover:scale-110 transition-transform origin-left group-hover:opacity-100">03</div>
                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4 text-white">Disfruta</h3>
                    <p className="text-gray-400 text-sm font-mono leading-relaxed tracking-widest">
                      UTILIZA TUS FONDOS ACUMULADOS EN "LA TIENDITA". ADQUIERE SNACKS, BEBIDAS, DULCES O BENEFICIOS EXCLUSIVOS PARA TU COMITÉ HASTA AGOTAR EXISTENCIAS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LA TIENDITA SEARCH CATALOG */}
          <section id="duty-free" className="w-full bg-[#050505] py-32 relative overflow-hidden border-b-8 border-[#333]">
            {/* Extremely large BG text */}
            <div className="absolute top-0 left-[-5%] text-[20vw] font-black text-[#111] select-none pointer-events-none whitespace-nowrap leading-[0.8]">
              CATÁLOGO CATÁLOGO
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

              <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 border-b-2 border-[#333] pb-10">
                <div className="w-full lg:w-auto">
                  <div className="flex items-center gap-4 text-[#b89456] font-mono tracking-widest text-sm font-bold mb-4">
                    <Scan className="w-6 h-6 animate-pulse" /> TARGET CATALOG SYSTEM
                  </div>
                  <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
                    LA TIENDITA
                  </h2>
                </div>

                <div className="w-full lg:w-96 relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#666] w-6 h-6 group-focus-within:text-[#b89456] transition-colors" />
                  <input
                    type="text"
                    placeholder="BUSCAR INVENTARIO..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#111] border-2 border-[#333] focus:border-[#b89456] text-white font-mono py-5 pl-16 pr-6 outline-none transition-colors text-base tracking-widest uppercase placeholder:text-[#444]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                {filteredItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-[#0a0a0a] border-l-[12px] border-[#333] hover:border-[#b89456] p-8 md:p-10 group transition-all">
                    <div className="flex items-center gap-8 mb-6 md:mb-0">
                      <div className="text-[#333] group-hover:text-[#b89456] transition-colors">{item.icon}</div>
                      <div>
                        <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2">{item.name}</h4>
                        <span className="font-mono text-sm text-gray-500 tracking-[0.2em]">{item.alias}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-4 md:ml-auto md:text-right">
                      <span className="text-5xl md:text-7xl font-black text-white group-hover:text-[#b89456] transition-colors leading-none">{item.price}</span>
                      <span className="font-mono text-sm tracking-widest text-[#666] font-bold">PAVI</span>
                    </div>
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-center py-20 bg-[#0a0a0a] border-2 border-dashed border-[#b89456] font-mono font-bold tracking-[0.2em] text-[#b89456]">
                    [ ADVERTENCIA: ARTÍCULO NO ENCONTRADO EN LA BASE DE DATOS ]
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* GALERÍA 3D (RESERVA HISTÓRICA) */}
          <section id="galeria" className="w-full bg-[#111] pt-32 pb-48 text-white overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
              <div className="text-center mb-32 relative">
                <div className="absolute inset-x-0 w-full h-[1px] bg-[#333] top-1/2 -z-10"></div>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-[#111] inline-block bg-[#111] px-8 py-2" style={{ WebkitTextStroke: '2px #b89456' }}>
                  RESERVA HISTÓRICA
                </h2>
                <p className="font-mono font-bold tracking-[0.3em] text-sm max-w-2xl mx-auto border-2 border-[#333] bg-[#050505] p-6 mt-16 text-[#b89456]">
                  [ INTERACTÚA CON EL BILLETE PARA INSPECCIONAR SU REVERSO DE SEGURIDAD MEDIANTE ESCANEO 3D ]
                </p>
              </div>

              <div className="flex flex-col gap-32 w-full max-w-6xl mx-auto px-4 lg:px-0">
                {banknotes.map((note, idx) => {
                  const isLeftText = idx % 2 === 0;

                  return (
                    <div key={note.denom} className={`flex flex-col ${isLeftText ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 w-full`}>

                      {/* DOSSIER INFO */}
                      <div className="w-full lg:w-1/2 flex flex-col border-l-4 lg:border-l-0 lg:border-t-4 border-[#b89456] pl-6 lg:pl-0 lg:pt-8 relative group">
                        <div className="flex text-[#333] group-hover:text-[#b89456] transition-colors gap-2 mb-4">
                          <Scan className="w-6 h-6" />
                          <span className="font-mono text-xs font-bold text-[#444] tracking-[0.3em] ml-auto">
                            ACQ: 8092.{note.denom}
                          </span>
                        </div>

                        <div className="mb-2 text-[#b89456] font-mono tracking-[0.2em] text-xs md:text-sm font-bold flex items-center gap-2 uppercase">
                          <TrendingUp className="w-4 h-4" /> // {note.subtitle}
                        </div>

                        <h3 className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-white group-hover:text-[#b89456] transition-colors">
                          {note.denom} <br className="hidden lg:block" /> <span className="text-4xl text-[#666]">PAVI.</span>
                        </h3>

                        {note.character && (
                          <div className="inline-block bg-white text-black font-black uppercase px-4 py-2 text-xs md:text-sm tracking-[0.3em] mb-6 self-start">
                            OBJETIVO: {note.character}
                          </div>
                        )}

                        <div className="font-mono text-[#a1a1a1] text-xs md:text-sm tracking-[0.1em] leading-relaxed max-w-md">
                          {note.description}
                        </div>
                      </div>

                      {/* 3D BANKNOTE */}
                      <div className="w-full lg:w-1/2 flex justify-center items-center py-10 relative">
                        <div
                          className={`relative w-full max-w-[320px] lg:max-w-[400px] h-[500px] lg:h-[600px] bg-transparent gallery-flip-container cursor-crosshair ${flippedNotes.includes(note.denom) ? 'is-flipped' : ''}`}
                          onClick={() => toggleFlip(note.denom)}
                        >
                          <div className={`relative w-full h-full gallery-flip-inner transition-transform duration-1000 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]`}>
                            {/* Front */}
                            <div className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center">
                              <img src={note.front} alt={`Front ${note.denom}`} className="w-full h-full object-contain pointer-events-none" />
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center">
                              <img src={note.back} alt={`Back ${note.denom}`} className="w-full h-full object-contain pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-4 lg:-right-10 text-[#222] font-black text-xs font-mono tracking-widest whitespace-nowrap rotate-[-90deg] origin-bottom-right hidden lg:block">
                          SECUENCIA: {note.denom.toString().padStart(3, '0')} // CARGANDO
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-[#b89456] py-20 border-t-8 border-white text-center relative selection:bg-black selection:text-[#b89456]">
            {/* Caution tape styling */}
            <div className="absolute top-0 left-0 w-full h-4" style={{ background: 'repeating-linear-gradient(45deg, #000, #000 20px, #b89456 20px, #b89456 40px)' }}></div>
            <div className="absolute bottom-0 left-0 w-full h-4" style={{ background: 'repeating-linear-gradient(-45deg, #000, #000 20px, #b89456 20px, #b89456 40px)' }}></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10 pt-8 pb-8">
              <Landmark className="w-16 h-16 text-black mx-auto mb-10" strokeWidth={1} />
              <p className="font-mono text-black font-black text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em] leading-loose uppercase border-y-[10px] border-black py-8 bg-black/5">
                <span className="text-white bg-black px-2 py-1 mr-2">[ AVISO LEGAL ]</span> <br className="md:hidden" />
                LA MONEDA PAVI CARECE DE VALOR FINANCIERO FUERA DE LA JURISDICCIÓN DEL EVENTO. SU DISTRIBUCIÓN ESTÁ RESTRINGIDA A LAS CIRCULACIONES OFICIALES Y ACTIVIDADES PREVISTAS. <br />
                LA FALSIFICACIÓN DEL PAPEL MONEDA RESULTARÁ EN SANCIONES DISCIPLINARIAS.
              </p>
              <div className="mt-12 text-black font-black text-xl tracking-tighter uppercase">
                BANCO CENTRAL PAVIMUN
              </div>
            </div>
          </footer>

        </div>
      )}
    </>
  );
};

export default Banco;
