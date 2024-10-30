import React, { useEffect } from 'react';
import FocusTrap from 'focus-trap-react';//npm install focus-trap-react

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';

      // Handle Esc key to close modal
      const handleEsc = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEsc);

      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FocusTrap>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        {/* Modal Content */}
        <div className="bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl font-semibold"
            aria-label="Close Modal"
          >
            &times;
          </button>
          {/* Modal Body */}
          <div>{children}</div>
        </div>
      </div>
    </FocusTrap>
  );
}
