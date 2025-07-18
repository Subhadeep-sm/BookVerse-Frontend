import React, { useEffect, useState, useRef } from 'react';
import audio1 from '../assets/audios/audio1.mp3';
import audio2 from '../assets/audios/audio2.mp3'; 
import audio3 from '../assets/audios/audio3.mp3';

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Default volume (30%)
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showClickMePopup, setShowClickMePopup] = useState(false);


  
  useEffect(() => {
  if (audioReady && !isPlaying && !userInteracted) {
    setShowClickMePopup(true);
    
  }
}, [audioReady, isPlaying, userInteracted]);



  
  const audioRef = useRef(null);
  const volumeTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthAudioRef = useRef(null);

  // Generate synthetic ambient sound using Web Audio API
  const generateSyntheticAmbientSound = async () => {
    try {
      // Only create AudioContext after user interaction
      if (!userInteracted) {
        console.log('Waiting for user interaction before creating AudioContext');
        return;
      }

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      
      // Resume context if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      // Create a simple ambient sound using oscillators
      const createAmbientTone = () => {
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const oscillator3 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Create more complex ambient sound
        oscillator1.type = 'sine';
        oscillator1.frequency.value = 220; // A3
        oscillator2.type = 'sine';
        oscillator2.frequency.value = 330; // E4
        oscillator3.type = 'sine';
        oscillator3.frequency.value = 440; // A4
        
        gainNode.gain.value = isMuted ? 0 : volume * 0.05; // Very low volume
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        oscillator3.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator1.start();
        oscillator2.start();
        oscillator3.start();
        
        return { oscillator1, oscillator2, oscillator3, gainNode };
      };
      
      synthAudioRef.current = createAmbientTone();
      setIsPlaying(true);
      console.log('Using synthetic ambient sound');
      
    } catch (error) {
      console.error('Web Audio API error:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize audio when component mounts
  useEffect(() => {
    // Local audio sources (place these files in public/audio/ folder)
    const audioSources = [
      audio1,      // Replace with your actual filenames
      audio2,      // Add more audio files as needed
      audio3,      // Ensure these files exist in the specified
      // Add more local audio files here
      // Web Audio API generated tone as ultimate fallback
      null // Will generate synthetic audio
    ];
    
    const tryAudioSource = async (sourceIndex = 0) => {
  if (sourceIndex >= audioSources.length) {
    console.log('No audio sources available, synthetic sound will be available after user interaction');
    return;
  }

  const audioUrl = audioSources[sourceIndex];

  if (audioUrl && audioRef.current) {
    audioRef.current.src = audioUrl;
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    // Add listener to know when it's ready
    audioRef.current.addEventListener('canplaythrough', () => {
      console.log('Audio can play through');
      setAudioReady(true);
    }, { once: true });

    audioRef.current.addEventListener('error', (e) => {
      console.log(`Audio source ${sourceIndex + 1} failed, trying next...`);
      tryAudioSource(sourceIndex + 1);
    });

    audioRef.current.load(); // This triggers the loading
  } else {
    // If null, mark ready for synthetic fallback
    setAudioReady(true);
  }
};

    
    tryAudioSource();
  }, []);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    
    // Update synthetic audio volume
    if (synthAudioRef.current && synthAudioRef.current.gainNode) {
      synthAudioRef.current.gainNode.gain.value = isMuted ? 0 : volume * 0.05;
    }
  }, [volume, isMuted]);

  const toggleMusic = async () => {
    try {
      setIsLoading(true);
      
      // Mark user interaction
      if (!userInteracted) {
        setUserInteracted(true);
        setShowClickMePopup(false);
      }
      
      if (isPlaying) {
        // Stop regular audio
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
        
        // Stop synthetic audio
        if (synthAudioRef.current) {
          synthAudioRef.current.oscillator1.stop();
          synthAudioRef.current.oscillator2.stop();
          synthAudioRef.current.oscillator3.stop();
          synthAudioRef.current = null;
        }
        
        setIsPlaying(false);
      } else {
        // Resume audio context if suspended
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        // Try to play regular audio first
        if (audioRef.current && audioRef.current.src) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.log('Regular audio failed, using synthetic sound');
            await generateSyntheticAmbientSound();
          }
        } else {
          // No audio source available, use synthetic sound
          await generateSyntheticAmbientSound();
        }
      }
    } catch (error) {
      console.error('Error toggling music:', error);
      // Fallback to synthetic sound
      if (!isPlaying) {
        await generateSyntheticAmbientSound();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeHover = () => {
    setShowVolumeControl(true);
    // Clear any existing timeout
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  const handleVolumeLeave = () => {
    // Set a timeout to hide the volume control
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false);
    }, 300);
  };

  const handleVolumeControlHover = () => {
    // Clear timeout when hovering over volume control
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      if (synthAudioRef.current) {
        synthAudioRef.current.oscillator1.stop();
        synthAudioRef.current.oscillator2.stop();
        synthAudioRef.current.oscillator3.stop();
        synthAudioRef.current = null;
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      } backdrop-blur-md bg-white/5 border-b border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white font-light">
        <div className="flex items-center gap-10">
          <span className="text-lg font-semibold tracking-wide">BookVerse ®</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
            🌙
          </button>
          <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition">
            🎚️
          </button>
          
          {/* Sound Control Button with Volume Controls */}
          <div className="relative">
            {showClickMePopup && (
  <div className="absolute top-9 right-1 z-50 w-max">
    <div className="relative bg-[#4a5247] text-[#ECDFCC] px-3 py-2 rounded-lg shadow-lg text-sm border border-[#3C3D37]">
      <div className="flex items-start gap-2">
        <span>🎧 Click to start music!</span>
        <button
          onClick={() => setShowClickMePopup(false)}
          className="ml-2 text-[#ECDFCC] hover:text-white text-md"
        >
          ×
        </button>
      </div>
      {/* Tooltip arrow */}
      <div className="absolute top-[-6px] right-3 w-3 h-3 bg-[#4a5247] rotate-45 border-t border-l border-[#3C3D37]" />
    </div>
  </div>
)}

            <button
              onClick={toggleMusic}
              onMouseEnter={handleVolumeHover}
              onMouseLeave={handleVolumeLeave}
              className={`px-4 py-2 rounded-full text-sm transition ${
                isPlaying 
                  ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin">⏳</span>
              ) : isPlaying ? (
                isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'
              ) : (
                '🔇'
              )}
            </button>

            {/* Volume Control Panel */}
            {showVolumeControl && (
              <div
                className="absolute top-full mt-2 right-0 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10 min-w-[200px]"
                onMouseEnter={handleVolumeControlHover}
                onMouseLeave={handleVolumeLeave}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
                  >
                    {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                      }}
                    />
                  </div>
                  
                  <span className="text-xs text-white/60 min-w-[2rem]">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                
                <div className="mt-2 text-xs text-white/40 text-center">
                  {isPlaying ? 'Playing ambient music' : audioReady ? 'Ready to play' : 'Loading audio...'}
                </div>
              </div>
            )}
          </div>

          <button className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm transition font-medium">
            Get in touch
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Custom CSS for the range slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </nav>
  );
}

export default Navbar;