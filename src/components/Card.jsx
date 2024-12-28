import './card.css'
import PropTypes from 'prop-types'
import CardForm from './CardForm';
import React, { useState } from 'react';
import EditCardForm from './EditCardForm';


const Card =({id, boardId, owner, message, likesCount, handleDeleteCard, handleLikeCard, handleEditCard}) => {
  const [editing, setEditing] = useState(false);
  
  const onOpenEditing = () => {
    setEditing(!editing)
  }
  const onClickDelete = () =>{
    handleDeleteCard(id)
  };


  const onClickLike = ()  => {
    handleLikeCard(id)
    console.log(`line 20 in card`)
  }

  return (
  <li className="card-container">
    <div className="cardContent">
    <h4>{owner}</h4>
    <h2 className="card-message">{message}</h2>
    {/* <h4>Author:{card.author}</h4> */}
    <p className="card-like-counts">{likesCount} likes</p>
    </div>
    <div>
    {editing > 0 && 
      <EditCardForm 
      id={id}
      boardId={boardId}
      likesCount={likesCount}
      message={message}
      owner={owner}
      setEditing={setEditing}
      handleEditCard={handleEditCard}
      />}
    </div>
    <div className="card-buttons">
      <button onClick={onClickLike}> like</button>
      <button onClick={onClickDelete}>Delete</button>
      <button onClick={onOpenEditing}>Edit</button>
    </div>

  </li>
)
}

Card.propTypes = {
  id:PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  owner:PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  handleEditCard: PropTypes.func.isRequired,
}
export default Card


