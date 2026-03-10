'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, ArrowUpRight, ChevronLeft, ChevronRight, ShoppingCart, ListMusic, X, Instagram, Twitter, Music } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const assets = [
  { id: 1, title: 'Sega Percussion Loop 120BPM', category: 'Drum Loops', duration: '3:45', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://picsum.photos/seed/mauritius/800/800', price: '$4.99', storeUrl: '#' },
  { id: 2, title: 'Tropical House Synth Chords', category: 'Melody Loops', duration: '2:30', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://picsum.photos/seed/sega/800/800', price: '$5.99', storeUrl: '#' },
  { id: 3, title: 'Deep Bassline 105BPM', category: 'Bass Loops', duration: '4:12', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: 'https://picsum.photos/seed/island/800/800', price: '$3.99', storeUrl: '#' },
  { id: 4, title: 'Island Vocal Chops', category: 'Vocal Loops', duration: '3:18', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', cover: 'https://picsum.photos/seed/tropical/800/800', price: '$2.99', storeUrl: '#' },
];

const videos = [
  { id: '1', title: 'Summer Vibes Mix 2026', views: '1.2M', thumbnail: 'https://picsum.photos/seed/summer/1280/720' },
  { id: '2', title: 'Mauritian Sega Beat Making Session', views: '850K', thumbnail: 'https://picsum.photos/seed/sega2/1280/720' },
  { id: '3', title: 'Wave Empire - The Journey', views: '2.4M', thumbnail: 'https://picsum.photos/seed/journey/1280/720' },
  { id: '4', title: 'Studio Vlog #42', views: '420K', thumbnail: 'https://picsum.photos/seed/studio/1280/720' },
];

const posts = [
  'https://picsum.photos/seed/studio1/600/600',
  'https://picsum.photos/seed/live/600/600',
  'https://picsum.photos/seed/gear/600/600',
  'https://picsum.photos/seed/team/600/600',
  'https://picsum.photos/seed/event/600/600',
  'https://picsum.photos/seed/studio2/600/600',
  'https://picsum.photos/seed/dj/600/600',
  'https://picsum.photos/seed/crowd/600/600',
];

const team = [
  { 
    name: 'Alex "Rhythm" D.', 
    role: 'Lead Producer', 
    specialty: 'Sega / Afrobeat', 
    bio: 'Pioneering the modern Sega sound, Alex blends traditional Mauritian rhythms with heavy 808s and electronic textures.',
    image: 'https://picsum.photos/seed/alex/800/800',
    socials: { instagram: '#', twitter: '#', soundcloud: '#' }
  },
  { 
    name: 'Sarah "Bass" M.', 
    role: 'DJ / Sound Engineer', 
    specialty: 'House / Techno', 
    bio: 'A master of the low end. Sarah has engineered award-winning tracks and commands the dancefloor with her dark, driving techno sets.',
    image: 'https://picsum.photos/seed/sarah/800/800',
    socials: { instagram: '#', twitter: '#', soundcloud: '#' }
  },
  { 
    name: 'Kevin "Keys" P.', 
    role: 'Composer', 
    specialty: 'Acoustic / Pop', 
    bio: 'Classically trained but raised on the streets of Port Louis, Kevin brings melodic sensibility and lush chord progressions to the empire.',
    image: 'https://picsum.photos/seed/kevin/800/800',
    socials: { instagram: '#', twitter: '#', soundcloud: '#' }
  },
];

export default function CompanyWebsite() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileTracklist, setShowMobileTracklist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const currentTrack = assets[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback error:", error);
          // If playback is prevented, we can optionally set isPlaying to false
          // setIsPlaying(false);
        });
      }
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

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

  const renderTrackItem = (track: any, index: number, prefix: string) => {
    const isActive = currentTrackIndex === index;
    return (
      <div 
        key={track.id}
        className={`group relative flex items-center justify-between p-4 md:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex-shrink-0 ${
          isActive 
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
        {/* Active state left accent bar */}
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
            className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
              isActive 
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
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 w-full z-50 px-6 md:px-12 lg:px-24 py-8 mix-blend-difference"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter uppercase">Wave Empire</div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center px-6 md:px-24"
          >
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 md:gap-10 text-5xl md:text-8xl font-bold tracking-tighter uppercase">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-white/40 transition-colors flex items-center gap-4 md:gap-8 group">
                <span className="text-sm md:text-xl font-mono text-white/40 group-hover:text-white transition-colors">01</span> About
              </a>
              <a href="#music" onClick={() => setIsMenuOpen(false)} className="hover:text-white/40 transition-colors flex items-center gap-4 md:gap-8 group">
                <span className="text-sm md:text-xl font-mono text-white/40 group-hover:text-white transition-colors">02</span> Music
              </a>
              <a href="#videos" onClick={() => setIsMenuOpen(false)} className="hover:text-white/40 transition-colors flex items-center gap-4 md:gap-8 group">
                <span className="text-sm md:text-xl font-mono text-white/40 group-hover:text-white transition-colors">03</span> Videos
              </a>
              <a href="#social" onClick={() => setIsMenuOpen(false)} className="hover:text-white/40 transition-colors flex items-center gap-4 md:gap-8 group">
                <span className="text-sm md:text-xl font-mono text-white/40 group-hover:text-white transition-colors">04</span> Social
              </a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-white/40 transition-colors flex items-center gap-4 md:gap-8 group">
                <span className="text-sm md:text-xl font-mono text-white/40 group-hover:text-white transition-colors">05</span> Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center justify-center h-full pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-full h-[60vh] md:h-[75vh]"
          >
            <h1 className="absolute left-0 z-20 text-[24vw] md:text-[14vw] leading-none font-bold tracking-tighter uppercase text-white mix-blend-difference pointer-events-none">
              WAVE
            </h1>
            
            <div className="relative z-10 w-[80%] md:w-[40%] h-full overflow-hidden border border-white/10">
              <Image 
                src="https://picsum.photos/seed/trio/1000/1400" 
                alt="3 people together" 
                fill 
                className="object-cover" 
                referrerPolicy="no-referrer" 
                priority
              />
            </div>
            
            <h1 className="absolute right-0 z-20 text-[24vw] md:text-[14vw] leading-none font-bold tracking-tighter uppercase text-white mix-blend-difference pointer-events-none text-right">
              EMPIRE
            </h1>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex justify-between items-end z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-end">
            <p className="text-xs md:text-sm max-w-[200px] md:max-w-xs text-white/60 uppercase tracking-widest leading-relaxed">
              Crafting the next generation of local Mauritian and international hits.
            </p>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 flex flex-col items-end gap-4">
              <span className="-rotate-90 origin-bottom-right mb-8">Scroll</span>
              <div className="w-px h-16 bg-white/10 relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 64] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-full h-1/2 bg-white absolute top-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left leading-tight md:leading-[0.9]">
                About<br/>Wave<br/>Empire
              </h2>
              <div className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50 flex flex-wrap items-center gap-4">
                <span>( Est. 2026 )</span>
                <span className="w-8 h-px bg-white/30 hidden sm:block"></span>
                <span>Sound Architects</span>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-8">
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                We are a collective of visionary producers, DJs, and sound engineers dedicated to pushing the boundaries of electronic and organic music. 
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed text-white/50">
                Born in Mauritius, our sound is a unique amalgamation of deep island rhythms, driving techno, and modern pop sensibilities. We don&apos;t just make tracks; we architect sonic experiences that resonate from underground clubs to massive festival stages. Wave Empire Music is more than a label&mdash;it&apos;s a movement.
              </p>
              <div className="relative aspect-video w-full mt-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/studio-wide/1280/720" 
                  alt="Wave Empire Studio" 
                  fill 
                  className="object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">The Artists</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="flex flex-col text-left border border-white/10 rounded-[2rem] p-6 md:p-8 bg-white/5 hover:bg-white/10 transition-colors group">
                <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden shadow-lg">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">{member.name}</h3>
                <p className="text-white/60 uppercase tracking-widest text-sm mb-4">{member.role}</p>
                <p className="text-white/40 font-mono text-xs mb-6">{member.specialty}</p>
                <p className="text-white/50 text-sm leading-relaxed font-light flex-1">{member.bio}</p>
                
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <a href={member.socials.instagram} className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href={member.socials.twitter} className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href={member.socials.soundcloud} className="text-white/40 hover:text-white transition-colors" aria-label="Soundcloud">
                    <Music size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section id="music" className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Sample Packs & Loops</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 md:h-[520px] lg:h-[560px]">
            {/* Player UI */}
            <div className="md:col-span-5 flex flex-col bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] h-full">
              <div className="relative aspect-square w-48 md:w-48 lg:w-64 mx-auto mb-6 lg:mb-8 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                <Image 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  fill 
                  className={`object-cover transition-all duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`} 
                  referrerPolicy="no-referrer"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
                )}
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
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white text-black rounded-full hover:bg-white/80 transition-colors"
                    title={`Buy ${currentTrack.price}`}
                  >
                    <ShoppingCart size={18} />
                  </a>
                </div>
                
                {/* Controls */}
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
                    <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors p-2">
                      <SkipBack size={24} />
                    </button>
                    <button 
                      onClick={togglePlay} 
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      {isPlaying ? <Pause size={28} className="fill-current lg:w-8 lg:h-8" /> : <Play size={28} className="fill-current ml-1.5 lg:w-8 lg:h-8" />}
                    </button>
                    <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors p-2">
                      <SkipForward size={24} />
                    </button>
                  </div>
                  
                  {/* Mobile Tracklist Toggle */}
                  <div className="mt-6 flex justify-center md:hidden">
                    <button 
                      onClick={() => setShowMobileTracklist(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
                    >
                      <ListMusic size={18} />
                      Show Tracklist
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop/Tablet Tracklist */}
            <div className="hidden md:flex md:col-span-7 flex-col gap-3 h-full overflow-y-auto pr-2 md:pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {assets.map((track, index) => renderTrackItem(track, index, 'desktop'))}
            </div>
          </div>
          <audio ref={audioRef} src={currentTrack.src} onTimeUpdate={handleTimeUpdate} onEnded={nextTrack} className="hidden" />
        </div>

        {/* Mobile Tracklist Overlay */}
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
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
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

      {/* Videos Section */}
      <section id="videos" className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Recent<br/>Releases</h2>
            <a href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit">
              View YouTube <ArrowUpRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col text-left">
              <div className="relative aspect-video w-full mb-6 bg-white/5 rounded-2xl overflow-hidden">
                <Image 
                  src={video.thumbnail} 
                  alt={video.title} 
                  fill 
                  className="object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-medium tracking-tight mb-2">{video.title}</h3>
              <p className="text-white/50 font-mono text-sm">{video.views} views</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Instagram</h2>
            <a href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit">
              @waveempire <ArrowUpRight size={16} />
            </a>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 lg:gap-6">
                {posts.map((post, i) => (
                  <div key={i} className="relative aspect-square w-[80%] md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] flex-none bg-white/5 overflow-hidden group rounded-2xl">
                    <Image 
                      src={post} 
                      alt={`Instagram post ${i+1}`} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={scrollPrev}
                  disabled={prevBtnDisabled}
                  className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors ${
                    prevBtnDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-black'
                  }`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={nextBtnDisabled}
                  className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors ${
                    nextBtnDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:text-black'
                  }`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Connect</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Socials */}
            <div className="flex flex-col text-left border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold tracking-tight mb-6 uppercase">Socials</h3>
              <ul className="flex flex-col gap-4 text-white/60 uppercase tracking-widest text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">Instagram <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">TikTok <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">Facebook <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>

            {/* Streaming */}
            <div className="flex flex-col text-left border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold tracking-tight mb-6 uppercase">Listen</h3>
              <ul className="flex flex-col gap-4 text-white/60 uppercase tracking-widest text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">Spotify <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">Apple Music <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2">YouTube <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>

            {/* Inquiries */}
            <div className="flex flex-col text-left border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold tracking-tight mb-6 uppercase">Inquiries</h3>
              <ul className="flex flex-col gap-4 text-white/60 uppercase tracking-widest text-sm">
                <li><a href="mailto:mgmt@waveempire.com" className="hover:text-white transition-colors flex items-center gap-2">mgmt@waveempire.com <ArrowUpRight size={14} /></a></li>
                <li><a href="mailto:press@waveempire.com" className="hover:text-white transition-colors flex items-center gap-2">press@waveempire.com <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter uppercase">Wave Empire</div>
          <div className="text-white/40 text-sm text-left md:text-right">
            © {new Date().getFullYear()} Wave Empire Music.<br/>All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
