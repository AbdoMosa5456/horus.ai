import React from 'react';

const Sidebar = ({ user, balance, onLogout, onSettings }) => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fa-solid fa-eye"></i>
        <h1>Horus AI</h1>
      </div>
      <div className="user-info">
        <p>{user}</p>
        <p>Balance: ${balance}</p>
      </div>
      <button onClick={onSettings}>Settings</button>
      <button onClick={onLogout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
