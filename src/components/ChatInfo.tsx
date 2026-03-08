import { useEffect } from 'react'
import {
  List,
  Section,
  Cell,
  Avatar,
  Title,
  Caption,
  IconButton,
  Switch,
} from '@telegram-apps/telegram-ui'
import { Chat } from '../types'
import './ChatInfo.css'

interface ChatInfoProps {
  isOpen: boolean
  onClose: () => void
  chat?: Chat
}

export default function ChatInfo({ isOpen, onClose, chat }: ChatInfoProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !chat) return null

  const participant = chat.participants[0]

  return (
    <>
      <div
        className="chat-info-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
        }}
      />
      <div
        className="chat-info-content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--tgui--bg_color, #fff)',
          zIndex: 1001,
          overflowY: 'auto',
        }}
      >
        <div className="chat-info-header" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--tgui--secondary_bg_color, #e0e0e0)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--tgui--bg_color, #fff)',
          zIndex: 10,
        }}>
          <IconButton mode="plain" size="m" onClick={onClose}>
            ←
          </IconButton>
          <Title level="2" style={{ margin: 0, marginLeft: '12px' }}>Информация</Title>
        </div>

        <div className="chat-info">
          {/* Profile Section */}
          <div className="chat-info-profile">
            <Avatar size={96} acronym={chat.title[0]} />
            <Title level="1" style={{ marginTop: '16px' }}>{chat.title}</Title>
            <Caption level="1" style={{ marginTop: '4px' }}>
              {chat.online ? 'онлайн' : 'был(а) недавно'}
            </Caption>
          </div>

          <List>
            {/* Contact Info */}
            <Section>
              <Cell
                before={<span className="chat-info-icon">📱</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                <div className="chat-info-cell-content">
                  <div>Телефон</div>
                  <Caption level="2">+7 XXX XXX XX XX</Caption>
                </div>
              </Cell>
              {participant?.username && (
                <Cell
                  before={<span className="chat-info-icon">@</span>}
                  after={<span className="chat-info-chevron">›</span>}
                >
                  <div className="chat-info-cell-content">
                    <div>Имя пользователя</div>
                    <Caption level="2">@{participant.username}</Caption>
                  </div>
                </Cell>
              )}
              <Cell
                before={<span className="chat-info-icon">ℹ️</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                <div className="chat-info-cell-content">
                  <div>О себе</div>
                  <Caption level="2">Нет информации</Caption>
                </div>
              </Cell>
            </Section>

            {/* Settings */}
            <Section header="Настройки">
              <Cell
                Component="label"
                before={<span className="chat-info-icon">🔔</span>}
                after={
                  <Switch
                    checked={!chat.muted}
                    onChange={() => {}}
                  />
                }
              >
                Уведомления
              </Cell>
              <Cell
                Component="label"
                before={<span className="chat-info-icon">📌</span>}
                after={
                  <Switch
                    checked={chat.pinned}
                    onChange={() => {}}
                  />
                }
              >
                Закрепить чат
              </Cell>
            </Section>

            {/* Media */}
            <Section header="Медиа, файлы и ссылки">
              <Cell
                before={<span className="chat-info-icon">🖼️</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                Медиа
              </Cell>
              <Cell
                before={<span className="chat-info-icon">📎</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                Файлы
              </Cell>
              <Cell
                before={<span className="chat-info-icon">🔗</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                Ссылки
              </Cell>
            </Section>

            {/* Actions */}
            <Section>
              <Cell
                before={<span className="chat-info-icon">🔍</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                Поиск
              </Cell>
              <Cell
                before={<span className="chat-info-icon">⚠️</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                Пожаловаться
              </Cell>
              <Cell
                before={<span className="chat-info-icon" style={{ color: 'var(--tgui--destructive_text_color, #ff3b30)' }}>🗑️</span>}
                after={<span className="chat-info-chevron">›</span>}
              >
                <span style={{ color: 'var(--tgui--destructive_text_color, #ff3b30)' }}>
                  Удалить чат
                </span>
              </Cell>
            </Section>
          </List>
        </div>
      </div>
    </>
  )
}
