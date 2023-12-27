import {Square} from "./Square";
import {Player} from "../Player";
export class TaxSquare extends Square {
    private readonly _ratio: number;

    constructor(name: string, id: number) {
        super(name, id);
        this._ratio = parseFloat((Math.random() * 0.5).toFixed(2));
        this.name = "🤑Tax: " + this._ratio.toString();
    }

    getType(): string {
        return "TaxSquare";
    }

    SquareEvent(player: Player): void {
        player.point = player.point * (1.0 - this._ratio);
    }
}