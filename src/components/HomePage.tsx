import { useState } from 'react'
import {
  List,
  Section,
  Cell,
  Button,
  Avatar,
  Title,
  Text,
  Caption,
  Badge,
  Modal,
  Input,
  Switch,
  Placeholder,
} from '@telegram-apps/telegram-ui'

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [username, setUsername] = useState('')

  const handleShowAlert = () => {
    alert('Привет из Telegram Mini App! 👋')
  }

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user

  return (
    <List>
      {/* Welcome Section */}
      <Section>
        <Cell
          before={
            <Avatar
              size={48}
              acronym={user?.first_name?.[0] || 'U'}
            />
          }
          multiline
        >
          <Title level="2">
            {user?.first_name || 'Привет'} {user?.last_name || ''}
          </Title>
          <Text>
            {user?.username ? `@${user.username}` : 'Добро пожаловать!'}
          </Text>
          <Caption level="1">Telegram Mini App Demo</Caption>
        </Cell>
      </Section>

      {/* Info Section */}
      <Section header="О приложении" footer="Пример использования Telegram UI">
        <Cell>
          <Placeholder
            header="Готово к работе!"
            description="Это демонстрация компонентов Telegram UI"
          >
            <div style={{ fontSize: 64 }}>🚀</div>
          </Placeholder>
        </Cell>
      </Section>

      {/* Actions Section */}
      <Section header="Действия">
        <Cell
          subtitle="Покажет нативный алерт"
          after={<Badge type="dot" mode="primary" />}
        >
          <Button
            mode="plain"
            stretched
            onClick={handleShowAlert}
          >
            Показать Alert
          </Button>
        </Cell>

        <Cell subtitle="Откроет модальное окно">
          <Button
            mode="plain"
            stretched
            onClick={() => setIsModalOpen(true)}
          >
            Открыть Modal
          </Button>
        </Cell>
      </Section>

      {/* Settings Section */}
      <Section header="Настройки">
        <Cell
          Component="label"
          after={
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          }
        >
          Уведомления
        </Cell>

        <Cell>
          <Input
            header="Имя пользователя"
            placeholder="Введите имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Cell>
      </Section>

      {/* Example Buttons */}
      <Section>
        <Button mode="filled" stretched>
          Заполненная кнопка
        </Button>
        <Button mode="bezeled" stretched>
          Обведённая кнопка
        </Button>
        <Button mode="plain" stretched>
          Простая кнопка
        </Button>
      </Section>

      {/* Modal Dialog */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        header={<Modal.Header>Пример Modal</Modal.Header>}
      >
        <div style={{ padding: 20 }}>
          <Title level="3" style={{ marginBottom: 12 }}>
            Модальное окно
          </Title>
          <Text style={{ marginBottom: 20 }}>
            Это пример модального окна с использованием Telegram UI компонентов.
          </Text>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              mode="filled"
              stretched
              onClick={() => setIsModalOpen(false)}
            >
              Понятно
            </Button>
            <Modal.Close>
              <Button mode="bezeled" stretched>
                Закрыть
              </Button>
            </Modal.Close>
          </div>
        </div>
      </Modal>
    </List>
  )
}
