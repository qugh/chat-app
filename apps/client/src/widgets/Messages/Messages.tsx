import React from 'react';
import { useMessages } from './useMessages';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Chip,
  Input,
  Button,
  Icons,
  Box,
} from '@client/shared/uikit';
import { formatDate } from '@client/shared/utils/date';
import { Stack } from '@client/shared/uikit/Layout/Stack';

export const Messages: React.FC = () => {
  const { sendMessage, message, handleChange, messages, deleteAllMessages } =
    useMessages();

  return (
    <Stack p={2} alignItems="center" direction="column" mt={-2}>
      <Box flexGrow="1" minWidth="100%">
        <List
          sx={{
            bgcolor: 'background.paper',
            height: 'calc(100vh - 72px)',
            overflow: 'hidden scroll',
          }}
        >
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <Divider textAlign="right" component="li">
                <Chip size="small" label={message.id} />
              </Divider>
              <ListItem key={message.updatedAt}>
                <ListItemText
                  primary={message.content}
                  secondary={formatDate(message.updatedAt, 'HH:mm:ss')}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Stack spacing={1} direction="row">
        <Input
          size="small"
          value={message}
          onChange={handleChange}
          placeholder="Enter the message..."
        />
        <Button onClick={sendMessage} endIcon={<Icons.Send />}>
          send
        </Button>
      </Stack>
      {/*<Button onClick={deleteAllMessages}>delete</Button>*/}
    </Stack>
  );
};
