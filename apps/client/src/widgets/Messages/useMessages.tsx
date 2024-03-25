import React, { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { getAccessToken } from '@client/shared/utils/localstorage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@client/shared/constants';
import {
  deleteAllMessagesProvider,
  getAllMessagesProvider,
  Message,
} from '@client/shared/providers/Messages';
import { useProfile, useUpdateEffect } from '@client/shared/hooks';

export const useMessages = () => {
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const listRef = useRef<HTMLUListElement>(null);

  const { profileQuery } = useProfile();

  const messagesQuery = useQuery<
    Message[] | undefined,
    { statusCode: number; message: string }
  >({
    queryKey: [queryKeys.GET_MESSAGES],
    queryFn: getAllMessagesProvider,
    select: (data) =>
      data?.map((message) => ({
        ...message,
        email: message.userId == profileQuery.data?.id ? 'You' : message.email,
      })),
    retry: false,
  });

  useUpdateEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'auto',
    });
  }, [messagesQuery.data?.length]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') sendMessage();
  };

  return {
    sendMessage,
    message,
    handleChange,
    messages: messagesQuery.data || [],
    deleteAllMessages,
    listRef,
    handleKeyDown,
  };
};
