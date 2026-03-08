export interface User {
  id: number
  firstName: string
  lastName?: string
  username?: string
  avatar?: string
  online?: boolean
  lastSeen?: string
}

export interface MessageAttachment {
  type: 'photo' | 'video' | 'file' | 'voice' | 'sticker'
  url: string
  name?: string
  size?: number
  duration?: number
}

export interface Message {
  id: number
  chatId: number
  senderId: number
  text: string
  timestamp: Date
  read: boolean
  edited?: boolean
  replyTo?: number
  forwarded?: {
    fromChatId: number
    fromUserId: number
    fromUserName: string
  }
  reactions?: MessageReaction[]
  attachments?: MessageAttachment[]
}

export interface MessageReaction {
  emoji: string
  count: number
  userIds: number[]
}

export interface Chat {
  id: number
  type: 'private' | 'group' | 'channel'
  title: string
  avatar?: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  pinned: boolean
  muted: boolean
  online?: boolean
}

export interface ChatState {
  chats: Chat[]
  messages: Record<number, Message[]>
  currentUser: User
}
