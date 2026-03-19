'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { posts } from '../data';
import CarouselControls from '../ui/CarouselControls';
import Reveal from '../ui/Reveal';

const MAX_DESC_LENGTH = 95;

function truncateText(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

export default function SocialSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });
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
    // defer initial state updates to avoid synchronous setState inside effect
    queueMicrotask(() => {
      onInit(emblaApi);
      onSelect(emblaApi);
    });
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  // Auto loop for carousel
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="social" className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">

        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Instagram</h2>
            <a href="#" className="cursor-pointer inline-flex items-center gap-2 text-sm uppercase tracking-widest border-b border-white pb-1 w-fit hover:text-white/60 hover:border-white/60 transition-colors duration-200">
              @waveempire <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4 lg:gap-6">
                {posts.map((post, i) => (
                  <div
                    key={i}
                    className="cursor-pointer relative aspect-square w-[80%] md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] flex-none bg-white/5 overflow-hidden group rounded-2xl"
                  >
                    <Image
                      src={post.image}
                      alt={`Instagram post ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-end">
                      <p className="text-sm md:text-base leading-snug text-white/95">
                        {truncateText(post.description, MAX_DESC_LENGTH)}
                      </p>
                    </div>
                  </div>
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
