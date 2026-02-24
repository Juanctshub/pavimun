import { useState } from 'react';
import { Shield, TrendingUp, Handshake, ShoppingBag, Music, Gift, AlertTriangle, ChevronRight } from 'lucide-react';

const Banco = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Conectando...');
  const ADMIN_PIN = '0271987AA';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setPinError(false);
      setIsLoading(true);
      const sequence = [
        { text: 'Autenticando administrador...', delay: 1000 },
        { text: 'Verificando reservas...', delay: 2000 },
        { text: 'Acceso concedido.', delay: 3500 },
      ];

      let timeouts: ReturnType<typeof setTimeout>[] = [];
      sequence.forEach(({ text, delay }) => {
        const timeout = setTimeout(() => setLoadingText(text), delay);
        timeouts.push(timeout);
      });

      const hideTimeout = setTimeout(() => {
        setIsLoading(false);
        setIsAuthorized(true);
      }, 4500);
      timeouts.push(hideTimeout);
    } else {
      setPinError(true);
      setPinInput('');
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const banknotes = [
    { denom: 1, front: '/images/pavi/f.webp', back: '/images/pavi/ff.webp', description: 'El inicio de la economía PAVIMUN. Perfecto para pequeños recargos en La Tiendita.' },
    { denom: 2, front: '/images/pavi/j.webp', back: '/images/pavi/jj.webp', description: 'Útil para transacciones menores y dar vuelto exacto en las ferias.' },
    { denom: 5, front: '/images/pavi/k.webp', back: '/images/pavi/kk.webp', description: 'El billete de circulación común para snacks ligeros y chicles.' },
    { denom: 10, front: '/images/pavi/n.webp', back: '/images/pavi/nn.webp', description: 'El estándar de oro para comprar golosinas y enviar rosas parlamentarias.' },
    { denom: 20, front: '/images/pavi/c.webp', back: '/images/pavi/cc.webp', character: 'Raulito', description: 'Billete de inversión. Ideal para iniciar apuestas en las dinámicas.' },
    { denom: 50, front: '/images/pavi/d.webp', back: '/images/pavi/dd.webp', character: 'Aura', description: 'Reserva de valor media. Utilizado para comprar combos o privilegios.' },
    { denom: 100, front: '/images/pavi/s.webp', back: '/images/pavi/ss.webp', description: 'El premio mayor de la diplomacia. Adquiere stickers oficiales o exclusividades de alto nivel.' },
    { denom: 200, front: '/images/pavi/x.webp', back: '/images/pavi/xx.webp', description: 'Edición Limitada. Quien porte este billete tiene acceso VIP indiscutible a los beneficios del Modelo.' },
  ];

  const dutyFreeItems = [
    { name: 'Snacks Salados (Doritos, Papas)', price: 30, icon: <Gift className="w-5 h-5" /> },
    { name: 'Golosinas y Chocolates', price: 20, icon: <Gift className="w-5 h-5" /> },
    { name: 'Refrescos y Bebidas', price: 50, icon: <Gift className="w-5 h-5" /> },
    { name: 'Sticker Oficial PAVIMUN', price: 100, icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Reserva de Corneta PAVI', price: 200, icon: <Music className="w-5 h-5" /> },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#f5f5f7] flex flex-col items-center justify-center z-50 text-[#1d1d1f] font-sans">
        <div className="flex flex-col items-center max-w-sm text-center">
          <Shield className="w-16 h-16 text-[#0066cc] mb-6 animate-pulse" strokeWidth={1.5} />
          <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] mb-2">Banco Central</h2>
          <p className="text-[#86868b] text-lg font-medium animate-pulse mb-8">{loadingText}</p>

          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#0066cc] rounded-full animate-[load_4.5s_cubic-bezier(0.16,1,0.3,1)_forwards]"></div>
          </div>
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
        `}} />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
            <div className="w-16 h-16 bg-[#f5f5f7] rounded-full mx-auto flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-[#1d1d1f]" strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-2 tracking-tight">Acceso Restringido</h2>
            <p className="text-[#86868b] mb-8 text-sm font-medium">Bóveda del Banco Central</p>

            <form onSubmit={handlePinSubmit}>
              <div className="relative mb-8">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.toUpperCase())}
                  placeholder="Código"
                  className={`w-full bg-[#f5f5f7] border ${pinError ? 'border-red-500 text-red-500' : 'border-transparent text-[#1d1d1f] focus:border-[#0066cc] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,102,204,0.1)]'} rounded-2xl px-6 py-4 text-center font-mono text-xl tracking-[0.5em] outline-none transition-all placeholder:tracking-normal placeholder:font-sans placeholder:text-[#86868b]/60`}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066cc] hover:bg-[#0077ed] text-white font-medium py-4 rounded-2xl transition-all active:scale-[0.98]"
              >
                Desbloquear
              </button>
            </form>
          </div>

          <div className="mt-8 text-center flex items-center justify-center gap-2 text-[#86868b] text-xs font-medium">
            <AlertTriangle className="w-4 h-4" /> Uso exclusivo de Administración
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#0066cc] selection:text-white font-sans overflow-x-hidden">

      {/* 1. HERO SECTION (Apple Style) */}
      <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[#1d1d1f] text-xs font-semibold uppercase tracking-wider mb-8">
            <Shield className="w-3.5 h-3.5" /> Economía Oficial
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-[#1d1d1f] mb-6 tracking-tighter">
            Banco Central.
          </h1>
          <p className="text-2xl md:text-3xl text-[#86868b] mb-12 max-w-3xl mx-auto font-medium leading-tight">
            La moneda exclusiva de PAVIMUN. Gana recompensas, invierte inteligentemente y canjea en La Tiendita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#duty-free" className="px-8 py-4 bg-[#0066cc] hover:bg-[#0077ed] text-white rounded-full font-medium transition-all flex items-center gap-2 text-lg">
              La Tiendita <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#galeria" className="px-8 py-4 text-[#0066cc] hover:text-[#0077ed] rounded-full font-medium transition-all flex items-center gap-2 text-lg hover:bg-[#0066cc]/5">
              Conoce los Billetes <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Floating Banknote */}
        <div className="w-full max-w-2xl mx-auto mt-20 relative perspective-1000">
          <div className="w-full aspect-[2/1] relative transform-gpu rotate-x-[20deg] animate-[float_6s_ease-in-out_infinite] drop-shadow-2xl">
            <img src="/images/pavi/s.webp" alt="100 PAVI" className="w-full h-full object-contain filter contrast-105" />
          </div>
        </div>
      </section>

      {/* 2. CÓMO FUNCIONA */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] mb-6 tracking-tight">El Ciclo Económico.</h2>
            <p className="text-[#86868b] max-w-2xl mx-auto text-xl font-medium">Entiende el flujo de capital dentro de las instalaciones.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#f5f5f7] p-10 rounded-[2rem] transition-all hover:scale-[1.02] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-8 text-[#1d1d1f]">
                <Handshake className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">1. Gana.</h3>
              <p className="text-[#86868b] leading-relaxed font-medium text-lg">
                Demuestra diplomacia exquisita, ayuda a otros delegados o supera nuestros Desafíos Estrelámpago para ser recompensado con PAVIs físicos por el Staff.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f5f5f7] p-10 rounded-[2rem] transition-all hover:scale-[1.02] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-8 text-[#0066cc]">
                <TrendingUp className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">2. Invierte.</h3>
              <p className="text-[#86868b] leading-relaxed font-medium text-lg">
                Dirígete a la Feria de Inversiones durante los recesos. Apuesta contra la casa u otros delegados en juegos de habilidad para multiplicar tus fondos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f5f5f7] p-10 rounded-[2rem] transition-all hover:scale-[1.02] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-8 text-[#1d1d1f]">
                <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">3. Disfruta.</h3>
              <p className="text-[#86868b] leading-relaxed font-medium text-lg">
                Acércate a La Tiendita. Canjea tus billetes acumulados por caramelos, snacks, o mercancía oficial exclusiva. ¡Tú decides el beneficio!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LA TIENDITA (Catálogo) */}
      <section id="duty-free" className="py-32 bg-[#f5f5f7] relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] mb-4 tracking-tight">La Tiendita.</h2>
            <p className="text-[#86868b] text-xl font-medium">Catálogo Oficial de Recompensas</p>
          </div>

          <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="space-y-2">
              {dutyFreeItems.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 hover:bg-[#f5f5f7] rounded-2xl transition-colors group border-b border-black/5 last:border-0">
                  <div className="flex items-center gap-5 mb-4 sm:mb-0">
                    <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center text-[#1d1d1f] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-[#1d1d1f]">{item.name}</h4>
                  </div>
                  <div className="flex items-baseline gap-2 bg-[#f5f5f7] sm:bg-transparent px-4 sm:px-0 py-2 sm:py-0 rounded-full">
                    <span className="text-2xl font-bold text-[#1d1d1f]">{item.price}</span>
                    <span className="text-sm text-[#86868b] font-semibold tracking-wider">PAVI</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[#86868b] mt-10 font-medium text-sm px-6">
            * Productos físicos sujetos a disponibilidad. Precios sujetos a inflación del evento.
          </p>
        </div>
      </section>

      {/* 4. GALERÍA NUMISMÁTICA (Los Billetes) */}
      <section id="galeria" className="py-32 bg-white border-t border-black/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold text-[#1d1d1f] mb-6 tracking-tight">Reserva Histórica.</h2>
            <p className="text-[#86868b] max-w-2xl mx-auto text-xl font-medium">
              Conoce el diseño y las medidas de seguridad de las 8 denominaciones oficiales.
              <br /><span className="text-sm font-semibold mt-4 inline-block px-4 py-2 bg-[#f5f5f7] rounded-full">Toca o pasa el cursor para ver el reverso.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {banknotes.map((note) => (
              <div key={note.denom} className="flex flex-col items-center group perspective-1000">
                {/* 3D Flip Container */}
                <div className="relative w-full aspect-[1/1.5] max-w-[280px] transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 drop-shadow-xl hover:drop-shadow-2xl hover:-translate-y-2">

                  {/* Front of Banknote */}
                  <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-white border border-black/5">
                    <img src={note.front} alt={`${note.denom} PAVI Front`} className="w-full h-full object-cover" loading="lazy" />
                  </div>

                  {/* Back of Banknote */}
                  <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-[#f5f5f7] border border-black/10 rotate-y-180">
                    <img src={note.back} alt={`${note.denom} PAVI Back`} className="w-full h-full object-cover" loading="lazy" />
                  </div>

                </div>

                {/* Text Desc */}
                <div className="mt-8 text-center px-4 w-full">
                  <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                    {note.denom} <span className="text-[#86868b] text-xl font-semibold">PAVI</span>
                  </h3>
                  {note.character && (
                    <p className="text-xs text-[#0066cc] mt-2 uppercase font-bold tracking-widest bg-[#0066cc]/5 inline-block px-3 py-1 rounded-full">EDICIÓN {note.character}</p>
                  )}
                  <p className="mt-5 text-[15px] text-[#86868b] font-medium leading-relaxed max-w-[250px] mx-auto opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {note.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER OFICIAL / DISCLAIMER */}
      <footer className="bg-[#f5f5f7] text-[#1d1d1f] py-12 border-t border-black/5">
        <div className="container mx-auto px-6 flex flex-col items-center text-center max-w-3xl">
          <AlertTriangle className="w-8 h-8 text-[#1d1d1f]/40 mb-6" />
          <p className="text-sm text-[#86868b] font-medium leading-relaxed mb-8">
            La moneda PAVI no tiene valor financiero legal en el mundo real. Es de uso exclusivo para dinámicas recreativas dentro de las instalaciones del Colegio Pablo VI. La falsificación resultará en inhabilitación.
          </p>
          <div className="text-xs font-semibold text-[#1d1d1f]/60 tracking-wider uppercase">
            Mesa Organizadora PAVIMUN
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Banco;
