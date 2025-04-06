import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/rook-w.svg"
import blackLogo from "../../assets/rook-b.svg"
import { Board } from "../Board";
export class Rook extends Figure{
    constructor(color:Colors,cell:Cell){
        super(color,cell)
        this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
        }
    override canMove(target: Cell,oldBoard:Board): boolean {
        //console.log(this.cell.isEmptyVertical(target) + " " + target.figure?.name + " " + target.figure?.color)
        if(!super.canMove(target,oldBoard)) return false
        console.log("rook:["+this.cell.x+";"+this.cell.y+"]"+this.firstMove)
        return this.cell.isEmptyVertical(target)||this.cell.isEmptyHorizotal(target)
    }
}