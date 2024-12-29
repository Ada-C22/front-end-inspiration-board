import { useState } from 'react';
import PropTypes from 'prop-types'


const EditBoardForm = ({id, title, owner, handleEditBoard,setBoardEditing}) => {

  const [formData, setFormData] = useState({
    id:id, 
    title: title,
    owner: owner,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBoardInfo = {
      id:id,
      title: formData.title,
      owner: formData.owner,
    }
    handleEditBoard(newBoardInfo);
    setBoardEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor='Title'>Title:</label>
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
    {/* <div>
        <label htmlFor='Owner'>Name:</label>
        <input
            className='owner-input-container'
            type='text'
            id='owner'
            name='owner'
            value={formData.owner}
            onChange={handleChange}
            required
        />
    </div> */}
    <button type='submit'>Update Board</button>
</form>

  )    
}

export default EditBoardForm

EditBoardForm.propTypes = {
  id: PropTypes.number.isRequired, 
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired, 
  handleEditBoard: PropTypes.func.isRequired,
  setBoardEditing: PropTypes.func.isRequired,
}




