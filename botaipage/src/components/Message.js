import { useMediaQuery } from '@mui/system';
import React, { useContext, useState } from 'react';
import ThumbsRating from './ThumbsRating';
import { LightThemeContext } from '../contexts/ThemeContext';

const Message = ({ sender, text, time, pastConvo }) => {
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const { lightTheme } = useContext(LightThemeContext);
    const isMobile = useMediaQuery('(max-width:590px)');

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='message-bubble'
        >
            <div>
                <img
                    src={sender === 'user' ? '/images/user-img.svg' : 'images/ai-img.svg'}
                    alt="img"
                    style={{ width: isMobile ? '45px' : '65px' }}
                />
            </div>

            <div className='message-bubble-text' style={{ flex: 1 }}>
                <div>
                    {/* ✅ Ensure 'Soul AI' is rendered in a <span> for Cypress */}
                    <p className='name'>
                        <span>{sender === 'user' ? 'You' : 'Soul AI'}</span>
                    </p>
                    <p className='info' style={{ color: !lightTheme && '#a79fb3' }}>{text}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className='time' style={{ color: !lightTheme && '#9586ad' }}>{time}</p>
                    {!pastConvo && <ThumbsRating hovered={hovered} />}
                </div>
            </div>
        </div>
    );
};

export default Message;
