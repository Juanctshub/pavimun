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
const Galeria = lazy(() => import('./pages/Galeria'));
const Corte = lazy(() => import('./pages/Corte'));
const Investigacion = lazy(() => import('./pages/Investigacion'));
const Crisis = lazy(() => import('./pages/Crisis'));
const CIA = lazy(() => import('./pages/CIA'));
const ConsejoSeguridad = lazy(() => import('./pages/ConsejoSeguridad'));
const OIEA = lazy(() => import('./pages/OIEA'));
const Prensa = lazy(() => import('./pages/Prensa'));
const MinistryOfTruth = lazy(() => import('./pages/MinistryOfTruth'));
const Banco = lazy(() => import('./pages/Banco'));
const MesaConsejo = lazy(() => import('./pages/MesaConsejo'));
const MesaInvestigacion = lazy(() => import('./pages/MesaInvestigacion'));
const MesaCorte = lazy(() => import('./pages/MesaCorte'));
const MesaCrisis = lazy(() => import('./pages/MesaCrisis'));
const MesaPrensa = lazy(() => import('./pages/MesaPrensa'));



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
  const transparentNavPaths = ['/crisis', '/cia', '/consejo-seguridad', '/investigacion', '/oiea', '/prensa', '/banco'];
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
              <Route path="/que-es-mun" element={<PageTransition><QueEsMUN /></PageTransition>} />
              <Route path="/staff" element={<PageTransition><StaffOrganizador /></PageTransition>} />
              <Route path="/matrices" element={<PageTransition><Matrices /></PageTransition>} />
              <Route path="/inscripciones" element={<PageTransition><Inscripciones /></PageTransition>} />
              <Route path="/reglamentos" element={<PageTransition><Reglamentos /></PageTransition>} />
              <Route path="/galeria" element={<PageTransition><Galeria /></PageTransition>} />
              <Route path="/corte" element={<PageTransition><Corte /></PageTransition>} />
              <Route path="/corte/mesa" element={<PageTransition><MesaCorte /></PageTransition>} />
              <Route path="/investigacion" element={<PageTransition><Investigacion /></PageTransition>} />
              <Route path="/investigacion/mesa" element={<PageTransition><MesaInvestigacion /></PageTransition>} />
              <Route path="/crisis" element={<PageTransition><Crisis /></PageTransition>} />
              <Route path="/crisis/mesa" element={<PageTransition><MesaCrisis /></PageTransition>} />
              <Route path="/cia" element={<PageTransition><CIA /></PageTransition>} />
              <Route path="/consejo-seguridad" element={<PageTransition><ConsejoSeguridad /></PageTransition>} />
              <Route path="/consejo-seguridad/mesa" element={<PageTransition><MesaConsejo /></PageTransition>} />
              <Route path="/oiea" element={<PageTransition><OIEA /></PageTransition>} />
              <Route path="/prensa" element={<PageTransition><Prensa /></PageTransition>} />
              <Route path="/prensa/mesa" element={<PageTransition><MesaPrensa /></PageTransition>} />
              <Route path="/banco" element={<PageTransition><Banco /></PageTransition>} />
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
