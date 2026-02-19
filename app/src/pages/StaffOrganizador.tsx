import { useScrollReveal } from '../hooks/useScrollReveal';
import { User, Award, Briefcase, Star, Users } from 'lucide-react';

interface StaffMember {
  cargo: string;
  nombre: string;
  icon?: any;
}

const staffMembers: StaffMember[] = [
  { cargo: 'Secretario General', nombre: 'José España', icon: Star },
  { cargo: 'Secretario General Adjunto', nombre: 'Ángel Terán', icon: Star },
  { cargo: 'Secretario Académico', nombre: 'Raúl Aveledo', icon: Award },
  { cargo: 'Secretario de Finanzas', nombre: 'Mathias Martínez', icon: Briefcase },
  { cargo: 'Secretario de Logística', nombre: 'Aarón Machado', icon: Users },
  { cargo: 'Sub-Secretaria de Logística', nombre: 'Marcela Vargas', icon: Users },
  { cargo: 'Secretaria de Publicidad', nombre: 'Diana Grateron', icon: Award },
  { cargo: 'Sub-Secretaria de Publicidad', nombre: 'Oriana Bernal', icon: Award },
  { cargo: 'Faculty Advisor', nombre: 'Luis "Chicho" Castillo', icon: Brain },
];

import { Brain } from 'lucide-react';

const StaffOrganizador = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-neutral-50 pavi-container pavi-section selection:bg-[#2e7d32]/20 selection:text-[#1b5e20]">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(#2e7d32 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block p-4 rounded-full bg-white shadow-lg mb-8 animate-fade-in-scale">
            <img
              src="/images/pavimun-logo.jpg"
              alt="PAVIMUN Logo"
              className="h-24 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1b5e20] mb-4 tracking-tight uppercase">
            Staff Organizador
          </h1>
          <div className="w-24 h-1 bg-[#2e7d32] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            El equipo detrás de la <span className="text-[#2e7d32] font-bold">I Edición de PAVIMUN</span>.
            Líderes comprometidos con la excelencia académica.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((member, index) => {
            const Icon = member.icon || User;
            const isLeader = index < 2; // Highlight Leaders

            return (
              <div
                key={index}
                className={`reveal group relative bg-white rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${isLeader ? 'border-2 border-[#2e7d32]/20 shadow-xl shadow-[#2e7d32]/10' : 'border border-gray-100 shadow-md hover:shadow-lg'}`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-24 h-24 text-[#2e7d32]" />
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isLeader ? 'bg-[#2e7d32] text-white' : 'bg-[#e8f5e9] text-[#2e7d32]'}`}>
                    <span className="font-bold text-lg">{member.nombre.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2e7d32] transition-colors leading-tight mb-1">
                      {member.nombre}
                    </h3>
                    <div className="inline-block px-2 py-1 bg-gray-50 rounded text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {member.cargo}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Quote */}
        <div className="reveal mt-20 text-center opacity-70" style={{ transitionDelay: '0.6s' }}>
          <p className="font-serif italic text-gray-500">
            "El liderazgo es la capacidad de transformar la visión en realidad."
          </p>
        </div>

      </div>
    </div>
  );
};

export default StaffOrganizador;
