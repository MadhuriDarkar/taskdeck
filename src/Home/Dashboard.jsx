import React, { useEffect, useState } from "react";
import NewList from "../Components/NewList/NewList";
import "./Dashboard.css";
import CustomInput from "../Components/CustomInput/CustomInput";
import { fetchBoardList, updateLocalStorageBoards } from "../Helper/APILayers";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({
    boardId: 0,
    cardId: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const boards = await fetchBoardList();
    setBoards(boards);
  }

  const addboardHandler = (name) => {
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoardsList);
  };

  const removeBoard = (boardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };

  const addCardHandler = (boardId, title) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList[boardIndex].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
    });
    setBoards(tempBoardsList);
  };

  const removeCard = (boardId, cardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoardsList);
  };

  const updateCard = (boardId, cardId, card) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    const cards = tempBoardsList[boardIndex].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;

    tempBoardsList[boardIndex].cards[cardIndex] = card;
    setBoards(tempBoardsList);
  };

  const onDragEnd = (boardId, cardId) => {
    const sourceBoardIndex = boards.findIndex((item) => item.id === boardId);
    if (sourceBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
      (item) => item.id === cardId
    );
    if (sourceCardIndex < 0) return;

    const targetBoardIndex = boards.findIndex(
      (item) => item.id === targetCard.boardId
    );
    if (targetBoardIndex < 0) return;

    const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cardId
    );
    if (targetCardIndex < 0) return;

    const tempBoardsList = [...boards];
    const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setBoards(tempBoardsList);

    setTargetCard({
      boardId: 0,
      cardId: 0,
    });
  };

  const onDragEnter = (boardId, cardId) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({
      boardId: boardId,
      cardId: cardId,
    });
  };

  useEffect(() => {
    updateLocalStorageBoards(boards);
  }, [boards]);
  
  const handleResetBoard = () => {
    // Reset board logic will be implemented here
    localStorage.clear();
    window.location.reload();
  };
  const [draggedBoardId, setDraggedBoardId] = useState(null);

const handleBoardDragStart = (e, boardId) => {
  setDraggedBoardId(boardId);
};

const handleBoardDragOver = (e) => {
  e.preventDefault();
};

const handleBoardDrop = (e, dropBoardId) => {
  if (draggedBoardId === dropBoardId) return;

  const draggedBoardIndex = boards.findIndex(board => board.id === draggedBoardId);
  const dropBoardIndex = boards.findIndex(board => board.id === dropBoardId);

  const newBoards = [...boards];
  const draggedBoard = newBoards[draggedBoardIndex];
  
  newBoards.splice(draggedBoardIndex, 1);
  newBoards.splice(dropBoardIndex, 0, draggedBoard);
  
  setBoards(newBoards);
  setDraggedBoardId(null);
};


  return (
    <div className="app">
      <div className="app-nav">
        <div className="app-nav-logo">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="TaskDeck Logo" />
        <h1>Task Deck</h1>
        </div>
        <div className="app-nav-reset-board">
          <button  onClick={handleResetBoard}>Reset</button>
        </div>
      </div>
      <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <NewList
              key={item.id}
              board={item}
              draggable={true}
              onDragStart={(e) => handleBoardDragStart(e, item.id)}
              onDragOver={(e) => handleBoardDragOver(e)}
              onDrop={(e) => handleBoardDrop(e, item.id)}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-list-add-list"
              editClass="app-list-add-list-edit"
              placeholder="Enter List Name"
              text="Add New List"
              buttonText="Add New List"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
      <div className="app-footer">
        <div className="app-info">TaskDeck: Turning plans into action, effortlessly.</div>
        <div className="app-credit">Developed by Madhuri Darkar, delivering seamless collaboration tools</div>
      </div>
    </div>
  );
}

export default Dashboard;
