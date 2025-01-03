import './css/DeleteConfirmation.css'

const DeleteConfirmation = (setDeleteBoardConfirmation, openDeleteBoardConfirmationWindow) => {
  const handleYes = (event) => {
    setDeleteBoardConfirmation('yes')
    openDeleteBoardConfirmationWinow(false)
  };

  const handleNo = (event) => {
    setDeleteBoardConfirmation('no')
    openDeleteBoardConfirmationWindow(false)
  };

  return (<div className='confirmation-pop-up'>
    <p>Are you sure you want to delete?</p>
    <button className='yes-button' onClick={handleYes}>Yes</button>
    <button className='no-button' onClick= {handleNo}></button>
    </div>)
}

export default DeleteConfirmation