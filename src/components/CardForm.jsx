import { useState } from 'react';
import PropTypes from 'prop-types'
import './CardForm.css'

const CardForm = ({ addCard }) => {
    const [formData, setFormData] = useState({
        message: '',
        name: ''
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
            name: ''
        });
    };

    return (
        <section className='CardForm'>
        <h2 className='CardFormTitle'>Add a Card</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="message">Message:</label>
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Add Card</button>
        </form>
        </section>
    );
};

CardForm.propTypes = {
    addCard: PropTypes.func.isRequired
};

export default CardForm;