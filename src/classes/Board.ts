// src/models/Board.ts
import { Square } from './Square';

export class Board {
  squares: Square[];

  constructor() {
    this.squares = [];
    this.initializeSquares();
  }

  initializeSquares(): void {
    // 假设棋盘有35个方格
    for (let i = 0; i < 35; i++) {
      this.squares.push(new Square(`Square ${i}`));
    }
  }

  getSquare(position: number): Square {
    return this.squares[position % this.squares.length];
  }
}
