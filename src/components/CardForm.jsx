import { useState } from 'react';

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
    );
};

export default CardForm;