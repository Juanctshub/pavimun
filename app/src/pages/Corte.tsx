import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronRight, FileText, Scale, X } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   CORTE — Jeffrey Epstein Case (2019)
   PAVIMUN Judicial Committee
   Exact U.S. Department of Justice (DOJ) Aesthetic
   ═══════════════════════════════════════════════════════════ */

// ═══ LOADING: GOOGLE SEARCH → CRT OFF ═══
const GoogleIntro = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState('');
  const targetText = 'jeffrey epstein';

  // 0: Initial empty search bar
  // 1: Typing
  // 2: Done typing, wait
  // 3: Search button clicked / loading state
  // 4: TV static flash
  // 5: CRT shrink to line
  // 6: Done

  useEffect(() => {
    // Typing effect
    if (phase === 1) {
      if (typedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, Math.random() * 80 + 70); // random typing speed
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase(2), 600);
      }
    }
  }, [phase, typedText]);

  useEffect(() => {
    // Initial start
    const t0 = setTimeout(() => setPhase(1), 1000);
    return () => clearTimeout(t0);
  }, []);

  useEffect(() => {
    // Phases after typing
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 500);
      return () => clearTimeout(t);
    }
    if (phase === 3) {
      const t = setTimeout(() => setPhase(4), 1200);
      return () => clearTimeout(t);
    }
    if (phase === 4) {
      const t = setTimeout(() => setPhase(5), 300);
      return () => clearTimeout(t);
    }
    if (phase === 5) {
      const t = setTimeout(() => setPhase(6), 500);
      return () => clearTimeout(t);
    }
    if (phase === 6) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center overflow-hidden">

      {/* CRT Frame (invisible until phase 4, then wraps everything) */}
      <div className={`relative w-full h-full flex flex-col items-center pt-[20vh] transition-all bg-white`}
        style={{
          width: phase >= 5 ? '80vw' : '100%',
          height: phase >= 5 ? (phase >= 6 ? '0px' : '3px') : '100%',
          maxHeight: phase >= 5 ? '600px' : 'none',
          backgroundColor: phase >= 5 ? '#000' : '#fff',
          boxShadow: phase >= 5 ? '0 0 100px rgba(255,255,255,0.8)' : 'none',
          transition: phase >= 5 ? 'height 0.4s cubic-bezier(0.8,0,1,1), width 0.3s' : 'none',
          opacity: phase >= 6 ? 0 : 1,
          overflow: 'hidden'
        }}
      >

        {/* Only show Google stuff before TV dies */}
        {phase < 4 && (
          <div className="w-full max-w-[584px] px-5 flex flex-col items-center animate-fade-in">
            {/* Fake Google Logo */}
            <div className="text-7xl font-sans font-medium mb-8 tracking-tighter select-none">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>

            {/* Search Bar */}
            <div className={`w-full h-12 rounded-full border border-gray-200 hover:shadow-md focus-within:shadow-md flex items-center px-4 transition-shadow ${phase === 3 ? 'shadow-md shadow-blue-100 border-blue-200' : ''}`}>
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <div className="flex-1 text-base text-gray-800 outline-none font-sans relative flex items-center">
                <span>{typedText}</span>
                {phase <= 2 && (
                  <span className="w-[1px] h-5 bg-black animate-pulse opacity-70 ml-[1px]" />
                )}
              </div>
              {typedText.length > 0 && phase < 3 && <X className="w-5 h-5 text-gray-400 cursor-pointer" />}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <div className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm text-[#3c4043] rounded cursor-default select-none">
                Buscar con Google
              </div>
              <div className="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm px-4 py-2 text-sm text-[#3c4043] rounded cursor-default select-none">
                Voy a tener suerte
              </div>
            </div>

            {/* Loading state bar below search */}
            {phase === 3 && (
              <div className="w-full mt-4 h-1 bg-blue-50 overflow-hidden rounded relative">
                <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-blue-500 rounded animate-[slide_1s_infinite_ease-in-out]" />
              </div>
            )}
          </div>
        )}

        {/* Phase 4: Static Flash */}
        {phase === 4 && (
          <div className="absolute inset-0 z-50 bg-white">
            <div className="w-full h-full opacity-60"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
            />
          </div>
        )}

      </div>

      <style>{`
        @keyframes slide {
          0% { left: -30%; width: 30%; }
          50% { width: 50%; }
          100% { left: 100%; width: 30%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ═══ MAIN PAGE (DOJ AESTHETIC) ═══
const Corte = () => {
  const [loading, setLoading] = useState(true);

  // DOJ Official Font: Public Sans or Arial for body, Merriweather/Georgia for headers.
  // We'll use system UI for sans, and Georgia for serif.

  const handleDone = useCallback(() => {
    setLoading(false);
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <GoogleIntro onDone={handleDone} />;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#002244] selection:text-white">

      {/* ── Official US Gov Banner ── */}
      <div className="bg-[#1b1b1b] text-white py-1.5 px-4 md:px-8 text-[11px] flex items-center gap-3">
        <span className="text-xl">🇺🇸</span>
        <span className="opacity-90">An official website of the United States government</span>
        <span className="opacity-70 flex items-center gap-1 cursor-pointer hover:underline ml-2">
          Here's how you know <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* ── DOJ Header ── */}
      <header className="bg-[#002244] text-white border-b-4 border-[#cf102d]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Fake DOJ Seal using an icon since we don't have the explicit seal image */}
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-amber-500/80 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <Scale className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl md:text-[28px] font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                THE UNITED STATES DEPARTMENT OF JUSTICE
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm font-semibold tracking-wider">
            <span className="hover:underline cursor-pointer">AGENCIES</span>
            <span className="hover:underline cursor-pointer">RESOURCES</span>
            <span className="hover:underline cursor-pointer">NEWS</span>
            <span className="hover:underline cursor-pointer">CAREERS</span>
            <div className="h-6 w-[1px] bg-white/30 mx-2" />
            <Search className="w-5 h-5 cursor-pointer hover:text-amber-400 transition-colors" />
          </div>
        </div>

        {/* Sub-nav banner */}
        <div className="bg-[#f0f0f0] border-t border-gray-300">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex">
            <div className="bg-white px-6 py-3 border-r border-gray-300 border-l border-t-2 border-t-[#002244] text-[#002244] font-bold text-sm tracking-wide">
              JUSTICE.GOV
            </div>
          </div>
        </div>
      </header>

      {/* ── Breadcrumbs ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-3 text-sm text-[#005ea2]">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="mx-2 text-gray-500">»</span>
          <span className="hover:underline cursor-pointer">Office of Public Affairs</span>
          <span className="mx-2 text-gray-500">»</span>
          <span className="hover:underline cursor-pointer">News</span>
          <span className="mx-2 text-gray-500">»</span>
          <span className="text-gray-600">Press Releases</span>
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <main className="max-w-[1200px] mx-auto px-4 lg:px-8 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left Column (Content) */}
        <section className="lg:col-span-8">

          <p className="text-[#002244] font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            U.S. Attorney's Office, Southern District of New York
          </p>

          <h2 className="text-3xl md:text-5xl text-[#1a1a1a] mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Financier Jeffrey Epstein Indicted For Sex Trafficking Of Minors
          </h2>

          <div className="text-base text-gray-700 mb-8 border-y border-gray-200 py-3 font-semibold">
            FOR IMMEDIATE RELEASE <span className="mx-3 font-normal text-gray-300">|</span> Monday, July 8, 2019
          </div>

          {/* DOJ Preserves the Spanish text from previous versions as requested */}
          <article className="prose prose-lg max-w-none prose-p:text-[#1a1a1a] prose-p:leading-[1.8] prose-p:mb-6" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>

            <p className="font-bold">
              NUEVA YORK – Geoffrey S. Berman, Fiscal Federal para el Distrito Sur de Nueva York,
              anunció hoy la apertura de una carpeta de investigación y el desvelamiento de una
              acusación formal (<em className="font-normal italic">Indictment</em>) contra JEFFREY EPSTEIN.
            </p>

            <p>
              En julio de 2019, el Distrito Sur de Nueva York abrió una investigación formal contra
              Jeffrey Epstein, financista estadounidense, relacionada con presuntas actividades
              de tráfico sexual de menores y conspiración. La investigación busca determinar el alcance
              de una supuesta red que involucra a miembros prominentes de la sociedad.
            </p>

            <h3 className="text-2xl font-bold text-[#002244] mt-10 mb-4 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Summary of Allegations (Resumen de Presuntos Cargos)
            </h3>

            <p>
              El proceso se centra en determinar la veracidad de múltiples acusaciones recopiladas por las agencias federales.
              Hasta el momento, <strong>no se ha emitido veredicto alguno</strong> y aplica la presunción de inocencia.
              Los cargos bajo investigación (Case No. 19-CR-490) incluyen:
            </p>

            <ul className="list-disc pl-6 space-y-4 my-6 text-[#1a1a1a]">
              <li><strong>Tráfico Sexual:</strong> Se investiga el presunto reclutamiento y transporte de menores para explotación.</li>
              <li><strong>Conspiración:</strong> Presunta coordinación de una empresa criminal organizada y red de facilitadores.</li>
              <li><strong>Lavado de Activos:</strong> Supuesta ocultación de fondos mediante estructuras y entidades offshore.</li>
              <li><strong>Obstrucción a la Justicia:</strong> Presunta manipulación de testigos y destrucción potencial de evidencia.</li>
            </ul>

            <h3 className="text-2xl font-bold text-[#002244] mt-10 mb-4 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              The Network and Compromising Material
            </h3>

            <p>
              Los memorandos desclasificados y las fotografías adjuntas (ver barra lateral de Componentes y Evidencia)
              sugieren supuestas conexiones entre el imputado y figuras de poder, incluyendo políticos y ejecutivos corporativos.
              Las imágenes documentadas, marcadas como "Exhibits", ilustran la vida social que Epstein mantenía
              mientras presuntamente operaba dicha red.
            </p>

            <div className="bg-[#f1f1f1] border-l-4 border-[#002244] p-6 my-8">
              <p className="mb-0 font-bold text-[#002244] uppercase tracking-wide text-sm">Nota del Comité (PAVIMUN)</p>
              <p className="mb-0 mt-2 text-sm italic">
                "Este comité simula los procedimientos de una corte federal. Los delegados asumirán roles de fiscalía,
                defensa, jueces y miembros del jurado. El desafío principal es determinar si se puede investigar a individuos
                amparados por altos niveles de influencia y poder. Ustedes definirán el rumbo del caso."
              </p>
            </div>

            <p>
              Las leyes establecen penas máximas severas para estos presuntos crímenes; sin embargo,
              la condena final recaerá sobre las pruebas presentadas ante el Gran Jurado y este tribunal.
            </p>

            <p className="text-sm mt-12 mb-2">
              The charges contained in the indictment are merely allegations, and the defendant is presumed
              innocent unless and until proven guilty.
            </p>
          </article>
        </section>

        {/* Right Column (Sidebar / Components) */}
        <aside className="lg:col-span-4 space-y-8">

          {/* Component: Downloads / Topic */}
          <div className="bg-[#f1f1f1] p-6 border-t-4 border-[#002244]">
            <h3 className="text-lg font-bold text-[#002244] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Attachment(s):
            </h3>

            <div className="space-y-4">
              <a href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0 group-hover:underline" />
                <div>
                  <p className="text-[#005ea2] font-semibold text-sm group-hover:underline leading-tight">Guía Académica.pdf</p>
                  <p className="text-xs text-gray-500 mt-1">Download (PAVIMUN Dossier)</p>
                </div>
              </a>

              <a href="https://drive.google.com/drive/folders/15EEgAIyok3wvsRYzb8JAwvCqfBk0ctxo" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group">
                <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0 group-hover:underline" />
                <div>
                  <p className="text-[#005ea2] font-semibold text-sm group-hover:underline leading-tight">Reglamento.pdf</p>
                  <p className="text-xs text-gray-500 mt-1">Download (Procedural Rules)</p>
                </div>
              </a>
            </div>
          </div>

          {/* Component: Exhibits */}
          <div className="border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-5 border-b border-gray-200 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Court Exhibits (2019 Archive)
            </h3>

            <div className="space-y-6">
              {/* Image 1 */}
              <div>
                <a href="/images/donald.jpg" target="_blank" className="block border border-gray-300 hover:shadow-md transition-shadow">
                  <img src="/images/donald.jpg" alt="Exhibit A" className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all" />
                </a>
                <p className="text-xs text-gray-600 mt-2 font-semibold">Exhibit A - Photographic Log 78-B</p>
                <p className="text-[11px] text-gray-500">Documented associations under review.</p>
              </div>

              {/* Image 2 (Winni Poh) */}
              <div>
                <a href="/images/winni-poh.webp" target="_blank" className="block border border-gray-300 hover:shadow-md transition-shadow">
                  <img src="/images/winni-poh.webp" alt="Exhibit B" className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all" />
                </a>
                <p className="text-xs text-gray-600 mt-2 font-semibold">Exhibit B - Seized Evidence</p>
                <p className="text-[11px] text-gray-500">Material found executing a search warrant.</p>
              </div>

              {/* Image 3 */}
              <div>
                <a href="/images/donald2.jpg" target="_blank" className="block border border-gray-300 hover:shadow-md transition-shadow">
                  <img src="/images/donald2.jpg" alt="Exhibit C" className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all" />
                </a>
                <p className="text-xs text-gray-600 mt-2 font-semibold">Exhibit C - Social Roster</p>
                <p className="text-[11px] text-gray-500">Photographic evidence of inner circle.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#002244] text-white p-6 mt-8">
            <h4 className="font-bold text-sm mb-2" style={{ fontFamily: 'Georgia, serif' }}>Topic</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/20">Human Trafficking</span>
              <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/20">Corruption</span>
            </div>

            <h4 className="font-bold text-sm mb-2 mt-6" style={{ fontFamily: 'Georgia, serif' }}>Component</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white/10 px-3 py-1 rounded-sm text-xs border border-white/20">USAO - New York, Southern</span>
            </div>
          </div>

        </aside>

      </main>

      {/* ── DOJ Footer Area ── */}
      <footer className="bg-[#1b1b1b] text-white mt-12 py-16">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Scale className="w-12 h-12 text-gray-400 mb-4" />
            <p className="font-bold mb-2">U.S. Department of Justice</p>
            <p className="text-sm text-gray-400">950 Pennsylvania Avenue, NW</p>
            <p className="text-sm text-gray-400">Washington, DC 20530-0001</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">About</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">The Attorney General</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">DOJ Agencies</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Budget & Performance</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">Resources</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Forms</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Publications</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Information Quality</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-bold mb-4">Policies</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Legal Policies & Disclaimers</p>
            <p className="text-gray-400 hover:text-white cursor-pointer">Accessibility</p>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-xs text-gray-500 text-center">
          <p>PAVIMUN Educational Simulation. Not an official government record.</p>
        </div>
      </footer>

    </div>
  );
};

export default Corte;
