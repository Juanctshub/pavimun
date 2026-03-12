import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const MesaConsejo = () => {
  // Manejo de la visibilidad global de la navbar por contexto de "página inmersiva oscura"
  // Aunque Navigation lo hace automático, para evitar saltos raros forzamos el bg negro base.
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const authorities = [
    {
      role: 'Presidente de Mesa',
      name: 'Flavia Pérez',
      age: '15 años',
      image: '/images/mesas/consejo/flavia.jpeg',
      bio: '¡Saludos delegados! Soy Flavia Pérez y en esta oportunidad fungiré como su Presidente de mesa. Tengo 15 años y he participado activamente en el MUN desde hace 3 años y medio, donde incursioné en modelos a nivel regional y nacional, siendo reconocida con diversos méritos a lo largo de mi desarrollo como delegada y mesa directiva.\n\nMe fascinan los buenos debates y soy una amante de la redacción, además que soy una fiel creyente de que la diplomacia y los valores sí pueden cambiar el mundo.\n\n¡Nos vemos pronto!',
    },
    {
      role: 'Vice-Presidenta de Mesa',
      name: 'María Claudia Oropeza',
      alias: 'Cay',
      image: '/images/mesas/consejo/maria.jpeg',
      bio: '¡Hola! Soy María Claudia Oropeza, aunque algunos me conocen como Cay. Mi trayectoria comenzó en 2024 y pertenezco a CLFMUN, desde entonces, esta experiencia me ha brindado herramientas invaluables como la oratoria, el conocimiento a las problemas mundiales y el liderazgo.\n\nAl asumir por segunda vez el rol de mesa directiva, me entusiasma el crecimiento que este reto representa tanto para mí como para ustedes. Los invito a dar su máximo esfuerzo en cada sesión, este es el espacio ideal para descubrir talentos ocultos, aprender a resolver conflictos complejos y forjar las habilidades necesarias para ser los agentes de cambio que el futuro exige.\n\n¡Bienvenidos a PAVIMUN 1era EDICIÓN! ♥️🥰',
    }
  ];

  return (
    <div className="min-h-screen bg-[#070303] text-gray-200 font-sans selection:bg-red-900/50 selection:text-white relative overflow-hidden pb-32">
      
      {/* Background Gritty Texture & Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-screen" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-red-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a0505] to-transparent" />
        {/* Subtle red scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 lg:pt-40">
        
        {/* Header Setup */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-red-900/40 pb-8"
        >
          <div>
            <Link 
              to="/consejo-seguridad" 
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-mono text-sm tracking-widest mb-6 transition-colors uppercase group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retornar al Comité
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="w-8 h-8 text-red-600" />
              <span className="text-red-600 font-mono tracking-[0.3em] font-bold text-sm">EXPEDIENTE CLASIFICADO</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              Directorio <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Oficial</span>
            </h1>
          </div>
          
          <div className="text-right font-mono text-xs text-red-900/80 uppercase">
            <p>Access Level: Director</p>
            <p>ID: UNSC-PAVIMUN-26</p>
          </div>
        </motion.div>

        {/* Profiles Stream */}
        <div className="space-y-24">
          {authorities.map((auth, idx) => (
            <motion.div 
              key={auth.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Abstract decorative line behind each profile */}
              <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red-600/50 via-red-900/10 to-transparent" />
              
              <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-stretch">
                
                {/* Image Section - Military / Dossier Style */}
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/10 border border-red-900/50 rounded transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                  <div className="relative aspect-[3/4] bg-[#1a0505] p-2 border border-red-900/30 overflow-hidden rounded">
                    {/* Targeting reticle effect on hover */}
                    <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/50 transition-colors duration-500 z-20 m-4" />
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <img 
                      src={auth.image} 
                      alt={auth.name}
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                    />
                    
                    {/* Classification overlay text */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-3 border-t border-red-900/50">
                      <p className="font-mono text-[10px] text-red-500 tracking-widest uppercase text-center">Identity Verified</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center py-4">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-900/20 border border-red-900/50 text-red-400 font-mono text-xs uppercase tracking-widest mb-4">
                      <Award className="w-3 h-3" />
                      {auth.role}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">
                      {auth.name}
                    </h2>
                    {auth.alias && (
                      <p className="font-mono text-gray-500 text-sm tracking-[0.2em] mb-1">
                        A.K.A. "{auth.alias}"
                      </p>
                    )}
                    {auth.age && (
                      <p className="font-mono text-gray-500 text-sm tracking-[0.2em]">
                        {auth.age}
                      </p>
                    )}
                  </div>

                  <div className="prose prose-invert prose-red max-w-none">
                    {auth.bio.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-400 leading-relaxed text-lg mb-4 text-justify">
                        {pIdx === 0 && <span className="text-red-500 font-bold text-2xl float-left mr-2 leading-none mt-1">{paragraph.charAt(0)}</span>}
                        {pIdx === 0 ? paragraph.substring(1) : paragraph}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="mt-32 border-t border-red-900/30 pt-8 flex items-center justify-between text-red-900/50 font-mono text-xs">
          <span>// END OF FILE</span>
          <span>UNSC.DB.2026.1</span>
        </div>

      </div>
    </div>
  );
};

export default MesaConsejo;
