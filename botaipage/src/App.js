import './App.css';
import ChatBox from './components/ChatBox';
import React, { useState } from 'react';
import { LightThemeContext } from './contexts/ThemeContext';

function App() {
  const [lightTheme, setLightTheme] = useState(true)

  const toggleTheme = () => {
    setLightTheme(!lightTheme);
  };
  return (
    <LightThemeContext.Provider value={{ lightTheme, toggleTheme }}>
      <React.StrictMode>
        <ChatBox />
      </React.StrictMode>
    </LightThemeContext.Provider>
  );
}

export default App;
