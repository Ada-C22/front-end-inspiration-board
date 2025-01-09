import './Board.css';
const BoardTab = ({ id, title, index, handleActiveBoard}) => {
    const onTabClick = () => {
      handleActiveBoard(id);
    }
    return (
      <div>
          <button
          // index + 1 so that it matches the id of the card in the db
          className={`tab-button one c${index+1}`}
          onClick={() => onTabClick()}
          ># {title}</button>
      </div>
    );
};

export default BoardTab;