import { useState, useEffect, useRef, useCallback } from 'react';
import { Radiation, FileText, Globe, ShieldAlert, Siren, AlertTriangle } from 'lucide-react';

const OIEA = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoBlocked, setVideoBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadingVideoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // ============================================================
  // WEB AUDIO API: Cinematic Sound Effects for Loading Screen
  // ============================================================
  const playSFX = useCallback(() => {
    try {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      // --- 1. Deep Sub-Bass Rumble (continuous drone) ---
      const rumbleOsc = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumbleOsc.type = 'sawtooth';
      rumbleOsc.frequency.setValueAtTime(30, ctx.currentTime);
      rumbleOsc.frequency.linearRampToValueAtTime(20, ctx.currentTime + 8);
      rumbleGain.gain.setValueAtTime(0, ctx.currentTime);
      rumbleGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1);
      rumbleGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 4);
      rumbleGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 8);
      rumbleOsc.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);
      rumbleOsc.start(ctx.currentTime);
      rumbleOsc.stop(ctx.currentTime + 8);

      // --- 2. Rising Tension Tone ---
      const tensionOsc = ctx.createOscillator();
      const tensionGain = ctx.createGain();
      tensionOsc.type = 'sine';
      tensionOsc.frequency.setValueAtTime(80, ctx.currentTime);
      tensionOsc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 5);
      tensionGain.gain.setValueAtTime(0, ctx.currentTime);
      tensionGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2);
      tensionGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 4);
      tensionGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6);
      tensionOsc.connect(tensionGain);
      tensionGain.connect(ctx.destination);
      tensionOsc.start(ctx.currentTime);
      tensionOsc.stop(ctx.currentTime + 6);

      // --- 3. Explosion Impact (white noise burst) ---
      const explosionTime = ctx.currentTime + 2; // sync with video explosion
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = (Math.random() * 2 - 1);
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, explosionTime);
      noiseGain.gain.linearRampToValueAtTime(0.7, explosionTime + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, explosionTime + 2.5);
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(8000, explosionTime);
      noiseFilter.frequency.exponentialRampToValueAtTime(200, explosionTime + 2);
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(explosionTime);
      noiseSource.stop(explosionTime + 3);

      // --- 4. Explosion Sub-Impact (deep boom) ---
      const boomOsc = ctx.createOscillator();
      const boomGain = ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(60, explosionTime);
      boomOsc.frequency.exponentialRampToValueAtTime(15, explosionTime + 2);
      boomGain.gain.setValueAtTime(0.8, explosionTime);
      boomGain.gain.exponentialRampToValueAtTime(0.01, explosionTime + 2);
      boomOsc.connect(boomGain);
      boomGain.connect(ctx.destination);
      boomOsc.start(explosionTime);
      boomOsc.stop(explosionTime + 2.5);

      // --- 5. Geiger Counter Clicks ---
      for (let i = 0; i < 15; i++) {
        const clickTime = ctx.currentTime + 4.5 + (i * 0.15) + (Math.random() * 0.1);
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(2000 + Math.random() * 3000, clickTime);
        clickGain.gain.setValueAtTime(0.15, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.02);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start(clickTime);
        clickOsc.stop(clickTime + 0.03);
      }

      // --- 6. Warning Siren ---
      const sirenOsc = ctx.createOscillator();
      const sirenGain = ctx.createGain();
      sirenOsc.type = 'sine';
      sirenGain.gain.setValueAtTime(0.1, ctx.currentTime);
      sirenGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4);
      for (let t = 0; t < 8; t++) {
        const time = ctx.currentTime + t * 0.5;
        sirenOsc.frequency.setValueAtTime(600, time);
        sirenOsc.frequency.linearRampToValueAtTime(900, time + 0.25);
      }
      sirenOsc.connect(sirenGain);
      sirenGain.connect(ctx.destination);
      sirenOsc.start(ctx.currentTime);
      sirenOsc.stop(ctx.currentTime + 4);

    } catch (e) {
      console.warn('Web Audio SFX failed:', e);
    }
  }, []);

  // ============================================================
  // VIDEO END → PLAY MAIN AUDIO
  // ============================================================
  const handleVideoEnd = useCallback(() => {
    // Clean up SFX
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => { });
    }
    // Hide loading
    setLoading(false);
    // Play Main Audio IMMEDIATELY
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.warn("Main audio blocked", e));
    }
  }, []);

  // ============================================================
  // AUTOPLAY ATTEMPT
  // ============================================================
  useEffect(() => {
    if (loadingVideoRef.current) {
      loadingVideoRef.current.play()
        .then(() => {
          // Video started → play SFX too
          playSFX();
        })
        .catch(() => setVideoBlocked(true));
    }
  }, [playSFX]);

  const handleManualLaunch = () => {
    if (loadingVideoRef.current) {
      loadingVideoRef.current.play();
      setVideoBlocked(false);
      playSFX();
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // ============================================================
  // RENDER — Audio element is ALWAYS mounted (never inside early return)
  // ============================================================
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#050505] text-gray-200 font-sans selection:bg-yellow-500/30 selection:text-yellow-200">

      {/* === AUDIO ELEMENT: ALWAYS MOUNTED so ref is never null === */}
      <audio ref={audioRef} src="/audio/chernobyl.mp3" loop preload="auto" />

      {/* ====== LOADING SCREEN OVERLAY ====== */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
          <video
            ref={loadingVideoRef}
            src="/videos/nuclear.mp4"
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            playsInline
          />

          {videoBlocked && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <button
                onClick={handleManualLaunch}
                className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-2xl tracking-widest uppercase border-4 border-red-500 rounded shadow-[0_0_50px_red] animate-bounce transition-all transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Radiation className="w-8 h-8 animate-spin" />
                  INITIATE DETONATION SEQUENCE
                  <AlertTriangle className="w-8 h-8" />
                </span>
                <div className="absolute inset-0 bg-red-600 blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ====== BACKGROUND ASSETS ====== */}
      <div className="fixed inset-0 z-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 brightness-75 scale-105"
          src="/videos/chernobyl.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60"></div>
      </div>

      {/* Audio Control Button */}
      <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={toggleAudio}
          className={`p-4 rounded-full border backdrop-blur-md transition-all shadow-xl group ${!isPlaying ? 'bg-yellow-600/20 border-yellow-500/50 text-yellow-500' : 'bg-green-600/20 border-green-500/50 text-green-400'}`}
        >
          {isPlaying ? <Siren className="w-6 h-6 animate-pulse" /> : <Radiation className="w-6 h-6" />}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 px-2 py-1 rounded text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500">
            {isPlaying ? "ALARM AUDIO: ON" : "ACTIVATE ALARM"}
          </span>
        </button>
      </div>

      {/* ====== HERO SECTION ====== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center">

        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-40 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="relative p-6 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_50px_rgba(0,100,255,0.15)]">
            <img
              src="/images/OIEA.png"
              alt="OIEA Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            />
          </div>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 text-yellow-500 animate-pulse bg-yellow-900/10 backdrop-blur-sm py-1 px-4 rounded border border-yellow-500/20 mx-auto hover:bg-yellow-900/30 transition-colors">
            <Radiation className="w-5 h-5" />
            <span className="tracking-[0.2em] font-bold text-xs md:text-sm uppercase text-yellow-400">Priority Level: Extinction Event</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,150,255,0.3)] mb-2 leading-none">
            OIEA: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white animate-pulse">CHERNÓBIL '86</span>
          </h1>

          <div className="max-w-3xl mx-auto border-y border-white/10 py-6 bg-black/30 backdrop-blur-sm">
            <h2 className="text-sm md:text-xl text-blue-200 tracking-[0.2em] font-mono uppercase">
              Containment &amp; Future Protocol Task Force
            </h2>
          </div>
        </div>

        {/* Crisis Summary */}
        <div className="max-w-4xl mx-auto bg-[#0a0f14]/70 backdrop-blur-md border-l-4 border-yellow-500 p-8 rounded-r-lg shadow-2xl relative overflow-hidden group hover:bg-[#0a0f14]/90 transition-colors">
          <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
            <Radiation className="w-64 h-64 text-yellow-500" />
          </div>
          <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed text-justify relative z-10 font-serif italic">
            "La madrugada del 26 de abril de 1986 marcó un punto de inflexión. La explosión del reactor 4 no fue solo un accidente industrial; fue la liberación descontrolada de una <span className="text-yellow-400 font-semibold bg-yellow-900/20 px-1">nube radiactiva que ignoró fronteras</span>, desafiando la gobernanza global y la ética de la energía atómica."
          </p>
        </div>

      </section>

      {/* ====== CONTENT SECTION ====== */}
      <section className="relative z-10 py-24 md:py-32 bg-gradient-to-b from-[#050a10] to-black border-t border-blue-900/20">
        <div className="container mx-auto px-6 md:px-10 lg:px-12">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">

            {/* Visual / Context Column */}
            <div className="space-y-10">
              <div className="bg-[#0b121c] border border-blue-900/20 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,100,255,0.1)]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors"></div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-900/20 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">Impacto Global</h3>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                  La demora en la comunicación y la falta de protocolos quebrantaron la confianza pública. Este desastre nos obliga a cuestionar la rigidez de la <strong className="text-white">"cultura del secreto"</strong> frente a la necesidad imperiosa de transparencia internacional.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-black/40 p-4 rounded border border-white/5 text-center hover:border-yellow-500/30 transition-colors">
                    <div className="text-3xl font-bold text-yellow-500 mb-1">200K+</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Evacuados</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded border border-white/5 text-center hover:border-red-500/30 transition-colors">
                    <div className="text-3xl font-bold text-red-500 mb-1">400x</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Hiroshima Output</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission / Tasks Column */}
            <div className="space-y-12 flex flex-col justify-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <ShieldAlert className="w-8 h-8 text-yellow-500" />
                  Misión de los Delegados
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  En este entorno de alta tensión, la prioridad es establecer <span className="text-blue-400 font-semibold">protocolos de seguridad globales</span> que impidan un colapso mayor. Deben buscar el equilibrio entre la soberanía nacional y la protección innegociable de la vida humana.
                </p>

                <ul className="space-y-4">
                  {[
                    "Gestionar la crisis inmediata y la contención del núcleo.",
                    "Evaluar los riesgos de radiación transfronteriza.",
                    "Redefinir la arquitectura de seguridad nuclear global."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded border-l-2 border-blue-500 hover:bg-white/10 hover:translate-x-2 transition-all duration-300 cursor-default">
                      <div className="mt-1 min-w-[1.5rem] h-6 flex items-center justify-center bg-blue-500/20 rounded text-blue-400 text-xs font-bold font-mono">
                        0{idx + 1}
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documentation Link */}
              <div className="pt-8 border-t border-white/10">
                <a
                  href="https://drive.google.com/drive/folders/17vttxxXu2Z2F8j9SxUh7izk2drWeBFph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/30 p-1 transition-all hover:shadow-[0_0_30px_rgba(0,100,255,0.2)] hover:border-blue-400/50"
                >
                  <div className="relative bg-[#050a10] rounded-lg p-6 flex items-center justify-between group-hover:bg-[#0a1525] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-blue-500/20 text-blue-400 rounded-full group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-500">
                        <FileText className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Guía Académica</h4>
                        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">Documentación Oficial OIEA 1986</p>
                      </div>
                    </div>
                    <div className="text-blue-500 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      <Globe className="w-6 h-6" />
                    </div>
                  </div>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default OIEA;
