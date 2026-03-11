'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { videos } from '../data';
import CarouselControls from '../ui/CarouselControls';
import Reveal from '../ui/Reveal';

export default function VideosSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onInit = useCallback((api: typeof emblaApi) => {
    setScrollSnaps(api!.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: typeof emblaApi) => {
    setSelectedIndex(api!.selectedScrollSnap());
    setPrevDisabled(!api!.canScrollPrev());
    setNextDisabled(!api!.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section id="videos" className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">

        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Recent<br />Releases</h2>
            <a href="#" className="cursor-pointer inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit hover:text-white/60 hover:border-white/60 transition-colors duration-200">
              View YouTube <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 lg:gap-6">
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col text-left flex-none w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] cursor-pointer group"
                  >
                    <div className="relative aspect-video w-full mb-4 bg-white/5 rounded-2xl overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium tracking-tight mb-1 group-hover:text-white/70 transition-colors duration-200">{video.title}</h3>
                    <p className="text-white/50 font-mono text-sm">{video.views} views</p>
                  </a>
                ))}
              </div>
            </div>

            <CarouselControls
              scrollSnaps={scrollSnaps}
              selectedIndex={selectedIndex}
              scrollTo={scrollTo}
              scrollPrev={scrollPrev}
              scrollNext={scrollNext}
              prevDisabled={prevDisabled}
              nextDisabled={nextDisabled}
            />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
