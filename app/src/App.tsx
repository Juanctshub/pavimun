import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import GlobalMusicPlayer from './components/GlobalMusicPlayer';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';

// Eagerly load Home (first page users see)
import Home from './pages/Home';

// Lazy load all other pages for code splitting & faster initial load
const QueEsMUN = lazy(() => import('./pages/QueEsMUN'));
const StaffOrganizador = lazy(() => import('./pages/StaffOrganizador'));
const Matrices = lazy(() => import('./pages/Matrices'));
const Inscripciones = lazy(() => import('./pages/Inscripciones'));
const Reglamentos = lazy(() => import('./pages/Reglamentos'));
const Baremos = lazy(() => import('./pages/Baremos'));
const Galeria = lazy(() => import('./pages/Galeria'));
const Corte = lazy(() => import('./pages/Corte'));
const Investigacion = lazy(() => import('./pages/Investigacion'));
const Crisis = lazy(() => import('./pages/Crisis'));
const CIA = lazy(() => import('./pages/CIA'));
const ConsejoSeguridad = lazy(() => import('./pages/ConsejoSeguridad'));
const OIEA = lazy(() => import('./pages/OIEA'));
const Prensa = lazy(() => import('./pages/Prensa'));
const MinistryOfTruth = lazy(() => import('./pages/MinistryOfTruth'));
const MesaConsejo = lazy(() => import('./pages/MesaConsejo'));
const MesaInvestigacion = lazy(() => import('./pages/MesaInvestigacion'));
const MesaCorte = lazy(() => import('./pages/MesaCorte'));
const MesaCrisis = lazy(() => import('./pages/MesaCrisis'));
const MesaPrensa = lazy(() => import('./pages/MesaPrensa'));
const MesaCIA = lazy(() => import('./pages/MesaCIA'));
const MesaOIEA = lazy(() => import('./pages/MesaOIEA'));
const ArchiveFirstEdition = lazy(() => import('./pages/ArchiveFirstEdition'));



function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [hideNavSpacing, setHideNavSpacing] = useState(false);

  // Pages where the nav is transparent/overlaid — no top padding needed
  const transparentNavPaths = ['/i-edicion/crisis', '/i-edicion/cia', '/i-edicion/consejo-seguridad', '/i-edicion/investigacion', '/i-edicion/oiea', '/i-edicion/prensa'];
  const isOverlaidNav = transparentNavPaths.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

  useEffect(() => {
    const handleHide = () => setHideNavSpacing(true);
    const handleShow = () => setHideNavSpacing(false);
    
    window.addEventListener('hide-nav', handleHide);
    window.addEventListener('show-nav', handleShow);
    
    return () => {
      window.removeEventListener('hide-nav', handleHide);
      window.removeEventListener('show-nav', handleShow);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navigation />
      <GlobalMusicPlayer />
      <main className={`transition-all duration-500 ease-in-out ${hideNavSpacing || isOverlaidNav ? "" : "pt-[72px]"} ${isOverlaidNav ? "bg-[#050505]" : ""}`}>
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/i-edicion" element={<PageTransition><ArchiveFirstEdition /></PageTransition>} />
              <Route path="/i-edicion/que-es-mun" element={<PageTransition><QueEsMUN /></PageTransition>} />
              <Route path="/i-edicion/staff" element={<PageTransition><StaffOrganizador /></PageTransition>} />
              <Route path="/i-edicion/matrices" element={<PageTransition><Matrices /></PageTransition>} />
              <Route path="/i-edicion/inscripciones" element={<PageTransition><Inscripciones /></PageTransition>} />
              <Route path="/i-edicion/reglamentos" element={<PageTransition><Reglamentos /></PageTransition>} />
              <Route path="/i-edicion/baremos" element={<PageTransition><Baremos /></PageTransition>} />
              <Route path="/i-edicion/galeria" element={<PageTransition><Galeria /></PageTransition>} />
              <Route path="/i-edicion/corte" element={<PageTransition><Corte /></PageTransition>} />
              <Route path="/i-edicion/corte/mesa" element={<PageTransition><MesaCorte /></PageTransition>} />
              <Route path="/i-edicion/investigacion" element={<PageTransition><Investigacion /></PageTransition>} />
              <Route path="/i-edicion/investigacion/mesa" element={<PageTransition><MesaInvestigacion /></PageTransition>} />
              <Route path="/i-edicion/crisis" element={<PageTransition><Crisis /></PageTransition>} />
              <Route path="/i-edicion/crisis/mesa" element={<PageTransition><MesaCrisis /></PageTransition>} />
              <Route path="/i-edicion/cia" element={<PageTransition><CIA /></PageTransition>} />
              <Route path="/i-edicion/cia/mesa" element={<PageTransition><MesaCIA /></PageTransition>} />
              <Route path="/i-edicion/consejo-seguridad" element={<PageTransition><ConsejoSeguridad /></PageTransition>} />
              <Route path="/i-edicion/consejo-seguridad/mesa" element={<PageTransition><MesaConsejo /></PageTransition>} />
              <Route path="/i-edicion/oiea" element={<PageTransition><OIEA /></PageTransition>} />
              <Route path="/i-edicion/oiea/mesa" element={<PageTransition><MesaOIEA /></PageTransition>} />
              <Route path="/i-edicion/prensa" element={<PageTransition><Prensa /></PageTransition>} />
              <Route path="/i-edicion/prensa/mesa" element={<PageTransition><MesaPrensa /></PageTransition>} />
              <Route path="*" element={<PageTransition><MinistryOfTruth /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <Router>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`w-full overflow-x-hidden min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white ${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
