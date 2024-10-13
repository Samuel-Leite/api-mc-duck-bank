import React from "react";

const Modal = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
