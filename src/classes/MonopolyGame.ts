// src/models/MonopolyGame.ts
import { Player } from './Player';
import { Board } from './Board';
import { Dice } from './Dice';

export class MonopolyGame {
  players: Player[];
  board: Board;
  dice: Dice;
  roundCnt: number;
  currentPlayerIndex: number; // 当前玩家的索引
  isOver: boolean

  constructor(playerNames: string[]) {
    this.board = new Board();
    this.dice = new Dice();
    this.players = playerNames.map(name => new Player(name));
    this.roundCnt = 0;
    this.currentPlayerIndex = 0; // 开始时设置当前玩家为第一个玩家
    this.isOver = false
  }

  start_game(): void {
    // 游戏开始的逻辑
    this.roundCnt = 0;
    this.currentPlayerIndex = 0; // 重置为第一个玩家
    console.log("Game started");
  }

  play_round(): number {
    // 只控制当前活动玩家的行动
    if (this.isOver) {
      console.log("The game is over.");
      return -1;
    }

    const currentPlayer = this.players[this.currentPlayerIndex];
    const rollSum = this.dice.roll()
    currentPlayer.move(rollSum);
    console.log(`${currentPlayer.name} rolled a ${rollSum} and moved to position ${currentPlayer.position}`);
    
    // 更新当前玩家索引以轮到下一个玩家
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    if (this.currentPlayerIndex === 0) {
      // 如果回到了第一个玩家，增加回合计数
      this.roundCnt++;
      console.log(`Round ${this.roundCnt} completed.`);
    }
    const winningPlayer = this.players.find(player => player.position >= 35);
    if (winningPlayer) {
      console.log(`${winningPlayer.name} has won the game!`);
      this.isOver = true; // 设置游戏结束状态
    }
    // TODO: 这里可以添加玩家移动后的逻辑，比如买地产、付租金等
    return rollSum;
  }
  reset_game(): void {
    this.players.forEach(player => {
      player.position = 0; // 重置玩家位置
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
  get current_player(): Player {
    return this.players[this.currentPlayerIndex];
  }
}
