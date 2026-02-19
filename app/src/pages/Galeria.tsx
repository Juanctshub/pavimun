import { Camera, ExternalLink, ImageIcon, Image, Lock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Galeria = () => {
  useScrollReveal();

  const previewItems = [
    { label: 'Ceremonia de Apertura', color: 'bg-blue-100' },
    { label: 'Debate General', color: 'bg-purple-100' },
    { label: 'Delegaciones', color: 'bg-rose-100' },
    { label: 'Clausura', color: 'bg-emerald-100' },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white pavi-section selection:bg-pink-500/30">
      <div className="pavi-container max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter opacity-10">
            MEMORIES
          </h1>
          <div className="-mt-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Galería Oficial
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              I Edición PAVIMUN 2026
            </p>
          </div>
        </div>

        {/* Feature Box */}
        <div className="reveal relative bg-neutral-800/50 rounded-[3rem] border border-white/10 p-8 md:p-16 mb-24 overflow-hidden text-center group">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] group-hover:bg-pink-600/20 transition-colors duration-1000"></div>

          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Repositorio Fotográfico</h3>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Todas las fotografías oficiales del evento serán cargadas en alta resolución en nuestra carpeta compartida.
            </p>

            <a
              href="https://drive.google.com/drive/folders/1onzuJZKGlvdTmqjoAng7eA8EaPC7lHX_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
              <span>Ver Carpeta en Drive</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Contenido disponible post-evento</span>
            </div>
          </div>
        </div>

        {/* Masonry Preview Placeholder */}
        <div className="reveal">
          <h3 className="text-center text-gray-500 uppercase tracking-widest text-sm font-bold mb-8">
            Próximamente
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64 md:h-96">
            {previewItems.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-3xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500 ${i % 2 === 0 ? 'mt-8' : ''}`}
              >
                <div className={`absolute inset-0 opacity-10 ${item.color}`}></div>
                <div className="absolute inset-0 bg-neutral-800 opacity-50"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <Image className="w-8 h-8 text-gray-600 mb-2 opacity-50" />
                  <span className="text-xs font-bold text-gray-500 uppercase">{item.label}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-xs font-bold text-white">Pronto</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Galeria;
