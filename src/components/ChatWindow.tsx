import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title, Caption, IconButton } from '@telegram-apps/telegram-ui'
import { Chat, Message as MessageType } from '../types'
import Message from './Message'
import MessageContextMenu from './MessageContextMenu'
import './ChatWindow.css'

interface ChatWindowProps {
  chat: Chat
  messages: MessageType[]
  currentUserId: number
  onSendMessage: (text: string, replyToId?: number) => void
  onEditMessage?: (messageId: number, newText: string) => void
  onDeleteMessage?: (messageId: number) => void
  onChatInfoClick?: () => void
}

export default function ChatWindow({
  chat,
  messages,
  currentUserId,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onChatInfoClick,
}: ChatWindowProps) {
  const navigate = useNavigate()
  const [messageText, setMessageText] = useState('')
  const [replyTo, setReplyTo] = useState<MessageType | null>(null)
  const [editingMessage, setEditingMessage] = useState<MessageType | null>(null)
  const [contextMenuMessage, setContextMenuMessage] = useState<MessageType | null>(null)
  const [typing, setTyping] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    const text = messageText.trim()
    if (!text) return

    if (editingMessage && onEditMessage) {
      onEditMessage(editingMessage.id, text)
      setEditingMessage(null)
    } else {
      onSendMessage(text, replyTo?.id)
      setReplyTo(null)
    }

    setMessageText('')
    setTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value)

    // Typing indicator
    if (!typing) {
      setTyping(true)
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false)
    }, 1000)
  }

  const handleReply = (message: MessageType) => {
    setReplyTo(message)
    setContextMenuMessage(null)
  }

  const handleEdit = (message: MessageType) => {
    setEditingMessage(message)
    setMessageText(message.text)
    setContextMenuMessage(null)
  }

  const handleDelete = (messageId: number) => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId)
    }
    setContextMenuMessage(null)
  }

  const handleCopy = (message: MessageType) => {
    navigator.clipboard.writeText(message.text)
    setContextMenuMessage(null)
  }

  const handleForward = (message: MessageType) => {
    console.log('Forward message:', message.id)
    setContextMenuMessage(null)
  }

  const getStatusText = () => {
    if (typing) {
      return 'печатает...'
    }
    if (chat.type === 'group') {
      return `${chat.participants.length} участников`
    }
    if (chat.type === 'channel') {
      return 'канал'
    }
    if (chat.online) {
      return 'онлайн'
    }
    return chat.participants[0]?.lastSeen || 'был(а) недавно'
  }

  const getReplyMessageById = (id: number) => {
    return messages.find(m => m.id === id)
  }

  return (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        {isMobile && (
          <IconButton
            mode="plain"
            size="m"
            onClick={() => navigate('/')}
          >
            ←
          </IconButton>
        )}
        <div
          className="chat-header-info"
          onClick={onChatInfoClick}
          style={{ cursor: 'pointer', flex: 1 }}
        >
          <div className="chat-header-text">
            <Title level="3">{chat.title}</Title>
            <Caption level="1" className="chat-status">
              {getStatusText()}
            </Caption>
          </div>
        </div>
        <div className="chat-header-user">
          <div className="chat-header-user-info">
            <div className="chat-header-user-name">
              {window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Вы'}
            </div>
            <Caption level="1" className="chat-header-user-username">
              @{window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'myusername'}
            </Caption>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        <div className="chat-messages-inner">
          {messages.map((message, index) => {
            const isOwn = message.senderId === currentUserId
            const prevMessage = messages[index - 1]
            const showAvatar = !isOwn && (!prevMessage || prevMessage.senderId !== message.senderId)
            const senderName = !isOwn
              ? chat.participants.find(u => u.id === message.senderId)?.firstName
              : undefined
            const replyMessage = message.replyTo ? getReplyMessageById(message.replyTo) : undefined

            return (
              <div
                key={message.id}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setContextMenuMessage(message)
                }}
                onClick={() => setContextMenuMessage(message)}
              >
                <Message
                  message={message}
                  isOwn={isOwn}
                  senderName={senderName}
                  showAvatar={showAvatar}
                  replyMessage={replyMessage}
                />
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply Preview */}
      {replyTo && (
        <div className="chat-reply-preview">
          <div className="chat-reply-bar" />
          <div className="chat-reply-content">
            <Caption level="1" className="chat-reply-name">
              {chat.participants.find(u => u.id === replyTo.senderId)?.firstName || 'Вы'}
            </Caption>
            <Caption level="2" className="chat-reply-text">
              {replyTo.text}
            </Caption>
          </div>
          <IconButton mode="plain" size="s" onClick={() => setReplyTo(null)}>
            ✕
          </IconButton>
        </div>
      )}

      {/* Edit Preview */}
      {editingMessage && (
        <div className="chat-edit-preview">
          <div className="chat-edit-icon">✏️</div>
          <div className="chat-edit-content">
            <Caption level="1">Редактирование</Caption>
            <Caption level="2">{editingMessage.text}</Caption>
          </div>
          <IconButton
            mode="plain"
            size="s"
            onClick={() => {
              setEditingMessage(null)
              setMessageText('')
            }}
          >
            ✕
          </IconButton>
        </div>
      )}

      {/* Input */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <div className="chat-input-button-left">
            <IconButton mode="plain" size="s">
              📎
            </IconButton>
          </div>
          <div className="chat-input-field">
            <input
              type="text"
              placeholder={editingMessage ? 'Редактировать сообщение' : 'Сообщение'}
              value={messageText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="chat-input-native"
            />
          </div>
          <div className="chat-input-buttons-right">
            {messageText.trim() ? (
              <IconButton mode="plain" size="s" onClick={handleSend}>
                ➤
              </IconButton>
            ) : (
              <>
                <IconButton mode="plain" size="s">
                  😊
                </IconButton>
                <IconButton mode="plain" size="s">
                  🎤
                </IconButton>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenuMessage && (
        <MessageContextMenu
          isOpen={!!contextMenuMessage}
          onClose={() => setContextMenuMessage(null)}
          message={contextMenuMessage}
          isOwn={contextMenuMessage.senderId === currentUserId}
          onReply={() => handleReply(contextMenuMessage)}
          onEdit={
            contextMenuMessage.senderId === currentUserId
              ? () => handleEdit(contextMenuMessage)
              : undefined
          }
          onDelete={() => handleDelete(contextMenuMessage.id)}
          onForward={() => handleForward(contextMenuMessage)}
          onCopy={() => handleCopy(contextMenuMessage)}
        />
      )}
    </div>
  )
}
