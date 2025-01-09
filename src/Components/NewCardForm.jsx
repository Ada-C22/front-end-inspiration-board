import { useState } from 'react';
import './NewCardForm.css';

const NewCardForm = ({handleCardSubmit, activeBoard}) => {
	const kDefaultCardForm = {
		message: ''
	}
    const [cardMessage, setCardMessage] = useState(kDefaultCardForm);
	const [errorMsg, setErrorMsg] = useState('');
	const [msgCharCount, setCurrentCharCount] = useState(0);

    const handleCardMessageChange = (event) => {
		const fieldName = event.target.name;
		const fieldValue = event.target.value;
		const newCardMsg = {...cardMessage, [fieldName]: fieldValue};
        setCardMessage(newCardMsg);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
		setErrorMsg('');

		try {
			const errorsList = [];
			if (!cardMessage.message) {
				errorsList.push("Message cannot be empty! Please enter message contents.");
			}

			else if (cardMessage.message && cardMessage.message.length < 3) {
				errorsList.push("Message must contain at least 3 characters!");
			}

			if (cardMessage.message && cardMessage.message.length > 40){
				errorsList.push("Your message exceeded the 40 character limit.");
			}
		
			if (errorsList.length > 0) {
				throw new Error(errorsList.join('\n'));
			}

			handleCardSubmit(cardMessage);
			setCardMessage(kDefaultCardForm);
			setErrorMsg('Card message created successfully.');
			setTimeout(() => setErrorMsg(''), 3000);
		}catch(error) {
			setErrorMsg(error.message);
		}
    };

	const updateCharCount = (event) => {
		setCurrentCharCount(event.target.value.length);
	};

	const handleFormChanges = (event) => {
		updateCharCount(event);
		handleCardMessageChange(event);
	};

	const emptyMsg = !cardMessage.message ? 'empty': '';
    return (
		<>
			<form onSubmit={handleSubmit} className='card_form'>
				<div className="form-field">
					<label htmlFor="message"> Card message:    </label>


					<input className={emptyMsg} 
						maxLength="50" 
						type="text" 
						id="message" 
						name="message" 
						value={cardMessage.message} 
						onChange={handleFormChanges}
					/>
					<p className="char-count">{msgCharCount}/40</p>
				</div>
				<div className="submit-container">
				<input className="submit-button"
				type="submit"></input>
				</div>
					
			</form>
			<div className="message">
				{errorMsg}
			</div>
		</>
    );
};
export default NewCardForm;