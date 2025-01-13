import { Card } from './Card';
import propTypes from 'prop-types';
import './CardList.css'

export const CardList = (props) => {

  const allCards = props.cards.map((card, index) => {
      return <Card key={index} id={card.id} message={card.message} likes={card.likes} onDeleteCard={props.onDeleteCard} onLikeCard={props.onLikeCard}/>
  });
  
  return <ul className="cards">{allCards}</ul>
};

CardList.propTypes = {
  cards: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    message: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
  })).isRequired,
  onDeleteCard: propTypes.func.isRequired,
  onLikeCard: propTypes.func.isRequired
};