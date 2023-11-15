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

// src/components/BoardComponent.tsx
// ...其他代码

const BoardComponent = ({ board, playerPositions, playerColors }: BoardComponentProps) => {
    return (
        <div>
            {board.squares.map((square, index) => {
                // 收集同一个方格上的所有玩家颜色
                const colorsInSquare = Object.keys(playerPositions)
                    .filter(playerName => playerPositions[playerName] === index)
                    .map(playerName => playerColors[playerName]);

                // 根据颜色数量生成颜色字符串，用于渐变
                let colorStyle = colorsInSquare.length > 1 
                    ? `linear-gradient(${colorsInSquare.join(', ')})`
                    : colorsInSquare[0] || 'grey'; // 如果只有一个颜色或没有玩家，则不使用渐变

                return (
                    <SquareComponent 
                        key={index}
                        color={colorStyle} // 这里传递颜色样式字符串
                        name={square.name}
                    />
                );
            })}
        </div>
    );
};

export default BoardComponent;
