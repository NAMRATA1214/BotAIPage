import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBox from './components/ChatBox';
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