import PropTypes from "prop-types";
import "./Board.css";

const Board = ({ boards, onBoardSelect, isFormVisible }) => {
  return (
    <div className={`board-container ${isFormVisible ? 'expanded' : ''}`}>
      <div className="board-header">
        <h2>Boards</h2>
      </div>
      <div className="board-list-container">
        {boards.length === 0 ? (
          <p className="no-boards-message">No boards available</p>
        ) : (
          <ul className="board-list">
            {boards.map((board) => (
              <li
                key={board.id}
                onClick={() => onBoardSelect(board)}
                className="board-item"
              >
                {board.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Board.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBoardSelect: PropTypes.func.isRequired,
  isFormVisible: PropTypes.bool.isRequired,
};

export default Board;
