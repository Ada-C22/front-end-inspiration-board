import { useState, useEffect } from 'react'
import BoardList from'./components/BoardList'
import axios from 'axios'
import ActiveBoard from './components/ActiveBoard'
import './App.css'
import CardForm from './components/CardForm'
// import BoardForm from './components/BoardForm' // this is the form that is not rendering
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
  const patchCardEndpoint = apiEndpointLink + '/cards' + '/' + (cardData.id.toString());
  const jsonCard = convertCardForApi(cardData)
  return axios.patch(patchCardEndpoint,jsonCard)
  .catch(error=> console.error(error));
}

const createBoardApi = (boardData) => {
  const postBoardEndpoint = apiEndpointLink + '/boards'; 
  return axios.post(postBoardEndpoint,boardData)
  .then(response => {
    const createdBoardData = {
    id : response.data.id
    }
    console.log(createdBoardData)
    return createdBoardData}
  )
  .catch(error => {
    console.error('Error adding Board:', error);
  });
};

// TROUBLESHOOTING CODE:
// const createBoardApi = (boardData) => {
//   const postBoardEndpoint = `${apiEndpointLink}/boards`;

//   return axios.post(postBoardEndpoint, boardData, {
//     headers: {
//       'Content-Type': 'application/json', // Use JSON, as the backend expects this
//     },
//   });
// };

const updateBoardTitleApi = (boardData) => {
  const putBoardTitleEndpoint = apiEndpointLink + '/boards' + '/' + (boardData.id.toString());
  return axios.put(putBoardTitleEndpoint,({'title':boardData.title}))
  .catch(error=> console.error(error));
}


const deleteBoardApi = (id) => {
  const deleteBoardEnpoint = apiEndpointLink + '/boards' + '/' +(id.toString());
  return axios.delete(deleteBoardEnpoint)
  .catch(error=>console.error(error));
}

////////////////////////// APP //////////////////////////////

function App() {
  const [activeBoardId, setActiveBoardId] = useState(1);
  const [activeBoardData, setActiveBoardData] = useState({});
  const [boardsData, setBoardsData] = useState([]);
  const [sortOption, setSortOption] = useState('id');
  const [activeBoardOpen,openActiveBoard] = useState(false)
  const [createBoardState,setCreateBoardState] = useState(false)
    
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
  }, [activeBoardId]);
  
  const handleChangeActiveBoard = (id) =>  {
    setActiveBoardId(id);
    openActiveBoard(true)
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
    console.log('Sort option changed:', event.target.value);  // Debug log
    setSortOption(event.target.value);
    sortCards(event.target.value);
  };

  const sortCards = (sortOption) => {
    console.log('Sorting cards by:', sortOption);  // Debug log
    const sortedCards = [...activeBoardData.cards];
    if (sortOption === 'id') {
      sortedCards.sort((a, b) => a.id - b.id);
    } else if (sortOption === 'likes') {
      sortedCards.sort((a, b) => b.likesCount - a.likesCount);
    } else if (sortOption === 'alphabetically') {
      sortedCards.sort((a, b) => a.message.localeCompare(b.message));
    }

    console.log('Sorted cards:', sortedCards);  // Debug log

    setActiveBoardData(prevState => ({
      ...prevState,
      cards: sortedCards
    }));
  }
  const handleSetActiveBoard = (data) => {
    const updatedActiveBoardData = {
      ... data
    }

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
    const newCardsData = activeBoardData.cards.map((card) => {
      if (card.id === editedCardData.id) {
        return editedCardData; 
      } else { 
        return card;
      }
    });
    
    const newActiveBoardData = {
      ...activeBoardData,
      cards: newCardsData
    }
    updateCardDataApi(editedCardData);
    handleSetActiveBoard(newActiveBoardData);
    
  }

  const handleCreateBoard= (newBoardData) => {
    createBoardApi(newBoardData)
    .then( response=> {
      console.log('response was',response)
      // setActiveBoardId(response.createdBoardData.id)
    })
  };

// TROUBLESHOOTING CODE:
  // const handleCreateBoard = async (newBoardData) => {
  //   try {
  //     const createdBoard = await createBoardApi(newBoardData);
  //     setBoardsData((prevBoards) => [...prevBoards, createdBoard]);
  //     console.log('Board created successfully:', createdBoard);
  //   } catch (error) {
  //     console.error('Failed to create board:', error);
  //   }
  // };

  const handleEditBoard = (editedBoardData) => {
    const newBoardsData = boardsData.map((board) => {
      if (board.id === editedBoardData.id) {
        return editedBoardData;
      } else {
        return board;
      }
    });
    const newActiveBoardData= {
      ...activeBoardData,
      title:editedBoardData.title,
      owner:editedBoardData.owner,
    }
    updateBoardTitleApi(editedBoardData)

    // updateBoardsDataApi(editedBoardData);
    setActiveBoardData(newActiveBoardData)
    setBoardsData(newBoardsData);
  };

  const handleDeleteBoard = (id) => {
    deleteBoardApi(id)
    const newBoardsData = boardsData.filter((board) => {
      return board.id !== id; 
    });
    if (activeBoardId === id) {
      openActiveBoard(false)
    };
    setBoardsData(newBoardsData);


  };
  
  return (
    <div className='App'>
      <h1>Vision Board</h1>
      <BoardList 
        Boards={boardsData} 
        handleChangeActiveBoard = {handleChangeActiveBoard}
        activeBoardId={activeBoardId}
        createBoardState={createBoardState}
        setCreateBoardState={setCreateBoardState}
        handleCreateBoard={handleCreateBoard} />
        {/* <BoardForm handleCreateBoard={handleCreateBoard}/> // this is the form that is not rendering */}
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
            handleEditBoard={handleEditBoard}
            handleDeleteBoard={handleDeleteBoard}
          />
        </div>
      }
    </div>
  )
}

export default App
