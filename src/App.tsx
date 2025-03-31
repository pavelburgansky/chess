import { useEffect, useRef, useState } from 'react'
import BoardComponent from './Components/BoardComponent'
import { Board } from './models/Board'
function App() {

  const [board, setBoard] = useState<Board>(new Board())
  useEffect(() => {
    resetGame()
  }, [])
  const resetGame = () => {
    let newBoard = new Board()
    newBoard.initCels()
    newBoard.addFigures() 
    setBoard(newBoard)
  }
  return (
 
    <div className={` bg-black/50 flex justify-center items-center h-screen w-screen`}>
      <BoardComponent board={board} setBoard={setBoard}/>
    </div>
  )
}

export default App
