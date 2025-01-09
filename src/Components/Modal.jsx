import React from "react";
import "./Modal.css";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
          <button className="close-button" onClick={onClose}>x</button>
          {children}
      </div>
    </div>
  );
};

export default Modal;
