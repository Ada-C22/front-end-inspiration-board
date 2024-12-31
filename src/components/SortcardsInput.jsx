import PropTypes from 'prop-types';

const SortCardsInput = ({sortOption,handleSortChange}) => {
return (
  <div> 
          <label htmlFor="sortOptions">Sort Cards by:</label>
          <select id='sortOptions' value={sortOption} onChange={handleSortChange}>
            <option value='id'>ID</option>
            <option value='likes'>Likes</option>
            <option value='alphabetically'>Alphabetically</option>
          </select>
        </div> 
        )
  }

SortCardsInput.propTypes = {
  sortOption : PropTypes.string.isRequired,
  handleSortChange : PropTypes.func.isRequired,
}




export default SortCardsInput;