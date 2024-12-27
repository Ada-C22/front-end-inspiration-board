import PropTypes from 'prop-types'
import './BoardList.css'
import Board from './Board'


const BoardList = ({Boards, handleChangeActiveBoard, activeBoardId}) => {
  

  const getVisionBoardList= (boards) => {
    return boards.map((board) => {
      return (
        <Board 
          key={board.id} 
          id={board.id}
          title={board.title} 
          owner={board.owner} 
          handleChangeActiveBoard={handleChangeActiveBoard}
          activeBoardId={activeBoardId}
        />
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
    activeBoardId: PropTypes.number.isRequired,    
    }    
  export default BoardList