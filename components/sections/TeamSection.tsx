'use client';

import Image from 'next/image';
import { Instagram, Twitter, Music } from 'lucide-react';
import { team } from '../data';
import Reveal from '../ui/Reveal';
import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect, useCallback } from 'react';
import CarouselControls from '../ui/CarouselControls';

export default function TeamSection() {
  // Mobile embla instance and state
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({ align: 'start', loop: true });
  const [prevDisabledMobile, setPrevDisabledMobile] = useState(true);
  const [nextDisabledMobile, setNextDisabledMobile] = useState(true);
  const [selectedIndexMobile, setSelectedIndexMobile] = useState(0);
  const [scrollSnapsMobile, setScrollSnapsMobile] = useState<number[]>([]);
  const scrollPrevMobile = useCallback(() => emblaApiMobile?.scrollPrev(), [emblaApiMobile]);
  const scrollNextMobile = useCallback(() => emblaApiMobile?.scrollNext(), [emblaApiMobile]);
  const scrollToMobile = useCallback((index: number) => emblaApiMobile?.scrollTo(index), [emblaApiMobile]);

  useEffect(() => {
    if (!emblaApiMobile) return;
    const onInit = (api: typeof emblaApiMobile) => setScrollSnapsMobile(api!.scrollSnapList());
    const onSelect = (api: typeof emblaApiMobile) => {
      setSelectedIndexMobile(api!.selectedScrollSnap());
      setPrevDisabledMobile(!api!.canScrollPrev());
      setNextDisabledMobile(!api!.canScrollNext());
    };
    // defer initial state updates to avoid synchronous setState inside effect
    queueMicrotask(() => {
      onInit(emblaApiMobile);
      onSelect(emblaApiMobile);
    });
    emblaApiMobile.on('reInit', onInit);
    emblaApiMobile.on('reInit', onSelect);
    emblaApiMobile.on('select', onSelect);
  }, [emblaApiMobile]);

  // Only keep embla state for desktop grid if needed (not used)
  return (
    <section className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">

        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">The Artists</h2>
          </div>
        </Reveal>

        {/* Mobile carousel */}
        <div className="block md:hidden">
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRefMobile}>
              <div className="flex gap-6">
                {team.map((member, i) => (
                  <div key={i} className="min-w-0 w-[85vw] max-w-xs flex-shrink-0">
                    <Reveal delay={i * 0.12} direction="up">
                      {/* Card content, same as grid below */}
                      <div className="flex flex-col h-full text-left border border-white/10 rounded-2xl p-6 bg-white/5 hover:bg-white/10 transition-colors group shadow-lg">
                        <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.stage}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h3 className="text-2xl font-extrabold tracking-tight mb-1 text-white leading-tight">{member.stage}</h3>
                        <p className="text-white/40 text-xs mb-2 font-mono leading-tight">{member.name}</p>
                        <p className="text-white/70 uppercase tracking-widest text-xs mb-2 font-semibold">{member.role}</p>
                        <p className="text-white/30 font-mono text-xs mb-4">{member.specialty}</p>
                        <p className="text-white/60 text-xs leading-relaxed font-light flex-1 mb-4">{member.bio}</p>
                        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
                          <a href={member.socials.instagram} className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                            <Instagram size={16} />
                          </a>
                          <a href={member.socials.twitter} className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                            <Twitter size={16} />
                          </a>
                          <a href={member.socials.soundcloud} className="text-white/40 hover:text-white transition-colors" aria-label="Soundcloud">
                            <Music size={16} />
                          </a>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
            <CarouselControls
              scrollSnaps={scrollSnapsMobile}
              selectedIndex={selectedIndexMobile}
              scrollTo={scrollToMobile}
              scrollPrev={scrollPrevMobile}
              scrollNext={scrollNextMobile}
              prevDisabled={prevDisabledMobile}
              nextDisabled={nextDisabledMobile}
            />
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-10 md:gap-8">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.12} direction="up">
              <div className="flex flex-col h-full text-left border border-white/10 rounded-2xl p-7 bg-white/5 hover:bg-white/10 transition-colors group shadow-lg">
                <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.stage}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight mb-1 text-white leading-tight">{member.stage}</h3>
                <p className="text-white/40 text-xs mb-2 font-mono leading-tight">{member.name}</p>
                <p className="text-white/70 uppercase tracking-widest text-xs mb-2 font-semibold">{member.role}</p>
                <p className="text-white/30 font-mono text-xs mb-4">{member.specialty}</p>
                <p className="text-white/60 text-xs leading-relaxed font-light flex-1 mb-4">{member.bio}</p>
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
                  <a href={member.socials.instagram} className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                    <Instagram size={16} />
                  </a>
                  <a href={member.socials.twitter} className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
                    <Twitter size={16} />
                  </a>
                  <a href={member.socials.soundcloud} className="text-white/40 hover:text-white transition-colors" aria-label="Soundcloud">
                    <Music size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
