'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, ShoppingCart, ListMusic, X } from 'lucide-react';
import Image from 'next/image';
import { assets, type Asset } from '../data';
import Reveal from '../ui/Reveal';

export default function MusicPlayerSection() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showMobileTracklist, setShowMobileTracklist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = assets[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      const p = audioRef.current?.play();
      p?.catch((err) => console.error('Audio playback error:', err));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying((v) => !v);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % assets.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + assets.length) % assets.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTrackItem = (track: Asset, index: number, prefix: string) => {
    const isActive = currentTrackIndex === index;
    return (
      <div
        key={track.id}
        className={`group relative flex items-center justify-between p-4 md:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex-shrink-0 ${isActive
          ? 'bg-gradient-to-r from-white/10 to-transparent border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
          : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5'
          }`}
        onClick={() => {
          if (isActive) {
            togglePlay();
          } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
          }
        }}
      >
        {isActive && (
          <motion.div
            layoutId={`activeTrackAccent-${prefix}`}
            className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-l-2xl"
          />
        )}

        <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0 z-10">
          <div className="w-8 flex-shrink-0 flex justify-center items-center h-8 relative">
            {isActive && isPlaying ? (
              <div className="flex items-end gap-[2px] h-4">
                <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-full" />
                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-white rounded-full" />
                <motion.div animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 bg-white rounded-full" />
              </div>
            ) : isActive && !isPlaying ? (
              <Play size={16} className="text-white fill-white" />
            ) : (
              <>
                <span className="font-mono text-sm text-white/40 group-hover:opacity-0 transition-opacity duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Play size={16} className="text-white fill-white absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-0.5" />
              </>
            )}
          </div>

          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block shadow-md">
            <Image
              src={track.cover}
              alt={track.title}
              fill
              className={`object-cover transition-all duration-500 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-left flex-1 min-w-0">
            <h4 className={`text-lg md:text-xl font-medium tracking-tight mb-1 truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
              {track.title}
            </h4>
            <p className={`text-xs uppercase tracking-widest truncate transition-colors duration-300 ${isActive ? 'text-white/70' : 'text-white/40 group-hover:text-white/60'}`}>
              {track.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0 ml-4 z-10">
          <span className={`font-mono text-sm hidden md:inline-block transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-white/40 group-hover:text-white/60'}`}>
            {track.duration}
          </span>
          <a
            href={track.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isActive
              ? 'border-white/40 bg-white/10 hover:bg-white hover:text-black hover:scale-105'
              : 'border-white/20 hover:bg-white hover:text-black hover:scale-105 hover:border-white'
              }`}
            title={`Buy ${track.price}`}
          >
            <ShoppingCart size={16} />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section id="music" className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10 relative">
      <div className="max-w-screen-2xl mx-auto w-full">

        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Sample Packs &amp; Loops</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 md:h-[520px] lg:h-[560px]">

          {/* Player UI */}
          <Reveal direction="left" className="md:col-span-5 h-full">
            <div className="flex flex-col bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] h-full">
              <div className="relative aspect-square w-48 md:w-48 lg:w-64 mx-auto mb-6 lg:mb-8 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                <Image
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  fill
                  className={`object-cover transition-all duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                  referrerPolicy="no-referrer"
                />
                {isPlaying && <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />}
              </div>

              <div className="flex flex-col flex-1 justify-end">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-1 truncate">{currentTrack.title}</h3>
                    <p className="text-white/50 uppercase tracking-widest text-xs truncate">{currentTrack.category}</p>
                  </div>
                  <a
                    href={currentTrack.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white text-black rounded-full hover:bg-white/80 hover:scale-105 transition-all duration-200"
                    title={`Buy ${currentTrack.price}`}
                  >
                    <ShoppingCart size={18} />
                  </a>
                </div>

                <div className="w-full">
                  <div className="flex items-center gap-4 mb-6 text-xs text-white/50 font-mono">
                    <span className="w-10 text-right">{formatTime(progress)}</span>
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={progress}
                      onChange={handleSeek}
                      className="flex-1 h-1.5 bg-white/20 appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                    />
                    <span className="w-10">{formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center justify-center gap-6 lg:gap-8">
                    <button onClick={prevTrack} className="cursor-pointer text-white/60 hover:text-white hover:scale-110 transition-all duration-200 p-2">
                      <SkipBack size={24} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="cursor-pointer w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      {isPlaying
                        ? <Pause size={28} className="fill-current lg:w-8 lg:h-8" />
                        : <Play size={28} className="fill-current ml-1.5 lg:w-8 lg:h-8" />}
                    </button>
                    <button onClick={nextTrack} className="cursor-pointer text-white/60 hover:text-white hover:scale-110 transition-all duration-200 p-2">
                      <SkipForward size={24} />
                    </button>
                  </div>

                  <div className="mt-6 flex justify-center md:hidden">
                    <button
                      onClick={() => setShowMobileTracklist(true)}
                      className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200 text-sm font-medium"
                    >
                      <ListMusic size={18} />
                      Show Tracklist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Desktop tracklist */}
          <Reveal direction="right" delay={0.1} className="hidden md:flex md:col-span-7 h-full">
            <div className="flex flex-col gap-3 w-full h-full overflow-y-auto pr-2 md:pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {assets.map((track, index) => renderTrackItem(track, index, 'desktop'))}
            </div>
          </Reveal>

        </div>

        <audio ref={audioRef} src={currentTrack.src} onTimeUpdate={handleTimeUpdate} onEnded={nextTrack} className="hidden" />
      </div>

      {/* Mobile tracklist overlay */}
      <AnimatePresence>
        {showMobileTracklist && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-6 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between mb-6 pt-4">
              <h3 className="text-2xl font-bold tracking-tighter uppercase">Tracklist</h3>
              <button
                onClick={() => setShowMobileTracklist(false)}
                className="cursor-pointer p-2 bg-white/10 rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-20 [&::-webkit-scrollbar]:hidden">
              {assets.map((track, index) => renderTrackItem(track, index, 'mobile'))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
