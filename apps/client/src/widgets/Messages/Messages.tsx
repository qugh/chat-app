import React from 'react';
import { useMessages } from './useMessages';

export const Messages: React.FC = () => {
  const { sendMessage, message, handleChange, messages, deleteAllMessages } =
    useMessages();
  console.log('messages', messages);
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ul>
        {messages?.map((message) => (
          <li key={message.updatedAt}>{message.content}</li>
        ))}
      </ul>
      <input
        style={{ marginBottom: '12px' }}
        value={message}
        onChange={handleChange}
        placeholder="enter msg"
      />
      <button onClick={sendMessage}>send</button>
      <button onClick={deleteAllMessages}>delete</button>
    </section>
  );
};
