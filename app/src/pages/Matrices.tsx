import { ExternalLink, Grid3X3, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Matrices = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1d1d1f] font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="pavi-container max-w-5xl mx-auto py-28 md:py-32">

        {/* Header - Apple Style Typography */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter mb-6 text-[#1d1d1f]">
            Matrices.
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-[#86868b] max-w-2xl mx-auto leading-tight">
            Distribución oficial de países y cargos para la I Edición.
          </p>
        </div>

        {/* Hero Card - Glassmorphism & Depth */}
        <div className="reveal relative bg-white rounded-[40px] p-8 md:p-16 shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden border border-white/50 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] group">

          {/* Background Blurs */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-[80px] opacity-70 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-100/50 rounded-full blur-[80px] opacity-70 group-hover:scale-110 transition-transform duration-1000"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

            {/* Content Side */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full backdrop-blur-md">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Documento Vivo</span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">
                Tu lugar en el debate.
              </h2>
              <p className="text-lg text-[#86868b] leading-relaxed font-medium">
                Consulta la disponibilidad en tiempo real. Este documento se actualiza constantemente conforme avanza el proceso de inscripción.
              </p>

              <a
                href="https://www.canva.com/design/DAHANoFjxgw/k66DIBvDqLArKMBaWWOnYw/edit?utm_content=DAHANoFjxgw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:bg-[#0077ed] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
              >
                <span>Ver Matrices Oficiales</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Visual Side - Abstract Representation */}
            <div className="relative flex justify-center items-center">
              {/* Floating Cards Visualization */}
              <div className="relative w-64 h-80 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center -rotate-6 transition-transform duration-700 group-hover:-rotate-3 group-hover:-translate-y-4">
                <Grid3X3 className="w-16 h-16 text-blue-500 mb-4" />
                <span className="font-bold text-gray-900">Asignaciones</span>
                <div className="w-32 h-1 bg-gray-100 rounded-full mt-4"></div>
                <div className="w-24 h-1 bg-gray-100 rounded-full mt-2"></div>
              </div>

              <div className="absolute w-64 h-80 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 flex flex-col items-center justify-center rotate-6 translate-x-4 translate-y-4 -z-10 transition-transform duration-700 group-hover:rotate-12 group-hover:translate-x-8">
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid - Clean Tiles */}
        <div className="grid md:grid-cols-1 gap-6 mt-8 max-w-2xl mx-auto">
          <div className="reveal bg-white p-8 rounded-[30px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:shadow-lg transition-shadow duration-300" style={{ transitionDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-orange-600">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">Importante</h3>
              <p className="text-[#86868b] font-medium text-sm">Revisa tu asignación periódicamente. Los cupos son limitados y dinámicos.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Matrices;
