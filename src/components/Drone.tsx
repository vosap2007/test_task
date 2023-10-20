'use client';
import React, { useState, useEffect } from 'react';

const Drone = () => {
  const [horizontalSpeed, setHorizontalSpeed] = useState(0);
  const [verticalSpeed, setVerticalSpeed] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      // Зменшуємо горизонтальну швидкість при натисканні клавіші "Вліво"
      setHorizontalSpeed((prevSpeed) => prevSpeed - 1);
    } else if (e.key === 'ArrowRight') {
      // Збільшуємо горизонтальну швидкість при натисканні клавіші "Вправо"
      setHorizontalSpeed((prevSpeed) => prevSpeed + 1);
    } else if (e.key === 'ArrowUp') {
      // Збільшуємо вертикальну швидкість при натисканні клавіші "Вгору"
      setVerticalSpeed((prevSpeed) => prevSpeed + 1);
    } else if (e.key === 'ArrowDown') {
      // Зменшуємо вертикальну швидкість при натисканні клавіші "Вниз"
      setVerticalSpeed((prevSpeed) => prevSpeed - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Управління дроном</h2>
      <div className="flex flex-col items-center">
        <div className="my-4">
          <p>Горизонтальна швидкість:</p>
          <p className="text-3xl font-bold">{horizontalSpeed}</p>
        </div>
        <div className="my-4">
          <p>Вертикальна швидкість:</p>
          <p className="text-3xl font-bold">{verticalSpeed}</p>
        </div>
      </div>
    </div>
  );
};

export default Drone;
