import { useState } from 'react';
import propTypes from 'prop-types';
import './NewCardForm.css';

const initialValue = {
    message: ''
  };

export const NewCardForm = (props) => {
  const [card, setCard] = useState(initialValue);
  const [showCardForm, setShowCardForm] = useState(false);

  const handleCardChange = (event) => {
    setCard(prevCard => {
      return {...prevCard, [event.target.id]: event.target.value}
    });
  };

  const handleShowCardForm = () => {
    setShowCardForm(true);
    setCard(initialValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(card)
    props.onNewCard(card);
    setCard(initialValue);
  };
  
  if (showCardForm) {
    return (
      <div className='NewCardForm'>
        <form onSubmit={handleSubmit}>
          <div className='input-col'>
            <label htmlFor='message'>message:</label>
            <input
              type='text'
              id='message'
              value={card.message}
              onChange={handleCardChange}
              required/>
          </div>
          <input className='create-btn' type='submit' value='CREATE'/>
        </form>
        <button className='card-btn hide-btn' onClick={() => setShowCardForm(false)}>HIDE NEW CARD</button>
      </div>
    );
  } else {
    return (
      <button className='card-btn' onClick={handleShowCardForm}>NEW CARD</button>
    );
  }
};

NewCardForm.propTypes = {
  onNewCard: propTypes.func.isRequired
};

