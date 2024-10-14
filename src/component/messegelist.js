import React from 'react';

const MessageList = ({ messages, currentUserId}) => {
  
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} 
        className= {msg.senderId === currentUserId ? "send-message":"received-message"}>
          <p className="text">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
