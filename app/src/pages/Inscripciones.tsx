import { ArrowRight, Calendar, Check } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Inscripciones = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="pavi-container max-w-6xl mx-auto py-24">

        {/* Header Title */}
        <div className="mb-20 animate-fade-in-up text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-[#1d1d1f]">
            Inscripciones.
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-[#86868b] max-w-2xl leading-tight">
            Reserva tu lugar en la I Edición de PAVIMUN.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Col: The "Event Pass" Card */}
          <div className="reveal relative bg-white rounded-[40px] shadow-2xl shadow-indigo-900/10 overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative p-10 md:p-14 flex flex-col h-full justify-between min-h-[500px]">
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold tracking-wide uppercase mb-8">
                  Formulario Oficial
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                  Tu delegación te espera.
                </h2>
                <p className="text-lg text-[#86868b] font-medium leading-relaxed mb-10 max-w-sm">
                  Completa tus datos, selecciona tus comités de preferencia y prepárate para la experiencia.
                </p>
              </div>

              <div>
                <a
                  href="https://forms.gle/Nthq5QE9Ekffz6vp6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn w-full flex items-center justify-between bg-[#1d1d1f] hover:bg-[#2d2d2f] text-white p-6 rounded-3xl transition-all duration-300"
                >
                  <span className="text-xl font-bold pl-2">Inscribirme ahora</span>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </a>
                <p className="text-center text-xs text-gray-400 mt-4 font-medium">
                  Se abrirá un formulario de Google externo
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: Details & Dates */}
          <div className="space-y-8 flex flex-col justify-center h-full pt-8 lg:pt-0">

            {/* Dates Block */}
            <div className="reveal bg-white p-10 rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100/50" style={{ transitionDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f]">Fechas</h3>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl md:text-5xl font-black text-[#1d1d1f] tracking-tighter">20, 21 y 22</span>
                <span className="text-2xl font-semibold text-[#86868b] ml-1">de Marzo</span>
              </div>
              <p className="text-[#86868b] font-medium text-lg border-t border-gray-100 pt-4 mt-4">
                Tres días de debate intenso, negociación y diplomacia de alto nivel.
              </p>
            </div>

            {/* Requirements Block */}
            <div className="reveal bg-white p-10 rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100/50" style={{ transitionDelay: '0.2s' }}>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-6">Antes de empezar</h3>
              <ul className="space-y-5">
                {[
                  "Lee el Reglamento General",
                  "Consulta las Matrices disponibles",
                  "Prepara tu código de vestimenta"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600 stroke-[3]" />
                    </div>
                    <span className="text-[#424245] font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Inscripciones;
