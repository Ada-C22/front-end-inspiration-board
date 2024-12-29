import { useState } from 'react';
import PropTypes from 'prop-types'


const EditCardForm = ({id, boardId, likesCount, message, owner, handleEditCard,setCardEditing}) => {

  const [formData, setFormData] = useState({
    id:id, 
    boardId:boardId,
    likesCount: likesCount, 
    message: message,
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
    const newCardInfo = {
      id:id,
      boardId:boardId, 
      likesCount: likesCount, 
      message: formData.message,
      owner: formData.owner,
    }
    handleEditCard(newCardInfo);
    setCardEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor='message'>Message:</label>
        <input
            className='message-input-container'
            type='text'
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
        />
    </div>
    <div>
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
    </div>
    <button type='submit'>Update Card</button>
</form>

  )    
}

export default EditCardForm

EditCardForm.propTypes = {
  id: PropTypes.number.isRequired, 
  boardId: PropTypes.number.isRequired,
  likesCount:PropTypes.number.isRequired, 
  message: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired, 
  handleEditCard: PropTypes.func.isRequired,
  setCardEditing: PropTypes.func.isRequired,
}




