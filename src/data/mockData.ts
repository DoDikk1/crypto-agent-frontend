import { Chat, User, Message } from '../types'

export const currentUser: User = {
  id: 1,
  firstName: 'Вы',
  username: 'myusername',
  avatar: '',
  online: true,
}

export const users: User[] = [
  {
    id: 2,
    firstName: 'Павел',
    lastName: 'Дуров',
    username: 'durov',
    online: true,
  },
  {
    id: 3,
    firstName: 'Николай',
    lastName: 'Дуров',
    username: 'nikolai',
    online: false,
    lastSeen: 'был(а) недавно',
  },
]

export const mockMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      chatId: 1,
      senderId: 2,
      text: 'Привет! Как дела?',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: 2,
      chatId: 1,
      senderId: 1,
      text: 'Отлично! Работаю над новым проектом.',
      timestamp: new Date(Date.now() - 3500000),
      read: true,
    },
    {
      id: 3,
      chatId: 1,
      senderId: 2,
      text: 'Звучит интересно! Расскажешь подробнее?',
      timestamp: new Date(Date.now() - 3400000),
      read: true,
    },
    {
      id: 4,
      chatId: 1,
      senderId: 1,
      text: 'Конечно! Это клиент Telegram на React с использованием Telegram UI компонентов.',
      timestamp: new Date(Date.now() - 3300000),
      read: true,
    },
    {
      id: 5,
      chatId: 1,
      senderId: 2,
      text: 'Впечатляет! 🚀',
      timestamp: new Date(Date.now() - 3200000),
      read: true,
      reactions: [{ emoji: '👍', count: 1, userIds: [1] }],
    },
  ],
  2: [
    {
      id: 6,
      chatId: 2,
      senderId: 3,
      text: 'Привет! Давно не общались',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: 7,
      chatId: 2,
      senderId: 1,
      text: 'Да, привет! Как твои дела?',
      timestamp: new Date(Date.now() - 7100000),
      read: true,
    },
    {
      id: 8,
      chatId: 2,
      senderId: 3,
      text: 'Всё отлично, работаю над криптопроектом',
      timestamp: new Date(Date.now() - 7000000),
      read: true,
    },
  ],
}

export const mockChats: Chat[] = [
  {
    id: 1,
    type: 'private',
    title: 'Павел Дуров',
    participants: [users[0]],
    lastMessage: mockMessages[1][4],
    unreadCount: 0,
    pinned: true,
    muted: false,
    online: true,
  },
  {
    id: 2,
    type: 'private',
    title: 'Николай Дуров',
    participants: [users[1]],
    lastMessage: mockMessages[2][2],
    unreadCount: 0,
    pinned: false,
    muted: false,
    online: false,
  },
]
