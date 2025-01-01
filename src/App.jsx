
import './App.css';
import CardList from './components/CardList';
import NewBoardForm from './components/NewBoardForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './components/Board';

const boardsData = [
  {
    id: 1,
    title: 'Pick-me-up Quotes',
    owner: 'Sunitha',
  },
  {
    id: 2,
    title: 'Test board',
    owner: 'Lorraine',
  },
];

const cardsData = [
  {
    id: 1,
    message: 'Enjoy your books',
    likesCount: 0,
    boardId: 1,
  },
  {
    id: 2,
    message: 'Go out for a walk',
    likesCount: 0,
    boardId: 1,
  },
];


// const kbaseURL = 'http://localhost:5000';


// const convertFromBoardApi = (board) => {
//   const newBoard = {
//     ...board,
//     id:board.board_id,
//   };
//   delete newBoard.board_id;
//   return newBoard;
// };

// const convertFromCardApi = (card) => {
//   const newCard = {
//     ...card,
//     id: card.card_id,
//     likesCount: card.likes_count,
//     boardId: card.board_id,
//   };
//   delete newCard.card_id;
//   delete newCard.likes_count;
//   delete newCard.board_id;
//   return newCard;
// };

// const getAllBoardsApi = () => {
//   return axios.get(`${kbaseURL}/boards`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error('Error fetching boards', error);
//     });
// };

// const getAllCardsApi = (boardId) => {
//   return axios.get(`${kbaseURL}/boards/${boardId}/cards`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error('Error fetching cards', error);
//     });
// };

const deleteCardApi = (cardId) => {
  return axios.delete(`${kbaseURL}/cards/${cardId}`)
    .catch((error) => {
      console.error('Error deleting card', error);
    });
};

const likeCardApi = (cardId) => {
  return axios.put(`${kbaseURL}/cards/${cardId}/liked`)
  .catch((error) => {
    console.error('Error liking card', error);
  });
}

const App = () => {

  // const [boardsData, setBoardsData] = useState([]);
  // const [cardsData, setCardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  // const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);

  const onBoardClick = (BoardId) => {
    console.log(`Board with id ${BoardId} clicked`);

    const clickedBoard = boardsData.find((board) => board.id === BoardId);
    setSelectedBoard(clickedBoard);
  };

  const likeCard = (cardId) => {
    const card = cardsData.find(card => card.id === cardId);
    likeCardApi(cardId)
      .then(()=> {
        setCardsData((cardsData) => cardsData.map(card => {
          if (card.id === cardId) {
            return {...card, likesCount: card.likesCount + 1};
          }else {
            return card;
          }
        }));
    });
  };

  const deleteCard = (cardId) => {
    deleteCardApi(cardId)
      .then(() => {
        setCardsData((cardsData) => cardsData.filter(card => card.id !== cardId));
        return tasksData;
      });
  };
 
//   const handleBoardSubmit = (newBoard) => {
//     return axios.post(`${kbaseURL}/boards`, newBoard)
//       .then((response) => {
//         setBoardsData([...boardsData, convertFromBoardApi(response.data)]);
//       })
//       .catch((error) => {
//         console.error('Error creating board', error);
//       });
//   };

//   const getAllBoards =() => {
//     getAllBoardsApi()
//       .then((data) => {
//         setBoardsData(data.map(convertFromBoardApi));
//       });
//   };

// useEffect(() => {
//   getAllBoards();
// },[]);

  return (
    <div className='content_container'>
    <div id="root">
      <h1>Inspiration Board</h1>
      <section className='boards__container'>
        <section>
          <h2>Boards</h2>
          <Board boards = {boardsData} onBoardClick={onBoardClick}/>

        </section>
        <section>
          <h2>Selected Board</h2>
          {selectedBoard && (
            <p>{selectedBoard.title} - {selectedBoard.owner}</p>
          )}
        </section>
        <section className="new-board-form__container">
          <h2>Create a New Board</h2>

        </section>
      </section>
      {selectedBoard && (
        <section className="cards__container">
          <section>
            <h2>Cards For {selectedBoard.title}</h2>
            <CardList cards={cardsData} onLikeCardClick={likeCard} onDeleteCard={deleteCard}/>
          </section>
          <section className="new-card-form__container">
            <h2>Create a New Card</h2>
            <form className="new-card-form">
              <label>Message</label>
              <input type="text" className="invalid-form-input"/>
              <p>Preview:</p>
              <input type="submit" className="new-card-form-submit-btn"/>

            </form>

        </section>
      </section>
      )}
    </div>

      </div>
  );
};

export default App;
