'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import CompanyWebsite from '@/components/CompanyWebsite';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />
      {!loading && <CompanyWebsite />}
    </>
  );
}
