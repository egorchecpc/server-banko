// src/context/ChatContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ChatWidget } from '@/modules/AIChatModule/AIChatModule'

type ChatContextType = {
  openChat: () => void
  isOpen: boolean
  closeChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = () => {
    setIsOpen(true)
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  return (
    <ChatContext.Provider value={{ openChat, isOpen, closeChat }}>
      {children}
      {/* Render the ChatWidget here and pass the isOpen state */}
      <ChatWidget isOpen={isOpen} onClose={closeChat} />
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
