import { useState, useEffect } from 'react'
import BoardList from'./components/BoardList'
import React from 'react'
import axios from 'axios'
import ActiveBoard from './components/ActiveBoard'
import './App.css'
import boardOneCards from './data/boardOneCards';
const apiEndpointLink = "https://inspiration-board-app-bd54c001ba81.herokuapp.com"


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
  const [activeBoardData, setActiveBoardData] = useState(boardOneCards)
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


  return (
    <>
      <h1>Vision Board</h1>
      <BoardList 
        Boards={boardsData} 
        handleChangeActiveBoard = {handleChangeActiveBoard}/>
      <ActiveBoard 
        ActiveBoard={activeBoardData}/>
    </>
  )
}


export default App
