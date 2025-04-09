import { Colors } from "../Colors";
import logo from '../assets/king-b.svg'
import { Cell } from "../Cell";
import { Board } from "../Board";
import { Pawn } from "./Pawn";
import { Bishop } from "./Bishop";
import { Knight } from "./Knight";
import { Rook } from "./Rook";
import { Queen } from "./Queen";
import { King } from "./King";
export enum FigureNames {
    FIGURE = "figure",
    PAWN = "pawn",
    BISHOP = "bishop",
    KNIGHT = "knight",
    ROOK = "rook",
    QUEEN = "queen",
    KING = "king"
}

type FigureType = Pawn | Bishop | Knight | Rook | Queen | King;
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
        if (target.figure?.name === FigureNames.KING && target.figure?.color !== this.color) {
            return false;
        }
        return true;
    }

    public canAttack(cell: Cell): boolean {
        return false;
    }
    
    public getCopy(cell: Cell): FigureType {
        
        const copy: FigureType = new (this.constructor as new (color: Colors, cell: Cell) => FigureType)(this.color, cell);
        copy.name = this.name;
        copy.logo = this.logo;
        copy.firstMove = this.firstMove;
        // id можно оставить как есть, или копировать:
        // copy.id = this.id;
        return copy;
    }
    

}