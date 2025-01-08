import PropTypes from 'prop-types';
import './Board.css';

function Board({ boards, onSelectBoard }) {
    return (
        <div className="board-container">
            <h2>Boards</h2>
            <ul className="board-list">
                {boards.map((board) => (
                    <li 
                        key={board.id} 
                        className="board-item"
                        onClick={() => onSelectBoard(board.id)}
                    >
                        {board.title} - {board.owner}
                    </li>
                ))}
            </ul>
        </div>
    );
}

Board.propTypes = {
    boards: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelectBoard: PropTypes.func.isRequired,
};

export default Board;