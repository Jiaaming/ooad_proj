import {Player} from "../Player";
import {LuckyCardSquare} from "../Squares/LuckyCardSquare";
import { Square } from '../Squares/Square';
import { NormalSquare } from '../Squares/NormalSquare';
import { PropertySquare } from '../Squares/PropertySquare';
import { JailSquare} from '../Squares/JailSquare';


export class TransactionService {
    static buyLuckyCard(player: Player, luckyCardSquare: LuckyCardSquare): boolean {
        if (player.point >= luckyCardSquare.price) {
            player.point -= luckyCardSquare.price;
            player.luckyCard += 1;
            return true
        }
        return false
    }

    static buyProperty(player: Player, propertySquare:PropertySquare,mul: number): boolean {
        if (propertySquare.owner === player) {
            return false
        }
        if (propertySquare.owner == null){
            if(player.point >= propertySquare.cost*mul){
                player.point -= propertySquare.cost*mul;
                propertySquare.owner = player;
                return true
            }
        }else {
            if (player.point >= propertySquare.cost*1.2*mul){
                player.point -= propertySquare.cost*1.2*mul;
                propertySquare.owner = player;
                return true
            }
        }
        return false

    }
    static sellProperty(player: Player, propertySquare:PropertySquare): boolean {
        if (propertySquare.owner === player) {
            player.point += propertySquare.cost;
            propertySquare.owner = null;
            return true
        }
        return false
    }
    static collectRent(passer: Player, propertySquare:PropertySquare): void {
        if (propertySquare.owner != null && passer !== propertySquare.owner){
            propertySquare.owner!.gainPoint(propertySquare.rent);
            passer.point -= propertySquare.rent;
        }
    }
}
