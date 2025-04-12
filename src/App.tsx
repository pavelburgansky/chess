import { useEffect, useRef, useState } from 'react'
import BoardComponent from './Components/BoardComponent'
import { Board } from './models/Board'
function App() {

  const [board, setBoard] = useState<Board>(new Board())
  const [passTurn, setPassTurn] = useState<string>("bg-amber-50")
  const [player1, setPlayer1] = useState<number>(600)
  const [player2, setPlayer2] = useState<number>(600)
  const [startGame, setStartGame] = useState<boolean>(false)
  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  useEffect(() => {
    resetGame()
  }, [])
  const resetGame = () => {
    let newBoard = new Board()
    newBoard.initCels()
    newBoard.addFigures()
    setBoard(newBoard)
    setPassTurn("bg-amber-50")
    setPlayer1(600)
    setPlayer2(600)
    setStartGame(false)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (startGame) {
        if (passTurn == "bg-amber-50") {
          setPlayer1((prev) => prev - 1)
        } else {
          setPlayer2((prev) => prev - 1)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [passTurn, startGame])
  return (
    <>
      <div>
        <div className={`bg-[url('src/assets/chessBackground.jpeg')] bg-cover bg-center bg-no-repeat bg-black/50 flex justify-center items-center h-screen w-screen relative`}>
          <div className={`absolute left-20`}>
            <div className={`flex flex-row gap-16`}>
              <BoardComponent
                board={board}
                setBoard={setBoard}
                resetBoard={resetGame}
                passTurn={passTurn}
                setPassTurn={setPassTurn}
                startGame={startGame}
                setStartGame={setStartGame}
              />
              <div className={`flex flex-col justify-center items-center ml-7`}>
                <div className="text-white text-2xl font-bold mb-10 mr-10">
                  Player White: {formatTime(player1)}
                </div>
                <div className="text-white text-2xl font-bold mb-10 mr-10">
                  Player Black: {formatTime(player2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default App
