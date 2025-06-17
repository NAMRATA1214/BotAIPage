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
        <Message key={index} sender={msg.sender} text={msg.text} time={msg.time} pastConvo={false}/>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
