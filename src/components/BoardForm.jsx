import { useState } from 'react'
import PropTypes from 'prop-types'
import './css/BoardForm.css'

const BoardForm = ({handleCreateBoard, setCreateBoardState}) => {
  const [formData, setFormData] = useState({
    title: '',
    owner: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateBoard(formData);
    setFormData({
      title:'',
      owner:'',
    });
    setCreateBoardState(false)
  };

  return (
    <section className='board-form-container'>
      <span>
      <form onSubmit={handleSubmit}>
        <div className = 'form-container'>
        <div>
          <label htmlFor='title'>Board Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='owner'>Board Owner:</label>
          <input 
            type='text'
            id='owner'
            name='owner'
            value={formData.owner}
            onChange={handleChange}
            required
          />
        </div>
        </div>
        <button type='submit'>Create Board</button>
      </form>
      </span>
    </section>
  )
};
export default BoardForm;

BoardForm.propTypes= {
  handleCreateBoard: PropTypes.func.isRequired,
  setCreateBoardState: PropTypes.func.isRequired,
}
