import { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, ChevronDown, Clock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();

  const [welcomeDone, setWelcomeDone] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [calendarRevealed, setCalendarRevealed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Easter Egg States
  const [isReversing, setIsReversing] = useState(false);
  const [fakeYear, setFakeYear] = useState(2025);
  const [easterEggMsg, setEasterEggMsg] = useState('');

  // Countdown timer to March 20, 2026
  const getTimeLeft = useCallback(() => {
    const target = new Date('2026-03-20T08:00:00').getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    // @ts-ignore
    let timer: NodeJS.Timeout;

    if (isReversing) {
      // Easter egg crazy countdown
      timer = setInterval(() => {
        setTimeLeft({
          days: Math.floor(Math.random() * 999),
          hours: Math.floor(Math.random() * 24),
          minutes: Math.floor(Math.random() * 60),
          seconds: Math.floor(Math.random() * 60),
        });
        setFakeYear(prev => {
          if (prev <= 1986) return 1986;
          return prev - Math.floor(Math.random() * 5);
        });
      }, 50);

      // Stop after 3 seconds
      setTimeout(() => {
        setIsReversing(false);
        setFakeYear(2025);
        setEasterEggMsg('El tiempo es relativo. La diplomacia es absoluta.');

        // Clear the message after a while
        setTimeout(() => setEasterEggMsg(''), 4000);
      }, 3000);

    } else {
      // Normal countdown
      timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    }

    return () => clearInterval(timer);
  }, [getTimeLeft, isReversing]);

  // Welcome splash sequence
  useEffect(() => {
    const t1 = setTimeout(() => setCalendarRevealed(true), 800);
    const t2 = setTimeout(() => setWelcomeDone(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Auto-cycle active day
  useEffect(() => {
    if (!calendarRevealed) return;
    const interval = setInterval(() => {
      setActiveDay(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [calendarRevealed]);

  const days = [
    { num: '20', label: 'Viernes', desc: 'Ceremonia de Apertura' },
    { num: '21', label: 'Sábado', desc: 'Sesiones de Debate' },
    { num: '22', label: 'Domingo', desc: 'Clausura y Premiación' },
  ];

  return (
    <div className="min-h-screen">
      {/* ====== WELCOME OVERLAY ====== */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${welcomeDone ? 'opacity-0' : 'opacity-100'
          }`}
      >
        <div className={`flex flex-col items-center transition-all duration-600 ${welcomeDone ? 'scale-110 opacity-0' : calendarRevealed ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
          <img
            src="/images/pavimun-logo.jpg"
            alt="PAVIMUN"
            className="w-28 h-28 object-contain mb-4"
          />
          <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#1a237e]/40 to-transparent" />
        </div>
      </div>

      {/* ====== HERO SECTION — Horizontal Layout ====== */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden pb-24">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(26,35,126,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 75% 40%, rgba(46,125,50,0.04) 0%, transparent 60%), linear-gradient(135deg, #fafbff 0%, #f5f7ff 50%, #ffffff 100%)',
          }}
        />
        {/* Decorative blur orbs */}
        <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-[#1a237e]/[0.03] rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-[#2e7d32]/[0.03] rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Floating decoration photos on the sides */}
        <div className={`absolute top-[12%] left-[3%] w-32 h-40 md:w-40 md:h-48 rounded-2xl overflow-hidden shadow-xl opacity-0 transition-all duration-1000 delay-700 ${welcomeDone ? 'opacity-40 translate-y-0 rotate-[-6deg]' : 'translate-y-8 rotate-0'}`}>
          <img src="/images/g1.jpeg" alt="" className="w-full h-full object-cover object-[center_top]" />
        </div>
        <div className={`absolute bottom-[18%] left-[6%] w-28 h-36 md:w-36 md:h-44 rounded-2xl overflow-hidden shadow-xl opacity-0 transition-all duration-1000 delay-900 ${welcomeDone ? 'opacity-35 translate-y-0 rotate-[4deg]' : 'translate-y-8 rotate-0'}`}>
          <img src="/images/g2.jpeg" alt="" className="w-full h-full object-cover object-[center_top]" />
        </div>
        <div className={`absolute top-[15%] right-[4%] w-28 h-36 md:w-36 md:h-44 rounded-2xl overflow-hidden shadow-xl opacity-0 transition-all duration-1000 delay-1100 ${welcomeDone ? 'opacity-35 translate-y-0 rotate-[8deg]' : 'translate-y-8 rotate-0'}`}>
          <img src="/images/g3.jpeg" alt="" className="w-full h-full object-cover object-[center_top]" />
        </div>
        <div className={`absolute bottom-[22%] right-[5%] w-32 h-40 md:w-40 md:h-48 rounded-2xl overflow-hidden shadow-xl opacity-0 transition-all duration-1000 delay-1300 ${welcomeDone ? 'opacity-40 translate-y-0 rotate-[-5deg]' : 'translate-y-8 rotate-0'}`}>
          <img src="/images/g4.jpeg" alt="" className="w-full h-full object-cover object-[center_top]" />
        </div>

        <div className="pavi-container w-full relative z-10 mt-12 md:mt-0">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 xl:gap-28">

            {/* LEFT — Logo */}
            <div className={`flex-shrink-0 flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${welcomeDone ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}>
              <div className="relative group">
                {/* Glow behind logo */}
                <div className="absolute -inset-8 bg-gradient-to-br from-[#1a237e]/[0.06] to-[#2e7d32]/[0.04] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src="/images/pavimun-logo.jpg"
                  style={{ maxHeight: '320px' }}
                  alt="PAVIMUN Logo"
                  className="relative w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* === SECTOR BADGE === */}
              <div className="mt-8 relative group cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative px-4 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-[#1a237e] to-[#2e7d32] rounded-full text-center border border-white/20 shadow-lg hover:scale-105 transition-transform max-w-[280px] md:max-w-[340px] mx-auto">
                  <p className="text-white font-bold text-[10px] md:text-[11px] tracking-wider uppercase leading-snug">
                    Los hombres del mañana serán lo que se haga con los jóvenes de hoy
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT — Interactive Calendar */}
            <div className={`flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${welcomeDone ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
              <div
                className="relative rounded-[32px] p-8 md:p-10 overflow-hidden min-w-[320px] md:min-w-[400px]"
                style={{
                  background: 'linear-gradient(145deg, rgba(26,35,126,0.95) 0%, rgba(13,22,66,0.98) 100%)',
                  boxShadow: '0 30px 80px rgba(26,35,126,0.3), 0 10px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {/* Glass reflection */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent rounded-t-[32px]" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <Calendar className="w-5 h-5 text-[#4fc3f7]" />
                    <span className="text-[#4fc3f7] font-bold text-xs md:text-[11px] uppercase tracking-[0.25em]">
                      I Edición · Marzo 2025
                    </span>
                  </div>

                  {/* Day Cards — Interactive */}
                  <div className="flex items-stretch justify-center gap-4 mb-8">
                    {days.map((day, i) => (
                      <button
                        key={day.num}
                        onClick={() => setActiveDay(i)}
                        className={`relative rounded-2xl px-5 py-4 md:px-7 md:py-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col items-center gap-1 ${activeDay === i
                          ? 'bg-[#2e7d32] scale-110 shadow-xl shadow-green-900/30 z-10'
                          : 'bg-white/[0.07] hover:bg-white/[0.12] hover:scale-105'
                          }`}
                      >
                        <span className={`text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300 ${activeDay === i ? 'text-green-200' : 'text-white/30'
                          }`}>
                          {day.label}
                        </span>
                        <span className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                          {day.num}
                        </span>
                        {/* Active indicator dot */}
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeDay === i ? 'bg-white scale-100 opacity-100' : 'bg-white scale-0 opacity-0'
                          }`} />
                      </button>
                    ))}
                  </div>

                  {/* Month Label */}
                  <p className="text-center text-lg md:text-xl font-bold text-white/90 tracking-[0.1em] mb-4">
                    DE MARZO
                  </p>

                  {/* Active Day Description — Dynamic */}
                  <div className="border-t border-white/[0.06] pt-5">
                    <div className="min-h-[48px] flex flex-col items-center justify-center">
                      <p
                        key={activeDay}
                        className="text-center text-sm text-white/50 font-medium mb-1"
                        style={{ animation: 'fadeInUp 0.4s ease-out forwards' }}
                      >
                        {days[activeDay].desc}
                      </p>
                      <p className="text-center text-base md:text-lg text-[#81c784] font-medium italic">
                        Save the date
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${welcomeDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <div className="flex flex-col items-center gap-2 text-gray-300">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Descubre más</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ====== COUNTDOWN SECTION ====== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #0d1349 12%, #0d1349 88%, #ffffff 100%)' }} />

        <div className="pavi-container relative z-10">
          <div className="reveal flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#4fc3f7]" />
              <span className="text-[#4fc3f7] text-xs font-bold tracking-[0.3em] uppercase">Cuenta Regresiva</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4 tracking-tight">
              {isReversing ? `Año ${fakeYear}` : 'Faltan'}
            </h2>
            <p className="text-white/40 text-sm mb-12 tracking-wide">
              {easterEggMsg || 'para la I Edición de PAVIMUN'}
            </p>

            <div
              className={`flex items-center gap-3 md:gap-6 transition-transform duration-100 ${isReversing ? 'blur-[1px] scale-95 opacity-50' : ''}`}
              onDoubleClick={() => {
                if (!isReversing) setIsReversing(true);
              }}
            >
              {[
                { value: timeLeft.days, label: 'Días' },
                { value: timeLeft.hours, label: 'Horas' },
                { value: timeLeft.minutes, label: 'Minutos' },
                { value: timeLeft.seconds, label: 'Segundos' },
              ].map((unit, i) => (
                <div key={unit.label} className="flex flex-col items-center gap-3">
                  <div
                    className="relative w-16 h-20 md:w-24 md:h-28 rounded-xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg, rgba(26,35,126,0.95) 0%, rgba(13,22,66,0.98) 100%)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                    }}
                  >
                    {/* Top half highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/[0.04] rounded-t-xl" />
                    {/* Center line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30 z-10" />
                    {/* Number */}
                    <div className="relative z-5 w-full h-full flex items-center justify-center">
                      <span
                        key={unit.value}
                        className="text-3xl md:text-5xl font-extrabold text-white tabular-nums tracking-tight"
                        style={{ animation: 'flip-in 0.3s ease-out' }}
                      >
                        {String(unit.value).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <span className="text-white/40 text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase">{unit.label}</span>
                  {/* Separator colon */}
                  {i < 3 && (
                    <div className="absolute hidden md:flex" style={{ position: 'relative', marginTop: '-52px' }}>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Date reminder */}
            <div className="mt-12 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
              <p className="text-white/60 text-sm font-medium tracking-wide">
                📅 20 de Marzo, 2025 — <span className="text-[#81c784]">¡Prepárate!</span>
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes flip-in {
            0% { transform: scaleY(0.7) translateY(-4px); opacity: 0.5; }
            100% { transform: scaleY(1) translateY(0); opacity: 1; }
          }
        `}</style>
      </section>

      {/* ====== PHOTO GALLERY STRIP ====== */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f4ff 50%, #ffffff 100%)' }} />

        <div className="pavi-container">
          <div className="reveal flex items-center justify-center gap-3 mb-10">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#1a237e]/30" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a237e]/50">
              Momentos PAVIMUN
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#1a237e]/30" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { src: '/images/g1.jpeg', label: '' },
              { src: '/images/g2.jpeg', label: '' },
              { src: '/images/g3.jpeg', label: '' },
              { src: '/images/g4.jpeg', label: '' },
            ].map((photo, i) => (
              <div
                key={i}
                className="reveal group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <img
                  src={photo.src}
                  alt={`PAVIMUN momento ${i + 1}`}
                  className="w-full h-full object-cover object-[center_top] transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a237e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Decorative corner accent */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/0 group-hover:border-white/50 transition-all duration-500 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/0 group-hover:border-white/50 transition-all duration-500 rounded-bl-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ¿QUIÉNES SOMOS? SECTION ====== */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 30%, #f0f4ff 50%, #f8f9ff 70%, #ffffff 100%)' }} />

        <div className="pavi-container">
          <div className="max-w-5xl mx-auto">
            {/* Section Label */}
            <div className="reveal flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#1a237e]/30" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#1a237e]/50">
                Nuestra Historia
              </span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#1a237e]/30" />
            </div>

            {/* Title */}
            <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-16 tracking-[-0.03em]" style={{ transitionDelay: '0.1s' }}>
              <span className="gradient-text">¿Quiénes somos?</span>
            </h2>

            {/* Content Grid — Horizontal */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
              {/* Text Content — 3 cols */}
              <div className="lg:col-span-3 space-y-6">
                <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                  <div className="p-7 md:p-9 rounded-3xl bg-white/70 backdrop-blur-sm border border-black/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                    <p className="text-base md:text-lg text-gray-600 leading-[1.85]">
                      El Modelo de Naciones Unidas (MUN) en el Colegio Pablo VI, denominado PAVIMUN,
                      surgió como una iniciativa de la Directora Profesora Nancy Viscido y la Sub-Directora Licenciada Hermana Liuha Ching
                      en el año escolar 2023/2024.
                    </p>
                  </div>
                </div>

                <div className="reveal" style={{ transitionDelay: '0.3s' }}>
                  <div className="p-7 md:p-9 rounded-3xl bg-white/70 backdrop-blur-sm border border-black/[0.04] shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                    <p className="text-base md:text-lg text-gray-600 leading-[1.85]">
                      Inicialmente se seleccionaron a 6 estudiantes para dar inicio al proyecto. Desde entonces, se han incorporado más representantes, con ahora PAVIMUN formando parte recurrente del circuito larense.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image — 2 cols */}
              <div className="reveal-right lg:col-span-2" style={{ transitionDelay: '0.35s' }}>
                <div className="relative group">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#1a237e]/10 to-[#2e7d32]/10 rounded-[28px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
                    <img
                      src="/images/grupo-jovenes.jpg"
                      alt="Primeros delegados de PAVIMUN"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm font-medium">
                        Primeros delegados de PAVIMUN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SCHOOL FOOTER ====== */}
      <section className="pavi-container pb-20">
        <div className="reveal flex flex-col items-center justify-center gap-5">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#1a237e]/15 to-transparent" />
          <img
            src="/images/colegio-logo.jpg"
            alt="Colegio Pablo VI"
            className="h-16 w-auto object-contain opacity-40 transition-all duration-500 hover:opacity-70 hover:scale-105"
          />
          <p className="text-[#1a237e]/50 font-semibold text-center text-sm tracking-[0.05em]">
            U.E. Colegio Pablo VI
          </p>
          <p className="text-gray-300 text-xs text-center tracking-[0.15em] uppercase">
            Bondad · Ciencia · Paz
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
