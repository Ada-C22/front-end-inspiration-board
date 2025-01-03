import  { useState, useEffect } from "react";
import { getBoard, newCardAPICall} from "../api/api.js";
import PropTypes from "prop-types";
import NewCardForm from "./newCardForm.jsx";
import CardContainer from "./CardContainer.jsx";


const Board = ({boardId}) => {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        getBoard(boardId).then((newBoard) => {
            setBoard(newBoard)
        })
        }, [boardId]);

    const createNewCard =(board_id, newCardData) =>{
        return newCardAPICall(board_id, newCardData)
            .then(() => {
                getBoard(boardId).then((newBoard) => {
                    setBoard(newBoard)
                })
            });
    };

    if (!board) {
        return <div>Loading board...</div>;
    }

    return (
        <>
            <CardContainer cardData={board.cards}/>
            <NewCardForm createNewCard={createNewCard} currentBoard={boardId}/>
        </>
    );
};
Board.propTypes ={
    boardId: PropTypes.number.isRequired
};


export default Board;