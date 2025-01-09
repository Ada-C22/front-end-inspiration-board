import { useState } from 'react';
import PropTypes from 'prop-types';
import './css/CardForm.css';

const CardForm = ({ addCard, setAddCardState }) => {
    const [formData, setFormData] = useState({
        message: '',
        owner: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addCard(formData);
        setFormData({
            message: '',
            owner: ''
        });
        setAddCardState(false);
    };

    const handleCardFormExit = (event) => {
        event.preventDefault();
        setFormData({
            message: '',
            owner: ''
        });
        setAddCardState(false);
    };

    return (
        <section className='card-form'>
            <h2 className='card-form-title'>Add a Card</h2>
            <form onSubmit={handleSubmit}>
                <div className='card-message-container'>
                    <label htmlFor='message'>Card Message :</label>
                    <textarea
                        type='text'
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='card-owner-container'>
                    <label htmlFor='owner'>Authors Name :</label>
                    <input
                        type='text'
                        id='owner'
                        name='owner'
                        value={formData.owner}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='button-container'>
                    <button className='add-card-submit-button' type='submit'>Add Card</button>
                    <button className='card-form-exit-button' type='button' onClick={handleCardFormExit}>X</button>
                </div>
            </form>
        </section>
    );
};

CardForm.propTypes = {
    addCard: PropTypes.func.isRequired,
    setAddCardState: PropTypes.func.isRequired,
};

export default CardForm;
