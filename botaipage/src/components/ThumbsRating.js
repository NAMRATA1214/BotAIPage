import React, { useContext, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { LightThemeContext } from '../contexts/ThemeContext';

const ThumbsRating = ({ hovered }) => {
    const [selected, setSelected] = useState(null);


    const handleThumbUpClick = () => {
        setSelected(selected === 'up' ? null : 'up');
    };

    const handleThumbDownClick = () => {
        setSelected(selected === 'down' ? null : 'down');
    };

    const isVisible = hovered || selected !== null;

    const { lightTheme } = useContext(LightThemeContext)

    return (
        <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }} >
            <IconButton onClick={handleThumbUpClick} >
                {selected === 'up' ? <ThumbUpIcon color="primary" sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }} />}
            </IconButton>
            <IconButton onClick={handleThumbDownClick}>
                {selected === 'down' ? <ThumbDownIcon color="primary" sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }} /> : <ThumbDownOutlinedIcon sx={{ fontSize: '20px', color: !lightTheme && '#a79fb3' }} />}
            </IconButton>
        </div>
    );
};

export default ThumbsRating;
