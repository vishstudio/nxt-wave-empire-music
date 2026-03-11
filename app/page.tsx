'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import CompanyWebsite from '@/components/CompanyWebsite';
import { HeroReadyContext } from '@/components/context/HeroReadyContext';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <HeroReadyContext.Provider value={!loading}>
      {/* Website renders immediately so it's visible under the loader curtain wipe */}
      <CompanyWebsite />
      {loading && <Loader onComplete={() => setLoading(false)} />}
    </HeroReadyContext.Provider>
  );
}
