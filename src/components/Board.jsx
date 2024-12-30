import PropTypes from "prop-types";

const Board = ({id,owner,title, handleChangeActiveBoard, activeBoardId}) => {
  

  const setClass = () => {
    if (id === activeBoardId) {
      return 'ActiveBoard'}
    return 'inactiveBoard';
    };

  
  const boardClass = setClass()
  const onClickActiveBoard = () => {
    handleChangeActiveBoard(id)
  };

  return (
    <button className={boardClass} onClick={onClickActiveBoard}> {title} | {owner}</button>
  )
};

Board.propTypes= {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  handleChangeActiveBoard: PropTypes.func.isRequired,
  activeBoardId: PropTypes.number.isRequired,
}    



export default Board