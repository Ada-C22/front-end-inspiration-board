import { CardList } from './CardList';
import propTypes from 'prop-types';
import './Board.css';

export const Board = ({ board, onDeleteCard, onLikeCard }) => {
  // console.log(board);
  return (
    <div>
      <section className='Board'>
        <CardList cards={board.cards} onDeleteCard={onDeleteCard} onLikeCard={onLikeCard}/>
      </section>
    </div>
  );
};

Board.propTypes = {
  board: propTypes.shape({
    title: propTypes.string.isRequired,
    creator: propTypes.string.isRequired,
    cards: propTypes.array.isRequired
  }).isRequired,
  onDeleteCard: propTypes.func.isRequired,
  onLikeCard: propTypes.func.isRequired
};
