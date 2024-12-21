// import Card from './Card'
// import PropTypes from 'prop-types'


// const ActiveBoard = ({title, owner, cards}) => {
//   const getActiveBoardCards= (cards) => {
//     return cards.map((card) => {
//       return (
//         <Card className="individualCard"
//           key={card.id}
//           id={card.id}
//           owner={card.owner}
//           message={card.message}
//         />
//       );
//     });
//   };
//   return <section className ="ActiveBoardContainer">
//     <h1 className ="activeBoardName">{title}</h1>
//     <h3 className ="activeBoardAuthor"> {owner}</h3>
//   <ul className="ABCardContainer">{getActiveBoardCards(cards)}</ul>;
//   </section>
// };


// ActiveBoard.propTypes= {
//     title: PropTypes.string.isRequired,
//     owner: PropTypes.string.isRequired,
//     cards: PropTypes.arrayOf(
//       PropTypes.shape({
//         message: PropTypes.string.isRequired,
//         likes: PropTypes.number.isRequired,
//         owner: PropTypes.string.isRequired,
//   }).isRequired,),
//   }

//   export default ActiveBoard