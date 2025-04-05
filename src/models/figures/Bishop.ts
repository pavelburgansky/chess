import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/bishop-w.svg"
import blackLogo from "../../assets/bishop-b.svg"
import { Board } from "../Board";
export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    override canMove(target: Cell,oldBoard:Board): boolean {
        if(!super.canMove(target,oldBoard)) return false
        return this.cell.isEmptyDiagonal(target);

    }
}
