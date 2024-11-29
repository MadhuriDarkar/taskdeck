import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

function Modal({ children, onClose }) {
  return (
    <div className="modal" onClick={() => onClose && onClose()}>
      <div
        className="modal-content custom-scroll"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export default Modal;
