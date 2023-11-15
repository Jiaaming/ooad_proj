// src/components/SetupComponent.tsx
import React, { useState } from 'react';

type SetupComponentProps = {
  onStart: (playerNames: string[]) => void;
};

const SetupComponent = ({ onStart }:SetupComponentProps) => {
  // 初始两个空字符串表示最少两个玩家名字
  const [playerNames, setPlayerNames] = useState(['', '']);

  const handleStartClick = () => {
    // 过滤掉空字符串，确保所有玩家都有名字
    const validNames = playerNames.filter(name => name.trim() !== '');
    if (validNames.length >= 2) {
      onStart(validNames);
    } else {
      alert('Please enter at least two player names.');
    }
  };

  const handleAddPlayer = () => {
    if (playerNames.length < 4) {
      setPlayerNames([...playerNames, '']); // 添加一个新的玩家名字输入字段
    } else {
      alert('Maximum number of players is 4.');
    }
  };

  const handleRemovePlayer = (index: number) => {
    if (playerNames.length > 2) {
      const newPlayerNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newPlayerNames);
    } else {
      alert('Minimum number of players is 2.');
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Setup Monopoly Game🤠</h1>
      {playerNames.map((name, index) => (
        <div key={index} style={{ padding: '10px' }}>
          <input
            type="text"
            placeholder={`Player ${index + 1} name`}
            value={name}
            onChange={(e) => updatePlayerName(index, e.target.value)}
          />
          {playerNames.length > 2 && (
            <button style={{ marginLeft: '10px' }} onClick={() => handleRemovePlayer(index)}>Remove</button>
          )}
        </div>
      ))}
      {playerNames.length < 4 && (
        <button onClick={handleAddPlayer}>Add Player</button>
      )}
      <button style={{ marginLeft: '10px' }} onClick={handleStartClick}>Start Game</button>
    </div>
  );
};

export default SetupComponent;
