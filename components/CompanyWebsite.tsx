'use client';

import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import TeamSection from './sections/TeamSection';
import MusicPlayerSection from './sections/MusicPlayerSection';
import VideosSection from './sections/VideosSection';
import SocialSection from './sections/SocialSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import ShowcaseVideoSection from './sections/ShowcaseVideoSection';

export default function CompanyWebsite() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ShowcaseVideoSection />
      <MusicPlayerSection />
      <VideosSection />
      <SocialSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
