// src/models/Square.ts
import {Player} from "../Player";
import {Square} from "./Square";

export class NormalSquare extends Square{

    constructor(name: string, id: number) {
        super(name, id);
    }

    getType(): string {
        return "NormalSquare"
    }

    SquareEvent(player: Player): void {
    }
  }
  