import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(false);
    const prevPath = useRef(location.pathname);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (location.pathname !== prevPath.current) {
            prevPath.current = location.pathname;
            setIsAnimating(true);

            // Reset animation after it completes
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [location.pathname]);

    return (
        <>
            {/* Page content with fade-in animation */}
            <div
                ref={contentRef}
                key={location.pathname}
                className="animate-pageEnter"
            >
                {children}
            </div>

            {/* Wipe overlay */}
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
