import { useState } from 'react';
import PropTypes from 'prop-types'
import './CardForm.css'

const CardForm = ({ addCard }) => {
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
    };

    return (
        <section className='CardForm'>
        <h2 className='CardFormTitle'>Add a Card</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='message'>Message:</label>
                <input
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
                    type='text'
                    id='owner'
                    name='owner'
                    value={formData.owner}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type='submit'>Add Card</button>
        </form>
        </section>
    );
};

CardForm.propTypes = {
    addCard: PropTypes.func.isRequired
};

export default CardForm;