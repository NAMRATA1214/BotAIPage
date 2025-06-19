import React, { useContext } from 'react';
import { Drawer } from '@mui/material';
import { LightThemeContext } from '../contexts/ThemeContext';

const ChatSidebar = ({ isMobile, isDrawerOpen, toggleDrawer, startNewChat, handlePastConvo }) => {
  const { lightTheme } = useContext(LightThemeContext);

  return (
    <>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          className="drawer"
          PaperProps={{
            style: {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        >
          <SidebarContent startNewChat={startNewChat} handlePastConvo={handlePastConvo} />
        </Drawer>
      ) : (
        <div className="drawer" style={{ background: !lightTheme && 'black' }}>
          <SidebarContent startNewChat={startNewChat} handlePastConvo={handlePastConvo} />
        </div>
      )}
    </>
  );
};

const SidebarContent = ({ startNewChat, handlePastConvo }) => {
  const { lightTheme } = useContext(LightThemeContext);

  return (
    <div>
      <div className="drawer-header" style={{ background: !lightTheme && 'black' }}>
        <img src="/images/logo2.svg" alt="logo2" className="logo-img" />

        <a href="/" className="new-chat-button" onClick={startNewChat}>New Chat</a>
      </div>

      <a href="/history" className='past-convo-button' onClick={handlePastConvo}>Past Conversations</a>

    </div>
  );
};

export default ChatSidebar;
