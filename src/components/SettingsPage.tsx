import { useState } from 'react'
import {
  List,
  Section,
  Cell,
  Switch,
  Slider,
  Select,
  Button,
  Title,
} from '@telegram-apps/telegram-ui'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(70)
  const [language, setLanguage] = useState('ru')

  const handleSave = () => {
    alert('Настройки сохранены!')
  }

  return (
    <List>
      <Section header="Уведомления">
        <Cell
          Component="label"
          after={
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          }
        >
          Push-уведомления
        </Cell>

        <Cell
          Component="label"
          after={
            <Switch
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              disabled={!notifications}
            />
          }
        >
          Звук
        </Cell>

        <Cell multiline>
          <div style={{ width: '100%' }}>
            <Title level="3">Громкость</Title>
            <Slider
              min={0}
              max={100}
              value={volume}
              onChange={setVolume}
              disabled={!soundEnabled || !notifications}
            />
          </div>
        </Cell>
      </Section>

      <Section header="Язык">
        <Cell>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </Select>
        </Cell>
      </Section>

      <Section>
        <Button mode="filled" stretched onClick={handleSave}>
          Сохранить настройки
        </Button>
      </Section>
    </List>
  )
}
