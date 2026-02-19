import { useState, useEffect } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 300),
            setTimeout(() => setPhase(2), 1400),
            setTimeout(() => setPhase(3), 2600),
            setTimeout(() => setPhase(4), 3400),
            setTimeout(() => onComplete(), 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${phase >= 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
            style={{
                background: '#050a1a',
            }}
        >
            {/* Animated gradient orbs */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
                style={{
                    background: 'radial-gradient(circle, #1a237e 0%, transparent 70%)',
                    animation: 'splash-orbit1 8s ease-in-out infinite',
                    top: '-10%',
                    left: '-10%',
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, #283593 0%, transparent 70%)',
                    animation: 'splash-orbit2 6s ease-in-out infinite',
                    bottom: '-10%',
                    right: '-10%',
                }}
            />
            <div
                className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-15"
                style={{
                    background: 'radial-gradient(circle, #4fc3f7 0%, transparent 70%)',
                    animation: 'splash-orbit3 7s ease-in-out infinite',
                    top: '40%',
                    right: '20%',
                }}
            />

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo container with glow */}
                <div className="relative">
                    {/* Glow ring behind logo */}
                    <div
                        className={`absolute inset-0 rounded-full transition-all duration-1000 ${phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}
                        style={{
                            width: '180px',
                            height: '180px',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${phase >= 1 ? 1.3 : 0.5})`,
                            background: 'radial-gradient(circle, rgba(26,35,126,0.5) 0%, rgba(26,35,126,0.15) 50%, transparent 70%)',
                            transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
                        }}
                    />

                    {/* Logo image */}
                    <div
                        className={`relative transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 1
                                ? 'opacity-100 scale-100 translate-y-0 blur-0'
                                : 'opacity-0 scale-[0.6] translate-y-8 blur-sm'
                            }`}
                    >
                        <img
                            src="/images/pavimun-logo.jpg"
                            alt="PAVIMUN"
                            className="w-28 h-28 md:w-36 md:h-36 rounded-3xl object-contain shadow-[0_0_60px_rgba(26,35,126,0.4)]"
                        />
                    </div>
                </div>

                {/* Animated line separator */}
                <div className="relative my-8 h-[1px] overflow-hidden" style={{ width: phase >= 2 ? '120px' : '0px', transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4fc3f7]/60 to-transparent"
                        style={{ animation: 'splash-shimmer 2s ease-in-out infinite' }}
                    />
                </div>

                {/* Title */}
                <div
                    className={`flex flex-col items-center gap-3 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${phase >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
                        }`}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-[-0.03em]">
                        <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
                            PAVIMUN
                        </span>
                    </h1>
                    <p className="text-[11px] text-white/25 font-semibold tracking-[0.4em] uppercase">
                        Modelo de Naciones Unidas
                    </p>
                </div>

                {/* Edition badge */}
                <div
                    className={`mt-8 transition-all duration-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <div className="px-5 py-2 bg-gradient-to-r from-white/[0.04] to-white/[0.08] border border-white/[0.08] rounded-full backdrop-blur-sm">
                        <span className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase">
                            I Edición · 2026
                        </span>
                    </div>
                </div>

                {/* Animated loading bar */}
                <div
                    className={`mt-10 transition-all duration-500 ${phase >= 2 && phase < 4 ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="w-32 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#1a237e] via-[#4fc3f7] to-[#1a237e] rounded-full"
                            style={{
                                width: phase >= 3 ? '100%' : phase >= 2 ? '60%' : '0%',
                                transition: 'width 1.2s ease-out',
                            }}
                        />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes splash-orbit1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 20px); }
        }
        @keyframes splash-orbit2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -30px); }
        }
        @keyframes splash-orbit3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.2); }
        }
        @keyframes splash-shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
};

export default SplashScreen;
