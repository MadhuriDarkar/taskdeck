import React, { useState } from "react";
import PropTypes from "prop-types";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import "./NewList.css";

function NewList({ board, addCard, removeBoard, removeCard, onDragEnd, onDragEnter, updateCard, draggable, onDragStart, onDragOver, onDrop }) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <div className="board"
    draggable={draggable}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDrop={onDrop}
    >
      <div className="board-inner" key={board?.id}>
        <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>{`(${board?.cards?.length || 0})`}</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={() => setShowDropdown(true)}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                className="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeBoard(board?.id)}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              updateCard={updateCard}
            />
          ))}
          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={(value) => addCard(board?.id, value)}
          />
        </div>
      </div>
    </div>
  );
}

NewList.propTypes = {
  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.array
  }).isRequired,
  addCard: PropTypes.func.isRequired,
  removeBoard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragEnter: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  draggable: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default NewList;
