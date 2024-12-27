import './card.css'
import PropTypes from 'prop-types'




const Card =(card) => {
  const onClickDelete = () =>{
    card.handleDeleteCard(card.id)
  };

  return (
  <li className="card-container">
    <div className="cardContent">
    <h2 className="card-message">{card.message}</h2>
    {/* <h4>Author:{card.author}</h4> */}
    <p className="card-like-counts">{card.likesCount} likes</p>
    </div>
    <div className="card-buttons">
      <button> like</button>
      <button onClick={onClickDelete}>Delete</button>
      <button>Edit</button>
    </div>
  </li>
)
}

Card.propTypes = {
  id:PropTypes.number.isRequired,
  // author: PropTypes.string.isRequired
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
}
export default Card


