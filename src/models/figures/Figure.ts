import { Colors } from "../Colors";
import logo from '../assets/king-b.svg'
import { Cell } from "../Cell";
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
    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = crypto.randomUUID();
    }
    canMove(target: Cell): boolean {
        //console.log("current x= " + this.cell.x + " curent y = " + this.cell.y)
        if( this?.color==target.figure?.color){
            return false
        }
        if (target.figure?.name === FigureNames.KING) {
            return false;
        }
        return true;
    }
    moveFigure = (target:Cell) => {

    }

}