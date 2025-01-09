import PropTypes from 'prop-types';
import './css/SortCardsInput.css';

const SortCardsInput = ({ sortOption, handleSortChange, sortCards }) => {
  const handleReSort = (event) => {
    sortCards(sortOption);
  };

  return (
    <div className='sort-cards-container'> 
      <label htmlFor="sortOptions">Sort Cards by:</label>
      <select id='sortOptions' value={sortOption} onChange={handleSortChange}>
        <option value='id'>Age</option>
        <option value='likes'>Likes</option>
        <option value='owner'>Owner</option>
        <option value='message'>Message</option>
      </select>
      <button className='re-sort-button' onClick={handleReSort}>Re-Sort</button>
    </div> 
  );
};

SortCardsInput.propTypes = {
  sortOption: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  sortCards: PropTypes.func.isRequired,
};

export default SortCardsInput;
