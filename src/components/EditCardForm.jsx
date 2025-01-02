import { useState } from 'react';
import PropTypes from 'prop-types'
import './css/EditCardForm.css'


const EditCardForm = ({id, boardId, likesCount, message, owner, handleEditCard,setCardEditing}) => {
  const defaultFormData = {
    id:id, 
    boardId:boardId,
    likesCount: likesCount, 
    message: message,
    owner: owner
  }
  const [formData, setFormData] = useState(defaultFormData);
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

  const handleExit = (event) => {
    handleEditCard(defaultFormData)
    setCardEditing(false);

  };

  return (
    <form onSubmit={handleSubmit}>
      <section className='edit-card-container'>
        <div className= 'message-container'>
            <label htmlFor='message'>Message:</label>
            <textarea
                className='message-input-container'
                type='text'
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
            />
        </div>
        <div className='owner-container'>
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
        <div className='button-container'>
          <button className= 'edit-card-submit-button' type='submit'>Update Card</button>
          <button className= 'edit-card-exit-button' type='exit' onClick={handleExit}>X</button>
        </div>
      </section>
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




