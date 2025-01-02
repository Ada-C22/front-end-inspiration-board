import Card from './Card'
import CardForm from './CardForm'
import PropTypes from 'prop-types'
import './css/ActiveBoard.css'
import { useState } from 'react';
import EditBoardForm from './EditBoardForm';
import SortCardsInput from './SortCardsInput';

  const ActiveBoard = ({ActiveBoard, handleDeleteCard, handleLikeCard, handleEditCard, handleEditBoard, handleDeleteBoard, addCard, sortOption, handleSortChange,sortCards}) => {
    const [boardEditing, setBoardEditing] = useState(false);
    const [addCardState, setAddCardState] = useState(false);
    
    const handleClickAddCard = () => {
      setAddCardState(true)
    }
    
    const handleClickEditBoard = () => {
      setBoardEditing(true)
    }

    const handleClickDeleteBoard = () => {
      handleDeleteBoard(ActiveBoard.id)
    }

    const getActiveBoardCards = (cards) => {
      return cards.map((card) => {
        return (
            <Card
              key={card.id}
              id={card.id}
              boardId={ActiveBoard.id}
              owner={card.owner}
              message={card.message}
              likesCount={card.likesCount}
              handleDeleteCard={handleDeleteCard}
              handleLikeCard={handleLikeCard}
              handleEditCard={handleEditCard}
            />
        );
      });
  };
  return (<section className ="active-board-container">
    {boardEditing === false &&
    <div className="title-section">
      <h2 className ="active-board-name">Board Title | {ActiveBoard.title}</h2>
      <h4 className ="active-board-author"> Board Owner | {ActiveBoard.owner}</h4>
      <SortCardsInput sortOption={sortOption} handleSortChange={handleSortChange} sortCards={sortCards}/>  
    </div>
    }
    <div className="edit-board-container">
        {boardEditing === true &&
          <EditBoardForm
            id={ActiveBoard.id}
            title={ActiveBoard.title}
            owner={ActiveBoard.owner}
            setBoardEditing={setBoardEditing}
            handleEditBoard={handleEditBoard}
          />
        }

    <div className="card-and-button-section">
      <ul className="ab-card-container">
        {getActiveBoardCards(ActiveBoard.cards)}
        {addCardState === true &&
        <CardForm 
          setAddCardState={setAddCardState}
          addCard={addCard}
          />
        }

      </ul>
        <section className='active-board-button-container'>
          <button className="add-card-button" onClick={handleClickAddCard}>Add Card</button>
          <button className="edit-board-button" onClick={handleClickEditBoard}>Edit Board</button>
          <button className="delete-board-button" onClick={handleClickDeleteBoard}>Delete Board</button>
        </section>

      </div>
    </div>
  
  </section>
  )
  }

  ActiveBoard.propTypes= {
    ActiveBoard: PropTypes.shape({
      cards: PropTypes.arrayOf(
        PropTypes.shape({
          boardId: PropTypes.number.isRequired,
          id:PropTypes.number.isRequired,
          message: PropTypes.string.isRequired,
          likesCount: PropTypes.number.isRequired,
      }).isRequired,).isRequired,
      id: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    handleDeleteCard: PropTypes.func.isRequired,
    handleLikeCard: PropTypes.func.isRequired,
    handleEditCard: PropTypes.func.isRequired,
    handleEditBoard: PropTypes.func.isRequired,
    handleDeleteBoard: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    sortOption: PropTypes.string.isRequired,
    handleSortChange: PropTypes.func.isRequired,
    sortCards: PropTypes.func.isRequired,
    }
    
  export default ActiveBoard