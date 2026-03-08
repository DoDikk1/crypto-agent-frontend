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
} from '@telegram-apps/telegram-ui'

export default function ProfilePage() {
  const user = {
    name: 'Иван Иванов',
    username: '@ivanivanov',
    bio: 'Разработчик Telegram Mini Apps',
    stats: {
      posts: 42,
      followers: 1250,
      following: 389,
    },
  }

  return (
    <List>
      {/* Profile Header */}
      <Section>
        <Cell
          before={
            <Avatar
              size={96}
              acronym={user.name.split(' ').map(n => n[0]).join('')}
            />
          }
          multiline
        >
          <Title level="2">{user.name}</Title>
          <Text>{user.username}</Text>
          <Caption level="1">Онлайн</Caption>
        </Cell>
      </Section>

      {/* Bio */}
      <Section>
        <Cell multiline>
          <Text>{user.bio}</Text>
        </Cell>
      </Section>

      {/* Stats */}
      <Section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '16px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Title level="1">{user.stats.posts}</Title>
            <Caption>Посты</Caption>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Title level="1">{user.stats.followers}</Title>
            <Caption>Подписчики</Caption>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Title level="1">{user.stats.following}</Title>
            <Caption>Подписки</Caption>
          </div>
        </div>
      </Section>

      {/* Actions */}
      <Section>
        <Button mode="filled" stretched>
          Редактировать профиль
        </Button>
        <Button mode="bezeled" stretched>
          Поделиться профилем
        </Button>
      </Section>

      {/* Menu Items */}
      <Section header="Аккаунт">
        <Cell
          after={<Badge type="number">3</Badge>}
        >
          Сообщения
        </Cell>
        <Cell>Настройки</Cell>
        <Cell>Приватность</Cell>
        <Cell>Безопасность</Cell>
      </Section>
    </List>
  )
}
