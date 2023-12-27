// src/models/LuckCardSquare.ts
import { Square } from './Square';
import { Player } from '../Player';

let numbers = [20, 30, 50];
let names = ["🗂️", "💳", "🪪"];
export class LuckyCardSquare extends Square {
    private readonly _price: number;

    constructor(name: string, id: number) {
        super(name, id);
        let randomIndex = Math.floor(Math.random() * numbers.length);
        this._price = numbers[randomIndex];
        this.name = names[randomIndex] + "price:" + this._price;
        // 初始化其他属性...
    }

    get price(): number {
        return this._price;
    }

    getType(): string {
        return "LuckyCardSquare";
    }

    SquareEvent(player: Player): void {
    }
}
