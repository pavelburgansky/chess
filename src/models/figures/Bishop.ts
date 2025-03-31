import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/bishop-w.svg"
import blackLogo from "../../assets/bishop-b.svg"
export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    override canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false
        return this.cell.isEmptyDiagonal(target);

    }
}
