import React, { useContext, useState, useEffect } from 'react';
import Message from './Message';
import { Rating } from '@mui/material';
import { LightThemeContext } from '../contexts/ThemeContext';

export default function PastConversations({ previousChats = [] }) {
    const [filteredChat, setFilteredChats] = useState(previousChats);
    const [rating, setRating] = useState('');

    const { lightTheme } = useContext(LightThemeContext);

    useEffect(() => {
        setFilteredChats(previousChats);
    }, [previousChats]);

    const handleFilter = (e) => {
        const selectedRating = e.target.value;
        setRating(selectedRating);

        if (selectedRating === '') {
            setFilteredChats(previousChats);
            return;
        }

        const filtered = previousChats.filter(chat => Number(chat?.rating) === Number(selectedRating));
        setFilteredChats(filtered);
    };

    return (
        previousChats?.length > 0 ? (
            <div className='PastConversations'>
<p className="heading">Conversation History</p>

                <div className='rating-filter'>
                    <select
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={handleFilter}
                        style={{ background: !lightTheme && '#5b4185', color: !lightTheme && 'white' }}
                    >
                        <option value="">All Ratings</option>
                        <option value="0">0 Stars</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>

                <div className='content' style={{ background: !lightTheme && 'transparent' }}>
                    {filteredChat?.length > 0 ? (
                        filteredChat.map((chat, index) => (
                            <div className='chat-section' key={index}>
                                <p className='date'>
                                    {chat.date === new Date().toDateString() ? 'Today' : chat.date}
                                </p>

                                <div className='prev-convo-messages' style={{ background: !lightTheme && '#310E68' }}>
                                    {chat?.messages?.length > 0 ? (
                                        chat.messages.map((message, msgIndex) => (
                                            <div key={msgIndex} className="message-entry">
                                                {/* Render <p> directly so Cypress can detect */}
                                                <p><strong>{message.sender === 'user' ? 'You' : 'Soul AI'}:</strong> {message.text}</p>
                                                <p className="timestamp">{message.time}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No messages</p>
                                    )}

                                    {chat?.rating >= 0 && (
                                        <p className='rating'>
                                            Rating:
                                            <Rating
                                                name="read-only"
                                                value={chat.rating}
                                                readOnly
                                                size="small"
                                                sx={{
                                                    '& .MuiRating-iconFilled': {
                                                        color: '#000000',
                                                    }
                                                }}
                                            />
                                        </p>
                                    )}

                                    {chat?.feedback && (
                                        <div className='feedback-section'>
                                            <p className='feedback-heading'>Feedback: </p>
                                            <p className='feedback'>{chat.feedback}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-prev-chat">No conversations match this filter.</p>
                    )}
                </div>
            </div>
        ) : (
            <p className='no-prev-chat'>No previous chats</p>
        )
    );
}
