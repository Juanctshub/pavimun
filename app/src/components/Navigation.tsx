import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/que-es-mun', label: '¿Qué es el MUN?' },
    { path: '/staff', label: 'Staff Organizador' },
    { path: '/matrices', label: 'Matrices' },
    { path: '/inscripciones', label: 'Inscripciones' },
    { path: '/reglamentos', label: 'Reglamentos' },
    { path: '/galeria', label: 'Galería' },
  ];

  const committees = [
    { path: '/corte', label: 'Corte' },
    { path: '/investigacion', label: 'Investigación' },
    { path: '/crisis', label: 'Crisis' },
    { path: '/cia', label: 'CIA' },
    { path: '/consejo-seguridad', label: 'Consejo de Seguridad' },
    { path: '/oiea', label: 'OIEA' },
    { path: '/prensa', label: 'Prensa' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Logic for conditional coloring on "Transparent Header" pages
  // These pages start with a transparent header that turns white on scroll.
  // When at the top (transparent), text/icons should be WHITE.
  // When scrolled (white bg), text/icons should be BLUE.
  // When menu is OPEN (white bg), text/icons should be BLUE.
  const isTransparentPage = location.pathname === '/investigacion' || location.pathname === '/crisis' || location.pathname === '/cia' || location.pathname === '/consejo-seguridad' || location.pathname === '/oiea' || location.pathname === '/prensa';

  const forceWhite = isTransparentPage && !scrolled && !isOpen;

  // Dynamic classes
  const textColorClass = forceWhite ? 'text-white' : 'text-[#1a237e]';
  const iconColorClass = forceWhite ? 'text-white' : 'text-[#1a237e]';
  const burgerBgClass = forceWhite ? 'bg-white' : 'bg-[#1a237e]';
  const burgerHoverClass = forceWhite ? 'hover:bg-white/10' : 'hover:bg-black/[0.04]';

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled || isOpen
          ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
          }`}
        style={{
          borderBottom: scrolled
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid transparent',
        }}
      >
        <div className="pavi-container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <div
              className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 active:scale-[0.97] cursor-pointer"
              onClick={() => {
                setIsBlackout(true);
                setTimeout(() => setIsBlackout(false), 5000);
              }}
            >
              <img
                src="/images/pavimun-logo.jpg"
                alt="PAVIMUN"
                className="h-11 w-auto object-contain"
              />
              <span className={`hidden sm:block text-sm font-bold tracking-tight transition-colors duration-500 ${textColorClass}`}>
                PAVIMUN
              </span>
            </div>

            {/* Right side — Instagram + Menu */}
            <div className="flex items-center gap-1.5">
              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/pavimun_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group hover:bg-[#E1306C]/[0.08] active:bg-[#E1306C]/[0.12]"
                aria-label="Instagram de PAVIMUN"
              >
                <svg
                  className={`w-[18px] h-[18px] transition-colors duration-500 group-hover:text-[#E1306C] ${iconColorClass}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${burgerHoverClass}`}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col items-center justify-center w-5 h-4 relative">
                  <span
                    className={`absolute w-5 h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-45 top-[7px] bg-[#1a237e]' : `top-[1px] ${burgerBgClass}`}`}
                  />
                  <span
                    className={`absolute w-5 h-[1.5px] rounded-full transition-all duration-300 top-[7px] ${isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'} ${burgerBgClass}`}
                  />
                  <span
                    className={`absolute w-5 h-[1.5px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? '-rotate-45 top-[7px] bg-[#1a237e]' : `top-[13px] ${burgerBgClass}`}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
        style={{ top: '72px' }}
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-white/[0.97] backdrop-blur-2xl transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        />

        {/* Content */}
        <div className="relative h-full overflow-y-auto pb-20">
          <div className="pavi-container py-8 max-w-lg mx-auto">
            {/* Main nav items */}
            <nav className="flex flex-col gap-0.5 mb-8">
              {menuItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-semibold py-3.5 px-6 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    } ${isActive(item.path)
                      ? 'text-white bg-[#1a237e]'
                      : 'text-[#1a237e] hover:bg-[#1a237e]/[0.05]'
                    }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 30 + 50}ms` : '0ms',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div
              className={`h-[1px] bg-gradient-to-r from-transparent via-[#1a237e]/10 to-transparent mx-6 mb-6 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
            />

            {/* Committees label */}
            <p
              className={`text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 px-6 mb-3 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ transitionDelay: isOpen ? '320ms' : '0ms' }}
            >
              Comités
            </p>

            {/* Committee items */}
            <nav className="flex flex-col gap-0.5">
              {committees.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-3 px-6 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    } ${isActive(item.path)
                      ? 'text-white bg-[#2e7d32]'
                      : 'text-[#1a237e]/70 hover:bg-[#1a237e]/[0.04]'
                    }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 30 + 340}ms` : '0ms',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Footer Info */}
            <div
              className={`mt-12 pt-8 text-center transition-all duration-700 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              style={{ transitionDelay: isOpen ? '600ms' : '0ms' }}
            >
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#1a237e]/10 to-transparent mb-8" />
              <img
                src="/images/colegio-logo.jpg"
                alt="Colegio Pablo VI"
                className="h-12 w-auto mx-auto object-contain mb-3 opacity-40"
              />
              <p className="text-[#1a237e]/50 font-semibold text-xs tracking-[0.05em] transition-colors hover:text-[#1a237e]">
                <a href="https://maps.app.goo.gl/3tWigGfbmtbGNmFk7" target="_blank" rel="noopener noreferrer" title="Ubicación Secreta">
                  10°01'42.1"N 69°20'43.0"W
                </a>
              </p>
              <p className="text-gray-300 text-[10px] mt-1 tracking-[0.15em] uppercase">
                PAVIMUN · I Edición
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EASTER EGG: Extreme Blackout */}
      <div
        className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ${isBlackout ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <p className="text-white text-sm md:text-base font-mono tracking-widest text-center px-6">
          Apagaste la luz. Acabas de provocar un apagón internacional.<br />
          <span className="text-gray-500 text-xs mt-4 block animate-pulse">Reconectando sistemas en 5 segundos...</span>
        </p>
      </div>
    </>
  );
};

export default Navigation;
