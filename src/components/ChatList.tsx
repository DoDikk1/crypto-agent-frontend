import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cell, Avatar, Badge, Input, IconButton } from '@telegram-apps/telegram-ui'
import { Chat } from '../types'
import './ChatList.css'

interface ChatListProps {
  chats: Chat[]
  activeChatId?: number
  onMenuClick?: () => void
}

export default function ChatList({ chats, activeChatId, onMenuClick }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'personal' | 'bots' | 'chats'>('personal')
  const navigate = useNavigate()

  const formatLastMessage = (chat: Chat) => {
    if (!chat.lastMessage) return ''
    const text = chat.lastMessage.text
    return text.length > 50 ? text.substring(0, 50) + '...' : text
  }

  const formatTime = (date?: Date) => {
    if (!date) return ''
    const now = new Date()
    const messageDate = new Date(date)
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    return messageDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    })
  }

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedChats = [...filteredChats].sort((a, b) => {
    // Pinned first
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1

    // Then by last message time
    const aTime = a.lastMessage?.timestamp.getTime() || 0
    const bTime = b.lastMessage?.timestamp.getTime() || 0
    return bTime - aTime
  })

  return (
    <div className="chat-list">
      {/* Header */}
      <div className="chat-list-header">
        <div className="chat-list-header-top">
          <IconButton mode="plain" size="m" onClick={onMenuClick}>
            ☰
          </IconButton>
          <div className="chat-list-search-top">
            <Input
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              before={<span>🔍</span>}
            />
          </div>
          <div className="chat-list-online-status">
            <div className="online-indicator-active" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="chat-list-tabs">
        <button
          className={`chat-tab ${activeTab === 'personal' ? 'chat-tab-active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Личка
        </button>
        <button
          className={`chat-tab ${activeTab === 'bots' ? 'chat-tab-active' : ''}`}
          onClick={() => setActiveTab('bots')}
        >
          Боты
        </button>
        <button
          className={`chat-tab ${activeTab === 'chats' ? 'chat-tab-active' : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          Чаты
        </button>
      </div>

      {/* Chats */}
      <div className="chat-list-items">
        {sortedChats.map(chat => (
          <Cell
            key={chat.id}
            Component="div"
            onClick={() => navigate(`/chat/${chat.id}`)}
            before={
              <div className="chat-item-avatar">
                <Avatar
                  size={48}
                  acronym={chat.title[0]}
                />
                {chat.online && chat.type === 'private' && (
                  <div className="chat-online-indicator" />
                )}
              </div>
            }
            after={
              <div className="chat-item-badges">
                {chat.muted && <span className="chat-mute-icon">🔕</span>}
                {chat.unreadCount > 0 && (
                  <Badge type="number" mode="primary">
                    {chat.unreadCount}
                  </Badge>
                )}
                {chat.lastMessage && !chat.lastMessage.read && chat.lastMessage.senderId === 1 && (
                  <span className="chat-check-icon">✓✓</span>
                )}
              </div>
            }
            className={`chat-item ${activeChatId === chat.id ? 'chat-item-active' : ''} ${chat.pinned ? 'chat-item-pinned' : ''}`}
            multiline
          >
            <div className="chat-item-content">
              <div className="chat-item-header">
                <div className="chat-item-title">{chat.title}</div>
                <div className="chat-item-time">
                  {formatTime(chat.lastMessage?.timestamp)}
                </div>
              </div>
              <div className="chat-item-message">
                {formatLastMessage(chat)}
              </div>
            </div>
          </Cell>
        ))}
      </div>
    </div>
  )
}
