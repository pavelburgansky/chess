import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
export class Board {
    cells: Cell[][] = []
    public initCels() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 == 0) {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
                else {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                }
            }
            this.cells.push(row)
        }
    }
    cloneBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = [];
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < 8; x++) {
                const oldCell = this.getCell(x, y);
                const newCell = new Cell(newBoard, x, y, oldCell.color, null);
                row.push(newCell);
            }
            newBoard.cells.push(row);
        }
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const oldFigure = this.getCell(x, y).figure;
                if (oldFigure) {
                    const newCell = newBoard.getCell(x, y);
                    const newFigure = oldFigure.getCopy(newCell);
                    newCell.figure = newFigure;
                }
            }
        }

        return newBoard;
    }
    
    public getCopyBoard(): Board {
        const newBoard: Board = new Board();
        newBoard.cells = this.cells;
        return newBoard
    }

    public highlightCells(selectedCell: Cell | null, oldBoard: Board) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target, oldBoard)
            }
        }
    }
    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }
    public addPawn() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getCell(i, 6))
            new Pawn(Colors.BLACK, this.getCell(i, 1))
        }
    }
    public addRook() {
        new Rook(Colors.WHITE, this.getCell(0, 7))
        new Rook(Colors.WHITE, this.getCell(7, 7))
        new Rook(Colors.BLACK, this.getCell(0, 0))
        new Rook(Colors.BLACK, this.getCell(7, 0))
    }
    public addKnight() {
        new Knight(Colors.WHITE, this.getCell(1, 7))
        new Knight(Colors.WHITE, this.getCell(6, 7))
        new Knight(Colors.BLACK, this.getCell(1, 0))
        new Knight(Colors.BLACK, this.getCell(6, 0))
    }
    public addBishop() {
        new Bishop(Colors.WHITE, this.getCell(2, 7))
        new Bishop(Colors.WHITE, this.getCell(5, 7))
        new Bishop(Colors.BLACK, this.getCell(2, 0))
        new Bishop(Colors.BLACK, this.getCell(5, 0))
    }
    public addQueen() {
        new Queen(Colors.BLACK, this.getCell(3, 0))
        new Queen(Colors.WHITE, this.getCell(3, 7))
    }
    public addKing() {
        new King(Colors.BLACK, this.getCell(4, 0))
        new King(Colors.WHITE, this.getCell(4, 7))
    }
    public addFigures() {
        this.addPawn()
        this.addRook()
        this.addKnight()
        this.addBishop()
        this.addQueen()
        this.addKing()
    }
}