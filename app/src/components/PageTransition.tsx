import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [stage, setStage] = useState<'visible' | 'exiting' | 'entering'>('visible');
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            // Start exit: overlay wipes in
            setStage('exiting');

            const timer1 = setTimeout(() => {
                // Swap content at peak of overlay
                setDisplayLocation(location);
                setStage('entering');
            }, 400);

            const timer2 = setTimeout(() => {
                // Overlay wipes out
                setStage('visible');
            }, 800);

            return () => { clearTimeout(timer1); clearTimeout(timer2); };
        }
    }, [location, displayLocation]);

    return (
        <div className="relative">
            {/* Page content */}
            <div
                className={`transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${stage === 'exiting'
                        ? 'opacity-0 scale-[0.98] blur-[2px]'
                        : stage === 'entering'
                            ? 'opacity-0 scale-[1.01] blur-[1px]'
                            : 'opacity-100 scale-100 blur-0'
                    }`}
            >
                {children}
            </div>

            {/* Transition overlay - horizontal wipe */}
            <div
                ref={overlayRef}
                className={`fixed inset-0 z-[100] pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)]`}
                style={{
                    background: 'linear-gradient(135deg, #0a0f2e 0%, #1a237e 50%, #0d1349 100%)',
                    transformOrigin: 'left center',
                    transform: stage === 'exiting'
                        ? 'scaleX(1)'
                        : stage === 'entering'
                            ? 'scaleX(1) translateX(100%)'
                            : 'scaleX(0)',
                    opacity: stage === 'visible' ? 0 : 1,
                }}
            >
                {/* PAVIMUN mark in the overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${stage === 'exiting' ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <span className="text-white/20 text-sm font-black tracking-[0.4em] uppercase">PAVIMUN</span>
                </div>
            </div>
        </div>
    );
};

export default PageTransition;
