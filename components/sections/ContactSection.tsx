'use client';

import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">

        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">Connect</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <Reveal delay={0} direction="up">
            <div className="flex flex-col text-left border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold tracking-tight mb-6 uppercase">Socials</h3>
              <ul className="flex flex-col gap-4 text-white/60 uppercase tracking-widest text-sm">
                <li><a href="#" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">Instagram <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">TikTok <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">Facebook <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} direction="up">
            <div className="flex flex-col text-left border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold tracking-tight mb-6 uppercase">Listen</h3>
              <ul className="flex flex-col gap-4 text-white/60 uppercase tracking-widest text-sm">
                <li><a href="#" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">Spotify <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">Apple Music <ArrowUpRight size={14} /></a></li>
                <li><a href="#" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">YouTube <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="up">
            <div className="flex flex-col text-left border-t border-white/20 pt-6">
              <h3 className="text-xl font-bold tracking-tight mb-6 uppercase">Inquiries</h3>
              <ul className="flex flex-col gap-4 text-white/60 uppercase tracking-widest text-sm">
                <li><a href="mailto:mgmt@waveempire.com" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">mgmt@waveempire.com <ArrowUpRight size={14} /></a></li>
                <li><a href="mailto:press@waveempire.com" className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2">press@waveempire.com <ArrowUpRight size={14} /></a></li>
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
