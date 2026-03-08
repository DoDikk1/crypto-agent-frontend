import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Placeholder } from '@telegram-apps/telegram-ui'
import ChatList from '../components/ChatList'
import ChatWindow from '../components/ChatWindow'
import Sidebar from '../components/Sidebar'
import Settings from '../components/Settings'
import ChatInfo from '../components/ChatInfo'
import { mockChats, mockMessages, currentUser } from '../data/mockData'
import { Message } from '../types'
import './TelegramClient.css'

export default function TelegramClient() {
  const { chatId } = useParams()
  const [chats] = useState(mockChats)
  const [messages, setMessages] = useState<Record<number, Message[]>>(mockMessages)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false)

  const activeChatId = chatId ? parseInt(chatId) : undefined
  const activeChat = activeChatId ? chats.find(c => c.id === activeChatId) : undefined

  const handleSendMessage = (text: string, replyToId?: number) => {
    if (!activeChatId) return

    const newMessage: Message = {
      id: Date.now(),
      chatId: activeChatId,
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
      read: false,
      replyTo: replyToId,
    }

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage],
    }))
  }

  const handleEditMessage = (messageId: number, newText: string) => {
    if (!activeChatId) return

    setMessages(prev => ({
      ...prev,
      [activeChatId]: prev[activeChatId].map(msg =>
        msg.id === messageId
          ? { ...msg, text: newText, edited: true }
          : msg
      ),
    }))
  }

  const handleDeleteMessage = (messageId: number) => {
    if (!activeChatId) return

    setMessages(prev => ({
      ...prev,
      [activeChatId]: prev[activeChatId].filter(msg => msg.id !== messageId),
    }))
  }

  return (
    <>
      <div className="telegram-client">
        {/* Chat List (Left Panel) */}
        <div className="telegram-client-sidebar">
          <ChatList
            chats={chats}
            activeChatId={activeChatId}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        </div>

        {/* Chat Window (Right Panel) */}
        <div className="telegram-client-main">
          {activeChat ? (
            <ChatWindow
              chat={activeChat}
              messages={messages[activeChat.id] || []}
              currentUserId={currentUser.id}
              onSendMessage={handleSendMessage}
              onEditMessage={handleEditMessage}
              onDeleteMessage={handleDeleteMessage}
              onChatInfoClick={() => setIsChatInfoOpen(true)}
            />
          ) : (
            <div className="telegram-client-empty">
              <Placeholder
                header="Выберите чат"
                description="Выберите чат из списка слева, чтобы начать переписку"
              />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentUser={currentUser}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Settings */}
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Chat Info */}
      <ChatInfo
        isOpen={isChatInfoOpen}
        onClose={() => setIsChatInfoOpen(false)}
        chat={activeChat}
      />
    </>
  )
}
