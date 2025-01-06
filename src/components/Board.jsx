import PropTypes from "prop-types";
import './css/Board.css';

const Board = ({ id, owner, title, handleChangeActiveBoard, activeBoardId }) => {

  const setClass = () => {
    if (id === activeBoardId) {
      return 'active-board';
    }
    return 'inactive-board';
  };

  const boardClass = setClass();

  const onClickActiveBoard = () => {
    handleChangeActiveBoard(id);
  };

  return (
    <button className={boardClass} onClick={onClickActiveBoard}>
      <span className='board-details-container'>
        <p className='board-title'>{title}</p>
        <p className='board-owner'>{owner}</p>
      </span>
    </button>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  handleChangeActiveBoard: PropTypes.func.isRequired,
  activeBoardId: PropTypes.number.isRequired,
};

export default Board;