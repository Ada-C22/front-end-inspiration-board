import PropTypes from 'prop-types';
import './SelectedBoard.css';

const SelectedBoard = ({ board, onDeleteBoard }) => {
    if (!board) {
        return <div className="selected-board">No board selected</div>;
    }

    return (
        <div className="selected-board center-container">
            
                <div className="board-title">
                    <h2>{board.title}</h2>
                    <p className="owner">Created by: {board.owner}</p>
                </div>
                <button 
                    className="delete-selected-btn"
                    onClick={() => onDeleteBoard(board.id)}
                    aria-label="Delete selected board"
                >
                Delete Board
                </button>
        </div>
    );
};

SelectedBoard.propTypes = {
    board: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired
    }),
    onDeleteBoard: PropTypes.func.isRequired
};

export default SelectedBoard;