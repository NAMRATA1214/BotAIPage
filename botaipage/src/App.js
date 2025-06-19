import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBox from './components/ChatBox';
import PastConversations from './components/PastConversations';
import { useEffect, useState } from 'react';

function App() {
  const [previousChats, setPreviousChats] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('previousChats');
    if (saved) {
      try {
        setPreviousChats(JSON.parse(saved));
      } catch (e) {
        setPreviousChats([]);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBox />} />
        {/* ✅ Ensure past chats are passed into PastConversations */}
        <Route path="/history" element={<PastConversations previousChats={previousChats} />} />
      </Routes>
    </Router>
  );
}

export default App;
