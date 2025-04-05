import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";
import { Queen } from "./figures/Queen";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    public figure: Figure | null;
    board: Board;
    available: boolean;
    id: `${string}-${string}-${string}-${string}-${string}`;
    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = crypto.randomUUID()
    }
    public getCopy(newBoard: Board): Cell {
        const copiedCell = new Cell(newBoard, this.x, this.y, this.color, null);
        if (this.figure) {
            copiedCell.figure = this.figure.getCopy(copiedCell);
        }
        return copiedCell;
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    public setFigure(figure: Figure) {
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
        console.log('turget: ')
        console.log(target)
        for (let y = min + 1; y < max; y++) {
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
        console.log('turget: ')
        console.log(target)
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true;
    }
    public isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)
        if (absX !== absY) return false
        const dy: number = this.y < target.y ? 1 : -1
        const dx: number = this.x < target.x ? 1 : -1
        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) return false
        }
        return true
    }
    public isEmptyForKnight(target: Cell): boolean {
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)
        if (!((absX == 1 && absY == 2) || ((absX == 2 && absY == 1)))) return false
        return true
    }

    public isEmptyForPawn(target: Cell, oldBoard: Board): boolean {
        if (this.figure?.color == Colors.WHITE) {
            if (this.passentForWhite(target, oldBoard)) return true
            if (target.figure) {
                const absX = Math.abs(this.x - target.x)
                const absY = Math.abs(this.y - target.y)
                if (absX !== absY || absX != 1) return false
                if (!(this.y - target.y === 1)) return false
                return true
            }
            else {
                if (this.x !== target.x) {
                    return false
                }
                if (this.figure.firstMove && (this.y - target.y == 1 || this.y - target.y == 2)) {
                    const min: number = Math.min(this.y, target.y)
                    const max: number = Math.max(this.y, target.y)
                    for (let y = min + 1; y < max; y++) {
                        if (!this.board.getCell(this.x, y).isEmpty()) {
                            return false
                        }
                    }
                    return true
                }
                else {
                    return this.y - target.y == 1
                }
            }
        }
        else if (this.figure?.color == Colors.BLACK) {
            if (this.passentForBlack(target,oldBoard)) return true
            if (target.figure) {
                const absX = Math.abs(this.x - target.x)
                const absY = Math.abs(this.y - target.y)
                if (absX !== absY || absX != 1) return false
                if (!(this.y - target.y === -1)) return false
                return true
            }
            else {
                if (this.x !== target.x) {
                    return false
                }
                if (this.figure.firstMove && (this.y - target.y == -1 || this.y - target.y == -2)) {
                    const min: number = Math.min(this.y, target.y)
                    const max: number = Math.max(this.y, target.y)
                    for (let y = min + 1; y < max; y++) {
                        if (!this.board.getCell(this.x, y).isEmpty()) {
                            return false
                        }
                    }
                    return true
                }
                else {
                    return this.y - target.y == -1
                }
            }
        }
        return false
    }
    public passentForWhite(target: Cell, oldBoard: Board): boolean {
        if ((this.x - 1 == target.x && this.y - 1 == target.y) && (!target.figure)) {
            if (
            (oldBoard.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN&& oldBoard.getCell(target.x, target.y - 1).figure?.firstMove)
            && (target.board.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y + 1).figure?.color !== this.figure?.color)) {
                //console.log(oldBoard.getCell(target.x, target.y - 1))
                return true
            }
        }
        if ((this.x + 1 == target.x && this.y - 1 == target.y) && (!target.figure)) {
            if ((oldBoard.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN&& oldBoard.getCell(target.x, target.y - 1).figure?.firstMove)
            && (target.board.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y + 1).figure?.color !== this.figure?.color)) return true
        }
        return false
    }
    public passentForBlack(target: Cell,oldBoard:Board): boolean {
        if ((this.x + 1 == target.x && this.y + 1 == target.y) && (!target.figure)) {
            if ((oldBoard.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN&& oldBoard.getCell(target.x, target.y + 1).figure?.firstMove)
            && (target.board.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y - 1).figure?.color !== this.figure?.color)) return true
        }
        if ((this.x - 1 == target.x && this.y + 1 == target.y) && (!target.figure)) {
            if ((oldBoard.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN&& oldBoard.getCell(target.x, target.y + 1).figure?.firstMove)
            && (target.board.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y - 1).figure?.color !== this.figure?.color)) return true
        }
        return false
    }
    isEmptyForKing(target: Cell): boolean {

        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)
        if (
            !(
                ((this.x == target.x) && (absY == 1)) ||
                ((this.y == target.y) && (absX == 1)) ||
                ((absX == absY) && (absX == 1))
            )
        ) {
            return false
        }
        return true

    }
    public moveFigure(target: Cell, oldBoard: Board) {
        // console.log("oldBoard")
        // console.log(this.board.oldBoard)
        // console.log("current")
        // console.log(this.board)
        if (this.figure && this.figure?.canMove(target, oldBoard)) {
            if (this.passentForWhite(target, oldBoard)) {
                target.board.getCell(target.x, target.y + 1).figure = null
            }
            if (this.passentForBlack(target,oldBoard)) {
                target.board.getCell(target.x, target.y - 1).figure = null
            }
            target.figure = this.figure
            this.figure.firstMove = false
            target.figure.cell = target;
            this.figure = null
            if (target.figure.name === FigureNames.PAWN && target.y == 0) {
                const queen = new Queen(target.figure.color, target.figure.cell)
                target.figure = queen;
                target.figure.cell = target
            }

        }
    }
}