import Card from './Card'
import PropTypes from 'prop-types'
// import './Card.css'
import './ActiveBoard.css'
import React, { useState } from 'react';
import EditBoardForm from './EditBoardForm';

  const ActiveBoard = ({ActiveBoard, handleDeleteCard, handleLikeCard, handleEditCard, handleEditBoard, handleDeleteBoard}) => {
    const [boardEditing, setBoardEditing] = useState(false);
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
  return <section className ="active-board-container">
    <h1 className ="active-board-name">{ActiveBoard.title}</h1>
    <h3 className ="active-board-author"> {ActiveBoard.owner}</h3> 
    <ul className="ab-card-container">{getActiveBoardCards(ActiveBoard.cards)}</ul>
    <div className="edit-board-container">
      {boardEditing > 0 &&
        <EditBoardForm
          id={ActiveBoard.id}
          title={ActiveBoard.title}
          owner={ActiveBoard.owner}
          setBoardEditing={setBoardEditing}
          handleEditBoard={handleEditBoard}
        />
      }
      <button className="edit-board-button" onClick={handleClickEditBoard}>edit board</button>
      <button className="delete-board-buttton" onClick={handleClickDeleteBoard}>delete board</button>
    </div>
  </section>
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
    }
    
  export default ActiveBoard