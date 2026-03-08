import { useEffect } from 'react'
import {
  List,
  Section,
  Cell,
  Avatar,
  Title,
  Caption,
} from '@telegram-apps/telegram-ui'
import { User } from '../types'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentUser: User
  onOpenSettings?: () => void
}

export default function Sidebar({ isOpen, onClose, currentUser, onOpenSettings }: SidebarProps) {

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

  if (!isOpen) return null

  return (
    <>
      <div
        className="sidebar-overlay"
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
        className="sidebar-content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '80%',
          maxWidth: '360px',
          backgroundColor: 'var(--tgui--bg_color, #fff)',
          zIndex: 1001,
          overflowY: 'auto',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
        }}
      >
      <div className="sidebar">
        {/* User Profile */}
        <div className="sidebar-profile">
          <Avatar
            size={96}
            acronym={currentUser.firstName[0]}
          />
          <Title level="2">{currentUser.firstName} {currentUser.lastName}</Title>
          {currentUser.username && (
            <Caption level="1">@{currentUser.username}</Caption>
          )}
        </div>

        {/* Menu Items */}
        <List>
          <Section>
            <Cell
              before={<span className="sidebar-icon">👤</span>}
              after={<span className="sidebar-chevron">›</span>}
            >
              Мой профиль
            </Cell>
            <Cell
              before={<span className="sidebar-icon">📁</span>}
              after={<span className="sidebar-chevron">›</span>}
            >
              Сохранённые сообщения
            </Cell>
            <Cell
              before={<span className="sidebar-icon">📞</span>}
              after={<span className="sidebar-chevron">›</span>}
            >
              Недавние звонки
            </Cell>
            <Cell
              before={<span className="sidebar-icon">👥</span>}
              after={<span className="sidebar-chevron">›</span>}
            >
              Контакты
            </Cell>
          </Section>

          <Section header="Настройки">
            <Cell
              before={<span className="sidebar-icon">⚙️</span>}
              after={<span className="sidebar-chevron">›</span>}
              onClick={() => {
                onClose()
                onOpenSettings?.()
              }}
            >
              Настройки
            </Cell>
          </Section>

          <Section>
            <Cell
              before={<span className="sidebar-icon">❓</span>}
              after={<span className="sidebar-chevron">›</span>}
            >
              Помощь
            </Cell>
            <Cell
              before={<span className="sidebar-icon">❗</span>}
              after={<span className="sidebar-chevron">›</span>}
            >
              Telegram FAQ
            </Cell>
          </Section>

          <Section>
            <Cell
              before={<span className="sidebar-icon">📱</span>}
            >
              <div className="sidebar-version">
                <div>Telegram Web</div>
                <Caption level="2">Version 1.0.0</Caption>
              </div>
            </Cell>
          </Section>
        </List>
      </div>
      </div>
    </>
  )
}
