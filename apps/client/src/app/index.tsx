import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navigate } from 'react-router';

export const App: React.FC = () => {
  return <Navigate to="/chat" />;
};
