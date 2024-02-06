import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001/messages', {
  transports: ['websocket'],
});

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const listener = (msg) => {
    receiveMessage(msg);
  };

  useEffect(() => {
    socket.on('receiveMessage', listener);

    getInitialMessages();

    return () => {
      socket.off('receiveMessage', listener);
    };
  }, []);

  function getInitialMessages() {
    fetch('http://localhost:5000/api/messages')
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }

  function receiveMessage(msg: any) {
    const newMessages = [...messages, msg];
    setMessages(newMessages);
  }

  function sendMessage() {
    socket.emit('sendMessage', message);
    setMessage('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  return {
    sendMessage,
    message,
    handleChange,
  };
};
