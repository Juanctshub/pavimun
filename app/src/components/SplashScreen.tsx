import { useState, useEffect } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [phase, setPhase] = useState(0);
    // 0 = initial (logo hidden), 1 = logo appears, 2 = text appears, 3 = expand, 4 = fade out

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 200),     // Logo fades in
            setTimeout(() => setPhase(2), 1200),     // Text appears
            setTimeout(() => setPhase(3), 2400),     // Expand effect
            setTimeout(() => setPhase(4), 3200),     // Fade out
            setTimeout(() => onComplete(), 3800),    // Remove splash
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-600 ${phase >= 4 ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                }`}
            style={{
                background: 'linear-gradient(135deg, #0a0f2e 0%, #0d1349 30%, #111b5e 60%, #0a0f2e 100%)',
            }}
        >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float-particle ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}
            </div>

            {/* Radial glow behind logo */}
            <div
                className={`absolute w-96 h-96 rounded-full transition-all duration-1000 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                style={{
                    background: 'radial-gradient(circle, rgba(26,35,126,0.4) 0%, rgba(26,35,126,0.1) 40%, transparent 70%)',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <div
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 1
                            ? phase >= 3
                                ? 'opacity-100 scale-110 translate-y-0'
                                : 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-75 translate-y-4'
                        }`}
                >
                    <img
                        src="/images/pavimun-logo.jpg"
                        alt="PAVIMUN"
                        className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_30px_rgba(26,35,126,0.5)]"
                    />
                </div>

                {/* Divider line */}
                <div
                    className={`h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-6 transition-all duration-700 ease-out ${phase >= 2 ? 'w-32 opacity-100' : 'w-0 opacity-0'
                        }`}
                />

                {/* Text */}
                <div
                    className={`flex flex-col items-center gap-2 transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-[-0.02em]">
                        PAVIMUN
                    </h1>
                    <p className="text-sm text-white/40 font-medium tracking-[0.3em] uppercase">
                        I Edición · 2025
                    </p>
                </div>

                {/* Loading dots */}
                <div
                    className={`flex items-center gap-1.5 mt-8 transition-all duration-500 ${phase >= 2 && phase < 4 ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 bg-white/50 rounded-full"
                            style={{
                                animation: 'splash-dot 1s ease-in-out infinite',
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-30px) translateX(15px); opacity: 0.5; }
        }
        @keyframes splash-dot {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default SplashScreen;
