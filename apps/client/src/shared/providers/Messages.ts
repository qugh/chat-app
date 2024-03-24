import { MessagesApi } from '@client/shared/api/Messages';
import { AxiosError } from 'axios';

export interface Message {
  content: string;
  updatedAt: string;
  userId: number;
  id: number;
  createdAt: string;
  email: string;
}

export const getAllMessagesProvider = async () => {
  try {
    const { data } = await MessagesApi.getAllMessages<Message[]>();
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e.response?.data;
    }
  }
};

export const deleteAllMessagesProvider = async () => {
  await MessagesApi.deleteAllMessages();
};
