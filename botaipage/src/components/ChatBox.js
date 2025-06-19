import React, { useContext, useEffect, useRef, useState } from 'react';
import staticQA from '../data/staticQA.json';
import Message from './Message';
import PastConversations from './PastConversations';
import useLocalStorage from '../hooks/useLocalStorage';
import { getCurrentTime } from '../utils/getCurrentTime';
import { Drawer, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InputArea from './InputArea';
import ChatSidebar from './ChatSidebar';
import InitialQuestions from './InitialQuestions';
import MessageList from './MessageList';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { LightThemeContext } from '../contexts/ThemeContext';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [input, setInput] = useState('');
  const [showInitialQuestions, setShowInitialQuestions] = useState(true);
  const [previousChats, setPreviousChats] = useLocalStorage('previousChats', []);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loadPreviousChats, setLoadPreviousChats] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:590px)');
  const { lightTheme, toggleTheme } = useContext(LightThemeContext);

  const initialQuestions = [
    "What is the virtual DOM?",
    "Can you explain RESTful APIs?",
    "What is a Promise in JavaScript?",
    "How do you handle errors in async/await?"
  ];

  // ✅ Fix for test case 5: Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('previousChats');
    if (saved) {
      try {
        setPreviousChats(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved chats", e);
        setPreviousChats([]);
      }
    }
    setCurrentChatId(Date.now());
  }, []);

  useEffect(() => {
    localStorage.setItem('previousChats', JSON.stringify(previousChats));
  }, [previousChats]);

  const handleQuestionClick = async (question) => {
    setShowInitialQuestions(false);
    const newMessages = [{ sender: 'user', text: question, time: getCurrentTime() }];
    const aiResponse = staticQA[question.trim()] || "Sorry, Did not understand your query!";
    const aiMessage = { sender: 'ai', text: aiResponse, time: getCurrentTime() };
    setMessages([...newMessages, aiMessage]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setShowInitialQuestions(false);
    setLoadPreviousChats(false);

    const userMessage = { sender: 'user', text: input, time: getCurrentTime() };
    const aiText = staticQA[input.trim()] || "Sorry, Did not understand your query!";
    const aiMessage = { sender: 'ai', text: aiText, time: getCurrentTime() };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  const startNewChat = () => {
    if (messages.length > 0) {
      const updatedChats = [...previousChats, {
        id: currentChatId,
        date: new Date().toDateString(),
        messages,
        rating,
        feedback: comment
      }];
      setPreviousChats(updatedChats);
    }
    setMessages([]);
    setShowInitialQuestions(true);
    setLoadPreviousChats(false);
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const saveFeedback = () => {
    if (messages.length > 0) {
      const chats = [...previousChats, {
        id: currentChatId,
        date: new Date().toDateString(),
        messages,
        rating,
        feedback: comment
      }];
      setPreviousChats(chats);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setIsDrawerOpen(open);
  };

  const handlePastConvo = () => {
    if (messages.length > 0) {
      const updatedChats = [...previousChats, {
        id: currentChatId,
        date: new Date().toDateString(),
        messages,
        rating,
        feedback: comment
      }];
      setPreviousChats(updatedChats);
    }
    setShowInitialQuestions(false);
    setLoadPreviousChats(true);
  };

  const handleFeedbackModal = () => {
    if (messages.length !== 0) {
      saveFeedback();
      setShowFeedbackModal(true);
    }
  };

  const showPage = () => {
    if (showInitialQuestions) {
      return (
        <InitialQuestions
          isMobile={isMobile}
          initialQuestions={initialQuestions}
          handleQuestionClick={handleQuestionClick}
        />
      );
    }
    if (loadPreviousChats) {
      return <PastConversations previousChats={previousChats} />;
    }
    return <MessageList messages={messages} />;
  };

  return (
    <div className="chat-box" style={{ color: !lightTheme && 'white' }}>
      <header className="app-header" style={{ textAlign: 'center', padding: '1rem', background: lightTheme ? '#f5f5f5' : '#240b4a' }}>
        <h1>Bot AI</h1>
      </header>

      <ChatSidebar
        isMobile={isMobile}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        startNewChat={startNewChat}
        handlePastConvo={handlePastConvo}
      />

      <div className='content' style={{ background: !lightTheme && 'linear-gradient( #310E68 0%, #0C0C0C 100%)' }}>
        <p className='bot-ai'>
          <div>
            {isMobile && (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <span>Bot AI</span>
          </div>
          <div onClick={toggleTheme}>
            {lightTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </div>
        </p>

        <div className='message-area'>
          {showPage()}
          <div ref={messagesEndRef} />
        </div>

        {!loadPreviousChats &&
          <InputArea
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleFeedbackModal={handleFeedbackModal}
            setShowFeedbackModal={setShowFeedbackModal}
            showFeedbackModal={showFeedbackModal}
            rating={rating}
            comment={comment}
            setRating={setRating}
            setComment={setComment}
            saveFeedback={saveFeedback}
          />
        }
      </div>
    </div>
  );
};

export default ChatBox;
