import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <GlobalMusicPlayer />
      <main className="pt-[72px]">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/que-es-mun" element={<QueEsMUN />} />
            <Route path="/staff" element={<StaffOrganizador />} />
            <Route path="/matrices" element={<Matrices />} />
            <Route path="/inscripciones" element={<Inscripciones />} />
            <Route path="/reglamentos" element={<Reglamentos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/corte" element={<Corte />} />
            <Route path="/investigacion" element={<Investigacion />} />
            <Route path="/crisis" element={<Crisis />} />
            <Route path="/cia" element={<CIA />} />
            <Route path="/consejo-seguridad" element={<ConsejoSeguridad />} />
            <Route path="/oiea" element={<OIEA />} />
            <Route path="/prensa" element={<Prensa />} />
          </Routes>
        </PageTransition>
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
