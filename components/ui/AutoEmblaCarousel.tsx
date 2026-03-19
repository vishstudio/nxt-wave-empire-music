"use client";
import { useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface AutoEmblaCarouselProps {
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoLoop?: boolean;
  autoInterval?: number;
  children: (emblaRef: any, emblaApi: any) => React.ReactNode;
}

export default function AutoEmblaCarousel({
  options,
  autoLoop = false,
  autoInterval = 3500,
  children,
}: AutoEmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!emblaApi || !autoLoop) return;
    function next() {
      if (!emblaApi) return;
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }
    timer.current = setInterval(next, autoInterval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [emblaApi, autoLoop, autoInterval]);

  return <>{children(emblaRef, emblaApi)}</>;
}
