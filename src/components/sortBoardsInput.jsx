import PropTypes from 'prop-types';
import './css/SortBoardsInput.css';
import { useEffect } from 'react'

const SortBoardsInput = ({ sortBoardsOption, handleBoardSortChange, sortBoards }) => {
  const handleReSort = (event) => {
    sortBoards(sortBoardsOption);
  };

  useEffect(() => {
  }, [sortBoardsOption])
  return (
    <div className='sort-boards-container'> 
      <label htmlFor="sortBoardOptions">Sort by:</label>
      <select id='sortBoardOptions' value={sortBoardsOption} onChange={handleBoardSortChange}>
        <option value='boardId'>Age</option>
        <option value='boardOwner'>Owner</option>
        <option value='boardTitle'>Title</option>
      </select>
      <button className='re-sort-button' onClick={handleReSort}>Re-Sort</button>
    </div> 
  );
};

SortBoardsInput.propTypes = {
  sortBoardsOption: PropTypes.string.isRequired,
  handleBoardSortChange: PropTypes.func.isRequired,
  sortBoards: PropTypes.func.isRequired,
};

export default SortBoardsInput;
