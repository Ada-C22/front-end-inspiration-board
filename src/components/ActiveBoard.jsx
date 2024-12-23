import Card from './Card'
import PropTypes from 'prop-types'
import './Card.css'
import './ActiveBoard.css'

  const ActiveBoard = (props) => {
    const getActiveBoardCards = (cards) => {
      return cards.map((card) => {
        return (
          <Card className="individualCard"
            key={card.id}
            id={card.id}
            owner={card.owner}
            message={card.message}
          />
        );
      });
  };
  return <section className ="ActiveBoardContainer">
    <h1 className ="activeBoardName">{props.ActiveBoard.title}</h1>
    <h3 className ="activeBoardAuthor"> {props.ActiveBoard.owner}</h3> 
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
    })
    }
    
  export default ActiveBoard