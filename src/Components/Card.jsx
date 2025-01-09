import "./Card.css";

const Card = ({ id, message, boardId, likesCount, handleDeleteCard, handleLikesCount }) => {

	const onDeleteCard = () => {
		handleDeleteCard(id);
	};

	const onLikeCard = () => {
		handleLikesCount(id);
	};

	return (
		<div className={`card-box one c${boardId}`}>
		  <button className="delete" onClick={onDeleteCard}>x</button>
		  <p className="message">{message}</p>
			<div className="likes-container">
				<p className="likes-count">{likesCount}🖤 </p>
				<button className="plus1" onClick={onLikeCard}>+1</button>
			</div>
		</div>
	);
	};

export default Card;
