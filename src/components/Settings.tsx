import { useState, useEffect } from 'react'
import {
  List,
  Section,
  Cell,
  Switch,
  Title,
  Caption,
  IconButton,
} from '@telegram-apps/telegram-ui'
import './Settings.css'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [autoPlayMedia, setAutoPlayMedia] = useState(true)
  const [autoDownloadPhotos, setAutoDownloadPhotos] = useState(true)
  const [autoDownloadVideos, setAutoDownloadVideos] = useState(false)

  const [enterToSend, setEnterToSend] = useState(true)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)

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
        className="settings-overlay"
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
        className="settings-content"
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
        <div className="settings-header" style={{
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
          <Title level="2" style={{ margin: 0, marginLeft: '12px' }}>Настройки</Title>
        </div>
      <div className="settings">
        <List>
          {/* Privacy */}
          <Section header="Конфиденциальность">
            <Cell
              Component="label"
              before={<span className="settings-icon">👁️</span>}
              after={
                <Switch
                  checked={showOnlineStatus}
                  onChange={(e) => setShowOnlineStatus(e.target.checked)}
                />
              }
            >
              Статус "Онлайн"
            </Cell>
          </Section>

          {/* Data and Storage */}
          <Section header="Данные и хранилище">
            <Cell
              Component="label"
              before={<span className="settings-icon">📷</span>}
              after={
                <Switch
                  checked={autoDownloadPhotos}
                  onChange={(e) => setAutoDownloadPhotos(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Автозагрузка фото</div>
                <Caption level="2">Загружать фото автоматически</Caption>
              </div>
            </Cell>
            <Cell
              Component="label"
              before={<span className="settings-icon">🎬</span>}
              after={
                <Switch
                  checked={autoDownloadVideos}
                  onChange={(e) => setAutoDownloadVideos(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Автозагрузка видео</div>
                <Caption level="2">Загружать видео автоматически</Caption>
              </div>
            </Cell>
            <Cell
              Component="label"
              before={<span className="settings-icon">▶️</span>}
              after={
                <Switch
                  checked={autoPlayMedia}
                  onChange={(e) => setAutoPlayMedia(e.target.checked)}
                />
              }
            >
              Автовоспроизведение медиа
            </Cell>
            <Cell
              before={<span className="settings-icon">💾</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Использование хранилища
            </Cell>
          </Section>


          {/* Chat Behavior */}
          <Section header="Поведение чатов">
            <Cell
              Component="label"
              before={<span className="settings-icon">⏎</span>}
              after={
                <Switch
                  checked={enterToSend}
                  onChange={(e) => setEnterToSend(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Enter для отправки</div>
                <Caption level="2">Shift+Enter для новой строки</Caption>
              </div>
            </Cell>
          </Section>

          {/* Language */}
          <Section header="Язык">
            <Cell
              before={<span className="settings-icon">🌐</span>}
              after={
                <div className="settings-value">
                  Русский <span className="settings-chevron">›</span>
                </div>
              }
            >
              Язык приложения
            </Cell>
          </Section>
        </List>

      </div>
      </div>
    </>
  )
}
