import React from 'react';
import ChipMui, { ChipProps } from '@mui/material/Chip';

export const Chip: React.FC<ChipProps> = (props) => {
  return <ChipMui {...props} />;
};
