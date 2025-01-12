import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const NewBoardForm = ({ onAddBoard, onToggleForm }) => {
    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim() === '' || owner.trim() === '') return;

        const newBoard = { title, owner }; // Simulated board object
        onAddBoard(newBoard); // Pass the new board to the parent
        setTitle(''); // Clear the title input
        setOwner(''); // Clear the owner input
    };

    return (
        <div className="new-board-form-container">
            <form onSubmit={handleSubmit}>
                <h3 className="form-title">Create a New Board</h3>
                <div className="form-fields">
                    <label htmlFor="board-title" className="form-label">Title</label>
                    <input
                        id="board-title"
                        type="text"
                        placeholder="Enter board title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="form-input"
                    />
                    <div>
                    <label htmlFor="board-owner" className="form-label">Owner</label>
                    <input
                        id="board-owner"
                        type="text"
                        placeholder="Enter owner name"
                        value={owner}
                        onChange={(event) => setOwner(event.target.value)}
                        className="form-input"
                    />
                    </div>
                </div>
                <div className="button-container">
                    <button 
                        type="button"
                        onClick={onToggleForm}
                        className="toggle-form-btn"
                    >
                        Hide Form
                    </button>
                    <button 
                        type="submit"
                        className="submit-btn"
                    >
                        Add Board
                    </button>
                </div>
            </form>
        </div>
    );
};

NewBoardForm.propTypes = {
    onAddBoard: PropTypes.func.isRequired,
    onToggleForm: PropTypes.func.isRequired,
};  

export default NewBoardForm;

