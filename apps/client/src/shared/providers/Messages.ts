import { MessagesApi } from '@client/shared/api/Messages';

export const getAllMessagesProvider = async () => {
  const { data } = await MessagesApi.getAllMessages();
  return data;
};
