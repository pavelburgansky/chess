import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Cell {
    readonly x: number;
    readonly y: number;
    color: Colors;
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
    public canAttackStraightOrDiagonal(target: Cell): boolean {
        const dx = Math.abs(this.x - target.x);
        const dy = Math.abs(this.y - target.y);
        console.log("x=" + this.x, "y=" + this.y)
        console.log("target x=" + target.x, "target y=" + target.y)
        // Вертикаль
        if (this.x === target.x && this.isEmptyVertical(target)) {
            return true;
        }

        // Горизонталь
        if (this.y === target.y && this.isEmptyHorizotal(target)) {

            return true;
        }

        // Диагональ
        if (dx === dy && this.isEmptyDiagonal(target)) {
            return true;
        }

        return false;
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    public isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false
        }
        const min: number = Math.min(this.y, target.y)
        const max: number = Math.max(this.y, target.y)
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        if (this.isCheck(this, target, this.figure!.color, this.board)) return false
        return true;
    }
    public isEmptyHorizotal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false
        }
        const min: number = Math.min(this.x, target.x)
        const max: number = Math.max(this.x, target.x)
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        if (this.isCheck(this, target, this.figure!.color, this.board)) return false
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
        if (this.isCheck(this, target, this.figure!.color, this.board)) return false
        return true
    }
    public isEmptyForKnight(target: Cell): boolean {
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)
        if (!((absX == 1 && absY == 2) || ((absX == 2 && absY == 1)))) return false
        if (this.isCheck(this, target, this.figure!.color, this.board)) return false
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
                if (this.isCheck(this, target, this.figure!.color, this.board)) return false
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
                    if (this.isCheck(this, target, this.figure!.color, this.board)) return false
                    return true
                }
                else {
                    return this.y - target.y == 1
                }
            }
        }
        else if (this.figure?.color == Colors.BLACK) {
            if (this.passentForBlack(target, oldBoard)) return true
            if (target.figure) {
                const absX = Math.abs(this.x - target.x)
                const absY = Math.abs(this.y - target.y)
                if (absX !== absY || absX != 1) return false
                if (!(this.y - target.y === -1)) return false
                if (this.isCheck(this, target, this.figure!.color, this.board)) return false

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
                    if (this.isCheck(this, target, this.figure!.color, this.board)) return false
                    return true
                }
                else {
                    return this.y - target.y == -1
                }
            }
        }
        if (this.isCheck(this, target, this.figure!.color, this.board)) return false
        return false
    }

    public passentForWhite(target: Cell, oldBoard: Board): boolean {
        if (oldBoard && oldBoard.cells.length == 0) return false
        if ((this.x - 1 == target.x && this.y - 1 == target.y) && (!target.figure)) {
            if (oldBoard.getCell(target.x, target.y - 1) && (
                (oldBoard.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN && oldBoard.getCell(target.x, target.y - 1).figure?.firstMove)
                && (target.board.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y + 1).figure?.color !== this.figure?.color))) {
                return true
            }
        }
        if ((this.x + 1 == target.x && this.y - 1 == target.y) && (!target.figure)) {
            if (oldBoard.getCell(target.x, target.y - 1)) {
                if ((oldBoard.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN && oldBoard.getCell(target.x, target.y - 1).figure?.firstMove)
                    && (target.board.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y + 1).figure?.color !== this.figure?.color)) return true
            }
        }

        return false
    }
    public passentForBlack(target: Cell, oldBoard: Board): boolean {
        if ((this.x + 1 == target.x && this.y + 1 == target.y) && (!target.figure)) {
            if ((oldBoard.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN && oldBoard.getCell(target.x, target.y + 1).figure?.firstMove)
                && (target.board.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y - 1).figure?.color !== this.figure?.color)) return true
        }
        if ((this.x - 1 == target.x && this.y + 1 == target.y) && (!target.figure)) {
            if ((oldBoard.getCell(target.x, target.y + 1).figure?.name == FigureNames.PAWN && oldBoard.getCell(target.x, target.y + 1).figure?.firstMove)
                && (target.board.getCell(target.x, target.y - 1).figure?.name == FigureNames.PAWN && target.board.getCell(target.x, target.y - 1).figure?.color !== this.figure?.color)) return true
        }
        return false
    }
    isEmptyForKing(target: Cell, oldBoard: Board): boolean {
        if (this.longCastlingWhite(target)) return true
        if (this.shortCastlingWhite(target)) return true
        if (this.longCastlingBlack(target)) return true
        if (this.shortCastlingBlack(target)) return true
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
        if (this.figure?.color) {
            if (this.isCellUnderAttack(target, this.figure?.color, oldBoard)) {
                return false
            }
        }

        return true
    }
    public isCellUnderAttack(cell: Cell, color: Colors, oldBoard: Board): boolean {
        debugger
        const newBoard = cell.board.cloneBoard()
        const king = newBoard.getCell(cell.x, cell.y).findKing(color)
        const kingTo = newBoard.getCell(cell.x, cell.y)
        kingTo.figure = king!.figure
        kingTo.figure!.cell = kingTo
        king!.figure = null
        console.log(newBoard)
        for (let row of newBoard.cells) {
            for (let attacker of row) {
                if (attacker.figure && attacker.figure.color !== color) {
                    if (attacker.figure.canAttack(kingTo)) {
                        return true
                    }
                }
            }
        }
        return false
    }
    public isCheckForKing(cell: Cell, color: Colors, oldBoard: Board): boolean {
        const newBoard = cell.board.cloneBoard()
        const king = newBoard.getCell(cell.x, cell.y).findKing(color)
        for (let row of newBoard.cells) {
            for (let attacker of row) {
                if (attacker.figure && attacker.figure.color !== color) {
                    if (attacker.figure.canAttack(king!)) {
                        return true
                    }
                }
            }
        }
        return false
    }
    public isCheck(currentCell: Cell, target: Cell, color: Colors, oldBoard: Board): boolean {
        debugger
        const newBoard = target.board.cloneBoard()
        const current = newBoard.getCell(currentCell.x, currentCell.y)
        const currentTo = newBoard.getCell(target.x, target.y)
        if (currentTo.figure?.name == FigureNames.KING) return false
        currentTo.figure = current!.figure
        currentTo.figure!.cell = currentTo
        current!.figure = null
        if (currentTo?.isCheckForKing(currentTo, color, oldBoard)) return true
        return false
    }



    public longCastlingWhite(target: Cell): boolean {
        if (this.figure?.firstMove && target.board.getCell(0, 7).figure?.name == FigureNames.ROOK && target.board.getCell(0, 7).figure?.firstMove) {
            if(this.isCheckForKing(target, Colors.WHITE, this.board)) return false
            if (target.isCheck(this,target.board.getCell(2, 7), Colors.WHITE, this.board)) return false
            if (target.isCheck(this,target.board.getCell(3, 7), Colors.WHITE, this.board)) return false
            if (this.y == target.y && this.x - target.x == 2 && !target.board.getCell(target.x, target.y).figure && !target.board.getCell(target.x - 1, target.y).figure && !target.board.getCell(target.x + 1, target.y).figure) {
                return true
            }
        }
        return false
    }
    public shortCastlingWhite(target: Cell): boolean {
        if (this.figure?.firstMove && target.board.getCell(7, 7).figure?.name == FigureNames.ROOK && target.board.getCell(7, 7).figure?.firstMove) {
            if(this.isCheckForKing(target, Colors.WHITE, this.board)) return false
            if (target.isCheck(this,target.board.getCell(5, 7), Colors.WHITE, this.board)) return false
            if (target.isCheck(this,target.board.getCell(6, 7), Colors.WHITE, this.board)) return false
            if (this.y == target.y && this.x - target.x == -2 && !target.board.getCell(target.x, target.y).figure && !target.board.getCell(target.x - 1, target.y).figure) {
                return true
            }
        }
        return false
    }
    public longCastlingBlack(target: Cell): boolean {
        if (this.figure?.firstMove && target.board.getCell(0, 0).figure?.name == FigureNames.ROOK && target.board.getCell(0, 0).figure?.firstMove) {
            if(this.isCheckForKing(target, Colors.BLACK, this.board)) return false
            if (target.isCheck(this,target.board.getCell(2, 0), Colors.BLACK, this.board)) return false
            if (target.isCheck(this,target.board.getCell(3, 0), Colors.BLACK, this.board)) return false

            if (this.y == target.y && this.x - target.x == 2 && !target.board.getCell(target.x, target.y).figure && !target.board.getCell(target.x - 1, target.y).figure && !target.board.getCell(target.x + 1, target.y).figure) {
                return true
            }
        }
        return false
    }
    public shortCastlingBlack(target: Cell): boolean {
        if (this.figure?.firstMove && target.board.getCell(7, 0).figure?.name == FigureNames.ROOK && target.board.getCell(7, 0).figure?.firstMove) {
            if(this.isCheckForKing(target, Colors.BLACK, this.board)) return false
            if (target.isCheck(this,target.board.getCell(6, 0), Colors.BLACK, this.board)) return false
            if (target.isCheck(this,target.board.getCell(5, 0), Colors.BLACK, this.board)) return false
            if (this.y == target.y && this.x - target.x == -2 && !target.board.getCell(target.x, target.y).figure && !target.board.getCell(target.x - 1, target.y).figure) {
                return true
            }
        }
        return false
    }

    private findKing(color: Colors): Cell | null {
        for (let row of this.board.cells) {
            for (let cell of row) {
                if (cell.figure?.name === FigureNames.KING && cell.figure.color === color) {
                    return cell;
                }
            }
        }
        return null;
    }

    public moveFigure(target: Cell, oldBoard: Board) {
        if (this.figure && this.figure?.canMove(target, oldBoard)) {
            if (this.figure.name == FigureNames.PAWN) {
                if (this.passentForWhite(target, oldBoard)) {
                    target.board.getCell(target.x, target.y + 1).figure = null
                }
                if (this.passentForBlack(target, oldBoard)) {
                    target.board.getCell(target.x, target.y - 1).figure = null
                }
            }
            if (this.figure.name == FigureNames.KING) {
                if (this.longCastlingWhite(target)) {
                    let longCastlingRook: Rook = new Rook(Colors.WHITE, this.board.getCell(3, 7));
                    longCastlingRook.firstMove = false
                    this.board.getCell(0, 7).figure = null;
                }
                if (this.shortCastlingWhite(target)) {
                    let longCastlingRook: Rook = new Rook(Colors.WHITE, this.board.getCell(5, 7));
                    longCastlingRook.firstMove = false
                    this.board.getCell(7, 7).figure = null;
                }
                if (this.longCastlingBlack(target)) {
                    let longCastlingRook: Rook = new Rook(Colors.BLACK, this.board.getCell(3, 0));
                    longCastlingRook.firstMove = false
                    this.board.getCell(0, 0).figure = null;
                }
                if (this.shortCastlingBlack(target)) {
                    let longCastlingRook: Rook = new Rook(Colors.BLACK, this.board.getCell(5, 0));
                    longCastlingRook.firstMove = false
                    this.board.getCell(7, 0).figure = null;
                }
            }
            target.figure = this.figure;
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