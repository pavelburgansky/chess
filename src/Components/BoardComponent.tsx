import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import CellComponent from './CellComponent'
import { Cell } from '../models/Cell'
interface BoardProps {
  board: Board,
  setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  const handleClick = (cell: Cell) => {
    if (cell?.figure) {
      setSelectedCell(cell)
      console.log('ЭТО СЕЛЕКТЕД СЕЛЛ фигура:')
      console.log(cell)
    }
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
      console.log('ЭТО СЕЛЕКТЕД СЕЛЛ:')
      console.log(selectedCell)
      selectedCell.moveFigure(cell)
      setSelectedCell(null)
    }
  }
  useEffect(() => {
    highlightCells();
  }, [selectedCell])
  const highlightCells = () => {
    board.highlightCells(selectedCell)
    updateBoard()
  }
  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-[calc(64px*8)] h-[calc(64px*8)]">
      {board.cells.map((row, index) =>
        <React.Fragment key={index}>
          {row.map((cell) =>{
           return <CellComponent cell={cell} key={cell.id} isSelectedCell={selectedCell?.x == cell.x && selectedCell?.y == cell.y} handleClick={handleClick} />
          }
            
          )}
        </React.Fragment>)}
    </div>
  )
}

export default BoardComponent
