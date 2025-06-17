import React, { useContext, useState } from 'react'
import Message from './Message'
import { Rating } from '@mui/material'
import { LightThemeContext } from '../contexts/ThemeContext'

export default function PastConversations({ previousChats }) {
    const [filteredChat, setFilterdChats] = useState(previousChats)
    const [rating, setRating] = useState('')

    const handleFilter = (e) => {
        setRating(e.target.value)

        if (e.target.value === '') {
            setFilterdChats(previousChats)
            return
        }

        const filtered = previousChats.filter(chat => chat.rating === Number(e.target.value))
        console.log(e.target.value)
        setFilterdChats(filtered)
    }

    const { lightTheme } = useContext(LightThemeContext)
    return (
        previousChats.length > 0 ? (
            <div className='PastConversations'>
                <p className='heading'>
                    Conversation History
                </p>
                <div className='rating-filter'>
                    <select name="rating" id="rating" value={rating} onChange={e => handleFilter(e)} style={{ background: !lightTheme && '#5b4185', color: !lightTheme && 'white' }}>
                        <option value="">All Ratings</option>
                        <option value="0">0 Stars</option>
                        <option value="1">1 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>
                <div className='content' style={{ background: !lightTheme && 'transparent' }}>
                    {filteredChat.length > 0 && filteredChat.map((chat, index) =>
                        <div className='chat-section' key={index}>
                            <p className='date'>
                                {chat.date === new Date().toDateString()
                                    ? 'Today'
                                    : chat.date}
                            </p>
                            <div className='prev-convo-messages' style={{ background: !lightTheme && '#310E68' }}>
                                {chat.messages.map((message, index) =>
                                    <Message sender={message.sender} text={message.text} time={message.time} key={index} pastConvo={true} />
                                )}
                                {chat.rating > 0 && < p className='rating'>
                                    Rating:
                                    <Rating name="read-only" value={chat.rating} readOnly size="small" sx={{
                                        '& .MuiRating-iconFilled': {
                                            color: '#000000',
                                        }
                                    }} />
                                </p>}
                                {chat.feedback && <div className='feedback-section'>
                                    <p className='feedback-heading'>Feedback: </p>
                                    <p className='feedback'>{chat.feedback}</p>
                                </div>}
                            </div>

                        </div>
                    )}

                </div>
            </div>

        ) : (
            <p className='no-prev-chat'>No previous chats</p>
        )

    )
}
