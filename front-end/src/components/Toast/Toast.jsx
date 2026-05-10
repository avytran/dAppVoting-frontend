import React, { useState, useEffect } from 'react';
import './Toast.css';

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-notification toast-notification-${type}`}>
      <div className="toast-notification-content">
        <i className={`toast-notification-icon ${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}`}></i>
        <div className="toast-notification-text">{message || 'Notification'}</div>
        <button className="toast-notification-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};