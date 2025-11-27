import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="loading-screen">
    <i className="fa-solid fa-eye loading-icon"></i>
    <div className="spinner"></div>
    <p>جاري التحميل...</p>
  </div>
);

export default Loading;
