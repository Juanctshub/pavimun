import { useState, useEffect } from 'react';
import { Shield, TrendingUp, Handshake, ShoppingBag, Music, Gift, MessageSquare, AlertTriangle, ArrowRight } from 'lucide-react';

const Banco = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Conectando con la Bóveda Central...');

  // Loading Sequence
  useEffect(() => {
    const sequence = [
      { text: 'Autenticando credenciales de delegado...', delay: 1000 },
      { text: 'Desencriptando reservas de Banco Central...', delay: 2000 },
      { text: 'Acceso concedido.', delay: 3500 },
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];
    sequence.forEach(({ text, delay }) => {
      const timeout = setTimeout(() => setLoadingText(text), delay);
      timeouts.push(timeout);
    });

    const hideTimeout = setTimeout(() => setIsLoading(false), 4500);
    timeouts.push(hideTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const banknotes = [
    { denom: 1, front: '/images/pavi/f.png', back: '/images/pavi/ff.png' },
    { denom: 2, front: '/images/pavi/j.png', back: '/images/pavi/jj.png' },
    { denom: 5, front: '/images/pavi/k.png', back: '/images/pavi/kk.png' },
    { denom: 10, front: '/images/pavi/n.png', back: '/images/pavi/nn.png' },
    { denom: 20, front: '/images/pavi/c.png', back: '/images/pavi/cc.png', character: 'Raulito' },
    { denom: 50, front: '/images/pavi/d.png', back: '/images/pavi/dd.png', character: 'Aura' },
    { denom: 100, front: '/images/pavi/s.png', back: '/images/pavi/ss.png' },
    { denom: 200, front: '/images/pavi/x.png', back: '/images/pavi/xx.png' },
  ];

  const dutyFreeItems = [
    { name: 'Rosa Parlamentaria (Mensaje Anónimo)', price: 10, icon: <MessageSquare className="w-6 h-6" /> },
    { name: 'Snack Ligero (Caramelos/Golosinas)', price: 30, icon: <Gift className="w-6 h-6" /> },
    { name: 'Elegir 1 Canción del Receso', price: 50, icon: <Music className="w-6 h-6" /> },
    { name: 'Sticker Holográfico Oficial PAVIMUN', price: 100, icon: <ShoppingBag className="w-6 h-6" /> },
    { name: 'Pase VIP (Saltar la Fila del Break)', price: 200, icon: <Shield className="w-6 h-6" /> },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#001529] flex flex-col items-center justify-center z-50 text-white font-mono">
        <div className="relative w-32 h-32 mb-8">
          {/* Animated Vault/Coin CSS */}
          <div className="absolute inset-0 border-4 border-[#b89456] rounded-full animate-spin border-t-transparent shadow-[0_0_30px_#b89456]"></div>
          <div className="absolute inset-2 border-4 border-[#1b3a24] rounded-full animate-reverse-spin border-b-transparent"></div>
          <Shield className="absolute inset-0 m-auto w-12 h-12 text-[#b89456] animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold tracking-widest text-[#b89456] mb-4 uppercase">Banco Central PAVI</h2>
        <p className="text-gray-400 animate-pulse">{loadingText}</p>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 mt-8 rounded overflow-hidden">
          <div className="h-full bg-[#b89456] animate-[load_4.5s_ease-in-out_forwards]"></div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes load {
            0% { width: 0%; }
            20% { width: 30%; }
            50% { width: 40%; }
            80% { width: 80%; }
            100% { width: 100%; }
          }
          .animate-reverse-spin {
            animation: spin 3s linear infinite reverse;
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001224] text-gray-200 selection:bg-[#b89456] selection:text-white font-sans overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b89456]/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/40 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 mt-20">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#b89456]/30 bg-[#b89456]/10 text-[#b89456] text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4" /> Economía Oficial PAVIMUN
            </div>
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Banco Central <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b89456] to-[#e8c886]">Los Agreda</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl font-light">
              La moneda exclusiva de nuestra simulación. Gana recompensas por tu diplomacia, invierte en los recesos y canjea tus ganancias en nuestro Duty Free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#duty-free" className="px-8 py-4 bg-gradient-to-r from-[#b89456] to-[#937540] hover:from-[#cda766] hover:to-[#a8874d] text-white rounded-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(184,148,86,0.4)] flex items-center justify-center gap-2">
                Ver Duty Free <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#galeria" className="px-8 py-4 border border-gray-600 hover:border-[#b89456] text-gray-300 hover:text-[#b89456] bg-black/20 rounded-lg font-bold transition-all hover:bg-black/40 backdrop-blur-sm flex items-center justify-center gap-2">
                Conoce los Billetes
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg relative perspective-1000">
            {/* 3D Floating Banknote Effect in Hero */}
            <div className="relative w-full aspect-[2/1] bg-black/40 rounded-xl border border-gray-800 shadow-2xl transform-gpu rotate-y-[-15deg] rotate-x-[10deg] animate-[float_6s_ease-in-out_infinite] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700">
              <img src="/images/pavi/s.png" alt="100 PAVI" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(184,148,86,0.3)] filter contrast-125" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CÓMO FUNCIONA (3 PASOS) */}
      <section className="py-24 bg-[#000a14] relative border-y border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">El Ciclo Económico</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Entiende cómo funciona el flujo de capital dentro de las instalaciones de PAVIMUN.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#001529]/60 p-8 rounded-2xl border border-gray-800 hover:border-[#b89456]/50 transition-colors group backdrop-blur-md">
              <div className="w-16 h-16 bg-[#b89456]/10 rounded-xl flex items-center justify-center mb-6 text-[#b89456] group-hover:scale-110 group-hover:bg-[#b89456] group-hover:text-white transition-all">
                <Handshake className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">1. Gana</h3>
              <p className="text-gray-400 leading-relaxed">
                El Staff de PAVIMUN y el Banco Central recorren los recesos. Demuestra diplomacia exquisita, ayuda a otros delegados o supera nuestros <strong>Desafíos Estrelámpago</strong> para ser recompensado con PAVIs físicos.
              </p>
            </div>

            <div className="bg-[#001529]/60 p-8 rounded-2xl border border-gray-800 hover:border-[#b89456]/50 transition-colors group backdrop-blur-md relative transform md:-translate-y-4">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#b89456]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10 blur"></div>
              <div className="w-16 h-16 bg-[#b89456]/10 rounded-xl flex items-center justify-center mb-6 text-[#b89456] group-hover:scale-110 group-hover:bg-[#b89456] group-hover:text-white transition-all">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">2. Invierte</h3>
              <p className="text-gray-400 leading-relaxed">
                Dirígete a la <strong>Feria de Inversiones</strong> (Zona de Juegos de Habilidad) durante cualquier receso. Apuesta estratégicamente contra la casa u otros delegados para multiplicar tus fondos velozmente.
              </p>
            </div>

            <div className="bg-[#001529]/60 p-8 rounded-2xl border border-gray-800 hover:border-[#b89456]/50 transition-colors group backdrop-blur-md">
              <div className="w-16 h-16 bg-[#b89456]/10 rounded-xl flex items-center justify-center mb-6 text-[#b89456] group-hover:scale-110 group-hover:bg-[#b89456] group-hover:text-white transition-all">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">3. Disfruta</h3>
              <p className="text-gray-400 leading-relaxed">
                Acércate a la barra de nuestro <strong>Duty Free PAVI</strong>. Canjea tus billetes acumulados por caramelos, snacks, privilegios del evento o mercancía oficial exclusiva. ¡Tú decides en qué gastar!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUTY FREE (Catálogo) */}
      <section id="duty-free" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6 border-dashed">
            <div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">Duty Free PAVIMUN</h2>
              <p className="text-[#b89456] tracking-widest uppercase text-sm font-bold">Catálogo Oficial de Recompensas</p>
            </div>
            <div className="mt-4 md:mt-0 bg-[#001529] px-4 py-2 rounded border border-gray-700 text-xs text-gray-400 font-mono">
              PRECIOS SUJETOS A INFLACIÓN DEL EVENTO
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dutyFreeItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-[#001529]/50 hover:bg-[#001f3d] border border-gray-800/80 rounded-lg group transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-900/50 rounded-lg text-gray-400 group-hover:text-[#b89456] transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{item.name}</h4>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-[#b89456] drop-shadow-sm">{item.price}</span>
                  <span className="text-xs text-gray-500 font-bold tracking-widest">PAVI</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 italic">
            * Productos físicos sujetos a disponibilidad. Nuevos artículos podrían añadirse al catálogo durante el evento.
          </p>
        </div>
      </section>

      {/* 4. GALERÍA NUMISMÁTICA (Los Billetes) */}
      <section id="galeria" className="py-24 bg-[#000a14] border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Reserva Histórica</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Conoce el diseño y las medidas de seguridad de las 8 denominaciones oficiales emitidas por el Banco Central Los Agreda.
              <br /><span className="text-sm border-b border-gray-600 mt-2 inline-block">Pasa el cursor para ver el reverso.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {banknotes.map((note) => (
              <div key={note.denom} className="flex flex-col items-center group perspective-1000">
                <div className="relative w-full aspect-[1/1.5] max-w-[280px] sm:max-w-xs transition-transform duration-[800ms] transform-style-3d group-hover:rotate-y-180 drop-shadow-2xl">

                  {/* Front of Banknote */}
                  <div className="absolute inset-0 backface-hidden rounded-md overflow-hidden border border-gray-700 bg-gray-900">
                    <img src={note.front} alt={`${note.denom} PAVI Front`} className="w-full h-full object-cover filter contrast-110" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#b89456]/0 via-[#b89456]/0 to-[#b89456]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Back of Banknote */}
                  <div className="absolute inset-0 backface-hidden rounded-md overflow-hidden border border-[#b89456] rotate-y-180 bg-gray-900">
                    <img src={note.back} alt={`${note.denom} PAVI Back`} className="w-full h-full object-cover filter contrast-110" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-[#b89456]/20 via-[#b89456]/0 to-[#b89456]/0 opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
                  </div>

                </div>

                <div className="mt-8 text-center">
                  <h3 className="text-3xl font-black text-white tracking-widest drop-shadow-md">
                    {note.denom} <span className="text-[#b89456] text-xl">PAVI</span>
                  </h3>
                  {note.character && (
                    <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest">Edición {note.character}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER OFICIAL / DISCLAIMER */}
      <footer className="bg-[#cf102d] text-white py-6 border-t-[6px] border-[#8a0b1e]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-300 animate-pulse" />
            <div>
              <h4 className="font-bold uppercase tracking-widest text-lg">Aviso del Banco Central</h4>
              <p className="text-xs text-white/80 max-w-xl pr-4">
                La moneda PAVI no tiene valor financiero legal en el mundo real.
                Es de uso exclusivo para dinámicas recreativas dentro de las instalaciones del Colegio Pablo VI durante el evento PAVIMUN.
                La falsificación de esta divisa resultará en la inhabilitación del delegado en el Duty Free y Feria de Inversiones.
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-mono font-bold text-white/60">AUTORIZADO POR:</p>
            <p className="font-playfair font-bold text-xl drop-shadow-sm">MESA ORGANIZADORA</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Banco;
