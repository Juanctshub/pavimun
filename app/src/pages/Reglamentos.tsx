import { FileText, BookOpen, Shirt, ExternalLink, Download, Lock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Reglamento {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
  color: string; // Tailwind class prefix, e.g., 'blue'
  link: string;
  locked?: boolean;
}

const reglamentos: Reglamento[] = [
  {
    titulo: 'Reglamento General',
    descripcion: 'Normas y procedimientos generales aplicables a todos los participantes.',
    icono: <FileText className="w-8 h-8" />,
    color: 'indigo',
    link: 'https://drive.google.com/drive/folders/1BVEfwLKn5NYR0kK81SVBkLaDOGx5KTF4',
  },
  {
    titulo: 'Código de Vestimenta',
    descripcion: 'Guía visual y normativa sobre el dress code western business requerido.',
    icono: <Shirt className="w-8 h-8" />,
    color: 'emerald',
    link: 'https://drive.google.com/drive/folders/1d9y8b46Vxz_RSBIcupm-cTZv7LbVSHcx',
  },
  {
    titulo: 'Documentos Sustanciales',
    descripcion: 'Guías académicas, background papers y material de preparación por comité.',
    icono: <BookOpen className="w-8 h-8" />,
    color: 'sky',
    link: 'https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph',
  },
];

const Reglamentos = () => {
  useScrollReveal();

  const getColorClasses = (color: string) => {
    const map: Record<string, string> = {
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:border-indigo-300',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-300',
      sky: 'bg-sky-50 text-sky-600 border-sky-100 hover:border-sky-300',
    };
    return map[color] || map.indigo;
  };

  return (
    <div className="min-h-screen bg-white pavi-section">
      <div className="pavi-container max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 animate-fade-in-up">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Centro de<br />Documentación</h1>
            <p className="text-xl text-gray-500 max-w-lg">
              Accede a toda la normativa y material académico oficial para tu preparación en PAVIMUN.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100 text-amber-700 text-sm font-semibold">
              <span>📅 Disponible desde el 9 de Marzo</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reglamentos.map((item, index) => {
            const colors = getColorClasses(item.color);

            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal group relative p-8 rounded-[2rem] border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${colors}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5" />
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icono}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-inherit transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 font-medium">
                  {item.descripcion}
                </p>

                <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                  <span>Ver Archivos</span>
                  <div className="h-px flex-grow bg-current opacity-30"></div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Mobile Date Note */}
        <div className="mt-12 text-center md:hidden animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-amber-50 rounded-full border border-amber-100 text-amber-700 text-sm font-semibold">
            📅 Disponible desde el 9 de Marzo
          </span>
        </div>

      </div>
    </div>
  );
};

export default Reglamentos;
