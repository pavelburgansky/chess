import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/queen-w.svg"
import blackLogo from "../../assets/queen-b.svg"
import { Board } from "../Board";
export class Queen extends Figure {
   constructor(color: Colors, cell: Cell) {
      super(color, cell)
      this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
      this.name = FigureNames.QUEEN;
   }
   override canMove(target: Cell,oldBoard:Board): boolean {
      //console.log(this.cell.isEmptyVertical(target) + " " + target.figure?.name + " " + target.figure?.color)
      if (!super.canMove(target,oldBoard)) return false
      return this.cell.isEmptyVerticalCheck(target) || this.cell.isEmptyHorizotalCheck(target)||this.cell.isEmptyDiagonalCheck(target)
   }
   override canAttack(target: Cell): boolean {
      if (super.canAttack(target)) return false
      return this.cell.canAttackStraightOrDiagonal(target);
  }
  
   
}