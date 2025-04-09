import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/knight-w.svg"
import blackLogo from "../../assets/knight-b.svg"
import { Board } from "../Board";
export class Knight extends Figure{
    constructor(color:Colors,cell:Cell){
        super(color,cell)
        this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT
        }
        override canMove(target: Cell,oldBoard:Board): boolean {
            if(!super.canMove(target,oldBoard)) return false
            return this.cell.isEmptyForKnight(target);
        }
        override canAttack(target: Cell): boolean {
            if (super.canAttack(target)) return false
            const dx = Math.abs(this.cell.x - target.x);
            const dy = Math.abs(this.cell.y - target.y);
            return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
        }
        
}