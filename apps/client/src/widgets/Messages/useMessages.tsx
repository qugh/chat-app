import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { getAccessToken } from '@client/shared/utils/localstorage';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@client/shared/constants';
import { getAllMessagesProvider } from '@client/shared/providers/Messages';

interface Message {
  content: string | Record<string, unknown>;
  updatedAt: string;
}

export const useMessages = () => {
  const [message, setMessage] = useState('');

  const messagesQuery = useQuery({
    queryKey: [queryKeys.GET_MESSAGES],
    queryFn: () => getAllMessagesProvider(),
  });

  const socket = useMemo(
    () =>
      io('http://localhost:5001/messages', {
        transports: ['websocket'],
        auth: { jwt: getAccessToken() },
      }),
    [],
  );

  const listener = (msg: Message) => {
    // const newMessages = [...messages, msg];
    // setMessages(newMessages);
    messagesQuery.refetch();
  };

  useEffect(() => {
    socket.on('message', listener);

    return () => {
      socket.off('message', listener);
    };
  }, []);

  function sendMessage() {
    socket.emit('message', { data: message });
    setMessage('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  return {
    sendMessage,
    message,
    handleChange,
    messages: messagesQuery.data || [],
  };
};
