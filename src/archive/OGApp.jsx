import { useState, useEffect } from 'react'
import BoardList from'./components/BoardList'
import React from 'react'
import twoBoardList from './data/twoBoards'
import axios from 'axios'

import ActiveBoard from './components/ActiveBoard'
// import boardOneCards from './data/boardOneCards'
import './App.css'
const apiEndpointLink = "https://inspiration-board-app-bd54c001ba81.herokuapp.com"


// const createBoardApi = () => {
//   const createBoardEndpoint = apiEndpointLink + '/boards'
//   console.log(createBoardEndpoint)
//   return axios.post(createBoardEndpoint,newBoard)
//   .then((response) =>console.log(response))
//   .catch((error) => console.error(error));
// };

// const createCardApi = (boardId) => {
//   console.log(boardId.toString())
//   const createCardEndpoint = apiEndpointLink+'/boards'+'/'+(boardId.toString()) +'/cards'
//   console.log(createCardEndpoint)
//   // return axios.post(createCardEndpoint,newCard)
//   // .then((response) => console.log(response))
//   // .catch((error) => console.error(error));  
// };
const getBoardsApi = () => {
  const getBoardsEnpoint = apiEndpointLink + '/boards'
  return axios.get(getBoardsEnpoint)
  .then((response) => {
    const apiBoards = response.data
    return apiBoards
  })
  .catch((error) =>  console.error(error));
};

const getActiveBoardApi = (activeBoardId) => {
  const getActiveBoardEnpoint = apiEndpointLink + '/boards' +'/'+ (activeBoardId.toString())+'/cards'
  return axios.get(getActiveBoardEnpoint)
  .then((response) => {
    const apiActiveBoard = response.data
    const apiCards = apiActiveBoard.cards
    const jsCards = apiCards.map(convertCardFromApi);
    const activeBoard = {
      id : apiActiveBoard.id, 
      owner : apiActiveBoard.owner,
      title : apiActiveBoard.title, 
      cards: jsCards
    }
    return activeBoard
  })
  .catch((error) =>  console.error(error));
};

const convertCardFromApi = (apiCard) => {
  const jsCard = {
    ... apiCard, 
    boardId: apiCard.board_id,
    likesCount : apiCard.likes_count ,

  };
  delete jsCard.likes_count; 
  delete jsCard.board_id;
  return jsCard
  };

function App() {
  const [activeBoardId, setActiveBoardId] = useState(1)
  const [activeBoardData, setActiveBoardData] = useState([])
  const [boardsData, setBoardsData] = useState([])
  
  const getBoardsList = () => {
    getBoardsApi().then(boards => {
      setBoardsData(boards);
    });
  };
  useEffect(()=> {
    getBoardsList();
  }, []);

  const getActiveBoard = () => {
    getActiveBoardApi(activeBoardId).then(board => {
      setActiveBoardData(board);
    });
    };
  useEffect(()=> {
    getActiveBoard();
  }, []);
  
  const handleChangeActiveBoard = (id) =>  {
    setActiveBoardId(id)
    getActiveBoard()
  }



  // const activeBoard = 1
  // const defaultBoard = threeSampleBoardsData[0]
  // const [activeBoard, setActiveBoard] = useState(boardOneCards)
  // getActiveBoardApi(activeBoard)
  return (
    <>
      <h1>Vision Board</h1>
      <BoardList 
        Boards={boardsData} 
        handleChangeActiveBoard = {handleChangeActiveBoard}/>
      {/* <ActiveBoard 
        ActiveBoard={activeBoardData}/> */}
    </>
  )
}

export default App