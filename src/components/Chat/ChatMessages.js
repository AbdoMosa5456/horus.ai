import React from 'react';

const ChatMessages = ({ chatHistory }) => {
  return (
    <div className="chat-messages">
      {chatHistory.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
