import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

function Dropdown({ children, onClose, className }) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (dropdownRef && !dropdownRef.current?.contains(event.target) && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={`dropdown custom-scroll ${className || ""}`}
    >
      {children}
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Dropdown;
