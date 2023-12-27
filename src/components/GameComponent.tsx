// src/components/GameComponent.tsx
import React, {useState} from 'react';
import BoardComponent from './BoardComponent';
import SetupComponent from './SetupComponent';
import {MonopolyGame} from '../classes/MonopolyGame';

const GameComponent = () => {
    const [game, setGame] = useState<MonopolyGame | null>(null);
    const [lastMoveRes, setLastMoveRes] = useState<number [] | null>(null); // 添加一个新状态来追踪最后一次掷骰子的结果
    const [lastPlayer, setLastPlayer] = useState<string | null>(null);
    const [lastSquare, setLastSquare] = useState<string | null>(null);
    const [version, setVersion] = useState<number>(0);
    const [hasDoneSquareEvent, setHasDoneSquareEvent] = useState(false);
    const [actionMessage, setActionMessage] = useState('');
    const startGame = (playerNames: string[], squareCount: number, endRound: number, goSquareDensity: number) => {
        setGame(new MonopolyGame(playerNames, squareCount, endRound, goSquareDensity));
    };

    if (game === null) {
        // 游戏未开始，显示设置表单
        return <SetupComponent onStart={startGame}/>;
    }
    const doSquareEvent = () => {
        game.doSquareEvent()
        setVersion(version + 1)
        setHasDoneSquareEvent(true); // 标记已执行 square event

    }
    const handleRollAndMove = () => {
        if (!game.isOver) {
            if (!hasDoneSquareEvent) {
                alert("You must do a square event before moving!");
                return;
            }

            setLastPlayer(game.currentPlayer.name);
            const [roll1, roll2, point] = game.play_round();
            setLastSquare(game.getLastPlayerSquareType());

            setLastMoveRes([roll1, roll2, point]);

            setHasDoneSquareEvent(false); // 重置状态，为下一轮做准备
        } else {
            setLastMoveRes(null);
            console.log("The game has ended.");
        }
    };
    const handleResetGame = () => {
        game.reset_game(); // 调用重置游戏的方法
        setLastMoveRes(null)
    };

    const buyProperty = () => {
        const res = game.lastPlayer.buyProperty(1);
        setActionMessage(res ? 'Purchase successful!' : 'Purchase failed.');
        setVersion(version + 1);
        return res;
    }
    const buyLuckyCard = () => {
        const res = game.lastPlayer.buyLuckyCard();
        setActionMessage(res ? 'Purchase successful!' : 'Purchase failed.');
        setVersion(version + 1);
        return res;
    }
    const useLuckyCardBuy = () => {
        const res = game.lastPlayer.useLuckyCardBuy();
        setActionMessage(res ? 'Lucky card buy successful!' : 'Lucky card buy failed.');
        setVersion(version + 1);
        return res;
    }
    const sellProperty = () => {
        const res = game.lastPlayer.sellProperty();
        setVersion(version + 1);
        setActionMessage(res ? 'Sale successful!' : 'Sale failed.');
        return res;
    }

    const useLuckyCardEscape = () => {
        const res = game.lastPlayer.useLuckyCard();
        setVersion(version + 1);
        setActionMessage(res ? 'Use card successful!' : 'Use card failed.');
        return res;
    }
    const playerColors = game.players.reduce((acc, player) => {
        acc[player.name] = player.color;
        return acc;
    }, {} as { [key: string]: string });

    // 将玩家位置映射到棋盘上
    const playerPositions = game.players.reduce((acc, player) => {
        acc[player.name] = player.piece.getPieceNum();
        return acc;
    }, {} as { [key: string]: number });

    return (
        <div>
            <div>
                <h1>Monopoly Game😋 by Jiaming</h1>
                <p>Current Round: {game.roundCnt}, End at Round: {game.endRound}</p>
            </div>
            <BoardComponent board={game.board} playerPositions={playerPositions} playerColors={playerColors}/>
            {!game.isOver ? (
                <>
                    <h2>
                        {lastMoveRes !== null && (
                            lastMoveRes[0] + lastMoveRes[1] === 0
                                ? <p>Player {lastPlayer} is trapped and cannot play or gain point.</p>
                                : <p>{lastPlayer} just roll: {lastMoveRes[0]} and {lastMoveRes[1]},
                                    Gain {lastMoveRes[2]} points and went to {lastSquare}</p>
                        )}
                    </h2>
                    {/* 根据 lastSquare 的类型渲染不同的按钮 */}
                    {actionMessage && <p>{actionMessage}</p>}
                    {lastSquare === 'PropertySquare' && (
                        <>
                            <button style={{width: '180px', height: '50px', fontSize: '20px'}} onClick={buyProperty}
                                    disabled={!hasDoneSquareEvent}>Buy
                                Property
                            </button>
                            <button style={{width: '180px', height: '50px', fontSize: '20px'}}
                                    onClick={useLuckyCardBuy}
                                    disabled={!hasDoneSquareEvent}>Lucky Card Buy

                            </button>
                            <button style={{width: '180px', height: '50px', fontSize: '20px'}}
                                    onClick={sellProperty}
                                    disabled={!hasDoneSquareEvent}>Sell Property
                            </button>
                        </>
                    )}

                    {lastSquare === 'LuckyCardSquare' && (
                        <>
                            <button style={{width: '180px', height: '50px', fontSize: '20px'}}
                                    onClick={buyLuckyCard}
                                    disabled={!hasDoneSquareEvent}>Buy LuckyCard
                            </button>
                        </>
                    )}

                    {lastSquare === 'JailSquare' && (
                        <>
                            <button style={{width: '180px', height: '50px', fontSize: '20px' }}
                                    onClick={useLuckyCardEscape}
                                    disabled={!hasDoneSquareEvent}>Use LuckyCard Escape!
                            </button>
                        </>
                    )}
                    <>
                        <button
                            style={{
                                width: '200px',
                                height: '50px',
                                fontSize: '20px',
                            }}
                            onClick={doSquareEvent}
                            disabled={hasDoneSquareEvent} // 当已执行时禁用按钮
                        >
                            Do square Event️🧐
                        </button>

                        <h2>{game.currentPlayer.name} will roll 🥳 After {lastPlayer} finished</h2>

                        <button
                            style={{
                                width: '180px',
                                height: '50px',
                                fontSize: '20px',
                            }}
                            onClick={handleRollAndMove}
                            disabled={!hasDoneSquareEvent} // 当未执行时禁用按钮
                        >
                            Roll and Move🏃🏼‍♂️
                        </button>
                    </>

                    <button style={{width: '180px', height: '50px', fontSize: '20px'}} onClick={handleResetGame}>Restart
                        Game
                    </button>

                </>
            ) : (
                <>
                    <h2>Game Over🤩! {game.winner?.name} has won🙌!</h2>
                    <button onClick={handleResetGame}>Restart Game</button>
                </>
            )}


            <div>
                <h3>Player Positions🏠:</h3>
                <h4>
                    {game.players.map(player => (
                        <li key={player.name} style={{color: player.color}}>
                            {player.name}'s position: {playerPositions[player.name]},
                            points: {player.point},
                            lucky cards: {player.luckyCard},
                            isTrapped: {player.isTrapped ? 'true' : 'false'}
                        </li>
                    ))}
                </h4>
            </div>
        </div>
    );
};

export default GameComponent;
