import React from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";

function Chip({ item, removeLabel }) {
  return (
    <label style={{ backgroundColor: item.color, color: "#fff" }}>
      {item.text}
      {removeLabel && <X onClick={() => removeLabel(item)} />}
    </label>
  );
}

Chip.propTypes = {
  item: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  removeLabel: PropTypes.func
};

export default Chip;
