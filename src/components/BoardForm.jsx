import { useState } from 'react'
import PropTypes from 'prop-types'

const BoardForm = ({handleCreateBoard}) => {
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
  };

  return (
    <section className='board-form'>
      <h2 className='board-form-title'> Create A New Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title:</label>
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
          <label htmlFor='owner'>Name:</label>
          <input 
            type='text'
            id='owner'
            name='owner'
            value={formData.owner}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </section>
  )
};
export default BoardForm;

BoardForm.propTypes= {
  handleCreateBoard: PropTypes.func.isRequired,
}
