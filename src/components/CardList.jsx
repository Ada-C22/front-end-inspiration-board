import PropTypes from 'prop-types';
import Card from './Card.jsx';
import './CardList.css';

function CardList({ cards, onDelete, onLike }) {
    return (
        <div className="card-items-container">
            {cards.map((card) => (
                <Card 
                    key={card.id} 
                    id={card.id}
                    message={card.message} 
                    likesCount={card.likesCount}
                    onDelete={onDelete} 
                    onLike={onLike}
                />
            ))}
        </div>
    );
}

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likesCount: PropTypes.number,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    onLike: PropTypes.func.isRequired,
};

export default CardList;
