import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import CardList from './components/CardList';
import NewCardForm from './components/NewCardForm';
import NewBoardForm from './components/NewBoardForm';
import Board from './components/Board';



const kBaseURL = import.meta.env.VITE_APP_BACKEND_URL;
const convertFromApi = (apiCard) => {
    return {
        id: apiCard.id,
        message: apiCard.message,
        likesCount: apiCard.likes_count || 0,
        boardId: apiCard.board_id,
    };
};

function App() {
    const [boardData, setBoardData] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const [cardData, setCardData] = useState([]);
    const [showNewBoardForm, setShowNewBoardForm] = useState(true);

    // Fetch all boards
    useEffect(() => {
        axios.get(`${kBaseURL}/boards`)
            .then((response) => {
                console.log('Boards', response.data);
                setBoardData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching boards:', error);
            });
    }, []);

    // Add New Board
    const handleAddBoard = (board) => {
        axios.post(`${kBaseURL}/boards`, board)
            .then((response) => {
                console.log('New Board Added:', response.data);
                setBoardData((prevData) => [...prevData, response.data]);
            })
            .catch((error) => {
                console.error('Error adding board:', error);
            });
    };

    // Select Board
    const handleSelectBoard = (boardId) => {
        setSelectedBoardId(boardId);
    };

    //Select board by title
    const selectedBoardTitle = boardData.find((board) => board.id === selectedBoardId)?.title;

    // Fetch cards for selected board
    useEffect(() => {
        if (selectedBoardId) {
            axios.get(`${kBaseURL}/boards/${selectedBoardId}/cards`)
                .then((response) => {
                    console.log('Cards', response.data.cards);
                    setCardData(response.data.cards.map(convertFromApi));
                })
                .catch((error) => {
                    console.error('Error fetching cards:', error);
                });
        }
    }, [selectedBoardId]);

    // Add New Card
    const handleAddCard = (card) => {
        axios.post(`${kBaseURL}/boards/${selectedBoardId}/cards`, card)
            .then((response) => {
                const newCard = convertFromApi(response.data);
                console.log('New Card Added:', newCard);
                setCardData((prevData) => [...prevData, newCard]);
            })
            .catch((error) => {
                console.error('Error adding card:', error);
            });
    };

    // Delete a Card
    const handleDeleteCard = (id) => {
        axios.delete(`${kBaseURL}/cards/${id}`)
            .then(() => {
                console.log(`Card with id ${id} deleted.`);
                setCardData((prevData) => prevData.filter((card) => card.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting card:', error);
            });
    };

    // handle like counts
    const handleLikeCard = (id) => {
        axios.patch(`${kBaseURL}/cards/${id}/like`)
            .then((response) => {
                console.log('Card Liked:', response.data);
                setCardData((prevData) =>
                    prevData.map((card) =>
                        card.id === id
                            ? { ...card, likesCount: response.data.likes_count }
                            : card
                    )
                );
            })
            .catch((error) => {
                console.error('Error liking card:', error);
            });
    };

    //Toggle NewBoardForm visibility
    const toggleNewBoardForm = () => {
        setShowNewBoardForm((prev) => !prev);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Inspiration Board</h1>
            </header>
            <main>
                <div className="page-container">
                    <div className="board-container">
                        <h2>Boards</h2>
                        <div className="boards-list">
                            {boardData.map((board) => (
                                <li key={board.id}>
                                    <button
                                        key={board.id}
                                        onClick={() => handleSelectBoard(board.id)}
                                        className={`board-button ${selectedBoardId === board.id ? 'selected' : ''}`}
                                    >
                                        {board.title} - {board.owner}
                                    </button>
                                </li>
                            ))}
                        </div>
                    </div>
                    <div className="form-container">
                        <div className="new-board-form-container">
                            <h2>Add a New Board</h2>
                            <div className={`new-board-form ${showNewBoardForm ? '' : 'hidden'}`}>
                                <NewBoardForm handleSubmit={handleAddBoard} selectedBoardId={selectedBoardId}/>
                            </div>
                            <button onClick={toggleNewBoardForm} className="new-board-form-toggle-button">
                                {showNewBoardForm ? 'Hide New Board Form' : 'Show New Board Form'}
                            </button>
                        </div>
                        {selectedBoardId && (
                            <div className="new-card-form-container">
                                <h2>Add a New Card</h2>
                                <NewCardForm handleSubmit={handleAddCard} boardId={selectedBoardId} />
                            </div>
                        )}
                    </div>
                    <div className="cards-section">
                        <h2>Cards for Board: {selectedBoardTitle}</h2>
                        <div className="cards-container">
                            <CardList cards={cardData} onDelete={handleDeleteCard} onLike={handleLikeCard} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;

