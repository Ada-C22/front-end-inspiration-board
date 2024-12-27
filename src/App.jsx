import { useState, useEffect } from 'react'
import BoardList from'./components/BoardList'
import React from 'react'
import axios from 'axios'
import ActiveBoard from './components/ActiveBoard'
import './App.css'
import boardOneCards from './data/boardOneCards';
import CardForm from './components/CardForm'
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


const deleteCardApi = (id) => {
  const deleteCardEndpoint = apiEndpointLink + '/cards' + '/' + (id.toString())
  return axios.delete(deleteCardEndpoint)
  .catch(error=> {
    console.log(error);
  });

}


function App() {
  const [activeBoardId, setActiveBoardId] = useState(1);
  const [activeBoardData, setActiveBoardData] = useState(boardOneCards);
  const [boardsData, setBoardsData] = useState([]);
  const [sortOption, setSortOption] = useState('id');
  
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

  const addCard = (card) => {
    axios.post(`${apiEndpointLink}/boards/${activeBoardId}/cards`, card)
      .then(response => {
        setActiveBoardData(prevState => ({
          ...prevState,
          cards: [...prevState.cards, convertCardFromApi(response.data)]
        }));
      })
      .catch(error => {
        console.error('Error adding card:', error);
        getActiveBoard(); // Refresh the active board to show the new card
      });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    sortCards(event.target.value);
  };

  const sortCards = (sortOption) => {
    const sortedCards = [...activeBoardData.cards];
    if (sortOption === 'id') {
      sortedCards.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'likes') {
      sortedCards.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortOption === 'alphabetically') {
      sortedCards.sort((a, b) => a.message.localeCompare(b.message));
    }

    setActiveBoardData(prevState => ({
      ...prevState,
      cards: sortedCards
    }));
  }
  
  const handleDeleteCard = (id) => {
    deleteCardApi(id);
    const newCards = activeBoardData.cards.filter((card) => {
      return card.id !== id; 
    });
    activeBoardData.cards = newCards;
    const updatedActiveBoardData = {
      ... activeBoardData
    }
    setActiveBoardData(updatedActiveBoardData);
  }

  return (
    <>
      <h1>Vision Board</h1>
      <BoardList 
        Boards={boardsData} 
        handleChangeActiveBoard = {handleChangeActiveBoard}/>
      <CardForm addCard={addCard}/>  
      <div>
        <label htmlFor="sort">Sort Cards by:</label>
        <select id='sortOptions' value={sortOption} onChange={handleSortChange}>
          <option value='id'>ID</option>
          <option value='likes'>Likes</option>
          <option value='alphabetically'>Alphabetically</option>
        </select>
      </div>
      <ActiveBoard 
        ActiveBoard={activeBoardData}
        handleDeleteCard={handleDeleteCard}/>
    </>
  )
}


export default App
