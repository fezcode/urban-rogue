import { useEffect, useRef } from 'react';
import Message from './Message';

export default function ChatFeed({ messages }) {
  const feedRef = useRef(null);

  useEffect(() => {
    if (!feedRef.current) return;

    // Use MutationObserver to scroll to bottom whenever the content changes
    // This handles the typewriter effect increasing the height of messages.
    const observer = new MutationObserver(() => {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    });

    observer.observe(feedRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Initial scroll
    feedRef.current.scrollTop = feedRef.current.scrollHeight;

    return () => observer.disconnect();
  }, []);

  // Also scroll when messages array changes (e.g. user sends a message)
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
