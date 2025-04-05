import { Colors } from "../Colors";
import logo from '../assets/king-b.svg'
import { Cell } from "../Cell";
import { Board } from "../Board";
export enum FigureNames {
    FIGURE = "figure",
    PAWN = "pawn",
    BISHOP = "bishop",
    KNIGHT = "knight",
    ROOK = "rook",
    QUEEN = "queen",
    KING = "king"
} 
export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id:`${string}-${string}-${string}-${string}-${string}`;
    firstMove:boolean;
    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = crypto.randomUUID();
        this.firstMove = true
    }
    canMove(target: Cell,oldBoard:Board): boolean {
        //console.log("current x= " + this.cell.x + " curent y = " + this.cell.y)
        //console.log(this?.color,' ',target.figure?.color)
        if( this?.color==target.figure?.color){
            return false
        }
        if (target.figure?.name === FigureNames.KING) {
            return false;
        }
        return true;
    }
    public getCopy(cell: Cell): Figure {
        const copy = new Figure(this.color, cell);
        copy.name = this.name;
        copy.logo = this.logo;
        copy.firstMove = this.firstMove;
        // id можно оставить как есть, или копировать:
        // copy.id = this.id;
        return copy;
    }
    

}