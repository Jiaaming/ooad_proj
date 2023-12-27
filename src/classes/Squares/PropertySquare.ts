// src/models/PropertySquare.ts
import { Square } from './Square';
import { Player } from '../Player';
import { TransactionService } from '../Service/TransactionService';
let numbers1 = [20, 30, 50];
let numbers2 = [10, 15, 25];
let names = ["🛖", "🏠", "🏡"];

export class PropertySquare extends Square {
    private readonly _cost: number;
    private readonly _rent: number;
    private _owner: Player | null = null;
    private _icon: string
// 其他属性...
    constructor(name: string, id: number) {
        super(name, id);
        let randomIndex1 = Math.floor(Math.random() * numbers1.length);
        this._cost = numbers1[randomIndex1];
        let randomIndex2 = Math.floor(Math.random() * numbers2.length);
        this._rent = numbers2[randomIndex2];
        this._icon = names[randomIndex1]
        this.name = this._icon + "c:" + this._cost + "r:" + this._rent;
        // 初始化其他属性...
    }
    updateName(str: String): void {
        this.name = this.name + str;
    }
    get cost(): number {
        return this._cost;
    }

    get rent(): number {
        return this._rent;
    }
    get owner(): Player | null {
        return this._owner;
    }

    set owner(player: Player | null) {
        this._owner = player;
        if(player){
            this.name = this._icon + "c:" + this._cost + "r:" + this._rent + "\nowner:" + player.name;
        }else {
            this.name = this._icon + "c:" + this._cost + "r:" + this._rent
        }
    }

    SquareEvent(player: Player): void {
        TransactionService.collectRent(player, this);
    }
    getType(): string {
        return "PropertySquare";
    }
}
