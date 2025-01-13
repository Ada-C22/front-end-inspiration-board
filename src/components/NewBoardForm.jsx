import { useState } from 'react';
import propTypes from 'prop-types';
import './NewBoardForm.css';

const initialValue = {
  title: '',
  creator: ''
};

export const NewBoardForm = (props) => {
  const [board, setBoard] = useState(initialValue);
  const [showBoard, setShowBoard] = useState(false);


  const handleBoardChange = (event) => {
    setBoard(prevBoard => {
      return { ...prevBoard, [event.target.id]: event.target.value}
    });
  };

  const handleShowForm = () => {
    setShowBoard(true);
    setBoard(initialValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAddBoard(board);
    setBoard(initialValue);
  };

  if (showBoard) {
    return (
      <div className='NewBoardForm'>
        <form onSubmit={handleSubmit}>
          <div className='input-col'>
            <label htmlFor='title'>title:</label>
            <input 
              type='text' 
              id='title' 
              value={board.title} 
              onChange={handleBoardChange}
              required/>
          </div>
          <div className='input-col'>
            <label htmlFor='creator'>creator:</label>
            <input 
              type='text' 
              id='creator' 
              value={board.creator} 
              onChange={handleBoardChange}
              required/>
          </div>
          <input className='create-btn' type="submit" value='CREATE BOARD'/>
        </form>
        <button className='board-btn hide-btn' onClick={() => setShowBoard(false)}>HIDE BOARD</button>
      </div>
    )
  } else {
    return (
      <button className='board-btn' onClick={handleShowForm}>ADD BOARD</button>
    );
  }
};

NewBoardForm.propTypes = {
  onAddBoard: propTypes.func.isRequired
};
