import { useState } from "react";
import PropTypes from 'prop-types';
import './NewCardForm.css';

const NewCardForm = ({ onAddCard }) => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedMessage = message.trim();
        
        if (!trimmedMessage) {
            setError("Please enter a message");
            return;
        }
        
        onAddCard({ message: trimmedMessage });
        setMessage("");
        setError("");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="new-card-form">
                <label htmlFor="message">Write your inspiration:</label>
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                        setError("");
                    }}
                    placeholder="Type your message here..."
                    className={error ? "error" : ""}
                />
                {error && <span className="error-message">{error}</span>}
                <button type="submit">Add Card</button>
            </form>
        </div>
    );
};

NewCardForm.propTypes = {
    onAddCard: PropTypes.func.isRequired,
};

export default NewCardForm;

