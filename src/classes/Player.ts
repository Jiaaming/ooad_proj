// src/models/Player.ts
import { Piece } from "./Piece";
import {Board} from "./Board";
export class Player {
    private _name: string;
    private _piece: Piece; // 玩家在棋盘上的位置
    color: string;
    board: Board;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get piece(): Piece {
        return this._piece;
    }

    set piece(value: Piece) {
        this._piece = value;
    }

    constructor(name: string, board: Board) {
      this._name = name;
      this.board = board
      this._piece = new Piece(this._name, board.squares[0]); // 初始位置
      this.color = stringToColor(name);
    }
    getPiece(): Piece {
        return this._piece
    }
  
    // 玩家移动的逻辑可以在这里实现
    move(spaces: number): void {
      for (let i = 0; i < spaces;i++){
          this._piece.location = this.board.getSquare(this._piece.getPieceNum() + 1)
      }
      // TODO: 这里可能需要处理移动后的逻辑，比如超过棋盘的处理
    }
  }
  
  const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }

    return color;
};