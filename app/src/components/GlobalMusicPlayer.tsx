import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

const COMMITTEE_ROUTES = ['/corte', '/investigacion', '/crisis', '/cia', '/consejo-seguridad', '/oiea', '/prensa'];

const GlobalMusicPlayer = () => {
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const prevWasCommittee = useRef(false);
    const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isCommitteePage = COMMITTEE_ROUTES.includes(location.pathname);
    const TARGET_VOL = 0.25; // Volume suave, no duro

    // Create audio element once
    useEffect(() => {
        const audio = new Audio('/audio/musica.mp3');
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;

        // Start playing immediately with gentle fade-in (after splash screen)
        // Small delay to let splash finish
        const startTimer = setTimeout(() => {
            if (COMMITTEE_ROUTES.includes(window.location.pathname)) return;
            audio.play().then(() => {
                setIsPlaying(true);
                let vol = 0;
                const fade = setInterval(() => {
                    vol += 0.005; // Very gradual
                    if (vol >= TARGET_VOL) { vol = TARGET_VOL; clearInterval(fade); }
                    if (audioRef.current) audioRef.current.volume = vol;
                }, 50);
            }).catch(() => {
                // Autoplay blocked — will start on first click
                const clickStart = () => {
                    if (!audioRef.current || COMMITTEE_ROUTES.includes(window.location.pathname)) return;
                    audioRef.current.volume = 0;
                    audioRef.current.play().then(() => {
                        setIsPlaying(true);
                        let vol = 0;
                        const fade = setInterval(() => {
                            vol += 0.005;
                            if (vol >= TARGET_VOL) { vol = TARGET_VOL; clearInterval(fade); }
                            if (audioRef.current) audioRef.current.volume = vol;
                        }, 50);
                    }).catch(() => { });
                };
                document.addEventListener('click', clickStart, { once: true });
            });
        }, 4500); // Wait for splash screen to finish

        return () => {
            clearTimeout(startTimer);
            audio.pause();
            audio.src = '';
        };
    }, []);

    const clearFade = () => {
        if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null; }
    };

    // Handle route changes — ONLY when switching committee <-> non-committee
    useEffect(() => {
        if (!audioRef.current) return;

        const wasCommittee = prevWasCommittee.current;
        prevWasCommittee.current = isCommitteePage;

        if (!wasCommittee && !isCommitteePage) return;

        if (isCommitteePage && !wasCommittee) {
            clearFade();
            const audio = audioRef.current;
            let vol = audio.volume;
            fadeRef.current = setInterval(() => {
                vol -= 0.02;
                if (vol <= 0) {
                    vol = 0; audio.pause(); setIsPlaying(false); clearFade();
                }
                audio.volume = Math.max(0, vol);
            }, 30);
        } else if (!isCommitteePage && wasCommittee) {
            clearFade();
            const audio = audioRef.current;
            audio.volume = 0;
            audio.play().then(() => {
                setIsPlaying(true);
                let vol = 0;
                fadeRef.current = setInterval(() => {
                    vol += 0.005;
                    if (vol >= TARGET_VOL) { vol = TARGET_VOL; clearFade(); }
                    if (audioRef.current) audioRef.current.volume = vol;
                }, 50);
            }).catch(() => setIsPlaying(false));
        }

        return () => clearFade();
    }, [location.pathname]);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.volume = TARGET_VOL;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    if (isCommitteePage) return null;

    return (
        <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-[60] group"
            title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
            {isPlaying && (
                <div className="absolute inset-0 rounded-full bg-[#1a237e]/30 animate-ping" />
            )}
            <div className={`relative p-3.5 rounded-full backdrop-blur-xl border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${isPlaying
                    ? 'bg-[#1a237e]/90 border-[#1a237e]/50 text-white shadow-[#1a237e]/30'
                    : 'bg-white/80 border-gray-200 text-gray-500 hover:text-[#1a237e] shadow-black/10'
                }`}>
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isPlaying ? 'Pausar música' : 'Reproducir música'}
            </div>
        </button>
    );
};

export default GlobalMusicPlayer;
