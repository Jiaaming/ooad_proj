// src/components/GameComponent.tsx
import React, { useState } from 'react';
import BoardComponent from './BoardComponent';
import SetupComponent from './SetupComponent';
import { MonopolyGame } from '../classes/MonopolyGame';

const GameComponent = () => {
    const [game, setGame] = useState<MonopolyGame | null>(null);
    const [version, setVersion] = useState(0); // 状态更新的版本号现在位于组件顶部
    const [lastRoll, setLastRoll] = useState<number | null>(null); // 添加一个新状态来追踪最后一次掷骰子的结果
    const [lastPlayer, setLastPlayer] = useState<string | null>(null); // 添加一个新状态来追踪最后一次掷骰子的结果
    const startGame = (playerNames: string[]) => {
        setGame(new MonopolyGame(playerNames));
    };

    if (game === null) {
        // 游戏未开始，显示设置表单
        return <SetupComponent onStart={startGame} />;
    }
    const handleRollAndMove = () => {
        if (!game.isOver) {
            setLastPlayer(game.current_player.name)
            const roll = game.play_round(); // 玩一轮游戏
            setLastRoll(roll); // 更新最后一次掷骰子的结果
            setVersion(v => v + 1); // 触发重新渲染
        } else {
            setLastRoll(null)
            console.log("The game has ended.");
        }
    };
    const handleResetGame = () => {
        game.reset_game(); // 调用重置游戏的方法
        setLastRoll(null)
        setVersion(v => v + 1); // 更新版本状态以触发重新渲染

    };

    const playerColors = game.players.reduce((acc, player) => {
        acc[player.name] = player.color;
        return acc;
    }, {} as { [key: string]: string });

    // 将玩家位置映射到棋盘上
    const playerPositions = game.players.reduce((acc, player) => {
        acc[player.name] = player.position;
        return acc;
    }, {} as { [key: string]: number });

    return (
        <div>
            <div>
                <h1>Monopoly Game😋 by Jiaming</h1>
                <p>ver 1.0</p>
            </div>
            <BoardComponent board={game.board} playerPositions={playerPositions} playerColors={playerColors} />
            {!game.isOver ? (
                <>
                    <h2>{lastRoll !== null && <p>{lastPlayer} just roll: {lastRoll}</p>}</h2>
                    <button style={{width:'180px', height:'50px',fontSize:'20px'}}onClick={handleRollAndMove}>Roll and Move🏃🏼‍♂️</button>
                    <h2>{game.current_player.name} will roll🥳</h2>
                    <button style={{width:'180px', height:'50px',fontSize:'20px'}} onClick={handleResetGame}>Restart Game</button>
                    
                </>
            ) : (
                <>
                <h2>Game Over🤩! {lastPlayer} has won🙌!</h2>
                <button onClick={handleResetGame}>Restart Game</button>
                </>
            )}


            <div>
                <h3>Player Positions🏠:</h3>
                <h4>
                    {game.players.map(player => (
                        <li key={player.name} style={{ color: player.color }}>
                            {player.name}: {playerPositions[player.name]} (Color: {player.color})
                        </li>
                    ))}
                </h4>
            </div>
        </div>
    );
};

export default GameComponent;
