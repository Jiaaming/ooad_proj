import {Square} from "./Square";
import {Player} from "../Player";
export class GoSquare extends Square {
    private readonly _spaces: number;
    constructor(name: string, id: number) {
        super(name, id);
        this._spaces = Math.floor((Math.random() * 2 - 1) * 20)
        this.name = "Go🚀" + this._spaces+" steps";
    }
    go(player: Player): void {
        player.moveAndGainPoint(this._spaces)
        if(player.piece.location.getType() === "JailSquare"){
            player.isTrapped = true
        }
    }

    getType(): string {
        return "GoSquare";
    }

    SquareEvent(player: Player): void {
        this.go(player)
    }

}