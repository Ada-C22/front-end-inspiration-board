import axios from "axios";


const kbaseURL = "https://back-end-inspiration-board-wc5b.onrender.com";


// when user submits a new board form, new board should be created
export const addNewBoard = (newBoardData) => {
   const response = axios.post(`${kbaseURL}/boards`, newBoardData)
   .then(response => response.data)
   .catch(error => console.log(`Couldn't add a new board: ${error}`));


   return response;
};


// on initial render and once user adds a new board
// get a list of boards to display to user
export const getAllBoards = () => {
   const response = axios.get(`${kbaseURL}/boards`)
   .then( response => response.data)
   .catch( error => console.log(`Couldn't fetch all boards: ${error}`));


   return response;
};


// when user selects a board, get board by id
export const getBoardById = (board_id) => {
   const response = axios.get(`${kbaseURL}/boards/${board_id}`)
      .then(response => response.data)
      .catch(error => console.log(`Couldn't fetch board with ID ${board_id}: ${error}`));
   return response
};




// when user selects board and after user adds new card, get all cards with board id
export const getCardsByBoardId = (boardId) => {
   const response = axios.get(`${kbaseURL}/boards/${boardId}/cards`)
      .then(response => response.data)
      .catch(error => console.log(`Couldn't fetch cards for board with ID ${boardId}: ${error}`));
      
   return response
};




// when user adds new card, send post request to add new card
export const addNewCard = (boardId, cardData) => {
   const response = axios.post(`${kbaseURL}/boards/${boardId}/cards`, cardData)
      .then(response => response.data)
      .catch(error => console.log(`Couldn't add a new card to board with ID ${boardId}: ${error}`));


   return response
};




// when user clicks like on a card, send patch request to increase card like count
export const likeCard = (card_id) => {
   const response = axios.patch(`${kbaseURL}/cards/${card_id}/like`)
      .then(response => response.data)
      .catch(error => console.log(`Couldn't like card with ID ${card_id}: ${error}`));


   return response
};




// when user clicks delete on a card, send delete request to remove card
export const deleteCard = (card_id) => {
   const response = axios.delete(`${kbaseURL}/cards/${card_id}`)
      .then(response => response.data)
      .catch(error => console.log(`Couldn't delete card with ID ${card_id}: ${error}`));


   return response
};




// ADDED CARDS


// when user clicks delete on a board, send delete request to remove board
export const deleteBoard = (board_id) => {
   const response = axios.delete(`${kbaseURL}/cards/${board_id}`)
      .then(response => response.data)
      .catch(error => console.log(`Couldn't delete board with ID ${board_id}: ${error}`));


   return response
};

