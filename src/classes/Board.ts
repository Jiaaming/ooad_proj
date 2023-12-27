// src/models/Board.ts
import { Square } from './Squares/Square';
import { NormalSquare } from './Squares/NormalSquare';
import { PropertySquare } from './Squares/PropertySquare';
import { JailSquare} from './Squares/JailSquare';
import { LuckyCardSquare } from './Squares/LuckyCardSquare';
import {GoSquare} from "./Squares/GoSquare";
import {WelfareSquare} from "./Squares/WelfareSquare";
import {TaxSquare} from "./Squares/TaxSquare";
let squareTypes = [PropertySquare, JailSquare, GoSquare, LuckyCardSquare, PropertySquare, NormalSquare, WelfareSquare, TaxSquare];

export class Board {
  squares: Square[];
  private readonly _squareCount: number;
  constructor(squareCount: number, goSquareDensity: number) {
    this.squares = [];
    this._squareCount = squareCount;
    for (let i = 0; i < goSquareDensity; i++) {
      squareTypes.push(GoSquare);
    }
    this.initializeSquares(squareCount);

  }

  get squareCount(): number {
    return this._squareCount;
  }
  initializeSquares(squareCount: number): void {
    // 假设棋盘有squareCount个方格
    this.squares.push(new NormalSquare(`Start🥰`, 0));
    for (let i = 1; i < squareCount; i++) {
      const randomTypeIndex = Math.floor(Math.random() * squareTypes.length);
      const SquareType = squareTypes[randomTypeIndex];
      // 创建方格实例并传递所需参数
      const square = new SquareType(`Square`, i);
      this.squares.push(square);
    }
  }

  getSquare(position: number): Square {
      const len = this.squares.length;
      return this.squares[((position % len) + len) % len];
  }

}
