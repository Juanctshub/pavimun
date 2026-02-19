import { useScrollReveal } from '../hooks/useScrollReveal';
import { Globe, Users, Brain, Gavel, Scale, MessageCircle, FileEdit, Search } from 'lucide-react';

const QueEsMUN = () => {
  useScrollReveal();

  const skills = [
    { emoji: <MessageCircle className="w-8 h-8 text-blue-600" />, title: 'Oratoria' },
    { emoji: <Users className="w-8 h-8 text-green-600" />, title: 'Negociación' },
    { emoji: <FileEdit className="w-8 h-8 text-purple-600" />, title: 'Redacción' },
    { emoji: <Search className="w-8 h-8 text-orange-600" />, title: 'Investigación' },
    { emoji: <Globe className="w-8 h-8 text-indigo-600" />, title: 'Diplomacia' },
    { emoji: <Brain className="w-8 h-8 text-pink-600" />, title: 'Pensamiento Crítico' },
    { emoji: <Users className="w-8 h-8 text-teal-600" />, title: 'Liderazgo' },
    { emoji: <Scale className="w-8 h-8 text-red-600" />, title: 'Resolución de Conflictos' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden selection:bg-blue-100 selection:text-blue-900">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#1a237e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="pavi-container text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Logo with Glow */}
            <div className="relative flex justify-center mb-12 animate-fade-in-scale group">
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src="/images/onu-logo.png"
                alt="ONU Logo"
                className="relative w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105 hover:rotate-2"
              />
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-[#1a237e] via-[#0d47a1] to-[#1565c0]"
              style={{ animationDelay: '0.15s' }}
            >
              ¿Qué es el MUN?
            </h1>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-semibold tracking-widest uppercase">
                Modelo de Naciones Unidas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pavi-container pb-32 relative z-10">
        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Main Description Card */}
            <div className="reveal col-span-2 md:col-span-1 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50 hover:border-blue-100 transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a237e] mb-4">Simulación Académica</h3>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                El Modelo de Naciones Unidas (MUN) es una simulación académica donde los estudiantes asumen el papel de diplomáticos representando a los diversos estados miembros de las Naciones Unidas.
              </p>
            </div>

            {/* Secondary Description Card */}
            <div className="reveal col-span-2 md:col-span-1 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50 hover:border-blue-100 transition-all duration-500 hover:-translate-y-1" style={{ transitionDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Gavel className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a237e] mb-4">Debate Global</h3>
              <p className="text-lg text-gray-600 leading-relaxed text-justify">
                A través de la deliberación y negociación, los participantes abordan problemas reales del mundo como la paz internacional, los derechos humanos y el desarrollo sostenible.
              </p>
            </div>

            {/* Full Width Card */}
            <div className="reveal col-span-2 bg-gradient-to-br from-[#1a237e] to-[#283593] p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Globe className="w-64 h-64" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-3xl font-bold mb-6">Formando Ciudadanos Globales</h3>
                <p className="text-xl opacity-90 leading-relaxed">
                  Este ejercicio académico fomenta el análisis crítico, la investigación profunda y la comprensión de la política internacional, preparando a los jóvenes para ser ciudadanos informados y comprometidos con la construcción de un mundo más justo.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="reveal mb-16 text-center" style={{ transitionDelay: '0.3s' }}>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Crecimiento Personal</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a237e] tracking-tight">
              Competencias que desarrollarás
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="reveal group flex flex-col items-center p-8 bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10 cursor-default relative overflow-hidden"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                  {skill.emoji}
                </div>
                <span className="relative z-10 font-bold text-gray-800 text-center leading-tight group-hover:text-blue-700 transition-colors">
                  {skill.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QueEsMUN;
