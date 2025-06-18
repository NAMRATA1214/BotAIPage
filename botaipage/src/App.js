import './App.css';
import ChatBox from './components/ChatBox';
import React, { useState } from 'react';
import { LightThemeContext } from './contexts/ThemeContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PastConversations from './components/PastConversations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBox />} />
        <Route path="/history" element={<PastConversations />} />
      </Routes>
    </Router>
  );
}

export default App;
