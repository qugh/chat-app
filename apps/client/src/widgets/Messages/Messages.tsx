import React from 'react';
import { useMessages } from './useMessages';
import {
  List,
  ListItem,
  ListItemText,
  Chip,
  Input,
  Button,
  Icons,
  Box,
  Stack,
  ListSubHeader,
} from '@client/shared/uikit';
import { formatDate } from '@client/shared/utils/date';

export const Messages: React.FC = () => {
  const {
    sendMessage,
    message,
    handleChange,
    messages,
    listRef,
    handleKeyDown,
  } = useMessages();

  return (
    <Stack p={2} alignItems="center" direction="column" mt={-2}>
      <Box flexGrow="1" minWidth="100%">
        <List
          ref={listRef}
          sx={(theme) => ({
            bgcolor: 'background.paper',
            height: 'calc(100vh - 72px - 40px - 16px)',
            overflow: 'hidden scroll',
            '& ul': { padding: 0 },
          })}
          subheader={<li />}
        >
          {messages.map((message, idx, arr) => (
            <li key={message.id}>
              {/*<Divider textAlign="right" component="li">*/}
              {/*  <Chip size="small" label={message.email} />*/}
              {/*</Divider>*/}
              <ul>
                {message.email !== arr[idx - 1]?.email && (
                  <ListSubHeader>
                    <Chip size="small" label={message.email} />
                  </ListSubHeader>
                )}
                <ListItem sx={{ py: 0 }} key={message.updatedAt}>
                  <ListItemText
                    primary={message.content}
                    secondary={formatDate(message.updatedAt, 'HH:mm:ss')}
                  />
                </ListItem>
              </ul>
            </li>
          ))}
        </List>
      </Box>
      <Stack spacing={1} direction="row">
        <Input
          size="small"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
