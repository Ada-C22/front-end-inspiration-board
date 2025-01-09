import { useState } from 'react';
import './NewBoardForm.css';

const NewBoardForm = ({ handleBoardSubmit}) => {
  const kDefaultBoardForm = {
    title: '',
    owner: '',
  };
  const [boardFormData, setBoardFormData] = useState(kDefaultBoardForm);
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newBoardFormData = { ...boardFormData, [fieldName]: fieldValue };
    setBoardFormData(newBoardFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    
    try {
      const errors = [];
      
      // Check all conditions and collect errors
      if (!boardFormData.title) {
        errors.push("Title cannot be empty!");
      }
      if (!boardFormData.owner) {
        errors.push("Owner cannot be empty!");
      }
      if (boardFormData.title && boardFormData.title.length < 3) {
        errors.push("Title must be at least 3 characters!");
      }
      if (boardFormData.owner && boardFormData.owner.length < 3) {
        errors.push("Owner must be at least 3 characters!");
      }
  
      // If there are any errors, throw them all
      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }
      
      // If validation passes
      handleBoardSubmit(boardFormData);
      setBoardFormData(kDefaultBoardForm);
      setErrorMessage(`Board ${boardFormData.title} created successfully.`);
      setTimeout(() => setErrorMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const emptyTitle = !boardFormData.title ? 'empty': '';
  const emptyOwner = !boardFormData.owner ? 'empty': '';

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <div className='form-field'>
          <label htmlFor='title'> Title:    </label>
          <input className={emptyTitle}
            type='text'
            id='title'
            name='title'
            value={boardFormData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div className='form-field'>
          <label htmlFor='owner'>Owner: </label>
          <input className={emptyOwner}
            type='text'
            id='owner'
            name='owner'
            value={boardFormData.owner}
            onChange={handleChange}
          ></input>
        </div>
        <div className='submit-container'>
          <input className='submit-button'
          type='submit'></input>
        </div>
      </form>
      <div className='message'>
        {errorMessage}
      </div>
    </>
  );
};
export default NewBoardForm;
