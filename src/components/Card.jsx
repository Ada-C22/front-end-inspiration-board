import './css/Card.css'
import PropTypes from 'prop-types'
import { useState } from 'react';
import EditCardForm from './EditCardForm';



const Card =({id, boardId, owner, message, likesCount, handleDeleteCard, handleLikeCard, handleEditCard}) => {
  const [cardEditing, setCardEditing] = useState(false);
  
  const onClickEditButton = () => {
    setCardEditing(!cardEditing)
  }
  const onClickDelete = () =>{
    handleDeleteCard(id)
  };


  const onClickLike = ()  => {
    handleLikeCard(id)
  }

  return (
  <li className="card-container">
    {cardEditing === false &&
      <section className='card-info-container'>
        <div className="card-content">
          <h5 className="card-owner">Author | {owner}</h5>
          <h2 className="card-message">{message}</h2>
          <p className="card-like-counts">{likesCount} likes</p>
        </div>
        <div className="card-buttons">
          <button onClick={onClickLike}> like</button>
          <button onClick={onClickDelete}>Delete</button>
          <button onClick={onClickEditButton}>Edit</button>
        </div>
      </section> 
    }
    {cardEditing === true && 
      <section className="edit-card-container">
        <EditCardForm 
        id={id}
        boardId={boardId}
        likesCount={likesCount}
        message={message}
        owner={owner}
        setCardEditing={setCardEditing}
        handleEditCard={handleEditCard}
        />
      </section>}
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


