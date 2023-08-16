import React from 'react';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

interface NotificationComponentProps {
  title?: string;
  success?: boolean;
}
const NotificationComponent = ({
  title,
  success,
}: NotificationComponentProps) => {
  return (
    <Notification
      icon={success ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />}
      color={success ? 'teal' : 'red'}
      title={title}
      sx={{
        width: '30%',
        position: 'fixed',
        top: 0,
        right: 0,
      }}
    />
  );
};

export default NotificationComponent;
