import React, { useState } from 'react';

const ChatInput = ({ user, chatHistory, setChatHistory }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setChatHistory([...chatHistory, { role: 'user', content: input }]);
    setInput('');
  };

  return (
    <div className="chat-input">
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="اكتب رسالتك..."
      />
      <button onClick={handleSend}>
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default ChatInput;
