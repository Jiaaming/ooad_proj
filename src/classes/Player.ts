// src/models/Player.ts
export class Player {
    name: string;
    position: number; // 玩家在棋盘上的位置
    color: string;
    constructor(name: string) {
      this.name = name;
      this.position = 0; // 初始位置
      this.color = stringToColor(name);
    }
  
    // 玩家移动的逻辑可以在这里实现
    move(spaces: number): void {
      this.position += spaces;
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