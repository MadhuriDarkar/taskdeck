import React, { useState } from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";
import "./CustomInput.css";

function CustomInput({ 
  text, 
  onSubmit, 
  displayClass, 
  editClass, 
  placeholder, 
  defaultValue, 
  buttonText 
}) {
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <div className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass || ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <button type="submit">{buttonText || "Add"}</button>
            <X onClick={() => setIsCustomInput(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`custom-input-display ${displayClass || ""}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
}

CustomInput.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  displayClass: PropTypes.string,
  editClass: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  buttonText: PropTypes.string
};

export default CustomInput;
