import React, { FC, useContext, useEffect, useState } from 'react'
import { Board } from '../models/Board'
import CellComponent from './CellComponent'
import { Cell } from '../models/Cell'
import { Colors } from '../models/Colors'
interface BoardProps {
  board: Board,
  setBoard: (board: Board) => void,
  resetBoard: () => void,
  passTurn: string,
  setPassTurn: React.Dispatch<React.SetStateAction<string>>,
  startGame: boolean,
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>,
  winner: number | undefined,
  setWinner: React.Dispatch<React.SetStateAction<number | undefined>>

}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, resetBoard, passTurn, setPassTurn, startGame, setStartGame,winner,setWinner }) => {
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
      setWinner(selectedCell?.isCheckMate(passTurn == "bg-amber-50" ? Colors.BLACK : Colors.WHITE))
      setPassTurn(value => value == "bg-amber-50" ? "bg-green-700" : "bg-amber-50")
      setSelectedCell(null)
      // console.log("current board:")
      //console.log(board)
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
        <button className={`w-30 h-12 px-2 py-2 rounded-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-linear-to-r/srgb hover:from-amber-400 hover:via-amber-600 ] hover:to-amber-400`} onClick={() => setStartGame(!startGame)}>{`${startGame ? "Stop Game" : "Start Game"}`}</button>
        <button className={`w-30 h-12 px-2 py-2 rounded-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-linear-to-r/srgb hover:from-amber-400 hover:via-amber-600 ] hover:to-amber-400`} onClick={() => flipBoard()}>Flip the board</button>
      </div>
      <div className={`text-white text-5xl font-bold mb-10`}>
        {passTurn == "bg-amber-50" ? "White turn" : "Black turn"}
      </div>
      <div className="relative w-[calc(64px*8)] h-[calc(64px*8)]">
        <div className={`relative grid grid-cols-8 grid-rows-8 w-[calc(64px*8)] h-[calc(64px*8)] ${flip ? "transorm rotate-180" : ""}`}>
          {board.cells.map((row, index) =>
            <React.Fragment key={index}>
              {row.map((cell) => {
                return <CellComponent cell={cell} key={cell.id} isSelectedCell={selectedCell?.x == cell.x && selectedCell?.y == cell.y} handleClick={handleClick} flip={flip} passTurn={passTurn} />
              }

              )}
            </React.Fragment>)}
        </div>
        <div className={`${winner==1||winner==2?"absolute inset-0 backdrop-blur-xs bg-black/50 flex items-center justify-center z-10 duration-1000 ease-in-out":""}`}>
          <h2 className="text-white text-5xl font-extrabold">
            {winner==1||winner==2?passTurn == "bg-amber-50"&&winner==1?"Black Win":winner==1&&passTurn == "bg-green-700"?"White Win":"Draw":""}</h2>
        </div>
      </div>
    </div>
  )
}


export default BoardComponent
