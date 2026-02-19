import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

const COMMITTEE_ROUTES = ['/corte', '/investigacion', '/crisis', '/cia', '/consejo-seguridad', '/oiea', '/prensa'];

const GlobalMusicPlayer = () => {
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const prevWasCommittee = useRef(false);
    const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isCommitteePage = COMMITTEE_ROUTES.includes(location.pathname);

    // Create audio element once
    useEffect(() => {
        const audio = new Audio('/audio/musica.mp3');
        audio.loop = true;
        audio.volume = 0;
        audioRef.current = audio;
        return () => { audio.pause(); audio.src = ''; };
    }, []);

    // Clear any existing fade
    const clearFade = () => {
        if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null; }
    };

    // Handle route changes — ONLY react when switching between committee/non-committee
    useEffect(() => {
        if (!audioRef.current) return;

        const wasCommittee = prevWasCommittee.current;
        prevWasCommittee.current = isCommitteePage;

        // Non-committee → non-committee: do NOTHING (music keeps playing)
        if (!wasCommittee && !isCommitteePage) return;

        if (isCommitteePage && !wasCommittee) {
            // Entering committee page: fade out
            clearFade();
            const audio = audioRef.current;
            let vol = audio.volume;
            fadeRef.current = setInterval(() => {
                vol -= 0.02;
                if (vol <= 0) {
                    vol = 0;
                    audio.pause();
                    setIsPlaying(false);
                    clearFade();
                }
                audio.volume = Math.max(0, vol);
            }, 30);
        } else if (!isCommitteePage && wasCommittee && hasInteracted) {
            // Leaving committee page: resume with fade in
            clearFade();
            const audio = audioRef.current;
            audio.volume = 0;
            audio.play().then(() => {
                setIsPlaying(true);
                let vol = 0;
                fadeRef.current = setInterval(() => {
                    vol += 0.01;
                    if (vol >= 0.4) { vol = 0.4; clearFade(); }
                    if (audioRef.current) audioRef.current.volume = vol;
                }, 40);
            }).catch(() => setIsPlaying(false));
        }

        return () => clearFade();
    }, [location.pathname]);

    // First interaction to start music
    useEffect(() => {
        if (hasInteracted || isCommitteePage) return;
        const start = () => {
            if (!audioRef.current || COMMITTEE_ROUTES.includes(location.pathname)) return;
            setHasInteracted(true);
            audioRef.current.volume = 0;
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                let vol = 0;
                const fade = setInterval(() => {
                    vol += 0.01;
                    if (vol >= 0.4) { vol = 0.4; clearInterval(fade); }
                    if (audioRef.current) audioRef.current.volume = vol;
                }, 40);
            }).catch(() => setIsPlaying(false));
        };
        document.addEventListener('click', start, { once: true });
        return () => document.removeEventListener('click', start);
    }, [hasInteracted, isCommitteePage]);

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setHasInteracted(true);
            audioRef.current.volume = 0.4;
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
