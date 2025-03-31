import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../assets/king-w.svg"
import blackLogo from "../../assets/king-b.svg"
export class King extends Figure{
        constructor(color:Colors,cell:Cell){
            super(color,cell)
            this.logo = color == Colors.BLACK ? blackLogo : whiteLogo;
            this.name = FigureNames.KING;
            }
        
}