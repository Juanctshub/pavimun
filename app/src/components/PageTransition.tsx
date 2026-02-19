import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

// Committee pages have their own loading screens — skip transitions for them
const COMMITTEE_ROUTES = ['/corte', '/investigacion', '/crisis', '/cia', '/consejo-seguridad', '/oiea', '/prensa'];

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(false);
    const prevPath = useRef(location.pathname);
    const isCommittee = COMMITTEE_ROUTES.includes(location.pathname);

    useEffect(() => {
        if (location.pathname !== prevPath.current) {
            const wasCommittee = COMMITTEE_ROUTES.includes(prevPath.current);
            prevPath.current = location.pathname;

            // Skip transition if going TO or FROM a committee page
            if (isCommittee || wasCommittee) return;

            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [location.pathname, isCommittee]);

    // Committee pages: render without any animation wrapper
    if (isCommittee) {
        return <>{children}</>;
    }

    return (
        <>
            <div
                key={location.pathname}
                className="animate-pageEnter"
            >
                {children}
            </div>

            {/* Wipe overlay — only for non-committee pages */}
            <div
                className={`fixed inset-0 z-[100] pointer-events-none ${isAnimating ? 'animate-wipeThrough' : 'opacity-0'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #050a1a 0%, #1a237e 50%, #0d1349 100%)',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/15 text-sm font-black tracking-[0.4em] uppercase">PAVIMUN</span>
                </div>
            </div>

            <style>{`
        @keyframes pageEnter {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes wipeThrough {
          0% { transform: translateX(-100%); opacity: 1; }
          40% { transform: translateX(0%); opacity: 1; }
          60% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 1; }
        }
        .animate-pageEnter {
          animation: pageEnter 0.4s ease-out both;
        }
        .animate-wipeThrough {
          animation: wipeThrough 0.6s cubic-bezier(0.77, 0, 0.175, 1) both;
        }
      `}</style>
        </>
    );
};

export default PageTransition;
