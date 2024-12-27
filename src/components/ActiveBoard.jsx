import Card from './Card'
import PropTypes from 'prop-types'
// import './Card.css'
import './ActiveBoard.css'

  const ActiveBoard = (props) => {
    const getActiveBoardCards = (cards) => {
      return cards.map((card) => {
        return (
            <Card
              key={card.id}
              id={card.id}
              owner={card.owner}
              message={card.message}
              likesCount={card.likesCount}
              handleDeleteCard={props.handleDeleteCard}
            />
        );
      });
  };
  return <section className ="active-board-container">
    <h1 className ="active-board-name">{props.ActiveBoard.title}</h1>
    <h3 className ="active-board-author"> {props.ActiveBoard.owner}</h3> 
    <ul className="ab-card-container">{getActiveBoardCards(props.ActiveBoard.cards)}</ul>
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
      }).isRequired,),
      id: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
    handleDeleteCard: PropTypes.func.isRequired,
    }
    
  export default ActiveBoard