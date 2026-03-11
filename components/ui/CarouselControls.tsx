'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  scrollSnaps: number[];
  selectedIndex: number;
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}

export default function CarouselControls({
  scrollSnaps,
  selectedIndex,
  scrollTo,
  scrollPrev,
  scrollNext,
  prevDisabled,
  nextDisabled,
}: CarouselControlsProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`cursor-pointer h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/60 w-2 hover:w-4'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={scrollPrev}
          disabled={prevDisabled}
          className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-200 ${prevDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-white hover:text-black hover:scale-105'
            }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollNext}
          disabled={nextDisabled}
          className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-200 ${nextDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-white hover:text-black hover:scale-105'
            }`}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
