'use client';
import React, { useState } from 'react';
import Cave from '@/components/Cave';
import Drone from '@/components/Drone';
import GameComponent from '@/components/GameComponent';

const Home = () => {
  const [caveData, setCaveData] = useState<number[][]>([]);

  const updateCaveData = (newCaveData: number[][]) => {
    // Оновлюємо дані печери
    setCaveData((prevCaveData) => [...prevCaveData, ...newCaveData]);
  };

  console.log('caveData', caveData);

  return (
    <div>
      {caveData.length > 0 && <Cave caveData={caveData} />}
      <GameComponent updateCaveData={updateCaveData} />
      {/* <Drone /> */}
    </div>
  );
};

export default Home;
