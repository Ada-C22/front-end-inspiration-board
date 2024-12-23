const twoBoardList =[
  { id: 1,
    owner: 'Anne Gables',
    title: 'Green Gable Dreams', 
    cards: [{}]
    ,
  },
  {id:2,
  owner:'Harry Ceramics',
  title: 'Hogwash', 
  cards:[{}]
  },]

export default twoBoardList



// api call for board info 

// {
//   "id": board.id,
//   "owner": board.owner,
//   "title": board.title,
//   "cards": [card.to_dict() for card in board.cards]
// }
