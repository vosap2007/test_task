import React, { useState, useEffect } from 'react';

export interface CaveProps {
  caveData: number[][];
}

const Cave: React.FC<CaveProps> = ({ caveData }) => {
  const [caveSegments, setCaveSegments] = useState<number[][]>([]);

  useEffect(() => {
    const segments: number[][] = [];
    let position: number = 250; // Початкова позиція в центрі відображення

    for (const segment of caveData) {
      const left: number = position + segment[0];
      const right: number = position + segment[1];
      segments.push([left, right]);
      position = right; // Додайте величину поточного сегмента
    }

    setCaveSegments(segments);
  }, [caveData]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold my-4">Лабіринт</h2>
      <div className="w-64 h-96 border border-gray-300 relative">
        <svg width={500} height={400}>
          <rect x={0} y={0} width={500} height={400} fill="black" />
          {caveSegments.map((segment, index) => {
            console.log('segment', segment);
            const segmentHeight = 10; // Висота сегменту
            const minX = 0; // Мінімальне значення x
            const maxX = 500; // Максимальне значення x (ширина лабіринту)

            const x = Math.max(minX, segment[0]); // Обмежуємо x мінімальним значенням
            const width = Math.min(maxX, segment[1]) - x; // Обмежуємо ширину, щоб не виходила за межі

            return (
              <rect
                key={index}
                x={x}
                y={index * segmentHeight}
                width={width}
                height={segmentHeight}
                fill="gray"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default Cave;
