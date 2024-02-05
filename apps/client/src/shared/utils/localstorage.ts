export const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (key: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, key);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
