import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { getAccessToken } from '@client/shared/utils/localstorage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const messagesQuery = useQuery<
    Message[] | undefined,
    { statusCode: number; message: string }
  >({
    queryKey: [queryKeys.GET_MESSAGES],
    queryFn: getAllMessagesProvider,
  });

  useUpdateEffect(() => {
    if (messagesQuery.error?.statusCode === 401) navigate('/sign-in');
  }, [messagesQuery.error]);

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
    console.log('msg', msg);
    // const newMessages = [...messages, msg];
    // setMessages(newMessages);
    // messagesQuery.refetch();
    queryClient.setQueryData<Message[]>([queryKeys.GET_MESSAGES], (prev) => {
      if (!prev) return prev;
      return [...prev, msg];
    });
  };

  useEffect(() => {
    socket.on('message', listener);
    // socket.io.on('close', () => {
    //   navigate('/sign-in');
    // });

    return () => {
      socket.off('message', listener);
    };
  }, []);

  function sendMessage() {
    socket.emit('message', { content: message });
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
