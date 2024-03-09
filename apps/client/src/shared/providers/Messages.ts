import { MessagesApi } from '@client/shared/api/Messages';

type Message = {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
};

export const getAllMessagesProvider = async () => {
  const { data } = await MessagesApi.getAllMessages<Message[]>();
  return data;
};

export const deleteAllMessagesProvider = async () => {
  await MessagesApi.deleteAllMessages();
};
