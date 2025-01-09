import PropTypes from 'prop-types';
import './css/BoardList.css';
import Board from './Board';
import BoardForm from './BoardForm';
import { useEffect } from 'react';
import SortBoardsInput from './sortBoardsInput';


const BoardList = ({ Boards, handleChangeActiveBoard, activeBoardId, setCreateBoardState, createBoardState, handleCreateBoard, activeBoardOpen, sortBoards, sortBoardsOption, handleBoardSortChange }) => {
  const handleClickCreateBoard = () => {
    setCreateBoardState(true);    
  };
  

  const getVisionBoardList= (boards) => {
    return boards.map((board) => {
      return (
        <Board 
          key={board.id}
          className='board' 
          id={board.id}
          title={board.title} 
          owner={board.owner} 
          handleChangeActiveBoard={handleChangeActiveBoard}
          activeBoardId={activeBoardId}
          activeBoardOpen={activeBoardOpen}
        />
      );
    });
  };

  useEffect (() => {
  }, [createBoardState], [activeBoardOpen]);

  return (
  <section className="board-list-component">
    <span className='title-sort-container'>
      <h1 className="board-list-title">Vision Boards</h1>
      <div className='sort-boards-container'>
        <SortBoardsInput 
        sortBoards={sortBoards}
        sortBoardsOption={sortBoardsOption}
        handleBoardSortChange={handleBoardSortChange}
        />
      </div>
    </span>
    <div>
      <ul className="board-list">
        <span className='board-list-index'>
          <p className='tile-column'>Board Title</p>
          <p className='owner-column'>Board Owner</p>

        </span>
        {getVisionBoardList(Boards)}
        {createBoardState === false && 
          <button className="create-board-button" onClick={handleClickCreateBoard}>Create New Board</button>
        }
        {createBoardState === true &&
          <BoardForm handleCreateBoard={handleCreateBoard} setCreateBoardState={setCreateBoardState} />
        }
      </ul>
    </div>
  </section>
  );
};

BoardList.propTypes = {
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
  activeBoardOpen: PropTypes.bool.isRequired,
  sortBoards: PropTypes.func.isRequired,
  sortBoardsOption: PropTypes.string.isRequired,
  handleBoardSortChange: PropTypes.func.isRequired,   
};    

export default BoardList;