import { useState } from 'react';
import { useEffect } from 'react';
import { BoardsList } from './components/BoardsList';
import { NewBoardForm } from './components/NewBoardForm';
import { Board } from './components/Board';
import { NewCardForm } from "./components/NewCardForm";
import { getAllBoards, addNewBoard, getBoardById, addNewCard, deleteCard, likeCard} from './httpRequests/boardRequests';
import './App.css';

const convertBoardFromApi = (apiBoard) => {
  const newBoard = {
    id: apiBoard.id,
    creator: apiBoard.owner,
    title: apiBoard.title,
    cards: apiBoard.cards ? apiBoard.cards : []
  };

  return newBoard;
};

const convertCardFromApi = (apiCard) => {
  const newCard = {
    id: apiCard.id,
    message: apiCard.message,
    likes: apiCard.like_count
  };
  return newCard
};

function App() {
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({});
  const [isBoardSelected, setIsBoardSelected] = useState(false);

  useEffect(() => {
    getAllBoards()
    .then( apiBoards => {
      const boards = apiBoards.map(convertBoardFromApi);
      setBoardData(boards);
    })
    .catch(error => console.log(`couldn't update board data: ${error}`));
  }, [selectedBoard]);


  const addBoard = (newBoard) => {
    const apiBoard = {"title": newBoard.title, "owner": newBoard.creator};

    addNewBoard(apiBoard)
      .then(response => setBoardData(prevBoards => [convertBoardFromApi(response.board), ...prevBoards]))
      .catch(error => console.log(`Couldn't add board: ${error}`));
  };
  

  const selectBoard = (boardId) => {
    if (!boardId) {
      setSelectedBoard({});
      setIsBoardSelected(false);
      return;
    }

    getBoardById(boardId)
      .then(({board, cards}) => {
        const boardObj = convertBoardFromApi(board);
        boardObj['cards'] = cards.map(convertCardFromApi);
        setSelectedBoard(boardObj);
        setIsBoardSelected(true);
      })
      .catch(error => console.log(`Could not select board: ${error}`));
  };


  const addCard = (newCard) => {
    const apiCard = { "message": newCard.message, "like_count": 0 };

    addNewCard(selectedBoard.id, apiCard)
      .then(response => {
        console.log(response);
        setSelectedBoard(prevBoard => {
          const updatedCards = prevBoard.cards ? [...prevBoard.cards, convertCardFromApi(response.card)] : [convertCardFromApi(response.card)];
          return { ...prevBoard, cards: updatedCards || [] };
        });
      })
      .catch(error => console.log(`Could not add card: ${error}`));
    selectBoard(selectedBoard.id);
    console.log(selectedBoard);
  };

  const delCard = (cardId) => {
    console.log(cardId);
    deleteCard(cardId)
      .then(() => {
        setSelectedBoard(prevBoard => {
          const updatedCards = prevBoard.cards ? prevBoard.cards.filter(card => card.id !== cardId) : [];
          return { ...prevBoard, cards: updatedCards || [] };
        });
      })
      .catch(error => console.log(`Could not delete card: ${error}`));
  };

  const updateLikeCount = (cardId) => {
    likeCard(cardId)
      .then(response => {
        console.log(response);
        const updatedCard = convertCardFromApi(response);
        setSelectedBoard(prevBoard => {
          const updatedCards = prevBoard.cards.map(card => 
            card.id === cardId ? updatedCard : card
          );
          return { ...prevBoard, cards: updatedCards };
        });
      })
      .catch(error => console.log(`Could not update like count: ${error}`));
  };

  const headerTitle = isBoardSelected ? `INSPIRATION FOR ${selectedBoard.title}`: 'CHOOSE OR CREATE BOARD!';
  
  return (
    <div className='App'>
      <header>
        <h1>{headerTitle.toUpperCase()}</h1>
        <h2>{isBoardSelected && `Created by ${selectedBoard.creator}`}</h2>
      </header>
      <main>
        <section className='left-panel'>
          <BoardsList boards={boardData} onSelectBoard={selectBoard} />
          <NewBoardForm onAddBoard={addBoard}/>
          {isBoardSelected && <NewCardForm  onNewCard={addCard}/> }
        </section>
        <section className='cards-container'>
          {isBoardSelected ? <Board board={selectedBoard} onDeleteCard={delCard} onLikeCard={updateLikeCount}/> : ''}
        </section> 
      </main>
    </div>
  );
}

export default App;