import PropTypes from 'prop-types'
import './BoardList.css'
import Board from './Board'
import BoardForm from './BoardForm'


const BoardList = ({Boards, handleChangeActiveBoard, activeBoardId, setCreateBoardState,createBoardState, handleCreateBoard}) => {
  const handleClickCreateBoard = () => {
    setCreateBoardState(true)    
  }
  

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
  <div>
    <ul className="BoardList">
    {getVisionBoardList(Boards)}
    </ul>
    <button className="CreateBoardButton" onClick={handleClickCreateBoard}>Create New Board</button>
  </div>;
  {createBoardState > 0 &&
  <BoardForm handleCreateBoard={handleCreateBoard}/>}
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
    createBoardState: PropTypes.bool.isRequired,
    setCreateBoardState: PropTypes.func.isRequired,
    handleCreateBoard: PropTypes.func.isRequired,   
    }    
  export default BoardList