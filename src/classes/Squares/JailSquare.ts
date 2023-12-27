import {Square} from "./Square";
import {Player} from "../Player";
export class JailSquare extends Square {

    constructor(name: string, id: number) {
        super(name, id);
        this.name = "Jail💀";
    }

    trap(player: Player): void {
        player.isTrapped = !player.isTrapped;

    }
    getType(): string {
        return "JailSquare";
    }

    SquareEvent(player: Player): void {
        this.trap(player);
    }
}