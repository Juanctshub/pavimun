import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setTransitionStage('exit');

            const timer = setTimeout(() => {
                setDisplayLocation(location);
                setTransitionStage('enter');
            }, 300); // exit animation duration

            return () => clearTimeout(timer);
        }
    }, [location, displayLocation]);

    return (
        <div
            ref={containerRef}
            className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${transitionStage === 'enter'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-3'
                }`}
        >
            {children}
        </div>
    );
};

export default PageTransition;
