import React, { FC, useContext, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import CellComponent from './CellComponent'
import { Cell } from '../models/Cell'
interface BoardProps {
  board: Board,
  setBoard: (board: Board) => void
  resetBoard: () => void
  passTurn: string
  setPassTurn: React.Dispatch<React.SetStateAction<string>>
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, resetBoard, passTurn, setPassTurn }) => {
  const [flip, setFlip] = useState<boolean>(false)
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const [oldBoard, setOldBoard] = useState<Board>(board)
  const handleClick = (cell: Cell) => {
    if (passTurn == cell.figure?.color) {
      if (cell?.figure) {
        setSelectedCell(cell)
      }
    }
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell, oldBoard)) {
      let boardold = board.cloneBoard()
      setOldBoard(boardold)

      selectedCell.moveFigure(cell, oldBoard)
      setPassTurn(value => value == "bg-amber-50" ? "bg-green-700" : "bg-amber-50")
      setSelectedCell(null)
    }
  }
  useEffect(() => {
    highlightCells();
  }, [selectedCell])
  const highlightCells = () => {
    board.highlightCells(selectedCell, oldBoard)
    updateBoard()
  }
  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }
  const flipBoard = () => {
    setFlip(!flip)
  }
  return (
    <div>
      <div className={`flex justify-between mb-20`}>
        <button className={`w-30 h-12 px-2 py-2 rounded-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-linear-to-r/srgb hover:from-amber-400 hover:via-amber-600 ] hover:to-amber-400`} onClick={() => resetBoard()}>Restart Game</button>
        <button className={`w-30 h-12 px-2 py-2 rounded-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-linear-to-r/srgb hover:from-amber-400 hover:via-amber-600 ] hover:to-amber-400`} onClick={() => flipBoard()}>Flip the board</button>
      </div>
      <div className={`grid grid-cols-8 grid-rows-8 w-[calc(64px*8)] h-[calc(64px*8)] ${flip ? "transorm rotate-180" : ""}`}>
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map((cell) => {
              return <CellComponent cell={cell} key={cell.id} isSelectedCell={selectedCell?.x == cell.x && selectedCell?.y == cell.y} handleClick={handleClick} flip={flip} passTurn={passTurn} />
            }

            )}
          </React.Fragment>)}
      </div>
    </div>
  )
}

export default BoardComponent
