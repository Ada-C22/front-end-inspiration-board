import Card from './Card'
import './CardList.css'

const CardList = ({ cardData, activeBoardId, handleDeleteCard, handleLikesCount }) => {
  const selectedBoardData = activeBoardId == 0 ? cardData : cardData.filter(card => card.boardId == activeBoardId);
  const cardComponents = selectedBoardData.map((card, index) => {
	console.log(card);
    return (
      <Card
        key={index}
        id={card.id}
        message={card.message}
        boardId={card.boardId}
        likesCount={card.likesCount}
		handleDeleteCard={handleDeleteCard}
		handleLikesCount={handleLikesCount}
      ></Card>
    );
  });

  return (
    <>
      <div className='cards'>
        {cardComponents}
      </div>
    </>
    
  );
};
export default CardList;
