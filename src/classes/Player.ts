// src/models/Player.ts
import { Piece } from "./Piece";
import {Board} from "./Board";
import { Square } from './Squares/Square';
import { NormalSquare } from './Squares/NormalSquare';
import { PropertySquare } from './Squares/PropertySquare';
import { JailSquare} from './Squares/JailSquare';
import { LuckyCardSquare } from './Squares/LuckyCardSquare';
import {TransactionService} from "./Service/TransactionService";
let numbers = [20, 30, 50];

export class Player {
    private _name: string;
    private _piece: Piece;
    private _point: number;
    private _money: number = 1000;
    private _isTrapped: boolean = false;
    private _luckyCard: number = 0;

    color: string;
    board: Board;

    get money(): number {
        return this._money;
    }

    set money(value: number) {
        this._money = value;
    }
    get isTrapped(): boolean {
        return this._isTrapped;
    }

    set isTrapped(value: boolean) {
        this._isTrapped = value;
    }
    get luckyCard(): number {
        return this._luckyCard;
    }

    set luckyCard(value: number) {
        this._luckyCard = value;
    }

    get point(): number {
        return this._point;
    }

    set point(value: number) {
        this._point = value;
    }

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
        this._point = 0;
    }

    getPiece(): Piece {
        return this._piece
    }

    gainPoint(point: number): void {
        this.point += point
    }

    // 玩家移动的逻辑可以在这里实现
    moveAndGainPoint(spaces: number): number {

        this._piece.location = this.board.getSquare(this._piece.getPieceNum() + spaces)

        let randomIndex = Math.floor(Math.random() * numbers.length);
        this._point += numbers[randomIndex];
        return numbers[randomIndex];
    }
    useLuckyCard(): boolean {
        if (this._luckyCard > 0){
            this.isTrapped = false;
            this._luckyCard -= 1;
            return true;
        }
        return false;
    }
    useLuckyCardBuy(): boolean {
        if (this._luckyCard > 0){
            this._luckyCard -= 1;
            this.buyProperty(0.8)
            return true;
        }
        return false;
    }
    buyLuckyCard(): boolean {
        return TransactionService.buyLuckyCard(this, this.piece.location as LuckyCardSquare);
    }
    buyProperty(mul:number): boolean {
        return TransactionService.buyProperty(this, this.piece.location as PropertySquare, mul);
    }

    sellProperty(): boolean {
        return TransactionService.sellProperty(this, this.piece.location as PropertySquare);
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