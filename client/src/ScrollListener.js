import React, { useState, useEffect } from 'react';

export default () => {
  const [userScrolledTo, setUserScrolledTo] = useState('?');
  
  useEffect(() => {
    document.title = 'Where did they scroll?';
    const socket = new WebSocket(`wss://${window.location.host}/user-scrolls/listen`);
  
    socket.onmessage = ({ data  }) => {
      console.log('Message from server:', data)
      setUserScrolledTo(data);
    }

    socket.onerror = err => console.error("WebSocket error:", err);
    return () => socket.close();
  }, []);

  return <div className="scroll-listener__container">
    <span className="scroll-listener__user-scrolled-to">{userScrolledTo}</span>
  </div>
};