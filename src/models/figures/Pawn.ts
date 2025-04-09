import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/pawn-w.svg"
import blackLogo from "../../assets/pawn-b.svg"
import { Board } from "../Board";
export class Pawn extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }
    override canMove(target: Cell, oldBoard: Board): boolean {
        //console.log(oldBoard)
        if (!super.canMove(target, oldBoard)) return false
        return this.cell.isEmptyForPawn(target, oldBoard);
    }

    override getCopy(cell: Cell): Pawn {
        const copy = new Pawn(this.color, cell);
        copy.firstMove = this.firstMove;
        return copy;
    }
    override canAttack(target: Cell): boolean {
        if (super.canAttack(target)) return false
        const direction = this.color === Colors.WHITE ? -1 : 1;
        const dx = Math.abs(this.cell.x - target.x);
        const dy = target.y - this.cell.y;
        return dx === 1 && dy === direction;
    }

}