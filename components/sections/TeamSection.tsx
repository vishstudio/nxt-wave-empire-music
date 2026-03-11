'use client';

import Image from 'next/image';
import { Instagram, Twitter, Music } from 'lucide-react';
import { team } from '../data';
import Reveal from '../ui/Reveal';

export default function TeamSection() {
  return (
    <section className="py-24 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">

        <Reveal>
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-left">The Artists</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.12} direction="up">
              <div className="flex flex-col h-full text-left border border-white/10 rounded-[2rem] p-6 md:p-8 bg-white/5 hover:bg-white/10 transition-colors group">
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
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
