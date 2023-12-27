// src/models/MonopolyGame.ts
import { Player } from './Player';
import { Board } from './Board';
import { Dice } from './Dice';
import { Piece } from "./Piece";

export class MonopolyGame {
  players: Player[];
  board: Board;
  dice1: Dice;
  dice2: Dice;
  roundCnt: number;
  currentPlayerIndex: number;
  lastPlayerIndex: number;
  isOver: boolean
  squareCount: number
  endRound: number
  winner: Player | null
  constructor(playerNames: string[], squareCount?: number, endRound?: number, goSquareDensity?: number) {
    this.squareCount = squareCount !== undefined ? squareCount : 60;
    this.endRound = endRound !== undefined ? endRound : 30;
    this.board = new Board(this.squareCount,goSquareDensity!== undefined ? goSquareDensity : 0);
    this.dice1 = new Dice();
    this.dice2 = new Dice();
    this.players = playerNames.map(name => new Player(name, this.board));
    this.roundCnt = 0;
    this.currentPlayerIndex = 0;
    this.lastPlayerIndex = 0; // 开始时设置当前玩家为第一个玩家
    this.isOver = false
    this.winner = null
  }

  start_game(): void {
    // 游戏开始的逻辑
    this.roundCnt = 0;
    this.currentPlayerIndex = 0; // 重置为第一个玩家
    console.log("Game started");
  }

  play_round(): number[] {
    // 只控制当前活动玩家的行动,
    if (this.roundCnt >= this.endRound) {
        console.log("Game over.");
        for (let i = 0; i < this.players.length; i++) {
            if (this.winner === null) {
                this.winner = this.players[i]
            }else {
                if (this.winner.point < this.players[i].point) {
                    this.winner = this.players[i]
                }
            }
        }
        this.isOver = true
    }
    if (this.isOver) {
      console.log("The game is over.");
      return [-1, -1, 0];
    }
    let dice_one_val = this.dice1.roll()
    let dice_two_val = this.dice2.roll()
    let lastPointGain = 0;
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer.isTrapped) {
        console.log(`Player ${currentPlayer.name} is trapped and cannot play.`);
        dice_one_val = 0;
        dice_two_val = 0;
        currentPlayer.moveAndGainPoint(dice_one_val + dice_two_val);
    }else {
        lastPointGain = currentPlayer.moveAndGainPoint(dice_one_val + dice_two_val);
    }

    // 更新当前玩家索引以轮到下一个玩家
    this.lastPlayerIndex = this.currentPlayerIndex;
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    if (this.currentPlayerIndex === 0) {
      // 如果回到了第一个玩家，增加回合计数
      this.roundCnt++;
      console.log(`Round ${this.roundCnt} completed.`);
    }
    console.log(this.getLastPlayerSquareType())
    return [dice_one_val , dice_two_val, lastPointGain];
  }
  getLastPlayerSquareType(): string {
    const squareType =  this.players[this.lastPlayerIndex].piece.location.getType();
    return squareType
  }
  doSquareEvent(): void {
    const lastPlayer = this.lastPlayer;
    console.log(lastPlayer)
    lastPlayer.piece.location.SquareEvent(lastPlayer);
  }
  reset_game(): void {
    this.players.forEach(player => {
      player.piece.location = this.board.squares[0]; // 重置玩家位置
    });
    this.roundCnt = 0;
    this.currentPlayerIndex = 0;
    this.isOver = false; // 重置游戏结束标志
    console.log("Game has been reset.");
  }

  updateGame(): MonopolyGame {
    // 这里可以添加其他逻辑
    return this; // 返回当前游戏实例的引用
  }
  // 获取当前活动玩家
  get currentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
  get lastPlayer():Player {
    return this.players[this.lastPlayerIndex]
  }
}
