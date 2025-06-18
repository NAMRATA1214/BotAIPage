import React, { useRef, useEffect } from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(messages)
  return (
    <div className="messages">
{messages.map((msg, index) => (
  <div key={index} className="chat-message">
    <p className="time">{msg.time}</p>
    <p>
      <span>{msg.sender === 'ai' ? 'Soul AI' : 'You'}</span>: {msg.text}
    </p>
  </div>
))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
