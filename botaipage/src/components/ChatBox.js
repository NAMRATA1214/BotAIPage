import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { getAIResponse } from '../services/aiService';
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
    const [loadPreviousChats, setLoadPreviousChats] = useState(false)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:590px)');

    const { lightTheme, toggleTheme } = useContext(LightThemeContext)

    const initialQuestions = [
        "What is the virtual DOM?",
        "Can you explain RESTful APIs?",
        "What is a Promise in JavaScript?",
        "How do you handle errors in async/await?"
    ];

    const handleQuestionClick = async (question) => {
        setShowInitialQuestions(false);
        const newMessages = [{ sender: 'user', text: question, time: getCurrentTime() }];
        setMessages(newMessages);

        const aiResponse = await getAIResponse(question);
        setMessages([...newMessages, { sender: 'ai', text: aiResponse, time: getCurrentTime() }]);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        setShowInitialQuestions(false);
        setLoadPreviousChats(false)

        const newMessages = [...messages, { sender: 'user', text: input, time: getCurrentTime() }];
        setMessages(newMessages);

        const aiResponse = await getAIResponse(input);
        const newMessagesAi = [...newMessages, { sender: 'ai', text: aiResponse, time: getCurrentTime() }]
        setMessages(newMessagesAi);
        setInput('');
    };

    const startNewChat = () => {
        if (messages.length > 0) {
            setPreviousChats([...previousChats, { id: currentChatId, date: new Date().toDateString(), messages, rating, feedback: comment }]);
        }

        setMessages([]);
        setShowInitialQuestions(true);
        setLoadPreviousChats(false)


    };

    useEffect(() => {
        setCurrentChatId(Date.now());
    }, [])

    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const saveFeedback = () => {
        if (messages.length > 0) {
            const chats = [...previousChats, { id: currentChatId, date: new Date().toDateString(), messages, rating, feedback: comment }]
            setPreviousChats(chats);
        }
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const showPage = () => {
        if (showInitialQuestions) {
            return <InitialQuestions
                isMobile={isMobile}
                initialQuestions={initialQuestions}
                handleQuestionClick={handleQuestionClick}
            />
        }

        if (loadPreviousChats) {
            return <PastConversations previousChats={previousChats} />
        }
        if (!showInitialQuestions && !loadPreviousChats) {

            return <MessageList messages={messages} />
        }
    }

    const handlePastConvo = () => {
        if (messages.length > 0) {
            setPreviousChats([...previousChats, { id: currentChatId, date: new Date().toDateString(), messages, rating, feedback: comment }]);
        }
        setShowInitialQuestions(false);
        setLoadPreviousChats(true)
    }
    const handleFeedbackModal = () => messages.length !== 0 && setShowFeedbackModal(true)


    return (
        <div className="chat-box" style={{ color: !lightTheme && 'white' }}>
            <ChatSidebar
                isMobile={isMobile}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                startNewChat={startNewChat}
                handlePastConvo={handlePastConvo}
            />
            <div className='content'style={{ background: !lightTheme && 'linear-gradient( #310E68 0%, #0C0C0C 100%)' }}>
                <p className='bot-ai'>
                    <div>
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <span>Bot AI</span>
                    </div>
                    <div onClick={toggleTheme} >
                        {lightTheme
                            ? <DarkModeIcon />
                            : <LightModeIcon />}
                    </div>

                </p>

                <div className='message-area'>
                    {showPage()}
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
