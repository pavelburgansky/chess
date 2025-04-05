import { useEffect, useRef, useState } from 'react'
import BoardComponent from './Components/BoardComponent'
import { Board } from './models/Board'
function App() {

  const [board, setBoard] = useState<Board>(new Board())
  const [passTurn, setPassTurn] = useState<string>("bg-amber-50")
  useEffect(() => {
    resetGame()
  }, [])
  const resetGame = () => {
    let newBoard = new Board()
    newBoard.initCels()
    newBoard.addFigures()
    setBoard(newBoard)
    setPassTurn("bg-amber-50")
  }
  return (
    <>
      <div>
        <div className={` bg-black/50 flex justify-center items-center h-screen w-screen`}>
          <BoardComponent board={board} setBoard={setBoard} resetBoard = {resetGame} passTurn = {passTurn} setPassTurn = {setPassTurn}/>
        </div>
      </div>
    </>

  )
}

export default App
