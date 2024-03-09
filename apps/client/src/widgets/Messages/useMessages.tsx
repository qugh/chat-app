import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { getAccessToken } from '@client/shared/utils/localstorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@client/shared/constants';
import {
  deleteAllMessagesProvider,
  getAllMessagesProvider,
} from '@client/shared/providers/Messages';
import { useNavigate } from 'react-router';
import { useUpdateEffect } from '@client/shared/hooks/useUpdateEffect';

interface Message {
  content: string | Record<string, unknown>;
  updatedAt: string;
}

export const useMessages = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const messagesQuery = useQuery({
    queryKey: [queryKeys.GET_MESSAGES],
    queryFn: getAllMessagesProvider,
  });

  const deleteMessagesMutation = useMutation({
    mutationFn: deleteAllMessagesProvider,
    onSuccess: () => {
      messagesQuery.refetch();
    },
  });

  const token = getAccessToken();

  const socket = useMemo(() => {
    return io('http://localhost:5001', {
      transports: ['websocket'],
      auth: { jwt: token },
    });
  }, [token]);

  const listener = (msg: Message) => {
    // const newMessages = [...messages, msg];
    // setMessages(newMessages);
    messagesQuery.refetch();
  };

  useUpdateEffect(() => {
    if (socket.disconnected) {
    }
  }, [socket.disconnected]);

  useEffect(() => {
    socket.on('message', listener);
    socket.io.on('close', () => {
      navigate('/sign-in');
    });

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

  const deleteAllMessages = () => deleteMessagesMutation.mutate();

  return {
    sendMessage,
    message,
    handleChange,
    messages: messagesQuery.data || [],
    deleteAllMessages,
  };
};
