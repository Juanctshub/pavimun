import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MinistryOfTruth = () => {
    const navigate = useNavigate();
    const [lines, setLines] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const sequence = [
            "ERROR 404",
            "USUARIO NO AUTORIZADO.",
            "...",
            "¿Buscar la verdad, delegado?",
            "La verdad aquí es la que nosotros escribimos.",
            "Iniciando protocolo de borrado..."
        ];

        let delay = 500;
        sequence.forEach((line) => {
            setTimeout(() => {
                setLines(prev => [...prev, line]);
            }, delay);
            delay += 1200;
        });

        // Start deleting
        setTimeout(() => {
            setIsDeleting(true);
        }, delay + 1000);

    }, []);

    useEffect(() => {
        if (isDeleting) {
            if (lines.length > 0) {
                const timer = setTimeout(() => {
                    setLines(prev => prev.slice(0, -1));
                }, 150);
                return () => clearTimeout(timer);
            } else {
                // Redirect home when all lines are deleted
                setTimeout(() => {
                    navigate('/');
                }, 500);
            }
        }
    }, [isDeleting, lines, navigate]);

    return (
        <div className="fixed inset-0 z-[99999] bg-[#0a0f0a] text-green-500 font-mono flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-80 z-10" />
            <div className="absolute inset-x-0 h-4 bg-green-500/10 z-20 animate-scan pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />

            <div className="relative z-30 max-w-2xl w-full pl-4 md:pl-10">
                <div className="w-12 h-12 border-2 border-green-500 rounded-full flex items-center justify-center mb-12 animate-pulse mx-auto opacity-50">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>

                {lines.map((line, i) => (
                    <p key={i} className="text-xl md:text-3xl mb-6 shadow-[0_0_10px_rgba(34,197,94,0.2)] tracking-widest uppercase">
                        <span className="opacity-50 mr-4">{'>'}</span> {line}
                    </p>
                ))}
                {(!isDeleting || lines.length > 0) && (
                    <p className="animate-blink text-3xl mt-4">_</p>
                )}
            </div>
        </div>
    );
};

export default MinistryOfTruth;
