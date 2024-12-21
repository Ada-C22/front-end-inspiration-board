import { useState } from 'react'
import threeSampleBoardsData from './data/oneboard'
import BoardList from'./components/BoardList'
import React from 'react'
import twoBoardList from './data/twoBoards'
import './App.css'




function App() {
  const defaultBoard = threeSampleBoardsData[0]
  const [activeBoard, setActiveBoard] = useState(defaultBoard)

  return (
    <>
      <h1>Vision Board</h1>
      <BoardList Boards={twoBoardList} />
      {/* <ActiveBoard ActiveBoard={defaultBoard}/> */}
    </>
  )
}

export default App
