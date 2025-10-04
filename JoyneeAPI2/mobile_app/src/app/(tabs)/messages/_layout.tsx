import { Stack } from 'expo-router';
import * as React from 'react';

export default function MessagesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Messages' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat' }} />
    </Stack>
  );
}
