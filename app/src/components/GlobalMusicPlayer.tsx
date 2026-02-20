import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

const COMMITTEE_ROUTES = ['/corte', '/investigacion', '/crisis', '/cia', '/consejo-seguridad', '/oiea', '/prensa'];

const GlobalMusicPlayer = () => {
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const prevWasCommittee = useRef(false);
    const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isCommitteePage = COMMITTEE_ROUTES.includes(location.pathname);
    const TARGET_VOL = 0.25; // Volume suave, no duro
    const userInteracted = useRef(false);

    // Initial Play Logic and Autoplay Handling
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0;

        const attemptPlay = () => {
            if (COMMITTEE_ROUTES.includes(window.location.pathname)) return;
            audio.play().then(() => {
                setIsPlaying(true);
                let vol = audio.volume;
                const fade = setInterval(() => {
                    vol += 0.005;
                    if (vol >= TARGET_VOL) { vol = TARGET_VOL; clearInterval(fade); }
                    audio.volume = vol;
                }, 50);
            }).catch(() => {
                // If blocked, wait for user interaction safely
                const onInteract = () => {
                    if (userInteracted.current) return;
                    userInteracted.current = true;
                    if (COMMITTEE_ROUTES.includes(window.location.pathname)) return;

                    audio.volume = 0;
                    audio.play().then(() => {
                        setIsPlaying(true);
                        let vol = 0;
                        const fade = setInterval(() => {
                            vol += 0.005;
                            if (vol >= TARGET_VOL) { vol = TARGET_VOL; clearInterval(fade); }
                            audio.volume = vol;
                        }, 50);
                    }).catch(() => { });

                    document.removeEventListener('click', onInteract);
                    document.removeEventListener('touchstart', onInteract);
                };

                document.addEventListener('click', onInteract, { once: true });
                document.addEventListener('touchstart', onInteract, { once: true });
            });
        };

        // Delay to let splash finish
        const startTimer = setTimeout(attemptPlay, 4500);

        return () => {
            clearTimeout(startTimer);
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

        const audio = audioRef.current;

        if (isCommitteePage && !wasCommittee) {
            clearFade();
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
            audio.volume = 0;
            audio.play().then(() => {
                setIsPlaying(true);
                let vol = 0;
                fadeRef.current = setInterval(() => {
                    vol += 0.005;
                    if (vol >= TARGET_VOL) { vol = TARGET_VOL; clearFade(); }
                    audio.volume = vol;
                }, 50);
            }).catch(() => setIsPlaying(false));
        }

        return () => clearFade();
    }, [location.pathname, isCommitteePage]);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        userInteracted.current = true; // Ensure fallback knows user interacted
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.volume = TARGET_VOL;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    return (
        <>
            {/* The actual audio element bound to React DOM */}
            <audio ref={audioRef} src="/audio/musica.mp3" loop preload="auto" />

            {!isCommitteePage && (
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
            )}
        </>
    );
};

export default GlobalMusicPlayer;
