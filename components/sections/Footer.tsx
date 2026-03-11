'use client';

import Reveal from '../ui/Reveal';

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-screen-2xl mx-auto w-full">
        <Reveal direction="none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-2xl font-bold tracking-tighter uppercase">Wave Empire</div>
            <div className="text-white/40 text-sm text-left md:text-right">
              © {new Date().getFullYear()} Wave Empire Music.<br />All rights reserved.
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
