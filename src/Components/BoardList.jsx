import Board from "./Board";
import './BoardList.css';


const boardList = ({ boardData, handleActiveBoard }) => {
  const tabComponents = boardData.map((board, index) => {
    return (
      <div key={index}>
        <Board
          id={board.id}
          title={board.title}
          owner={board.owner}
          index={index} // for board css coloring
          handleActiveBoard={handleActiveBoard}
        ></Board>
    </div>
    )
  });
  return (
    <div className='board-tabs'>
      {tabComponents}
    </div>
  )
}  

export default boardList;