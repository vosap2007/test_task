'use client';
import React, { useState } from 'react';
import Axios from 'axios';

interface GameComponentProps {
  updateCaveData: (caveData: number[][]) => void;
}

const GameComponent: React.FC<GameComponentProps> = ({ updateCaveData }) => {
  const [name, setName] = useState('');
  const [complexity, setComplexity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Додайте стан для відстеження оновлення

  const [caveData, setCaveData] = useState<number[][]>([]);

  const handleStartGame = () => {
    setIsLoading(true);

    Axios.post('https://cave-drone-server.shtoa.xyz/init', {
      name,
      complexity,
    })
      .then((response) => {
        const playerId = response.data.id;
        startGame(playerId);
      })
      .catch((error) => {
        console.error('Помилка ініціалізації гри:', error);
        setIsLoading(false);
      });
  };

  const startGame = (playerId: string) => {
    const getToken = async () => {
      let token = '';

      for (let chunkNo = 1; chunkNo <= 4; chunkNo++) {
        const response = await fetch(
          `https://cave-drone-server.shtoa.xyz/token/${chunkNo}?id=${playerId}`,
        );

        const data = await response.json();
        token += data.chunk;
      }

      return token;
    };

    getToken()
      .then((token) => {
        const webSocket = new WebSocket(
          `wss://cave-drone-server.shtoa.xyz/cave`,
        );

        webSocket.onmessage = (event) => {
          if (event.data === 'finished') {
            // Оновлення завершено
            setIsUpdating(false); // Встановіть стан isUpdating на false
          } else {
            const data = event.data.split(',');
            const leftWallPosition = parseFloat(data[0]);
            const rightWallPosition = parseFloat(data[1]);

            updateCaveData([
              ...caveData,
              [leftWallPosition, rightWallPosition],
            ]);
          }
        };

        webSocket.onopen = () => {
          const initialMessage = `player:${playerId}-${token}`;
          webSocket.send(initialMessage);
        };

        webSocket.onclose = (event) => {
          if (event.code !== 1000) {
            console.error('Помилка під час зєднання з сервером:', event.reason);
          }
        };
      })
      .catch((error) => {
        console.error('Помилка під час отримання токену:', error);
      });

    setIsUpdating(true); // Встановіть стан isUpdating на true при початку оновлення
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Гра "Зонд у печері"</h1>
      <h2>Ініціалізація гри</h2>
      <label>
        Ім'я гравця:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Складність гри:
        <input
          type="number"
          value={complexity}
          onChange={(e) => setComplexity(parseInt(e.target.value))}
        />
      </label>
      <br />
      <button onClick={handleStartGame} disabled={isLoading || isUpdating}>
        {isLoading
          ? 'Завантаження...'
          : isUpdating
          ? 'Оновлення...'
          : 'Почати гру'}
      </button>
    </div>
  );
};

export default GameComponent;
