import { useEffect, useState } from 'react'
import './App.css'
import BoardList from './Components/BoardList';
import CardList from './Components/CardList';
import Modal from './Components/Modal';
import NewBoardForm from './Components/NewBoardForm';
import NewCardForm from './Components/NewCardForm';
import axios from 'axios';
import SortDropdown from './Components/SortDropdown';

//const kBaseUrl = 'http://localhost:5000'
const kBaseUrl = 'https://back-end-inspiration-board-7w36.onrender.com'

const formatApi = (apiCard) => {
  // convert api data to the format we need
  const newCard = {
    ...apiCard,
    boardId: apiCard.board_id,
    likesCount: apiCard.likes_count
  };
  delete newCard.board_id;
  delete newCard.likes_count;
  return newCard
};

// helper function to get BOARD info from backend
const getAllBoardsApi = () => {
  return axios.get(`${kBaseUrl}/boards`)
    .then(response => {
      return response.data})
    .catch(error => {
      console.log(error)
    })
}

// helper function to get CARD info from backend
const getAllCardsApi = (sortBy = '') => {
  const sortParam = sortBy ? `?sort_by=${sortBy}` : '';
  return axios.get(`${kBaseUrl}/cards${sortParam}`)
    .then(response => {
      const apiCards = response.data;
      const newCards = apiCards.map(formatApi);
      return newCards;
    })
    .catch(error => {
      console.log(error)
    })
};

///////////////////////
function App() {
  const [activeBoardId, setActiveBoardId] = useState(0)
  const [boardData, setBoardData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  // function that gets board api promise and then chains to set board data 
  const getAllBoards = () => {
    getAllBoardsApi()
      .then(boards => {
        setBoardData(boards)
      })
  };

  // function that gets card api promise and then chains to set card data 
  const getAllCards = (sortBy = '') => {
    getAllCardsApi(sortBy)
      .then(cards => {

        setCardData(cards)
      })
  };

  // Helper function to remove selected card from back-end database
  const handleDeleteCard = (cardId) => {
	return axios.delete(`${kBaseUrl}/cards/${cardId}`)
		.then(() => {
			setCardData(cardData => cardData.filter(card => {return card.id !== cardId}));
		})
		.catch(error=> {
			console.log(error);
		});
  };

  const handleLikesCount = (cardId) => {
	const card = cardData.find(card => card.id === cardId);
  	const updatedLikesCount = card.likesCount + 1;

	return axios.put(`${kBaseUrl}/cards/${cardId}/like`, { likes_count: updatedLikesCount })
		.then(response => {
			setCardData(cardData => cardData.map(card => {
				if (card.id === cardId) {
				return { ...card, likesCount: updatedLikesCount };
				} else {
				return card;
				}
		}));
		})
		.catch(error => {
		console.log(`Error: ${error}`);
		});
	};
	

  // get api data when mounting
  useEffect(()=> {
    console.log('Sorting by:', sortBy);
    getAllBoards();
    getAllCards(sortBy);
  },[sortBy]);

  // Board component calls this fn, passes in id, to set active board
  const handleActiveBoard = (id) => {
    setActiveBoardId(id);
  };

  // Finding the activeBoardId object to display to user!
  const activeBoard = boardData.find(board => board.id === activeBoardId);

  // when new Board is submitted
  const handleBoardSubmit = (boardFormData) => {
    return axios.post(`${kBaseUrl}/boards`, boardFormData)
      .then((result) => {
        setBoardData((prevBoards) => [...prevBoards, result.data])
      })
      .catch((error) => console.log(error))
  };

  const handleCardSubmit = (cardFormData) => {
    if (!activeBoardId) {
      alert("Please select a board before adding a card.");
      return;
  } const newCard = {
    ...cardFormData,
    board_id: activeBoardId,
    likes_count: 0,
  };

    return axios.post(`${kBaseUrl}/boards/${activeBoardId}/cards`, newCard)
      .then((result) => {
        setCardData((prevCards) => [...prevCards, formatApi(result.data)])
        setIsCardModalOpen(false);
      })
        .catch((error) => {
          console.error("Error adding card:", error);
          alert("Failed to add the card. Please try again.");
      });
};
const handleSortChange = (sortOption) => {
  setSortBy(sortOption);
}
  return (
    <div className='App'>
      <div className='header'>
        <h1 className='heading'>Dream Board</h1>
        <div className='create-container'>
          <button onClick={()=> setIsBoardModalOpen(true)}>+ Board</button>
          <button 
            onClick={() => {
              if (!activeBoardId) {
                alert("Please select a board before adding a card. If no board is available to select, add a board.");
              } else {
                setIsCardModalOpen(true);
              }
            }} 
          >+ Card  </button>
          
        </div>
      </div>
      <hr className='divider'></hr>
      <div className='tabs'>
        <button className='all' onClick={() => setActiveBoardId(0)}>All</button>
        <BoardList 
          boardData={boardData} 
          handleActiveBoard={handleActiveBoard}
        ></BoardList>
      </div>
		{activeBoard ? (
		<div className='active-board'>
			<h3 className ="board-select">#{activeBoard.title}</h3>
		</div>
		) : (
		<h3 className="board-select none">Please select a board to add a card.</h3>
		)}
	  <></>
	  <SortDropdown onSortChange={handleSortChange}
	  />
	  <></>
      <div>
        <CardList
          cardData={cardData}
          activeBoardId={activeBoardId}
		      handleDeleteCard={handleDeleteCard}
		      handleLikesCount={handleLikesCount}
        ></CardList>
      </div>
      <Modal open={isBoardModalOpen} onClose={() => setIsBoardModalOpen(false)}>
        <h2>Create a New Board</h2>
        <NewBoardForm
          handleBoardSubmit={handleBoardSubmit}
        ></NewBoardForm>
      </Modal>
      <Modal open={isCardModalOpen} onClose={() => setIsCardModalOpen(false)}>
			
        <h3>
			Create a new card.
		</h3>

        <NewCardForm
        handleCardSubmit={handleCardSubmit} 
		activeBoard={activeBoard}
		/>
      </Modal>
    </div>
  )
}

export default App
