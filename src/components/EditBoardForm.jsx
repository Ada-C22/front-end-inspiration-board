import { useState } from 'react';
import PropTypes from 'prop-types';
import './css/EditBoardForm.css';

const EditBoardForm = ({ id, title, owner, handleEditBoard, setBoardEditing }) => {
  const [formData, setFormData] = useState({
    id: id,
    title: title,
    owner: owner,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBoardInfo = {
      id: id,
      title: formData.title,
      owner: formData.owner,
    };
    handleEditBoard(newBoardInfo);
    setBoardEditing(false);
  };

  const handleExitEditBoard = (event) => {
    event.preventDefault();
    setFormData({
      id: id,
      title: title,
      owner: owner,
    });
    setBoardEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='edit-board-form'>
        <div className='title-edit-container'>
          <label className='title-board-edit-label' htmlFor='title'>Board Title |</label>
          <input
            className='title-input-container'
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className='owner-edit-container'>
            <label htmlFor='owner'>Board Owner |</label>
            <input
              className='Owner-input-container'
              type='text'
              id='owner'
              name='owner'
              value={formData.owner}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='edit-board-button-container'>
          <button className='edit-board-submit-button' type='submit'>Update Board</button>
          <button type='button' className='exit-edit-board-button' onClick={handleExitEditBoard}>X</button>
        </div>
      </div>
    </form>
  );
};

export default EditBoardForm;

EditBoardForm.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  handleEditBoard: PropTypes.func.isRequired,
  setBoardEditing: PropTypes.func.isRequired,
};
