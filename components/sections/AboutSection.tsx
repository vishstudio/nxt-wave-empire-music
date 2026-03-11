'use client';

import Reveal from '../ui/Reveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          <Reveal className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left leading-tight md:leading-[0.9]">
              About<br />Wave<br />Empire
            </h2>
            <div className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50 flex flex-wrap items-center gap-4">
              <span>( Est. 2026 )</span>
              <span className="w-8 h-px bg-white/30 hidden sm:block" />
              <span>Sound Architects</span>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7 flex flex-col gap-8">
            <p className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
              We are a collective of visionary producers, DJs, and sound engineers dedicated to pushing the boundaries of electronic and organic music.
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed text-white/50">
              Born in Mauritius, our sound is a unique amalgamation of deep island rhythms, driving techno, and modern pop sensibilities. We don&apos;t just make tracks; we architect sonic experiences that resonate from underground clubs to massive festival stages. Wave Empire Music is more than a label&mdash;it&apos;s a movement.
            </p>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
