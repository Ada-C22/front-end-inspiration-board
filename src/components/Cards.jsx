import PropTypes from 'prop-types';
import './Cards.css';

const Cards = ({ cards = [], onDeleteCard, onLikeCard }) => {
    if (!cards || cards.length === 0) {
        return <div className="no-cards">No cards available</div>;
    }

    return (
        <div className="cards-container">
            {cards.map((card) => (
                <div key={card.id} className="card">
                    <p className="card-message">{card.message}</p>
                    <div className="card-actions">
                        <button 
                            className="delete-btn"
                            onClick={() => onDeleteCard(card.id)}
                        >
                        </button>
                        <button 
                            className="like-btn"
                            onClick={() => onLikeCard(card.id)}
                        >
                            {/* <span className="like-count">{card.likescount}</span> */}
                            <span className="like-count">{card.likes || 0}</span>

                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

Cards.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            likes_count: PropTypes.number
        })
    ),
    onDeleteCard: PropTypes.func.isRequired,
    onLikeCard: PropTypes.func.isRequired
};

export default Cards;
