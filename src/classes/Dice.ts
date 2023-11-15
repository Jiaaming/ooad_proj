// src/models/Dice.ts
export class Dice {
    roll(): number {
      return Math.floor(Math.random() * 6) + 1;
    }
  }
  