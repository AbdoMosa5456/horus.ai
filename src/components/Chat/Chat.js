import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkBalance, deductBalance, saveUserChats, loadChats } from '../../utils/api';
import Sidebar from './Sidebar';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import './Chat.css';

const Chat = ({ user, setUser }) => {
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState(Date.now());
  const [chatHistory, setChatHistory] = useState([{ role: 'system', content: 'You are Horus AI assistant' }]);
  const [balance, setBalance] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUserChats();
    updateBalance();
  }, [user]);

  const loadUserChats = async () => {
    const data = await loadChats(user);
    if (data.success) setChats(data.chats || {});
  };

  const updateBalance = async () => {
    const data = await checkBalance(user);
    if (data.success) setBalance(data.balance);
  };

  const handleLogout = () => {
    localStorage.removeItem('horusUser');
    sessionStorage.removeItem('horusUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app-container">
      <Sidebar 
        user={user} 
        balance={balance} 
        chats={chats} 
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        setChatHistory={setChatHistory}
        onLogout={handleLogout}
        onSettings={() => navigate('/settings')}
      />
      <main className="main-content">
        <ChatMessages chatHistory={chatHistory} isGenerating={isGenerating} />
        <ChatInput 
          user={user}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          balance={balance}
          updateBalance={updateBalance}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </main>
    </div>
  );
};

export default Chat;
