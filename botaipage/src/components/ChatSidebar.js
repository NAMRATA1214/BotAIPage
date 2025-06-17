import React, { useContext } from 'react';
import { Drawer } from '@mui/material';
import { LightThemeContext } from '../contexts/ThemeContext';

const ChatSidebar = ({ isMobile, isDrawerOpen, toggleDrawer, startNewChat, handlePastConvo }) => {
  const { lightTheme } = useContext(LightThemeContext)

  return (
    <>
      {isMobile ? (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} className='drawer' PaperProps={{
          style: {
            backgroundColor: 'black',
            color: 'white',
          },
        }}>
          <SidebarContent startNewChat={startNewChat} handlePastConvo={handlePastConvo} />
        </Drawer>
      ) : (
        <div className='drawer' style={{ background: !lightTheme && 'black' }}>
          <SidebarContent startNewChat={startNewChat} handlePastConvo={handlePastConvo} />
        </div>
      )}
    </>
  );
};

const SidebarContent = ({ startNewChat, handlePastConvo }) => {
  const { lightTheme } = useContext(LightThemeContext)

  return (
    <div >
      <div className='drawer-header'
        style={{ background: !lightTheme && 'black' }}
      >
        <img src="/images/logo2.svg" alt="logo2" className='logo-img' />
        <span>New Chat</span>
        {lightTheme
          ? <img src='/images/new-chat.svg' classNamFe='new-chat-button' onClick={startNewChat} alt='new-chat' />
          : <img src='/images/new-chat-white.svg' classNamFe='new-chat-button' onClick={startNewChat} alt='new-chat-white' />}

      </div>
      <button className='past-convo-button' onClick={handlePastConvo} style={{ background: !lightTheme && 'magenta', color: !lightTheme && 'white' }}>
        Past Conversations
      </button>
    </div>
  );
}

export default ChatSidebar;
