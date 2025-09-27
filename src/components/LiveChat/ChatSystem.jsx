import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatWidget from './ChatWidget';
import ChatNotification from './ChatNotification';
import { ChatProvider } from '../../contexts/ChatContext';

const ChatSystem = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [chatOpened, setChatOpened] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Track user interaction
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    // Listen for scroll, click, or key events
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [hasInteracted]);

  const handleNotificationOpen = () => {
    setChatOpened(true);
    setShowNotification(false);
  };

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  return (
    <ChatProvider>
      <div className="chat-system">
        {/* Chat Widget */}
        <ChatWidget />
        
        {/* Chat Notification */}
        {showNotification && !chatOpened && hasInteracted && (
          <ChatNotification 
            onOpen={handleNotificationOpen}
            onDismiss={handleNotificationDismiss}
          />
        )}
      </div>
    </ChatProvider>
  );
};

export default ChatSystem;
