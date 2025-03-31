import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/pawn-w.svg"
import blackLogo from "../../assets/pawn-b.svg"

export class Pawn extends Figure{
    constructor(color:Colors,cell:Cell){
        super(color,cell)
        this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
        }
}