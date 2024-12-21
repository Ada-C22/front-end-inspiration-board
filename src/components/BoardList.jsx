import PropTypes from 'prop-types'
import './BoardList.css'


const BoardList = ({Boards}) => {
  console.log(Boards)
  const getVisionBoardList= (boards) => {
    return boards.map((board) => {
      return (
        <li className="Board">{board.title} | {board.owner}</li>
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
    ).isRequired
  }    

  export default BoardList