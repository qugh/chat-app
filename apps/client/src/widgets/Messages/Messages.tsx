import React from 'react';
import { useMessages } from './useMessages';

export const Messages: React.FC = () => {
  const { sendMessage, message, handleChange } = useMessages();
  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <input value={message} onChange={handleChange} placeholder="enter msg" />
      <button>send</button>
    </section>
  );
};
