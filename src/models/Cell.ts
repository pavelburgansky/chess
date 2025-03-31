import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    public figure: Figure | null;
    board: Board;
    available: boolean;
    id:`${string}-${string}-${string}-${string}-${string}`;
    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = crypto.randomUUID()
    }
    isEmpty(): boolean {
        return this.figure===null
    }

    public setFigure(figure:Figure){
        this.figure = figure;
        this.figure.cell = this;
    }

    public isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false
        }
        const min: number = Math.min(this.y, target.y)
        const max: number = Math.max(this.y, target.y)
        console.log('current: ')
        console.log(this)
        console.log('turget: ' )
        console.log(target)
        for (let y = min+1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                
                return false
            }
        }
        return true;
    }
    public isEmptyHorizotal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false
        }
        const min: number = Math.min(this.x, target.x)
        const max: number = Math.max(this.x, target.x)
        console.log('current: ')
        console.log(this)
        console.log('turget: ' )
        console.log(target)
        for (let x = min+1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true;
    }
    public isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(this.x-target.x)
        const absY = Math.abs(this.y-target.y)
        if(absX!==absY) return false
        const dy: number = this.y<target.y?1:-1
        const dx: number = this.x<target.x?1:-1
        for (let i =1; i < absY; i++) {
            if(!this.board.getCell(this.x +dx*i,this.y +dy*i).isEmpty()) return false
        }
        return true
    }
    public isEmptyForKnight(target:Cell):boolean{
        const absX = Math.abs(this.x-target.x)
        const absY = Math.abs(this.y-target.y)
        if(!((absX==1&&absY==2)||((absX==2&&absY==1)))) return false
        return true
    }
    public moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) { 
            target.figure = this.figure
            console.log("это таргет: target.figure")
            console.log(target.figure)
            target.figure.cell = target;
            this.figure = null
        }
    }
}