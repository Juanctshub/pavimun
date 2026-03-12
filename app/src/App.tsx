import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import GlobalMusicPlayer from './components/GlobalMusicPlayer';
import SplashScreen from './components/SplashScreen';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import QueEsMUN from './pages/QueEsMUN';
import StaffOrganizador from './pages/StaffOrganizador';
import Matrices from './pages/Matrices';
import Inscripciones from './pages/Inscripciones';
import Reglamentos from './pages/Reglamentos';
import Galeria from './pages/Galeria';
import Corte from './pages/Corte';
import Investigacion from './pages/Investigacion';
import Crisis from './pages/Crisis';
import CIA from './pages/CIA';
import ConsejoSeguridad from './pages/ConsejoSeguridad';
import OIEA from './pages/OIEA';
import Prensa from './pages/Prensa';
import MinistryOfTruth from './pages/MinistryOfTruth';
import Banco from './pages/Banco';

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
      <main className={`transition-all duration-500 ease-in-out ${hideNavSpacing ? "" : "pt-[72px]"}`}>
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
            <Route path="/investigacion" element={<PageTransition><Investigacion /></PageTransition>} />
            <Route path="/crisis" element={<PageTransition><Crisis /></PageTransition>} />
            <Route path="/cia" element={<PageTransition><CIA /></PageTransition>} />
            <Route path="/consejo-seguridad" element={<PageTransition><ConsejoSeguridad /></PageTransition>} />
            <Route path="/oiea" element={<PageTransition><OIEA /></PageTransition>} />
            <Route path="/prensa" element={<PageTransition><Prensa /></PageTransition>} />
            <Route path="/banco" element={<PageTransition><Banco /></PageTransition>} />
            <Route path="*" element={<PageTransition><MinistryOfTruth /></PageTransition>} />
          </Routes>
        </AnimatePresence>
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
