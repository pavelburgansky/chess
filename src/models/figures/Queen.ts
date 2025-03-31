import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/queen-w.svg"
import blackLogo from "../../assets/queen-b.svg"
export class Queen extends Figure {
   constructor(color: Colors, cell: Cell) {
      super(color, cell)
      this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
      this.name = FigureNames.QUEEN;
   }
   override canMove(target: Cell): boolean {
      //console.log(this.cell.isEmptyVertical(target) + " " + target.figure?.name + " " + target.figure?.color)
      if (!super.canMove(target)) return false
      return this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizotal(target)||this.cell.isEmptyDiagonal(target)

   }
}