'use client';

import { createContext, useContext } from 'react';

export const HeroReadyContext = createContext(false);
export const useHeroReady = () => useContext(HeroReadyContext);
