import propTypes from 'prop-types';
import './Card.css'

export const Card = (props) => {
  const onLikeClick = () => {
    props.onLikeCard(props.id);
  };

  const onHandleDelete = () => {
    console.log(props.id);
    props.onDeleteCard(props.id);
  };

  return (
    <li className="card-container"> 
      <h3>{props.message}</h3>
      <p>{props.likes}</p>
      <button onClick={onLikeClick}>💜</button>
      <button onClick={onHandleDelete}>Delete</button>
    </li>
  );
};

Card.propTypes = {
  id: propTypes.number.isRequired,
  message: propTypes.string.isRequired,
  likes: propTypes.number.isRequired,
  onDeleteCard: propTypes.func.isRequired,
  onLikeCard: propTypes.func.isRequired
};