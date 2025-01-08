import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NewCardForm = ({ handleSubmit, boardId }) => {
  const [cardForm, setCardForm] = useState({ message: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCardForm({ ...cardForm, [name]: value });
    setError('');
  }; 

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!cardForm.message) {
      setError('Message is required.');
      return;
    }
    if (cardForm.message.length > 40) {
      setError('Card message must be 40 characters or less');
      return;
    }
    setError('');
    handleSubmit({ ...cardForm, boardId });
    setCardForm({ message: '' });
  };

  useEffect(() => {
    setError('');
  }, [boardId]);

  return (
    <form className="new-card-form" onSubmit={onHandleSubmit}>
      <div>
        <label htmlFor="message">Message: </label>
        <input
        id="text"
        name="message"
        value={cardForm.message}
        onChange={handleChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="new-card-form-submit-btn" type="submit">
          Submit
      </button>
    </form>
  );
};

NewCardForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    boardId: PropTypes.number.isRequired,
};

export default NewCardForm;