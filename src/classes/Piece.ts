// src/models/Piece.ts
import { Square } from './Squares/Square';

export class Piece {
    private _name: string;
    private _location: Square;

    get location(): Square {
        return this._location;
    }

    set location(value: Square) {
        this._location = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    constructor(name: string, location: Square) {
      this._name = name;
      this._location = location;

    }

    getPieceNum():number {
        return this.location.id
    }
  }
  