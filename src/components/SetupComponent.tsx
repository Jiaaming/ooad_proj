// src/components/SetupComponent.tsx
import React, { useState } from 'react';

type SetupComponentProps = {
  onStart: (playerNames: string[], squareCount: number, endRound: number, goSquareDensity: number) => void;
};

const SetupComponent = ({ onStart }:SetupComponentProps) => {
  // 初始两个空字符串表示最少两个玩家名字
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [squareCount, setSquareCount] = useState(35); // 管理 squareCount 的状态
  const [endRound, setEndRound] = useState(30); // 管理 endRound 的状态
  const [goSquareDensity, setGoSquareDensity] = useState(0)
  const handleStartClick = () => {
    // 过滤掉空字符串，确保所有玩家都有名字
    const validNames = playerNames.filter(name => name.trim() !== '');
    if (isNaN(squareCount) && squareCount <= 10) {
      alert('Please enter a valid number of squares.');
    }
    if (validNames.length >= 2) {
      onStart(validNames, squareCount, endRound,goSquareDensity); // 返回玩家名单和 squareCount
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
  const updateSquareCount = (value: string) => {
    const count = parseInt(value, 10); // 将输入的字符串转换为数字
    setSquareCount(count); // 更新 squareCount 的状态

  }

    const updateEndRoundCount = (value: string) => {
    const count = parseInt(value, 10); // 将输入的字符串转换为数字
    setEndRound(count); // 更新 squareCount 的状态
  }

  const updateGoSquareDensity = (value: string) => {
    const count = parseInt(value, 10); // 将输入的字符串转换为数字
    setGoSquareDensity(count); // 更新 squareCount 的状态
  }
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
            <div> How many squares?</div>

      <div style={{ padding: '10px' }}>
        <input
            type= "number"
            placeholder= "How many squares?"
            value= {squareCount}
            onChange={(e) => updateSquareCount(e.target.value)}
        />
      </div>
      <div> End Round at:</div>

      <div style={{ padding: '10px' }}>
        <input
            type= "number"
            placeholder= "End round at?"
            value= {endRound}
            onChange={(e) => updateEndRoundCount(e.target.value)}
        />
      </div>

      <div> Go Square Density:</div>
      <div style={{ padding: '10px' }}>
        <input
            type= "number"
            placeholder= "Go Square Density?"
            value= {goSquareDensity}
            onChange={(e) => updateGoSquareDensity(e.target.value)}
        />
      </div>
      <button style={{ marginLeft: '10px' }} onClick={handleStartClick}>Start Game</button>
    </div>
  );
};

export default SetupComponent;
