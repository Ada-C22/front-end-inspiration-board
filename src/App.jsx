import { useState, useEffect } from 'react'
import BoardList from'./components/BoardList'
import axios from 'axios'
import ActiveBoard from './components/ActiveBoard'
import './App.css'
import boardOneCards from './data/boardOneCards';
import CardForm from './components/CardForm'
const apiEndpointLink = "https://inspiration-board-app-bd54c001ba81.herokuapp.com"



/////////////////// helper functions for api calls/ rendering the page//////////////////////////////

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

const convertCardForApi = (jsxCard) => {
  const jsonCard = {
    ... jsxCard, 
    board_id : jsxCard.boardId, 
    likes_count : jsxCard.likesCount 
  };
  return jsonCard
};

const updateCardDataApi = (cardData) => {
  const patchCardEndpoint = apiEndpointLink + '/cards' + '/' + (cardData.id.toString())
  const jsonCard = convertCardForApi(cardData)
  return axios.patch(patchCardEndpoint,jsonCard)
  .catch(error=> {
    console.log(error);
  });

}



////////////////////////// APP //////////////////////////////

function App() {
  const [activeBoardId, setActiveBoardId] = useState(1);
  const [activeBoardData, setActiveBoardData] = useState({
    id: 0,
    owner: '',
    title: '',
    cards: [],
  });
  const [boardsData, setBoardsData] = useState([]);
  const [sortOption, setSortOption] = useState('id');
  const [activeBoardOpen,openActiveBoard] = useState(false)
    
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
      // console.log(`line 104 set active board in get active board function`)
    });
  };
  useEffect(()=> {
    getActiveBoard();
    console.log(`line 115 set active board in use effect`)

  }, [activeBoardId]);
  
  const handleChangeActiveBoard = (id) =>  {
    console.log(`line 113 set active board in handleChangeActiveBoard function`)
    setActiveBoardId(id);
    openActiveBoard(true)
  }

  const addCard = (card) => {
    axios.post(`${apiEndpointLink}/boards/${activeBoardId}/cards`, card)
      .then(response => {
        console.log(`line 121 set active board in get addCard function`)
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

    console.log(`line 148 set active board sort cards function`)
    setActiveBoardData(prevState => ({
      ...prevState,
      cards: sortedCards
    }));
  }
  const handleSetActiveBoard = (data) => {
    const updatedActiveBoardData = {
      ... data
    }

    console.log(`line 159 set active board in handleSetActiveBoardFuncction`)
    setActiveBoardData(updatedActiveBoardData)};
  
  
  const handleDeleteCard = (id) => {
    deleteCardApi(id);
    const newCards = activeBoardData.cards.filter((card) => {
      return card.id !== id; 
    });
    activeBoardData.cards = newCards;
    handleSetActiveBoard(activeBoardData)
  };

  const handleLikeCard = (id) => {
    const newData = activeBoardData.cards.map((card) => {
      if (card.id === id) {
        card.likesCount++;
      }
      updateCardDataApi(card)
      return card;

    });
    activeBoardData.cards = newData; 
    handleSetActiveBoard(activeBoardData)
  };

  const handleEditCard = (editedCardData) => {
    const newData = activeBoardData.cards.map((card) => {
      if (card.id === editedCardData.id) {
        editedCardData
      }
      updateCardDataApi(editedCardData)
      return card; 

    });
    activeBoardData.cards= newData; 
    handleSetActiveBoard(activeBoardData)

  }
  
  return (
    <div className='App'>
      <h1>Vision Board</h1>
      <BoardList 
        Boards={boardsData} 
        handleChangeActiveBoard = {handleChangeActiveBoard}
        activeBoardId={activeBoardId}/>
        {activeBoardOpen > 0 &&
        <div className='active-board-container'>
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
            handleDeleteCard={handleDeleteCard}
            handleLikeCard={handleLikeCard}
            handleEditCard={handleEditCard}
          />
          </div>}
      </div>
  )
}


export default App
