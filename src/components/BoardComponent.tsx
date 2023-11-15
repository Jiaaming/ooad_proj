// src/components/BoardComponent.tsx
import React from 'react';
import SquareComponent from './SquareComponent';
import { Board } from '../classes/Board';
// src/components/BoardComponent.tsx
// ...其他代码

type BoardComponentProps = {
    board: Board;
    playerPositions: { [key: string]: number };
    playerColors: { [key: string]: string }; // 新增道具，玩家名称和颜色的映射
};

const BoardComponent = ({ board, playerPositions, playerColors }: BoardComponentProps) => {
    return (
        <div>
            {board.squares.map((square, index) => {
                let color = 'grey'; // 默认颜色
                Object.keys(playerPositions).forEach(playerName => {
                    if (playerPositions[playerName] === index) {
                        // 使用传入的颜色
                        color = playerColors[playerName];
                    }
                });
                return <SquareComponent key={index} color={color} name={square.name} />;
            })}
        </div>
    );
};


export default BoardComponent;
