import PropTypes from 'prop-types'
import './BoardList.css'


const BoardList = ({Boards, handleChangeActiveBoard}) => {
  const getVisionBoardList= (boards) => {
    return boards.map((board) => {
      return (
        <li key={board.id} className="Board"><button>{board.title} | {board.owner}</button></li>
      );
    });
  };

  return (
  <section className ="BoardListBox">
    <h1 className="visionBoardListTitle">Vision Boards</h1>
  <ul className="BoardList">{getVisionBoardList(Boards)}</ul>;
  </section>)
};


BoardList.propTypes= {
  Boards: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    handleChangeActiveBoard: PropTypes.func.isRequired,     
    }    

  export default BoardList