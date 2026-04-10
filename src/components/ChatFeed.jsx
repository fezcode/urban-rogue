import { useEffect, useRef } from 'react';
import Message from './Message';

export default function ChatFeed({ messages }) {
  const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-feed" ref={feedRef}>
      {messages.map((msg, idx) => (
        <Message
          key={idx}
          type={msg.type}
          text={msg.text}
          isLatest={idx === messages.length - 1 && msg.type === 'system'}
        />
      ))}
    </div>
  );
}
