import React, { createContext, useContext, useState } from 'react';

export const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
}

export const ChatProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState('')
    const [isRoomOpen, setIsRoomOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    //  const openMenu = () => {
    //    setIsMenuOpen(true);
    //  };
    //  const openMainMenu = () => {
    //    setIsOpen(true);
    //  };
    //  const closeMenu = () => {
    //    setIsMenuOpen(false);
    //  };

    const value = {
      userName,
      setUserName,
      setCurrentRoom,
      currentRoom,
      isRoomOpen, setIsRoomOpen,
      isMenuOpen,
      setIsMenuOpen,
    };

   
    
    return (
        <ChatContext.Provider value={ value }>
            { children }
        </ChatContext.Provider>
    );
};