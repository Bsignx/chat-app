import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import ChatBar from './chat-bar';
import ChatBody from './chat-body';
import ChatFooter from './chat-footer';

type Props = {
  socket: Socket;
};

const ChatPage = ({ socket }: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const [typingStatus, setTypingStatus] = useState('');

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          lastMessageRef={lastMessageRef}
          typingStatus={typingStatus}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
